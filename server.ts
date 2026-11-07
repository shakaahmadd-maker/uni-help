import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

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
// API ROUTES: SUCCESS STORIES (PUBLIC & UNRESTRICTED)
// ==========================================

// GET /api/stories - Return all live success stories
app.get("/api/stories", (_req: Request, res: Response) => {
  const stories = readJsonFile<any[]>(STORIES_FILE, []);
  res.json({
    success: true,
    data: stories,
  });
});

// POST /api/stories - Upload/publish new success story
app.post("/api/stories", (req: Request, res: Response) => {
  try {
    const stories = readJsonFile<any[]>(STORIES_FILE, []);
    const body = req.body || {};

    const targetId = body.id || `story-${Date.now()}`;
    const newStory = {
      id: targetId,
      legacyId: body.legacyId || body.id || null,
      name: body.name || "Anonymous Student",
      city: body.city || "Global Destination",
      stream: body.stream || "Academic Degree",
      review: body.review || "",
      rating: typeof body.rating === "number" ? body.rating : 5,
      clientPic: body.clientPic || "",
      visaStamp: body.visaStamp || "",
      maskedName: body.maskedName || `${(body.name || "Student").charAt(0)}***`,
      stampId: body.stampId || `STAMP-${Math.floor(100 + Math.random() * 900)}`,
      visaGrantDate: body.visaGrantDate || "",
      isPublished: true,
      createdAt: body.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // If story with this ID already exists, update it; otherwise prepend to the beginning
    const existingIndex = stories.findIndex((s) => s.id === targetId || (body.legacyId && s.id === body.legacyId));
    if (existingIndex !== -1) {
      stories[existingIndex] = { ...stories[existingIndex], ...newStory };
    } else {
      stories.unshift(newStory);
    }

    writeJsonFile(STORIES_FILE, stories);

    console.log(`[Uni Help API] Live story published: "${newStory.name}" (${newStory.id})`);
    res.status(201).json({
      success: true,
      data: newStory,
    });
  } catch (err: any) {
    console.error("[Uni Help API] Story creation failed:", err);
    res.status(500).json({
      success: false,
      error: { code: "CREATE_FAILED", message: err.message || "Failed to create story" },
    });
  }
});

// PUT /api/stories/:id - Update existing success story
app.put("/api/stories/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const stories = readJsonFile<any[]>(STORIES_FILE, []);
    const index = stories.findIndex((s) => s.id === id || s.legacyId === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        error: { code: "NOT_FOUND", message: "Success story not found" },
      });
    }

    const updated = {
      ...stories[index],
      ...req.body,
      id: stories[index].id,
      updatedAt: new Date().toISOString(),
    };

    stories[index] = updated;
    writeJsonFile(STORIES_FILE, stories);

    console.log(`[Uni Help API] Live story updated: "${updated.name}" (${updated.id})`);
    res.json({
      success: true,
      data: updated,
    });
  } catch (err: any) {
    console.error("[Uni Help API] Story update failed:", err);
    res.status(500).json({
      success: false,
      error: { code: "UPDATE_FAILED", message: err.message || "Failed to update story" },
    });
  }
});

// DELETE /api/stories/:id - Delete success story
app.delete("/api/stories/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const stories = readJsonFile<any[]>(STORIES_FILE, []);
    const filtered = stories.filter((s) => s.id !== id && s.legacyId !== id);

    writeJsonFile(STORIES_FILE, filtered);
    console.log(`[Uni Help API] Live story deleted: ${id}`);

    res.json({
      success: true,
      data: { message: "Success story deleted successfully" },
    });
  } catch (err: any) {
    console.error("[Uni Help API] Story deletion failed:", err);
    res.status(500).json({
      success: false,
      error: { code: "DELETE_FAILED", message: err.message || "Failed to delete story" },
    });
  }
});

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
