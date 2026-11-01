import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../db.js";
import { validateBody, loginSchema } from "../middleware/validation.js";
import { generateToken, requireAuth } from "../middleware/auth.js";

const router = Router();

// POST /api/auth/login
router.post("/login", validateBody(loginSchema), async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const emailLower = email.toLowerCase().trim();

    const user = await prisma.user.findUnique({
      where: { email: emailLower },
    });

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password" },
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password" },
      });
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const userPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    };

    const token = generateToken(userPayload);

    return res.json({
      success: true,
      data: {
        token,
        user: userPayload,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      error: { code: "INTERNAL_ERROR", message: "An unexpected error occurred during login" },
    });
  }
});

// GET /api/auth/me
router.get("/me", requireAuth, async (req: Request, res: Response) => {
  return res.json({
    success: true,
    data: {
      user: req.user,
    },
  });
});

// POST /api/auth/logout
router.post("/logout", requireAuth, async (req: Request, res: Response) => {
  return res.json({
    success: true,
    data: { message: "Successfully logged out" },
  });
});

// POST /api/auth/refresh
router.post("/refresh", requireAuth, async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: { code: "UNAUTHORIZED", message: "Unauthorized" },
    });
  }

  const token = generateToken(req.user);
  return res.json({
    success: true,
    data: {
      token,
      user: req.user,
    },
  });
});

export default router;
