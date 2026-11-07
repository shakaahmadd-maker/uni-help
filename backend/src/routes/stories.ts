import { Router, Request, Response } from "express";
import pg from "pg";
import path from "path";
import fs from "fs";

const { Pool } = pg;
const router = Router();

// Connect to Dokploy PostgreSQL database using DATABASE_URL environment variable
const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL?.includes("localhost") || process.env.DATABASE_URL?.includes("127.0.0.1")
        ? false
        : { rejectUnauthorized: false },
    })
  : null;

// Graceful fallback for local development or before DATABASE_URL is mapped
const DATA_DIR = path.join(process.cwd(), "data");
const STORIES_FILE = path.join(DATA_DIR, "stories.json");

function readFallbackStories(): any[] {
  try {
    if (!fs.existsSync(STORIES_FILE)) return [];
    return JSON.parse(fs.readFileSync(STORIES_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function writeFallbackStories(stories: any[]): void {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    const temp = `${STORIES_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(temp, JSON.stringify(stories, null, 2), "utf-8");
    fs.renameSync(temp, STORIES_FILE);
  } catch (err) {
    console.error("[Storage] Fallback file write failed:", err);
  }
}

// Automatically create table if it does not exist
let tableInitialized = false;
async function ensureTable() {
  if (!pool || tableInitialized) return;
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS success_stories (
          id VARCHAR(255) PRIMARY KEY,
          legacy_id VARCHAR(255),
          name VARCHAR(255) NOT NULL,
          city VARCHAR(255),
          stream VARCHAR(255),
          review TEXT,
          rating INTEGER DEFAULT 5,
          client_pic TEXT,
          visa_stamp TEXT,
          masked_name VARCHAR(255),
          stamp_id VARCHAR(100),
          visa_grant_date VARCHAR(100),
          is_published BOOLEAN DEFAULT TRUE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    tableInitialized = true;
    console.log("[Dokploy PostgreSQL] success_stories table verified/created successfully.");
  } catch (err: any) {
    console.warn("[Dokploy PostgreSQL] Table verification note:", err.message);
  }
}

// GET /api/stories - Fetch all success stories from PostgreSQL
router.get("/", async (_req: Request, res: Response) => {
  try {
    if (pool) {
      await ensureTable();
      const result = await pool.query(
        `SELECT id, legacy_id as "legacyId", name, city, stream, review, rating, 
                client_pic as "clientPic", visa_stamp as "visaStamp", masked_name as "maskedName", 
                stamp_id as "stampId", visa_grant_date as "visaGrantDate", is_published as "isPublished", 
                created_at as "createdAt", updated_at as "updatedAt" 
         FROM success_stories 
         ORDER BY created_at DESC`
      );
      return res.json({ success: true, data: result.rows });
    } else {
      const fallback = readFallbackStories();
      return res.json({ success: true, data: fallback });
    }
  } catch (error: any) {
    console.error("[Database Error] Failed to fetch stories from PostgreSQL, using fallback:", error.message);
    const fallback = readFallbackStories();
    return res.json({ success: true, data: fallback });
  }
});

// POST /api/stories - Create or update a success story in PostgreSQL
router.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body || {};
    const targetId = body.id || `story-${Date.now()}`;
    const legacyId = body.legacyId || body.id || null;
    const name = body.name || "Anonymous Student";
    const city = body.city || "Global Destination";
    const stream = body.stream || "Academic Degree";
    const review = body.review || "";
    const rating = typeof body.rating === "number" ? body.rating : 5;
    const clientPic = body.clientPic || "";
    const visaStamp = body.visaStamp || "";
    const maskedName = body.maskedName || `${name.charAt(0)}***`;
    const stampId = body.stampId || `STAMP-${Math.floor(100 + Math.random() * 900)}`;
    const visaGrantDate = body.visaGrantDate || "";
    const isPublished = true;
    const createdAt = body.createdAt || new Date().toISOString();
    const updatedAt = new Date().toISOString();

    if (pool) {
      await ensureTable();
      // Upsert into PostgreSQL
      const query = `
        INSERT INTO success_stories 
        (id, legacy_id, name, city, stream, review, rating, client_pic, visa_stamp, masked_name, stamp_id, visa_grant_date, is_published, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          city = EXCLUDED.city,
          stream = EXCLUDED.stream,
          review = EXCLUDED.review,
          rating = EXCLUDED.rating,
          client_pic = EXCLUDED.client_pic,
          visa_stamp = EXCLUDED.visa_stamp,
          masked_name = EXCLUDED.masked_name,
          stamp_id = EXCLUDED.stamp_id,
          visa_grant_date = EXCLUDED.visa_grant_date,
          is_published = EXCLUDED.is_published,
          updated_at = EXCLUDED.updated_at
        RETURNING id, legacy_id as "legacyId", name, city, stream, review, rating, client_pic as "clientPic", visa_stamp as "visaStamp", masked_name as "maskedName", stamp_id as "stampId", visa_grant_date as "visaGrantDate", is_published as "isPublished", created_at as "createdAt", updated_at as "updatedAt";
      `;

      const values = [
        targetId, legacyId, name, city, stream, review, rating, 
        clientPic, visaStamp, maskedName, stampId, visaGrantDate, 
        isPublished, createdAt, updatedAt
      ];

      const result = await pool.query(query, values);
      
      // Also cache to local fallback file
      try {
        const fileStories = readFallbackStories();
        const idx = fileStories.findIndex((s) => s.id === targetId || (legacyId && s.id === legacyId));
        if (idx !== -1) fileStories[idx] = result.rows[0];
        else fileStories.unshift(result.rows[0]);
        writeFallbackStories(fileStories);
      } catch {}

      console.log(`[Dokploy PostgreSQL] Story saved to database: "${name}" (${targetId})`);
      return res.status(201).json({ success: true, data: result.rows[0] });
    } else {
      // Local fallback file storage
      const fileStories = readFallbackStories();
      const fallbackStory = {
        id: targetId,
        legacyId,
        name,
        city,
        stream,
        review,
        rating,
        clientPic,
        visaStamp,
        maskedName,
        stampId,
        visaGrantDate,
        isPublished,
        createdAt,
        updatedAt,
      };
      const idx = fileStories.findIndex((s) => s.id === targetId || (legacyId && s.id === legacyId));
      if (idx !== -1) fileStories[idx] = fallbackStory;
      else fileStories.unshift(fallbackStory);
      writeFallbackStories(fileStories);

      console.log(`[Storage] Story saved to fallback storage: "${name}" (${targetId})`);
      return res.status(201).json({ success: true, data: fallbackStory });
    }
  } catch (error: any) {
    console.error("[Database Error] Failed to create story in PostgreSQL:", error.message);
    return res.status(500).json({ success: false, error: { message: error.message } });
  }
});

// PUT /api/stories/:id - Update existing success story in PostgreSQL
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body = req.body || {};
    const updatedAt = new Date().toISOString();

    if (pool) {
      await ensureTable();
      const query = `
        UPDATE success_stories SET
          name = COALESCE($1, name),
          city = COALESCE($2, city),
          stream = COALESCE($3, stream),
          review = COALESCE($4, review),
          rating = COALESCE($5, rating),
          client_pic = COALESCE($6, client_pic),
          visa_stamp = COALESCE($7, visa_stamp),
          masked_name = COALESCE($8, masked_name),
          stamp_id = COALESCE($9, stamp_id),
          visa_grant_date = COALESCE($10, visa_grant_date),
          updated_at = $11
        WHERE id = $12 OR legacy_id = $12
        RETURNING id, legacy_id as "legacyId", name, city, stream, review, rating, client_pic as "clientPic", visa_stamp as "visaStamp", masked_name as "maskedName", stamp_id as "stampId", visa_grant_date as "visaGrantDate", is_published as "isPublished", created_at as "createdAt", updated_at as "updatedAt";
      `;

      const values = [
        body.name, body.city, body.stream, body.review, body.rating,
        body.clientPic, body.visaStamp, body.maskedName, body.stampId,
        body.visaGrantDate, updatedAt, id
      ];

      const result = await pool.query(query, values);
      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, error: { message: "Success story not found" } });
      }

      return res.json({ success: true, data: result.rows[0] });
    } else {
      const stories = readFallbackStories();
      const idx = stories.findIndex((s) => s.id === id || s.legacyId === id);
      if (idx === -1) {
        return res.status(404).json({ success: false, error: { message: "Success story not found" } });
      }
      stories[idx] = { ...stories[idx], ...body, updatedAt };
      writeFallbackStories(stories);
      return res.json({ success: true, data: stories[idx] });
    }
  } catch (error: any) {
    console.error("[Database Error] Failed to update story:", error.message);
    return res.status(500).json({ success: false, error: { message: error.message } });
  }
});

// DELETE /api/stories/:id - Delete story from PostgreSQL
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (pool) {
      await ensureTable();
      await pool.query("DELETE FROM success_stories WHERE id = $1 OR legacy_id = $1", [id]);
    }
    const stories = readFallbackStories();
    const filtered = stories.filter((s) => s.id !== id && s.legacyId !== id);
    writeFallbackStories(filtered);

    console.log(`[Database] Story deleted: ${id}`);
    return res.json({ success: true, data: { message: "Story deleted" } });
  } catch (error: any) {
    console.error("[Database Error] Failed to delete story from PostgreSQL:", error.message);
    return res.status(500).json({ success: false, error: { message: error.message } });
  }
});

export default router;
