import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

import healthRouter from "./routes/health.js";
import authRouter from "./routes/auth.js";
import submissionsRouter from "./routes/submissions.js";
import storiesRouter from "./routes/stories.js";
import adminsRouter from "./routes/admins.js";

dotenv.config();

const app = express();
// Default internal port 3000 (isolated inside container network)
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

// Security headers
app.use(helmet());

// Cross-Origin Resource Sharing
app.use(
  cors({
    origin: CORS_ORIGIN === "*" ? true : CORS_ORIGIN.split(",").map((s) => s.trim()),
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "5mb" }));

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

app.listen(PORT, "0.0.0.0", () => {
  console.log(`[Uni Help Backend API] Server listening on http://0.0.0.0:${PORT}`);
  console.log(`[Uni Help Backend API] Healthcheck probe ready at http://0.0.0.0:${PORT}/api/health`);
});
