import { Router, Request, Response } from "express";
import { prisma } from "../db.js";

const router = Router();

// GET /api/health
router.get("/", async (req: Request, res: Response) => {
  try {
    // Verify PostgreSQL connection
    await prisma.$queryRaw`SELECT 1`;
    return res.json({
      status: "ok",
      database: "connected",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return res.status(503).json({
      status: "error",
      database: "disconnected",
      message: "Database ping failed",
      timestamp: new Date().toISOString(),
    });
  }
});

export default router;
