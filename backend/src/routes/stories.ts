import { Router, Request, Response } from "express";
import { prisma } from "../db.js";
import path from "path";
import fs from "fs";

const router = Router();

// Fallback file storage helper for local/offline resilience
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
    console.error("[Storage] Fallback write error:", err);
  }
}

// GET /api/stories - Fetch all success stories from PostgreSQL via Prisma ORM
// 100% Unrestricted: zero auth blockers, zero sandbox gates, public access
router.get("/", async (_req: Request, res: Response) => {
  try {
    const stories = await prisma.successStory.findMany({
      orderBy: { createdAt: "desc" },
    });

    return res.json({
      success: true,
      data: stories,
    });
  } catch (error: any) {
    console.warn("[Prisma Stories] Database query failed, using fallback storage:", error.message);
    const fallback = readFallbackStories();
    return res.json({
      success: true,
      data: fallback,
    });
  }
});

// POST /api/stories - Create or upsert a success story via Prisma ORM
// Supports Base64 image payloads (clientPic, visaStamp) and handles id / legacyId
router.post("/", async (req: Request, res: Response) => {
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

    try {
      const existing = await prisma.successStory.findFirst({
        where: {
          OR: [
            { id: targetId },
            ...(legacyId ? [{ legacyId }] : []),
          ],
        },
      });

      if (existing) {
        storyRecord = await prisma.successStory.update({
          where: { id: existing.id },
          data: {
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
        });
      } else {
        storyRecord = await prisma.successStory.create({
          data: {
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
    } catch (dbErr: any) {
      console.warn("[Prisma Stories] Database write failed, falling back to JSON storage:", dbErr.message);
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

    console.log(`[Prisma Stories] Story saved: "${name}" (${storyRecord.id})`);
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

// PUT /api/stories/:id - Update existing success story in PostgreSQL via Prisma ORM
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body = req.body || {};
    let updatedRecord: any = null;

    try {
      const existing = await prisma.successStory.findFirst({
        where: {
          OR: [{ id }, { legacyId: id }],
        },
      });

      if (!existing) {
        return res.status(404).json({
          success: false,
          error: { code: "NOT_FOUND", message: "Success story not found" },
        });
      }

      updatedRecord = await prisma.successStory.update({
        where: { id: existing.id },
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
    } catch (dbErr: any) {
      console.warn("[Prisma Stories] Database update failed, falling back to JSON storage:", dbErr.message);
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

// DELETE /api/stories/:id - Delete story from PostgreSQL via Prisma ORM
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    try {
      const existing = await prisma.successStory.findFirst({
        where: {
          OR: [{ id }, { legacyId: id }],
        },
      });

      if (existing) {
        await prisma.successStory.delete({
          where: { id: existing.id },
        });
      }
    } catch (dbErr: any) {
      console.warn("[Prisma Stories] Database delete failed, removing from fallback:", dbErr.message);
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
