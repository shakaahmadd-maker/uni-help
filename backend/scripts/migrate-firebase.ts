import fs from "fs";
import path from "path";
import { PrismaClient, Role, SubmissionStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const isDryRun = process.argv.includes("--dry-run");

interface FirebaseSubmissionExport {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  service?: string;
  message?: string;
  status?: string;
  notes?: string;
  createdAt?: any;
}

interface FirebaseStoryExport {
  id?: string;
  name?: string;
  city?: string;
  stream?: string;
  review?: string;
  rating?: number;
  clientPic?: string;
  visaStamp?: string;
  maskedName?: string;
  stampId?: string;
  visaGrantDate?: string;
}

async function migrateSubmissions() {
  const filePath = path.resolve(process.cwd(), "data-exports/submissions.json");
  if (!fs.existsSync(filePath)) {
    console.log(`[Submissions] No data-exports/submissions.json found. Skipping.`);
    return;
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const data: FirebaseSubmissionExport[] = JSON.parse(raw);
  console.log(`[Submissions] Found ${data.length} records to process (Dry-run: ${isDryRun}).`);

  let imported = 0;
  let skipped = 0;

  for (const item of data) {
    if (!item.email || !item.name) {
      console.warn(`[Submissions] Skipping invalid record:`, item);
      continue;
    }

    const legacyId = item.id || undefined;
    if (legacyId) {
      const existing = await prisma.submission.findUnique({
        where: { legacyId },
      });
      if (existing) {
        skipped++;
        continue;
      }
    }

    let status = SubmissionStatus.NEW;
    if (item.status === "CONTACTED") status = SubmissionStatus.CONTACTED;
    if (item.status === "RESOLVED") status = SubmissionStatus.RESOLVED;
    if (item.status === "DELETED") status = SubmissionStatus.DELETED;

    let createdAt = new Date();
    if (item.createdAt) {
      if (typeof item.createdAt === "string") createdAt = new Date(item.createdAt);
      else if (item.createdAt._seconds) createdAt = new Date(item.createdAt._seconds * 1000);
    }

    if (!isDryRun) {
      await prisma.submission.create({
        data: {
          legacyId,
          name: item.name,
          email: item.email.toLowerCase().trim(),
          phone: item.phone || "",
          city: item.city || "",
          service: item.service || "General Academic Query",
          message: item.message || "",
          status,
          notes: item.notes || "",
          createdAt,
        },
      });
    }
    imported++;
  }

  console.log(`[Submissions] Finished: ${imported} imported, ${skipped} skipped.`);
}

async function migrateStories() {
  const filePath = path.resolve(process.cwd(), "data-exports/stories.json");
  if (!fs.existsSync(filePath)) {
    console.log(`[Stories] No data-exports/stories.json found. Skipping.`);
    return;
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const data: FirebaseStoryExport[] = JSON.parse(raw);
  console.log(`[Stories] Found ${data.length} records to process (Dry-run: ${isDryRun}).`);

  let imported = 0;
  let skipped = 0;

  for (const item of data) {
    if (!item.name || !item.review) continue;

    const legacyId = item.id || undefined;
    if (legacyId) {
      const existing = await prisma.successStory.findUnique({
        where: { legacyId },
      });
      if (existing) {
        skipped++;
        continue;
      }
    }

    if (!isDryRun) {
      await prisma.successStory.create({
        data: {
          legacyId,
          name: item.name,
          maskedName: item.maskedName || "",
          city: item.city || "Global",
          stream: item.stream || "Academic Degree",
          review: item.review,
          rating: item.rating || 5,
          clientPic: item.clientPic || "",
          visaStamp: item.visaStamp || "",
          stampId: item.stampId || "",
          visaGrantDate: item.visaGrantDate || "",
          isPublished: true,
        },
      });
    }
    imported++;
  }

  console.log(`[Stories] Finished: ${imported} imported, ${skipped} skipped.`);
}

async function migrateAdmins() {
  const filePath = path.resolve(process.cwd(), "data-exports/admins.json");
  if (!fs.existsSync(filePath)) {
    console.log(`[Admins] No data-exports/admins.json found. Skipping.`);
    return;
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const data: Array<{ email?: string; password?: string; name?: string; role?: string }> = JSON.parse(raw);
  console.log(`[Admins] Found ${data.length} records to process (Dry-run: ${isDryRun}).`);

  let imported = 0;
  let skipped = 0;

  for (const item of data) {
    if (!item.email) continue;
    const email = item.email.toLowerCase().trim();

    const existing = await prisma.user.findUnique({
      where: { email },
    });
    if (existing) {
      skipped++;
      continue;
    }

    let role = Role.ADMISSIONS_COACH;
    if (item.role?.toUpperCase().includes("SUPER")) role = Role.SUPER_ADMIN;
    else if (item.role?.toUpperCase().includes("VISA")) role = Role.VISA_SPECIALIST;
    else if (item.role?.toUpperCase().includes("OPERATIONS")) role = Role.OPERATIONS_LEAD;
    else if (item.role?.toUpperCase().includes("COUNSELOR")) role = Role.COUNSELOR;

    const rawPassword = item.password || process.env.ADMIN_INITIAL_PASSWORD || "ChangeMeSecurely123!";
    const passwordHash = await bcrypt.hash(rawPassword, 10);

    if (!isDryRun) {
      await prisma.user.create({
        data: {
          email,
          passwordHash,
          name: item.name || email.split("@")[0],
          role,
          isActive: true,
        },
      });
    }
    imported++;
  }

  console.log(`[Admins] Finished: ${imported} imported, ${skipped} skipped.`);
}

async function run() {
  console.log("=== Uni Help Firebase to PostgreSQL Migration Runner ===");
  if (isDryRun) {
    console.log(">>> DRY-RUN ACTIVE: No changes will be committed to PostgreSQL <<<");
  }
  await migrateSubmissions();
  await migrateStories();
  await migrateAdmins();
  console.log("=== Migration Complete ===");
}

run()
  .catch((err) => {
    console.error("Migration error:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
