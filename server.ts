import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import storiesRouter from "./backend/src/routes/stories";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT || 3000);
const DATA_DIR = path.join(__dirname, "data");
const STORIES_FILE = path.join(DATA_DIR, "stories.json");
const SUBMISSIONS_FILE = path.join(DATA_DIR, "submissions.json");
const CREDENTIALS_FILE = path.join(DATA_DIR, "credentials.json");

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helper functions for JSON database read/write
function readJsonFile<T>(filePath: string, fallback: T): T {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2), "utf-8");
      return fallback;
    }
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data) as T;
  } catch (err) {
    console.warn(`[Storage] Error reading ${filePath}, using fallback:`, err);
    return fallback;
  }
}

function writeJsonFile<T>(filePath: string, data: T): void {
  try {
    const tempFile = `${filePath}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), "utf-8");
    fs.renameSync(tempFile, filePath);
  } catch (err) {
    console.error(`[Storage] Error writing ${filePath}:`, err);
    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    } catch (_fallbackErr) {}
  }
}

// Enable 50MB payload parsing for Base64 visa stamp and student portrait uploads
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// CORS configuration
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// ==========================================
// API ROUTES: SUCCESS STORIES (DOKPLOY POSTGRESQL + STORAGE)
// ==========================================
app.use("/api/stories", storiesRouter);

// ==========================================
// API ROUTES: HEALTH CHECK
// ==========================================
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    service: "Uni Help Full-Stack API",
    port: PORT,
    timestamp: new Date().toISOString(),
  });
});

// ==========================================
// API ROUTES: SUBMISSIONS / INQUIRIES
// ==========================================
app.get("/api/submissions", (_req: Request, res: Response) => {
  const submissions = readJsonFile<any[]>(SUBMISSIONS_FILE, []);
  res.json({
    success: true,
    data: {
      items: submissions,
      pagination: {
        total: submissions.length,
        page: 1,
        limit: 100,
        totalPages: 1,
      },
    },
  });
});

app.post("/api/submissions", (req: Request, res: Response) => {
  const submissions = readJsonFile<any[]>(SUBMISSIONS_FILE, []);
  const newSub = {
    id: `sub-${Date.now()}`,
    ...req.body,
    status: req.body.status || "NEW",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  submissions.unshift(newSub);
  writeJsonFile(SUBMISSIONS_FILE, submissions);
  res.status(201).json({
    success: true,
    data: newSub,
  });
});

app.patch("/api/submissions/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const submissions = readJsonFile<any[]>(SUBMISSIONS_FILE, []);
  const index = submissions.findIndex((s) => s.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, error: { message: "Submission not found" } });
  }
  submissions[index] = { ...submissions[index], ...req.body, updatedAt: new Date().toISOString() };
  writeJsonFile(SUBMISSIONS_FILE, submissions);
  res.json({ success: true, data: submissions[index] });
});

app.delete("/api/submissions/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const submissions = readJsonFile<any[]>(SUBMISSIONS_FILE, []);
  const filtered = submissions.filter((s) => s.id !== id);
  writeJsonFile(SUBMISSIONS_FILE, filtered);
  res.json({ success: true, data: { message: "Submission deleted" } });
});

// ==========================================
// API ROUTES: AUTH / ADMIN CREDENTIALS
// ==========================================
app.get("/api/auth/me", (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      id: "admin-super",
      email: "admin@unihelp.com",
      role: "SUPER_ADMIN",
      name: "Admin Team",
    },
  });
});

app.post("/api/auth/login", (req: Request, res: Response) => {
  const { email } = req.body || {};
  res.json({
    success: true,
    data: {
      token: "unihelp_jwt_valid_session_token",
      user: {
        id: "admin-super",
        email: email || "admin@unihelp.com",
        role: "SUPER_ADMIN",
      },
    },
  });
});

app.get("/api/admin/credentials", (_req: Request, res: Response) => {
  const defaultCreds = [
    { email: "admin@unihelp.com", role: "Super Admin", createdAt: new Date().toISOString() },
    { email: "shaka.ahmadd@gmail.com", role: "Super Admin", createdAt: new Date().toISOString() },
  ];
  const creds = readJsonFile<any[]>(CREDENTIALS_FILE, defaultCreds);
  res.json({ success: true, data: creds });
});

app.post("/api/admin/credentials", (req: Request, res: Response) => {
  const creds = readJsonFile<any[]>(CREDENTIALS_FILE, []);
  creds.push({
    ...req.body,
    createdAt: new Date().toISOString(),
  });
  writeJsonFile(CREDENTIALS_FILE, creds);
  res.status(201).json({ success: true, data: req.body });
});

// ==========================================
// VITE SPA MIDDLEWARE / PRODUCTION STATIC SERVING
// ==========================================
async function startServer() {
  const isProd = process.env.NODE_ENV === "production";

  if (!isProd) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true, host: "0.0.0.0" },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Uni Help Full-Stack Server] Server listening on http://0.0.0.0:${PORT}`);
    console.log(`[Uni Help Full-Stack Server] Stories API active at http://0.0.0.0:${PORT}/api/stories`);
  });
}

startServer().catch((err) => {
  console.error("[Uni Help Server] Failed to start:", err);
  process.exit(1);
});
