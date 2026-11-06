import { Router, Request, Response } from "express";
import { prisma } from "../db.js";
import { validateBody, storySchema } from "../middleware/validation.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// GET /api/stories (Public list of verified success stories - no restrictions)
router.get("/", async (req: Request, res: Response) => {
  try {
    const stories = await prisma.successStory.findMany({
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    });

    return res.json({
      success: true,
      data: stories,
    });
  } catch (error) {
    console.error("Error fetching stories:", error);
    return res.status(500).json({
      success: false,
      error: { code: "FETCH_FAILED", message: "Failed to retrieve success stories" },
    });
  }
});

// POST /api/stories (Live creation of success stories)
router.post("/", validateBody(storySchema), async (req: Request, res: Response) => {
  try {
    const story = await prisma.successStory.create({
      data: req.body,
    });

    return res.status(201).json({
      success: true,
      data: story,
    });
  } catch (error) {
    console.error("Error creating story:", error);
    return res.status(500).json({
      success: false,
      error: { code: "CREATE_FAILED", message: "Failed to create success story" },
    });
  }
});

// PUT /api/stories/:id (Live update of success stories)
router.put("/:id", validateBody(storySchema), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

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

    const updated = await prisma.successStory.update({
      where: { id: existing.id },
      data: req.body,
    });

    return res.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error("Error updating story:", error);
    return res.status(500).json({
      success: false,
      error: { code: "UPDATE_FAILED", message: "Failed to update success story" },
    });
  }
});

// DELETE /api/stories/:id (Live removal of success stories)
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

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

    await prisma.successStory.delete({
      where: { id: existing.id },
    });

    return res.json({
      success: true,
      data: { message: "Success story deleted successfully" },
    });
  } catch (error) {
    console.error("Error deleting story:", error);
    return res.status(500).json({
      success: false,
      error: { code: "DELETE_FAILED", message: "Failed to delete success story" },
    });
  }
});

export default router;
