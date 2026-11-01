import { Router, Request, Response } from "express";
import { prisma } from "../db.js";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    // Ping PostgreSQL
    await prisma.$queryRaw`SELECT 1`;
    return res.json({
      success: true,
      data: {
        status: "healthy",
        database: "connected",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    return res.status(503).json({
      success: false,
      error: {
        code: "DATABASE_UNAVAILABLE",
        message: "Database connection failed",
        timestamp: new Date().toISOString(),
      },
    });
  }
});

export default router;
