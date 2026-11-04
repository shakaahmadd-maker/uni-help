import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { PrismaClient, Role, SubmissionStatus } from "@prisma/client";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

// Load Firebase Config
let firebaseConfig: any = {
  projectId: "eduwrites-b3174",
  appId: "1:757556385047:web:365b5c0c70f8bda7e69352",
  apiKey: "AIzaSyByZnFeilOF4qkn7DK4MyvXrL6xEYG1gkQ",
  authDomain: "eduwrites-b3174.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-9fc7c4f3-ca8e-429f-a7a7-672093411d33",
  storageBucket: "eduwrites-b3174.firebasestorage.app",
};

// If custom config exists in root or backend, load it
const rootConfigPath = path.resolve(process.cwd(), "../firebase-applet-config.json");
const localConfigPath = path.resolve(process.cwd(), "firebase-applet-config.json");

if (fs.existsSync(localConfigPath)) {
  try {
    firebaseConfig = JSON.parse(fs.readFileSync(localConfigPath, "utf-8"));
  } catch (_e) {}
} else if (fs.existsSync(rootConfigPath)) {
  try {
    firebaseConfig = JSON.parse(fs.readFileSync(rootConfigPath, "utf-8"));
  } catch (_e) {}
}

const isDryRun = process.argv.includes("--dry-run");
const prisma = new PrismaClient();

