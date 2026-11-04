#!/bin/sh
set -e

# Run Prisma database migrations if DATABASE_URL is available
if [ -n "$DATABASE_URL" ]; then
  echo "[Uni Help Backend] Deploying database migrations to PostgreSQL..."
  npx prisma migrate deploy
else
  echo "[Uni Help Backend] DATABASE_URL not set; skipping database migrations."
fi

# Execute the container command (defaults to npm start) in the foreground
echo "[Uni Help Backend] Starting API server..."
exec "$@"
