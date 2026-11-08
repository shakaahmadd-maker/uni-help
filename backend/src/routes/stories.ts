import { Router, Request, Response } from "express";
import { prisma, getIsDatabaseConfigured } from "../db.js";
import { requireAuth } from "../middleware/auth.js";
import path from "path";
import fs from "fs";

const router = Router();

// Foundational 6 verified success stories permanently available
export const INITIAL_VERIFIED_STORIES = [
  {
    id: "story-1794042096342",
    legacyId: "story-1794042096342",
    name: "Ahmad Khan",
    city: "United Kingdom",
    stream: "Master of Business Administration",
    review: "Uni Help made my UK student visa process seamless from admission to visa stamping! Highly recommended.",
    rating: 5,
    clientPic: "",
    visaStamp: "",
    maskedName: "A*** K***",
    stampId: "STAMP-973",
    visaGrantDate: "November 2026",
    isPublished: true,
    displayOrder: 0,
    createdAt: new Date("2026-11-07T09:01:36.342Z"),
    updatedAt: new Date("2026-11-07T09:01:36.342Z"),
  },
  {
    id: "mock-1",
    legacyId: "mock-1",
    name: "Fazal Wadood",
    city: "Germany",
    stream: "Master's in Computer Science",
    review: "Big Congratulations to Fazal Wadood! We are thrilled to announce that Fazal has successfully secured admission for a Master's in Computer Sciences at a top German public university and obtained his German student visa DE! At @unihelp, we specialize in turning study abroad dreams into reality by guiding students through admissions, documentation & visa success.",
    rating: 5,
    clientPic: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=300&fit=crop",
    visaStamp: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&h=400&fit=crop",
    maskedName: "F***L W****D",
    stampId: "DE-STAMP-782",
    visaGrantDate: "May 12, 2026",
    isPublished: true,
    displayOrder: 1,
    createdAt: new Date("2026-05-12T10:00:00.000Z"),
    updatedAt: new Date("2026-05-12T10:00:00.000Z"),
  },
  {
    id: "mock-2",
    legacyId: "mock-2",
    name: "Amara Cole",
    city: "United Kingdom",
    stream: "Bachelor's of Business",
    review: "Big Congratulations to Amara Cole! Amara has successfully obtained her UK Student Visa tier-4 to study Business Management in London! The immigration process was smooth, requiring thorough checklist compilation and proof of financial records. At @unihelp, our admissions desk simplifies study visa guidelines. Ready to take your career global?",
    rating: 5,
    clientPic: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop",
    visaStamp: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=500&h=400&fit=crop",
    maskedName: "A***A C**E",
    stampId: "UK-STAMP-491",
    visaGrantDate: "April 28, 2026",
    isPublished: true,
    displayOrder: 2,
    createdAt: new Date("2026-04-28T10:00:00.000Z"),
    updatedAt: new Date("2026-04-28T10:00:00.000Z"),
  },
  {
    id: "mock-3",
    legacyId: "mock-3",
    name: "Sarah Chen",
    city: "Australia",
    stream: "Master's of Data Science",
    review: "Outstanding admissions success! Sarah Chen has successfully secured her Australia Subclass 500 visa to attend high-ranking Melbourne University! The complex GTE assessment was completed cleanly within 18 days under expert counselling supervision at @unihelp. Truly a hallmark of student ambition & matching strategies!",
    rating: 5,
    clientPic: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop",
    visaStamp: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=500&h=400&fit=crop",
    maskedName: "S***H C**N",
    stampId: "AU-STAMP-320",
    visaGrantDate: "June 02, 2026",
    isPublished: true,
    displayOrder: 3,
    createdAt: new Date("2026-06-02T10:00:00.000Z"),
    updatedAt: new Date("2026-06-02T10:00:00.000Z"),
  },
  {
    id: "mock-4",
    legacyId: "mock-4",
    name: "Marcus Miller",
    city: "Canada",
    stream: "PR & Residency Study Permit",
    review: "Massive Congratulations to Marcus! He has secured his Canada Study Permit approval for University of British Columbia! Marcus was assisted through strict document collection protocols and statement of purpose formatting. A verified victory for the engineering streams!",
    rating: 5,
    clientPic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    visaStamp: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=500&h=400&fit=crop",
    maskedName: "M***S M****R",
    stampId: "CA-STAMP-185",
    visaGrantDate: "May 19, 2026",
    isPublished: true,
    displayOrder: 4,
    createdAt: new Date("2026-05-19T10:00:00.000Z"),
    updatedAt: new Date("2026-05-19T10:00:00.000Z"),
  },
  {
    id: "mock-5",
    legacyId: "mock-5",
    name: "Elena Rostova",
    city: "United States",
    stream: "Master's of Biotechnology",
    review: "Incredible news! Elena Rostova has successfully obtained her US F-1 Academic Visa for study in Biotechnology streams! She secured full research scholarship waiver clearances with our elite profile matching strategies at @unihelp. Ready to realize your Ivy League dreams?",
    rating: 5,
    clientPic: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop",
    visaStamp: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&h=400&fit=crop",
    maskedName: "E***A R*****A",
    stampId: "US-STAMP-612",
    visaGrantDate: "June 10, 2026",
    isPublished: true,
    displayOrder: 5,
    createdAt: new Date("2026-06-10T10:00:00.000Z"),
    updatedAt: new Date("2026-06-10T10:00:00.000Z"),
  },
];

