import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../db.js";
import { validateBody, registerAdminSchema } from "../middleware/validation.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { Role } from "@prisma/client";

const router = Router();

// Only Super Admins can manage credentials
router.use(requireAuth, requireRole([Role.SUPER_ADMIN]));

// GET /api/admin/credentials
router.get("/", async (req: Request, res: Response) => {
  try {
    const admins = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
        lastLoginAt: true,
      },
      orderBy: { createdAt: "asc" },
    });

    return res.json({
      success: true,
      data: admins,
    });
  } catch (error) {
    console.error("Error retrieving admin accounts:", error);
    return res.status(500).json({
      success: false,
      error: { code: "FETCH_FAILED", message: "Failed to retrieve admin accounts" },
    });
  }
});

// POST /api/admin/credentials
router.post("/", validateBody(registerAdminSchema), async (req: Request, res: Response) => {
  try {
    const { email, password, name, role } = req.body;
    const emailLower = email.toLowerCase().trim();

    const existing = await prisma.user.findUnique({
      where: { email: emailLower },
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        error: { code: "ALREADY_EXISTS", message: "An account with this email already exists" },
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email: emailLower,
        passwordHash,
        name: name || "",
        role: role as Role,
        isActive: true,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    return res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error provisioning admin account:", error);
    return res.status(500).json({
      success: false,
      error: { code: "CREATE_FAILED", message: "Failed to provision staff account" },
    });
  }
});

// PATCH /api/admin/credentials/:id
router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { password, role, name, isActive } = req.body;

    const existing = await prisma.user.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: { code: "NOT_FOUND", message: "Staff account not found" },
      });
    }

    const data: any = {};
    if (password && typeof password === "string" && password.length >= 6) {
      data.passwordHash = await bcrypt.hash(password, 10);
    }
    if (role && Object.values(Role).includes(role)) {
      data.role = role as Role;
    }
    if (name !== undefined) {
      data.name = name;
    }
    if (isActive !== undefined) {
      data.isActive = Boolean(isActive);
    }

    const updated = await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        updatedAt: true,
      },
    });

    return res.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error("Error updating admin account:", error);
    return res.status(500).json({
      success: false,
      error: { code: "UPDATE_FAILED", message: "Failed to update staff account" },
    });
  }
});

// DELETE /api/admin/credentials/:id
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (req.user?.id === id) {
      return res.status(400).json({
        success: false,
        error: { code: "SELF_DELETION", message: "You cannot delete your own active administrator account" },
      });
    }

    const existing = await prisma.user.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: { code: "NOT_FOUND", message: "Staff account not found" },
      });
    }

    await prisma.user.delete({
      where: { id },
    });

    return res.json({
      success: true,
      data: { message: "Staff account deleted successfully" },
    });
  } catch (error) {
    console.error("Error deleting admin account:", error);
    return res.status(500).json({
      success: false,
      error: { code: "DELETE_FAILED", message: "Failed to delete staff account" },
    });
  }
});

export default router;
