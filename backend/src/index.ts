import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { prisma, getIsDatabaseConfigured } from "./db.js";
import { Role } from "@prisma/client";

import healthRouter from "./routes/health.js";
import authRouter from "./routes/auth.js";
import submissionsRouter from "./routes/submissions.js";
import storiesRouter from "./routes/stories.js";
import adminsRouter from "./routes/admins.js";

dotenv.config();

const app = express();
// Default internal port 3000 (isolated inside container network)
const PORT = Number(process.env.PORT || 3000);
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

// Security headers
app.use(helmet());

// Cross-Origin Resource Sharing
app.use(
  cors({
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      if (CORS_ORIGIN === "*") return callback(null, true);
      const allowedOrigins = CORS_ORIGIN.split(",").map((s) => s.trim().toLowerCase());
      const lowerOrigin = origin.toLowerCase();
      if (
        allowedOrigins.includes(lowerOrigin) ||
        lowerOrigin.includes("unihelpconsultants.com") ||
        lowerOrigin.includes("localhost")
      ) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive for production web domain compatibility
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Rate limiting on sensitive authentication routes (e.g. 30 requests per 15 minutes)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: {
    success: false,
    error: {
      code: "TOO_MANY_REQUESTS",
      message: "Too many authentication attempts. Please try again after 15 minutes.",
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Mount modular API routers
app.use("/api/health", healthRouter);
app.use("/api/auth", authLimiter, authRouter);
app.use("/api/submissions", submissionsRouter);
app.use("/api/stories", storiesRouter);
app.use("/api/admin/credentials", adminsRouter);

// Root route health check
app.get("/", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    service: "Uni Help Backend API",
    version: "1.0.0",
    healthCheck: "/api/health",
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: {
      code: "NOT_FOUND",
      message: `Cannot ${req.method} ${req.originalUrl}`,
    },
  });
});

// Centralized error handling middleware
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  console.error("Unhandled API Error:", err);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    error: {
      code: err.code || "INTERNAL_SERVER_ERROR",
      message: process.env.NODE_ENV === "production" ? "Internal server error" : err.message,
    },
  });
});

// Auto-provision admin on server startup if ADMIN_EMAIL & ADMIN_INITIAL_PASSWORD are set
async function ensureAdminOnStartup() {
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase().trim();
  const adminPassword = process.env.ADMIN_INITIAL_PASSWORD;
  const isDb = getIsDatabaseConfigured();

  if (!isDb) {
    console.log("[Admin Startup] PostgreSQL DATABASE_URL not active. Running in storage mode.");
    return;
  }

  if (adminEmail && adminPassword && adminPassword.length >= 8) {
    try {
      try {
        await prisma.$executeRawUnsafe(`ALTER TYPE "Role" ADD VALUE IF NOT EXISTS 'ADMIN'`);
      } catch (_e) {}
      try {
        await prisma.$executeRawUnsafe(`ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "isVerified" BOOLEAN NOT NULL DEFAULT true`);
      } catch (_e) {}

      const passwordHash = await bcrypt.hash(adminPassword, 12);
      const targetRole: Role = (Role as any).ADMIN ?? (Role as any).SUPER_ADMIN;

      const user = await prisma.user.upsert({
        where: { email: adminEmail },
        update: {
          passwordHash,
          role: targetRole,
          isActive: true,
          updatedAt: new Date(),
        },
        create: {
          email: adminEmail,
          passwordHash,
          name: process.env.ADMIN_NAME?.trim() || "Administrator",
          role: targetRole,
          isActive: true,
          isVerified: true,
        },
      });

      console.log(`[Admin Startup] ✅ Admin account verified/provisioned in PostgreSQL: ${user.email} (Role: ${user.role}, ID: ${user.id})`);
    } catch (err: any) {
      console.warn("[Admin Startup] ⚠️ Admin provisioning notice:", err?.message || err);
    }
  } else {
    console.log("[Admin Startup] Set ADMIN_EMAIL and ADMIN_INITIAL_PASSWORD in Dokploy to auto-provision administrator.");
  }
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`[Uni Help Backend API] Server listening on http://0.0.0.0:${PORT}`);
  console.log(`[Uni Help Backend API] Healthcheck probe ready at http://0.0.0.0:${PORT}/api/health`);
  ensureAdminOnStartup().catch((err) => {
    console.warn("[Admin Startup] Background startup error:", err);
  });
});