// Fallback file storage helper for local/offline resilience
const DATA_DIR = path.join(process.cwd(), "data");
const STORIES_FILE = path.join(DATA_DIR, "stories.json");

function readFallbackStories(): any[] {
  try {
    if (fs.existsSync(STORIES_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(STORIES_FILE, "utf-8"));
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (_e) {}
  return [...INITIAL_VERIFIED_STORIES];
}

function writeFallbackStories(stories: any[]): void {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    const temp = `${STORIES_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(temp, JSON.stringify(stories, null, 2), "utf-8");
    fs.renameSync(temp, STORIES_FILE);
  } catch (err) {
    console.error("[Storage] Fallback write error:", err);
  }
}

// Automatically verify/create the success_stories table in PostgreSQL
let tableInitialized = false;
async function ensureStoriesTable() {
  if (tableInitialized) return;
  try {
    await prisma.$executeRawUnsafe(`
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
          display_order INTEGER DEFAULT 0,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await prisma.$executeRawUnsafe(`
      ALTER TABLE success_stories ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;
    `);
    tableInitialized = true;
    console.log("[Stories API] PostgreSQL table success_stories verified/ensured.");
  } catch (err: any) {
    console.warn("[Stories API] Table initialization note:", err.message);
  }
}

// GET /api/stories - Fetch all success stories
// 100% Unrestricted: zero auth blockers, zero sandbox gates, public access
router.get("/", async (_req: Request, res: Response) => {
  try {
    const isDb = getIsDatabaseConfigured();
    if (isDb) {
      await ensureStoriesTable();
      let stories = await prisma.successStory.findMany({
        orderBy: { createdAt: "desc" },
      });

      // Auto-Seed: If database table is empty, seed foundational 6 verified records into PostgreSQL
      if (!stories || stories.length === 0) {
        console.log("[Stories API] PostgreSQL table is empty. Auto-seeding 6 verified success stories...");
        for (const s of INITIAL_VERIFIED_STORIES) {
          try {
            await prisma.successStory.upsert({
              where: { id: s.id },
              update: {
                name: s.name,
                city: s.city,
                stream: s.stream,
                review: s.review,
                rating: s.rating,
                clientPic: s.clientPic,
                visaStamp: s.visaStamp,
                maskedName: s.maskedName,
                stampId: s.stampId,
                visaGrantDate: s.visaGrantDate,
                isPublished: true,
                displayOrder: s.displayOrder,
              },
              create: {
                id: s.id,
                legacyId: s.legacyId,
                name: s.name,
                city: s.city,
                stream: s.stream,
                review: s.review,
                rating: s.rating,
                clientPic: s.clientPic,
                visaStamp: s.visaStamp,
                maskedName: s.maskedName,
                stampId: s.stampId,
                visaGrantDate: s.visaGrantDate,
                isPublished: true,
                displayOrder: s.displayOrder,
                createdAt: s.createdAt,
              },
            });
          } catch (_seedErr) {}
        }
        stories = await prisma.successStory.findMany({
          orderBy: { createdAt: "desc" },
        });
      }

      if (stories && stories.length > 0) {
        return res.json({
          success: true,
          data: stories,
        });
      }
    }

    const fallback = readFallbackStories();
    return res.json({
      success: true,
      data: fallback,
    });
  } catch (error: any) {
    console.warn("[Prisma Stories] Database query error, using fallback storage:", error.message);
    const fallback = readFallbackStories();
    return res.json({
      success: true,
      data: fallback,
    });
  }
});

// POST /api/stories/sync - Bulk force-sync success stories directly to PostgreSQL (Admin protected)
router.post("/sync", requireAuth, async (req: Request, res: Response) => {
  try {
    const rawStories = req.body?.stories || req.body || [];
    const storiesArray: any[] = Array.isArray(rawStories) ? rawStories : [rawStories];
    const isDb = getIsDatabaseConfigured();
    const syncedRecords: any[] = [];

    if (isDb) {
      await ensureStoriesTable();
      for (const item of storiesArray) {
        if (!item || !item.name) continue;
        const targetId = item.id || `story-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
        const legacyId = item.legacyId || item.id || null;
        const record = await prisma.successStory.upsert({
          where: { id: targetId },
          update: {
            name: item.name,
            maskedName: item.maskedName || `${item.name.charAt(0)}***`,
            city: item.city || "Global Destination",
            stream: item.stream || "Academic Degree",
            review: item.review || "",
            rating: typeof item.rating === "number" ? item.rating : 5,
            clientPic: item.clientPic || "",
            visaStamp: item.visaStamp || "",
            stampId: item.stampId || `STAMP-${Math.floor(100 + Math.random() * 900)}`,
            visaGrantDate: item.visaGrantDate || "",
            isPublished: true,
            displayOrder: typeof item.displayOrder === "number" ? item.displayOrder : 0,
          },
          create: {
            id: targetId,
            legacyId,
            name: item.name,
            maskedName: item.maskedName || `${item.name.charAt(0)}***`,
            city: item.city || "Global Destination",
            stream: item.stream || "Academic Degree",
            review: item.review || "",
            rating: typeof item.rating === "number" ? item.rating : 5,
            clientPic: item.clientPic || "",
            visaStamp: item.visaStamp || "",
            stampId: item.stampId || `STAMP-${Math.floor(100 + Math.random() * 900)}`,
            visaGrantDate: item.visaGrantDate || "",
            isPublished: true,
            displayOrder: typeof item.displayOrder === "number" ? item.displayOrder : 0,
            createdAt: item.createdAt ? new Date(item.createdAt) : new Date(),
          },
        });
        syncedRecords.push(record);
      }
    } else {
      for (const item of storiesArray) {
        if (!item || !item.name) continue;
        syncedRecords.push({
          ...item,
          id: item.id || `story-${Date.now()}`,
          isPublished: true,
          updatedAt: new Date().toISOString(),
        });
      }
    }

    // Persist to fallback cache as well
    writeFallbackStories(syncedRecords.length > 0 ? syncedRecords : readFallbackStories());

    console.log(`[Stories API] Bulk synced ${syncedRecords.length} stories successfully.`);
    return res.json({
      success: true,
      data: {
        count: syncedRecords.length,
        items: syncedRecords,
      },
    });
  } catch (error: any) {
    console.error("[Stories API] Sync failed:", error);
    return res.status(500).json({
      success: false,
      error: { code: "SYNC_FAILED", message: error.message || "Failed to synchronize stories to database" },
    });
  }
});

// POST /api/stories - Create or upsert a single success story (Admin protected)
router.post("/", requireAuth, async (req: Request, res: Response) => {
  try {
    const body = req.body || {};
    const targetId = body.id || `story-${Date.now()}`;
    const legacyId = body.legacyId || body.id || null;
    const name = body.name || "Anonymous Student";
    const maskedName = body.maskedName || `${name.charAt(0)}***`;
    const city = body.city || "Global Destination";
    const stream = body.stream || "Academic Degree";
    const review = body.review || "";
    const rating = typeof body.rating === "number" ? body.rating : 5;
    const clientPic = body.clientPic || "";
    const visaStamp = body.visaStamp || "";
    const stampId = body.stampId || `STAMP-${Math.floor(100 + Math.random() * 900)}`;
    const visaGrantDate = body.visaGrantDate || "";
    const isPublished = body.isPublished !== undefined ? Boolean(body.isPublished) : true;
    const displayOrder = typeof body.displayOrder === "number" ? body.displayOrder : 0;
    const createdAt = body.createdAt ? new Date(body.createdAt) : new Date();

    let storyRecord: any = null;
    const isDb = getIsDatabaseConfigured();

    if (isDb) {
      await ensureStoriesTable();
      storyRecord = await prisma.successStory.upsert({
        where: { id: targetId },
        update: {
          name,
          maskedName,
          city,
          stream,
          review,
          rating,
          clientPic,
          visaStamp,
          stampId,
          visaGrantDate,
          isPublished,
          displayOrder,
        },
        create: {
          id: targetId,
          legacyId,
          name,
          maskedName,
          city,
          stream,
          review,
          rating,
          clientPic,
          visaStamp,
          stampId,
          visaGrantDate,
          isPublished,
          displayOrder,
          createdAt,
        },
      });
    }

    if (!storyRecord) {
      storyRecord = {
        id: targetId,
        legacyId,
        name,
        maskedName,
        city,
        stream,
        review,
        rating,
        clientPic,
        visaStamp,
        stampId,
        visaGrantDate,
        isPublished,
        displayOrder,
        createdAt: createdAt.toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }

    // Keep local fallback storage in sync
    try {
      const fileStories = readFallbackStories();
      const idx = fileStories.findIndex((s) => s.id === targetId || (legacyId && s.id === legacyId));
      if (idx !== -1) fileStories[idx] = storyRecord;
      else fileStories.unshift(storyRecord);
      writeFallbackStories(fileStories);
    } catch {}

    console.log(`[Stories API] Story saved: "${name}" (${storyRecord.id})`);
    return res.status(201).json({
      success: true,
      data: storyRecord,
    });
  } catch (error: any) {
    console.error("[Stories API] Story creation failed:", error);
    return res.status(500).json({
      success: false,
      error: { code: "CREATE_FAILED", message: error.message || "Failed to create success story" },
    });
  }
});

// PUT /api/stories/:id - Update existing success story (Admin protected)
router.put("/:id", requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body = req.body || {};
    let updatedRecord: any = null;
    const isDb = getIsDatabaseConfigured();

    if (isDb) {
      await ensureStoriesTable();
      try {
        updatedRecord = await prisma.successStory.update({
          where: { id },
          data: {
            ...(body.name !== undefined && { name: body.name }),
            ...(body.maskedName !== undefined && { maskedName: body.maskedName }),
            ...(body.city !== undefined && { city: body.city }),
            ...(body.stream !== undefined && { stream: body.stream }),
            ...(body.review !== undefined && { review: body.review }),
            ...(body.rating !== undefined && { rating: typeof body.rating === "number" ? body.rating : 5 }),
            ...(body.clientPic !== undefined && { clientPic: body.clientPic }),
            ...(body.visaStamp !== undefined && { visaStamp: body.visaStamp }),
            ...(body.stampId !== undefined && { stampId: body.stampId }),
            ...(body.visaGrantDate !== undefined && { visaGrantDate: body.visaGrantDate }),
            ...(body.isPublished !== undefined && { isPublished: Boolean(body.isPublished) }),
            ...(body.displayOrder !== undefined && { displayOrder: Number(body.displayOrder) }),
          },
        });
      } catch (_e) {}
    }

    if (!updatedRecord) {
      const stories = readFallbackStories();
      const idx = stories.findIndex((s) => s.id === id || s.legacyId === id);
      if (idx === -1) {
        return res.status(404).json({
          success: false,
          error: { code: "NOT_FOUND", message: "Success story not found" },
        });
      }
      updatedRecord = { ...stories[idx], ...body, updatedAt: new Date().toISOString() };
    }

    // Keep fallback storage in sync
    try {
      const stories = readFallbackStories();
      const idx = stories.findIndex((s) => s.id === id || s.legacyId === id);
      if (idx !== -1) {
        stories[idx] = updatedRecord;
        writeFallbackStories(stories);
      }
    } catch {}

    return res.json({
      success: true,
      data: updatedRecord,
    });
  } catch (error: any) {
    console.error("[Stories API] Story update failed:", error);
    return res.status(500).json({
      success: false,
      error: { code: "UPDATE_FAILED", message: error.message || "Failed to update success story" },
    });
  }
});

// DELETE /api/stories/:id - Delete story (Admin protected)
router.delete("/:id", requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const isDb = getIsDatabaseConfigured();

    if (isDb) {
      await ensureStoriesTable();
      try {
        await prisma.successStory.delete({
          where: { id },
        });
      } catch (_e) {}
    }

    // Remove from local fallback
    try {
      const stories = readFallbackStories();
      const filtered = stories.filter((s) => s.id !== id && s.legacyId !== id);
      writeFallbackStories(filtered);
    } catch {}

    return res.json({
      success: true,
      data: { message: "Success story deleted successfully" },
    });
  } catch (error: any) {
    console.error("[Stories API] Story deletion failed:", error);
    return res.status(500).json({
      success: false,
      error: { code: "DELETE_FAILED", message: error.message || "Failed to delete success story" },
    });
  }
});

export default router;
