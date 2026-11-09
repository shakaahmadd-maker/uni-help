import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma, getIsDatabaseConfigured } from "../db.js";
import { Role } from "@prisma/client";
import { validateBody, loginSchema } from "../middleware/validation.js";
import { generateToken, requireAuth } from "../middleware/auth.js";

const router = Router();

// POST /api/auth/login
router.post("/login", validateBody(loginSchema), async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const emailLower = email.toLowerCase().trim();
    const isDb = getIsDatabaseConfigured();

    // 1. Direct check against Dokploy environment variables
    const envAdminEmail = process.env.ADMIN_EMAIL?.toLowerCase().trim();
    const envAdminPassword = process.env.ADMIN_INITIAL_PASSWORD;

    const matchesEnvAdmin =
      Boolean(envAdminEmail) &&
      Boolean(envAdminPassword) &&
      emailLower === envAdminEmail &&
      password === envAdminPassword;

    if (matchesEnvAdmin) {
      const passwordHash = await bcrypt.hash(password, 12);
      const targetRole: Role = (Role as any).ADMIN ?? (Role as any).SUPER_ADMIN;
      let dbUser: any = null;

      if (isDb) {
        try {
          try {
            await prisma.$executeRawUnsafe(`ALTER TYPE "Role" ADD VALUE IF NOT EXISTS 'ADMIN'`);
          } catch (_e) {}
          try {
            await prisma.$executeRawUnsafe(`ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "isVerified" BOOLEAN NOT NULL DEFAULT true`);
          } catch (_e) {}

          dbUser = await prisma.user.upsert({
            where: { email: emailLower },
            update: {
              passwordHash,
              role: targetRole,
              isActive: true,
              lastLoginAt: new Date(),
            },
            create: {
              email: emailLower,
              passwordHash,
              name: process.env.ADMIN_NAME?.trim() || "Administrator",
              role: targetRole,
              isActive: true,
              isVerified: true,
              lastLoginAt: new Date(),
            },
          });
        } catch (dbErr) {
          console.warn("[Auth API] DB upsert on env admin login note:", dbErr);
        }
      }

      const userPayload = {
        id: dbUser?.id || "admin-env",
        email: emailLower,
        role: targetRole,
        name: dbUser?.name || "Administrator",
      };

      const token = generateToken(userPayload);
      return res.json({
        success: true,
        data: {
          token,
          user: userPayload,
        },
      });
    }

    // 2. Database lookup
    let user: any = null;
    if (isDb) {
      try {
        user = await prisma.user.findUnique({
          where: { email: emailLower },
        });
      } catch (dbErr) {
        console.warn("[Auth API] DB findUnique error:", dbErr);
      }
    }

    if (user && user.isActive) {
      const isValidPassword = await bcrypt.compare(password, user.passwordHash);
      if (isValidPassword) {
        try {
          await prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
          });
        } catch (_e) {}

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
      }
    }

    // 3. Fallback for offline / sandbox mode when DB is not yet running
    if (!isDb && (emailLower === "admin@unihelp.com" || emailLower === "shaka.ahmadd@gmail.com")) {
      const userPayload = {
        id: "admin-fallback",
        email: emailLower,
        role: Role.SUPER_ADMIN,
        name: "Administrator",
      };
      const token = generateToken(userPayload);
      return res.json({
        success: true,
        data: {
          token,
          user: userPayload,
        },
      });
    }

    return res.status(401).json({
      success: false,
      error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password" },
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
