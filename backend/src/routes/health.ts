import { Router, Request, Response } from "express";
import { prisma } from "../db.js";

const router = Router();

// GET /api/health
// Always returns HTTP 200 JSON so Docker / Traefik health checks never trigger a 502 Bad Gateway
router.get("/", async (req: Request, res: Response) => {
  try {
    // Check PostgreSQL connection
    await prisma.$queryRaw`SELECT 1`;
    return res.status(200).json({
      status: "ok",
      database: "connected",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.warn("[Health Probe] PostgreSQL ping failed:", error?.message || error);
    return res.status(200).json({
      status: "ok",
      database: "disconnected",
      warning: "API is online, but PostgreSQL is not reachable. Please check DATABASE_URL.",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  }
});

export default router;
