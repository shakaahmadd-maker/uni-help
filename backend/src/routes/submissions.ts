import { Router, Request, Response } from "express";
import { prisma } from "../db.js";
import { validateBody, submissionCreateSchema, submissionUpdateSchema } from "../middleware/validation.js";
import { requireAuth } from "../middleware/auth.js";
import { SubmissionStatus } from "@prisma/client";

const router = Router();

// POST /api/submissions (Public student lead creation)
router.post("/", validateBody(submissionCreateSchema), async (req: Request, res: Response) => {
  try {
    const { name, email, phone, city, service, message, status } = req.body;

    const submission = await prisma.submission.create({
      data: {
        name,
        email: email.toLowerCase().trim(),
        phone: phone || "",
        city: city || "",
        service: service || "General Academic Query",
        message: message || "",
        status: (status as SubmissionStatus) || SubmissionStatus.NEW,
      },
    });

    return res.status(201).json({
      success: true,
      data: submission,
    });
  } catch (error) {
    console.error("Error creating submission:", error);
    return res.status(500).json({
      success: false,
      error: { code: "CREATE_FAILED", message: "Failed to record inquiry submission" },
    });
  }
});

// GET /api/submissions (Protected admin listing with filters)
router.get("/", requireAuth, async (req: Request, res: Response) => {
  try {
    const { status, city, service, search, page = "1", limit = "100" } = req.query;

    const pageNum = Math.max(1, parseInt(page as string, 10) || 1);
    const limitNum = Math.min(200, Math.max(1, parseInt(limit as string, 10) || 100));
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};

    if (status && status !== "ALL") {
      where.status = status as SubmissionStatus;
    }

    if (city && city !== "ALL") {
      where.city = { contains: city as string, mode: "insensitive" };
    }

    if (service && service !== "ALL") {
      where.service = { contains: service as string, mode: "insensitive" };
    }

    if (search && typeof search === "string" && search.trim() !== "") {
      const q = search.trim();
      where.OR = [
        { name: { contains: q, mode: "insensitive" } },
        { email: { contains: q, mode: "insensitive" } },
        { phone: { contains: q, mode: "insensitive" } },
        { message: { contains: q, mode: "insensitive" } },
        { city: { contains: q, mode: "insensitive" } },
        { service: { contains: q, mode: "insensitive" } },
      ];
    }

    const [total, items] = await Promise.all([
      prisma.submission.count({ where }),
      prisma.submission.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { createdAt: "desc" },
        include: {
          assignedTo: {
            select: { id: true, name: true, email: true, role: true },
          },
        },
      }),
    ]);

    return res.json({
      success: true,
      data: {
        items,
        pagination: {
          total,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(total / limitNum),
        },
      },
    });
  } catch (error) {
    console.error("Error querying submissions:", error);
    return res.status(500).json({
      success: false,
      error: { code: "FETCH_FAILED", message: "Failed to fetch submissions" },
    });
  }
});

// GET /api/submissions/:id (Protected single inspect)
router.get("/:id", requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const submission = await prisma.submission.findFirst({
      where: {
        OR: [{ id }, { legacyId: id }],
      },
      include: {
        assignedTo: {
          select: { id: true, name: true, email: true, role: true },
        },
      },
    });

    if (!submission) {
      return res.status(404).json({
        success: false,
        error: { code: "NOT_FOUND", message: "Submission not found" },
      });
    }

    return res.json({
      success: true,
      data: submission,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: { code: "FETCH_FAILED", message: "Failed to fetch submission" },
    });
  }
});

// PATCH /api/submissions/:id (Protected status & notes update)
router.patch("/:id", requireAuth, validateBody(submissionUpdateSchema), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, notes, name, email, phone, city, service, message } = req.body;

    const existing = await prisma.submission.findFirst({
      where: {
        OR: [{ id }, { legacyId: id }],
      },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: { code: "NOT_FOUND", message: "Submission not found" },
      });
    }

    const updated = await prisma.submission.update({
      where: { id: existing.id },
      data: {
        ...(status ? { status: status as SubmissionStatus } : {}),
        ...(notes !== undefined ? { notes } : {}),
        ...(name ? { name } : {}),
        ...(email ? { email: email.toLowerCase().trim() } : {}),
        ...(phone !== undefined ? { phone } : {}),
        ...(city !== undefined ? { city } : {}),
        ...(service !== undefined ? { service } : {}),
        ...(message !== undefined ? { message } : {}),
      },
    });

    return res.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error("Error updating submission:", error);
    return res.status(500).json({
      success: false,
      error: { code: "UPDATE_FAILED", message: "Failed to update submission" },
    });
  }
});

// DELETE /api/submissions/:id (Protected delete)
router.delete("/:id", requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existing = await prisma.submission.findFirst({
      where: {
        OR: [{ id }, { legacyId: id }],
      },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: { code: "NOT_FOUND", message: "Submission not found" },
      });
    }

    await prisma.submission.delete({
      where: { id: existing.id },
    });

    return res.json({
      success: true,
      data: { message: "Submission successfully removed" },
    });
  } catch (error) {
    console.error("Error deleting submission:", error);
    return res.status(500).json({
      success: false,
      error: { code: "DELETE_FAILED", message: "Failed to delete submission" },
    });
  }
});

export default router;
