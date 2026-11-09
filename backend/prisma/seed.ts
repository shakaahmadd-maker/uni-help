import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const INITIAL_STORIES = [
  {
    legacyId: "story-1794042096342",
    name: "Ahmad Khan",
    maskedName: "A*** K***",
    city: "United Kingdom",
    stream: "Master of Business Administration",
    review: "Uni Help made my UK student visa process seamless from admission to visa stamping! Highly recommended.",
    rating: 5,
    clientPic: "",
    visaStamp: "",
    stampId: "STAMP-973",
    visaGrantDate: "November 2026",
    isPublished: true,
    displayOrder: 0
  },
  {
    legacyId: "mock-1",
    name: "Fazal Wadood",
    maskedName: "F***L W****D",
    city: "Germany",
    stream: "Master's in Computer Science",
    review: "Big Congratulations to Fazal Wadood! We are thrilled to announce that Fazal has successfully secured admission for a Master's in Computer Sciences at a top German public university and obtained his German student visa DE! At @unihelp, we specialize in turning study abroad dreams into reality by guiding students through admissions, documentation & visa success.",
    rating: 5,
    clientPic: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=300&fit=crop",
    visaStamp: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&h=400&fit=crop",
    stampId: "DE-STAMP-782",
    visaGrantDate: "May 12, 2026",
    isPublished: true,
    displayOrder: 1
  },
  {
    legacyId: "mock-2",
    name: "Amara Cole",
    maskedName: "A***A C**E",
    city: "United Kingdom",
    stream: "Bachelor's of Business",
    review: "Big Congratulations to Amara Cole! Amara has successfully obtained her UK Student Visa tier-4 to study Business Management in London! The immigration process was smooth, requiring thorough checklist compilation and proof of financial records. At @unihelp, our admissions desk simplifies study visa guidelines. Ready to take your career global?",
    rating: 5,
    clientPic: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop",
    visaStamp: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=500&h=400&fit=crop",
    stampId: "UK-STAMP-491",
    visaGrantDate: "April 28, 2026",
    isPublished: true,
    displayOrder: 2
  },
  {
    legacyId: "mock-3",
    name: "Sarah Chen",
    maskedName: "S***H C**N",
    city: "Australia",
    stream: "Master's of Data Science",
    review: "Outstanding admissions success! Sarah Chen has successfully secured her Australia Subclass 500 visa to attend high-ranking Melbourne University! The complex GTE assessment was completed cleanly within 18 days under expert counselling supervision at @unihelp. Truly a hallmark of student ambition & matching strategies!",
    rating: 5,
    clientPic: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop",
    visaStamp: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=500&h=400&fit=crop",
    stampId: "AU-STAMP-320",
    visaGrantDate: "June 02, 2026",
    isPublished: true,
    displayOrder: 3
  },
  {
    legacyId: "mock-4",
    name: "Marcus Miller",
    maskedName: "M***S M****R",
    city: "Canada",
    stream: "PR & Residency Study Permit",
    review: "Massive Congratulations to Marcus! He has secured his Canada Study Permit approval for University of British Columbia! Marcus was assisted through strict document collection protocols and statement of purpose formatting. A verified victory for the engineering streams!",
    rating: 5,
    clientPic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    visaStamp: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=500&h=400&fit=crop",
    stampId: "CA-STAMP-185",
    visaGrantDate: "May 19, 2026",
    isPublished: true,
    displayOrder: 4
  },
  {
    legacyId: "mock-5",
    name: "Elena Rostova",
    maskedName: "E***A R*****A",
    city: "United States",
    stream: "Master's of Biotechnology",
    review: "Incredible news! Elena Rostova has successfully obtained her US F-1 Academic Visa for study in Biotechnology streams! She secured full research scholarship waiver clearances with our elite profile matching strategies at @unihelp. Ready to realize your Ivy League dreams?",
    rating: 5,
    clientPic: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop",
    visaStamp: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&h=400&fit=crop",
    stampId: "US-STAMP-612",
    visaGrantDate: "June 10, 2026",
    isPublished: true,
    displayOrder: 5
  }
];

async function main() {
  console.log("Seeding PostgreSQL database...");

  // 1. Seed Administrator if runtime environment variables are provided
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase().trim();
  const adminPassword = process.env.ADMIN_INITIAL_PASSWORD;

  if (adminEmail && adminPassword && adminPassword.length >= 8) {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    const targetRole = ("ADMIN" in Role) ? (Role as any).ADMIN : Role.SUPER_ADMIN;

    const adminUser = await prisma.user.upsert({
      where: { email: adminEmail },
      update: {
        passwordHash,
        role: targetRole,
        isActive: true,
      },
      create: {
        email: adminEmail,
        name: process.env.ADMIN_NAME?.trim() || "Administrator",
        role: targetRole,
        passwordHash,
        isActive: true,
      },
    });
    console.log(`[Seed] Administrator account provisioned: ${adminUser.email} (Role: ${adminUser.role})`);
  } else {
    console.log("[Seed] Skipping admin auto-seed (ADMIN_EMAIL or ADMIN_INITIAL_PASSWORD not configured). Use 'npm run db:seed:admin' to configure.");
  }

  // 2. Seed Initial Success Stories
  for (const story of INITIAL_STORIES) {
    const existingStory = await prisma.successStory.findUnique({
      where: { legacyId: story.legacyId },
    });

    if (!existingStory) {
      await prisma.successStory.create({
        data: story,
      });
      console.log(`Created success story: ${story.name} (${story.city})`);
    }
  }

  console.log("Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during database seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
