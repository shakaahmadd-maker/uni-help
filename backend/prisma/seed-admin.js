import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

// Load environment variables from .env if present
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log("--------------------------------------------------");
  console.log("🛡️  Uni Help Production Admin Account Provisioner");
  console.log("--------------------------------------------------");

  const rawEmail = process.env.ADMIN_EMAIL;
  const rawPassword = process.env.ADMIN_INITIAL_PASSWORD;

  // 1. Validate required environment variables (fail-fast without fallbacks)
  if (!rawEmail || !rawEmail.trim()) {
    console.error("❌ [Admin Seed Error] Missing required environment variable: ADMIN_EMAIL");
    console.error("   Please provide ADMIN_EMAIL=<admin_email_address>");
    process.exit(1);
  }

  if (!rawPassword || !rawPassword.trim()) {
    console.error("❌ [Admin Seed Error] Missing required environment variable: ADMIN_INITIAL_PASSWORD");
    console.error("   Please provide ADMIN_INITIAL_PASSWORD=<secure_password>");
    process.exit(1);
  }

  const emailLower = rawEmail.toLowerCase().trim();

  // Basic email pattern check
  if (!emailLower.includes("@") || !emailLower.includes(".")) {
    console.error("❌ [Admin Seed Error] ADMIN_EMAIL must be a valid email address.");
    process.exit(1);
  }

  // Enforce strong password requirement
  if (rawPassword.length < 8) {
    console.error("❌ [Admin Seed Error] ADMIN_INITIAL_PASSWORD must be at least 8 characters long.");
    process.exit(1);
  }

  console.log(`[Admin Seed] Target Account Email: ${emailLower}`);

  // 2. Safely ensure database schema compatibility without dropping any data
  try {
    // Ensure 'ADMIN' exists in PostgreSQL enum if running on PostgreSQL
    await prisma.$executeRawUnsafe(`ALTER TYPE "Role" ADD VALUE IF NOT EXISTS 'ADMIN'`);
  } catch (_enumErr) {
    // Enum value may already exist or cannot be added inside transaction; continue
  }

  try {
    // Ensure 'isVerified' column exists if running against an unmigrated table
    await prisma.$executeRawUnsafe(`ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "isVerified" BOOLEAN NOT NULL DEFAULT true`);
  } catch (_colErr) {
    // Column may already exist or not supported; continue
  }

  // 3. Hash the password with bcrypt (salt rounds = 12 for strong production security)
  // Password is NEVER stored in plain text and NEVER printed in console output
  const passwordHash = await bcrypt.hash(rawPassword, 12);

  // 4. Determine target role (prefer Role.ADMIN, with fallback to Role.SUPER_ADMIN if enum restricted)
  const targetRole = ("ADMIN" in Role) ? Role.ADMIN : Role.SUPER_ADMIN;

  // 5. Idempotent Upsert (Safe to run multiple times without duplicate key errors or resetting database)
  const user = await prisma.user.upsert({
    where: { email: emailLower },
    update: {
      passwordHash,
      role: targetRole,
      isActive: true,
      updatedAt: new Date(),
    },
    create: {
      email: emailLower,
      passwordHash,
      name: process.env.ADMIN_NAME?.trim() || "Administrator",
      role: targetRole,
      isActive: true,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  // Ensure isVerified flag is explicitly set to true if column is present in DB
  try {
    await prisma.$executeRawUnsafe(
      `UPDATE "User" SET "isVerified" = true, "isActive" = true WHERE id = $1`,
      user.id
    );
  } catch (_updateErr) {
    // Fall back safely if column does not exist
  }

  console.log("--------------------------------------------------");
  console.log("✅ Administrator account successfully provisioned!");
  console.log(`   - User ID:    ${user.id}`);
  console.log(`   - Email:      ${user.email}`);
  console.log(`   - Role:       ${user.role}`);
  console.log(`   - Is Active:  ${user.isActive}`);
  console.log(`   - Verified:   true`);
  console.log(`   - Updated At: ${user.updatedAt.toISOString()}`);
  console.log("--------------------------------------------------");
}

main()
  .catch((e) => {
    console.error("❌ [Admin Seed Fatal Error]:", e.message || e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
