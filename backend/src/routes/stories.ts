import { Router, Request, Response } from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const router = Router();

// Locate data/stories.json robustly whether running in dev, build, or Dokploy container
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = fs.existsSync(path.join(process.cwd(), "data"))
  ? path.join(process.cwd(), "data")
  : path.resolve(__dirname, "../../../data");
const STORIES_FILE = path.join(DATA_DIR, "stories.json");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readStories(): any[] {
  try {
    if (!fs.existsSync(STORIES_FILE)) {
      return [];
    }
    const raw = fs.readFileSync(STORIES_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.warn("[Backend Stories] Error reading stories.json, returning empty array:", err);
    return [];
  }
}

function writeStories(stories: any[]): void {
  try {
    const temp = `${STORIES_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(temp, JSON.stringify(stories, null, 2), "utf-8");
    fs.renameSync(temp, STORIES_FILE);
  } catch (err) {
    console.error("[Backend Stories] Error writing stories.json:", err);
    try {
      fs.writeFileSync(STORIES_FILE, JSON.stringify(stories, null, 2), "utf-8");
    } catch (_fallbackErr) {}
  }
}

// GET /api/stories (Public list of verified success stories - 100% unrestricted for all visitors)
router.get("/", (_req: Request, res: Response) => {
  try {
    const stories = readStories();
    return res.json({
      success: true,
      data: stories,
    });
  } catch (error: any) {
    console.error("Error fetching stories:", error);
    return res.status(500).json({
      success: false,
      error: { code: "FETCH_FAILED", message: error.message || "Failed to retrieve success stories" },
    });
  }
});

// POST /api/stories (Live creation of success stories - zero auth blockers, atomic server disk write)
router.post("/", (req: Request, res: Response) => {
  try {
    const stories = readStories();
    const body = req.body || {};

    const targetId = body.id || `story-${Date.now()}`;
    const newStory = {
      id: targetId,
      legacyId: body.legacyId || body.id || null,
      name: body.name || "Anonymous Student",
      city: body.city || "Global Destination",
      stream: body.stream || "Academic Degree",
      review: body.review || "",
      rating: typeof body.rating === "number" ? body.rating : 5,
      clientPic: body.clientPic || "",
      visaStamp: body.visaStamp || "",
      maskedName: body.maskedName || `${(body.name || "Student").charAt(0)}***`,
      stampId: body.stampId || `STAMP-${Math.floor(100 + Math.random() * 900)}`,
      visaGrantDate: body.visaGrantDate || "",
      isPublished: true,
      createdAt: body.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const existingIndex = stories.findIndex((s) => s.id === targetId || (body.legacyId && s.id === body.legacyId));
    if (existingIndex !== -1) {
      stories[existingIndex] = { ...stories[existingIndex], ...newStory };
    } else {
      stories.unshift(newStory);
    }

    writeStories(stories);
    console.log(`[Backend Stories] Live story published to disk: "${newStory.name}" (${newStory.id})`);

    return res.status(201).json({
      success: true,
      data: newStory,
    });
  } catch (error: any) {
    console.error("Error creating story:", error);
    return res.status(500).json({
      success: false,
      error: { code: "CREATE_FAILED", message: error.message || "Failed to create success story" },
    });
  }
});

// PUT /api/stories/:id (Live update of success stories)
router.put("/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const stories = readStories();
    const index = stories.findIndex((s) => s.id === id || s.legacyId === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        error: { code: "NOT_FOUND", message: "Success story not found" },
      });
    }

    const updated = {
      ...stories[index],
      ...req.body,
      id: stories[index].id,
      updatedAt: new Date().toISOString(),
    };

    stories[index] = updated;
    writeStories(stories);
    console.log(`[Backend Stories] Story updated on disk: "${updated.name}" (${updated.id})`);

    return res.json({
      success: true,
      data: updated,
    });
  } catch (error: any) {
    console.error("Error updating story:", error);
    return res.status(500).json({
      success: false,
      error: { code: "UPDATE_FAILED", message: error.message || "Failed to update success story" },
    });
  }
});

// DELETE /api/stories/:id (Live removal of success stories)
router.delete("/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const stories = readStories();
    const filtered = stories.filter((s) => s.id !== id && s.legacyId !== id);

    writeStories(filtered);
    console.log(`[Backend Stories] Story deleted from disk: ${id}`);

    return res.json({
      success: true,
      data: { message: "Success story deleted successfully" },
    });
  } catch (error: any) {
    console.error("Error deleting story:", error);
    return res.status(500).json({
      success: false,
      error: { code: "DELETE_FAILED", message: error.message || "Failed to delete success story" },
    });
  }
});

export default router;
