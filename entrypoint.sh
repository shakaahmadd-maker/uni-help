#!/bin/sh
set -e

# Run Prisma database migrations if DATABASE_URL is available
if [ -n "$DATABASE_URL" ]; then
  echo "[Uni Help Backend] Deploying database migrations to PostgreSQL..."
  npx prisma migrate deploy

  echo "[Uni Help Backend] Running administrator seed script..."
  npm run db:seed:admin --prefix backend || true

  echo "[Uni Help Backend] Seeding initial database records (success stories)..."
  npx prisma db seed --schema=backend/prisma/schema.prisma || true
else
  echo "[Uni Help Backend] DATABASE_URL not set; skipping database migrations."
fi

# Execute the container command (defaults to npm start) in the foreground
echo "[Uni Help Backend] Starting API server..."
exec "$@"