async function runDirectSync() {
  console.log("=================================================");
  console.log("🚀 Starting Uni Help Direct Firebase to Dokploy SQL Sync");
  console.log(`Target PostgreSQL: ${process.env.DATABASE_URL ? "Configured" : "Missing DATABASE_URL!"}`);
  console.log(`Firebase Project: ${firebaseConfig.projectId}`);
  console.log(`Firestore DB ID: ${firebaseConfig.firestoreDatabaseId || "(default)"}`);
  console.log(`Mode: ${isDryRun ? "DRY-RUN (Preview only, no writes)" : "LIVE SYNC"}`);
  console.log("=================================================\n");

  const app = initializeApp(firebaseConfig, "sync-runner-" + Date.now());
  const db = firebaseConfig.firestoreDatabaseId
    ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
    : getFirestore(app);

  // 1. Sync Submissions
  console.log("📥 [1/3] Syncing Submissions from Firestore collection 'submissions'...");
  let subCount = 0;
  let subSkipped = 0;
  let subImported = 0;

  try {
    const submissionsSnap = await getDocs(collection(db, "submissions"));
    subCount = submissionsSnap.docs.length;
    console.log(`Found ${subCount} submission documents in Firestore.`);

    for (const doc of submissionsSnap.docs) {
      const data = doc.data();
      const legacyId = doc.id;

      // Check if already in PostgreSQL
      const existing = await prisma.submission.findUnique({
        where: { legacyId },
      });

      if (existing) {
        subSkipped++;
        continue;
      }

      let status = SubmissionStatus.NEW;
      if (data.status === "CONTACTED") status = SubmissionStatus.CONTACTED;
      if (data.status === "RESOLVED") status = SubmissionStatus.RESOLVED;
      if (data.status === "DELETED") status = SubmissionStatus.DELETED;

      let createdAt = new Date();
      if (data.createdAt) {
        if (typeof data.createdAt === "string") createdAt = new Date(data.createdAt);
        else if (data.createdAt.toDate) createdAt = data.createdAt.toDate();
        else if (data.createdAt._seconds) createdAt = new Date(data.createdAt._seconds * 1000);
      }

      if (!isDryRun) {
        await prisma.submission.create({
          data: {
            legacyId,
            name: data.name || "Anonymous Inquirer",
            email: (data.email || "no-email@unihelp.com").toLowerCase().trim(),
            phone: data.phone || "",
            city: data.city || "",
            service: data.service || "General Academic Query",
            message: data.message || "",
            status,
            notes: data.notes || "",
            createdAt,
          },
        });
      }
      subImported++;
    }
    console.log(`✅ Submissions done: ${subImported} imported, ${subSkipped} already existed in PostgreSQL.`);
  } catch (err: any) {
    console.warn(`⚠️ Could not query live submissions from Firestore: ${err.message}`);
    console.log(`ℹ️ Tip: If live Firestore access is restricted, use 'npm run migrate:firebase' with exported JSON.`);
  }

  // 2. Sync Success Stories
  console.log("\n📥 [2/3] Syncing Stories from Firestore collection 'success_stories'...");
  let storyCount = 0;
  let storySkipped = 0;
  let storyImported = 0;

  try {
    const storiesSnap = await getDocs(collection(db, "success_stories"));
    storyCount = storiesSnap.docs.length;
    console.log(`Found ${storyCount} story documents in Firestore.`);

    for (const doc of storiesSnap.docs) {
      const data = doc.data();
      const legacyId = doc.id;

      const existing = await prisma.successStory.findUnique({
        where: { legacyId },
      });

      if (existing) {
        storySkipped++;
        continue;
      }

      if (!isDryRun) {
        await prisma.successStory.create({
          data: {
            legacyId,
            name: data.name || "Alumni Success",
            maskedName: data.maskedName || "",
            city: data.city || "Global",
            stream: data.stream || "Higher Education",
            review: data.review || "Excellent counseling service.",
            rating: typeof data.rating === "number" ? data.rating : 5,
            clientPic: data.clientPic || "",
            visaStamp: data.visaStamp || "",
            stampId: data.stampId || "",
            visaGrantDate: data.visaGrantDate || "",
            isPublished: data.isPublished !== false,
          },
        });
      }
      storyImported++;
    }
    console.log(`✅ Stories done: ${storyImported} imported, ${storySkipped} already existed in PostgreSQL.`);
  } catch (err: any) {
    console.warn(`⚠️ Could not query live stories from Firestore: ${err.message}`);
  }

  // 3. Sync Admin Credentials
  console.log("\n📥 [3/3] Syncing Admin Credentials from Firestore collection 'admin_credentials'...");
  let adminImported = 0;
  let adminSkipped = 0;

  try {
    const adminsSnap = await getDocs(collection(db, "admin_credentials"));
    for (const doc of adminsSnap.docs) {
      const data = doc.data();
      if (!data.email) continue;
      const email = data.email.toLowerCase().trim();

      const existing = await prisma.user.findUnique({
        where: { email },
      });

      if (existing) {
        adminSkipped++;
        continue;
      }

      let role = Role.ADMISSIONS_COACH;
      const r = (data.role || "").toUpperCase();
      if (r.includes("SUPER")) role = Role.SUPER_ADMIN;
      else if (r.includes("VISA")) role = Role.VISA_SPECIALIST;
      else if (r.includes("OPERATIONS")) role = Role.OPERATIONS_LEAD;
      else if (r.includes("COUNSELOR")) role = Role.COUNSELOR;

      const rawPass = data.password || "admin123";
      const passwordHash = await bcrypt.hash(rawPass, 10);

      if (!isDryRun) {
        await prisma.user.create({
          data: {
            email,
            passwordHash,
            name: data.name || email.split("@")[0],
            role,
            isActive: true,
          },
        });
      }
      adminImported++;
    }
    console.log(`✅ Admins done: ${adminImported} imported, ${adminSkipped} already existed.`);
  } catch (err: any) {
    console.warn(`⚠️ Could not query live admin credentials from Firestore: ${err.message}`);
  }

  console.log("\n=================================================");
  console.log("🎉 Direct Sync Complete!");
  console.log(`Total New Records Synced to PostgreSQL: ${subImported + storyImported + adminImported}`);
  console.log("=================================================");
}

runDirectSync()
  .catch((err) => {
    console.error("Fatal sync error:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
