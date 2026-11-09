-- Migration: 20261109040000_create_success_stories_table
-- Safe, idempotent migration to create or migrate the public.success_stories table
-- and ensure Role enum and User table match the Prisma schema.

-- 1. Safely add 'ADMIN' to Role enum if not already present
ALTER TYPE "Role" ADD VALUE IF NOT EXISTS 'ADMIN';

-- 2. Safely add 'isVerified' column to User table if not already present
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "isVerified" BOOLEAN NOT NULL DEFAULT true;

-- 3. Safely migrate or create the success_stories table
DO $$
BEGIN
    -- Case A: Table "SuccessStory" exists from 0_init, but "success_stories" does not yet exist
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'SuccessStory'
    ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'success_stories'
    ) THEN
        -- Rename table to match @@map("success_stories")
        ALTER TABLE "SuccessStory" RENAME TO "success_stories";

        -- Rename camelCase columns to snake_case to match @map(...) in schema.prisma
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'success_stories' AND column_name = 'legacyId') THEN
            ALTER TABLE "success_stories" RENAME COLUMN "legacyId" TO "legacy_id";
        END IF;

        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'success_stories' AND column_name = 'maskedName') THEN
            ALTER TABLE "success_stories" RENAME COLUMN "maskedName" TO "masked_name";
        END IF;

        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'success_stories' AND column_name = 'clientPic') THEN
            ALTER TABLE "success_stories" RENAME COLUMN "clientPic" TO "client_pic";
        END IF;

        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'success_stories' AND column_name = 'visaStamp') THEN
            ALTER TABLE "success_stories" RENAME COLUMN "visaStamp" TO "visa_stamp";
        END IF;

        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'success_stories' AND column_name = 'stampId') THEN
            ALTER TABLE "success_stories" RENAME COLUMN "stampId" TO "stamp_id";
        END IF;

        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'success_stories' AND column_name = 'visaGrantDate') THEN
            ALTER TABLE "success_stories" RENAME COLUMN "visaGrantDate" TO "visa_grant_date";
        END IF;

        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'success_stories' AND column_name = 'isPublished') THEN
            ALTER TABLE "success_stories" RENAME COLUMN "isPublished" TO "is_published";
        END IF;

        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'success_stories' AND column_name = 'displayOrder') THEN
            ALTER TABLE "success_stories" RENAME COLUMN "displayOrder" TO "display_order";
        END IF;

        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'success_stories' AND column_name = 'createdAt') THEN
            ALTER TABLE "success_stories" RENAME COLUMN "createdAt" TO "created_at";
        END IF;

        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'success_stories' AND column_name = 'updatedAt') THEN
            ALTER TABLE "success_stories" RENAME COLUMN "updatedAt" TO "updated_at";
        END IF;

    -- Case B: Neither "SuccessStory" nor "success_stories" exists (create fresh)
    ELSIF NOT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'success_stories'
    ) THEN
        CREATE TABLE "success_stories" (
            "id" TEXT NOT NULL,
            "legacy_id" TEXT,
            "name" TEXT NOT NULL,
            "masked_name" TEXT,
            "city" TEXT NOT NULL,
            "stream" TEXT NOT NULL,
            "review" TEXT NOT NULL,
            "rating" INTEGER NOT NULL DEFAULT 5,
            "client_pic" TEXT,
            "visa_stamp" TEXT,
            "stamp_id" TEXT,
            "visa_grant_date" TEXT,
            "is_published" BOOLEAN NOT NULL DEFAULT true,
            "display_order" INTEGER NOT NULL DEFAULT 0,
            "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

            CONSTRAINT "success_stories_pkey" PRIMARY KEY ("id")
        );
    END IF;
END $$;

-- 4. Ensure all indexes and constraints exist matching schema.prisma
CREATE UNIQUE INDEX IF NOT EXISTS "success_stories_legacy_id_key" ON "success_stories"("legacy_id");
CREATE INDEX IF NOT EXISTS "success_stories_city_idx" ON "success_stories"("city");
CREATE INDEX IF NOT EXISTS "success_stories_is_published_idx" ON "success_stories"("is_published");
CREATE INDEX IF NOT EXISTS "success_stories_created_at_idx" ON "success_stories"("created_at");
