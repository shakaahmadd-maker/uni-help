#!/bin/sh
set -e

echo "[Uni Help Backend] Running production startup sequence..."

# 1. Generate Prisma Client
echo "[Uni Help Backend] Step 1/3: npx prisma generate"
npx prisma generate

# 2. Deploy database migrations to PostgreSQL
echo "[Uni Help Backend] Step 2/3: npx prisma migrate deploy"
npx prisma migrate deploy

# 3. Start Node.js API server
echo "[Uni Help Backend] Step 3/3: npm start"
exec npm start
