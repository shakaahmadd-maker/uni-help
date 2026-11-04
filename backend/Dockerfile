# Multi-stage Dockerfile for Uni Help Backend Node.js API
# Build Context: backend
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency specifications and Prisma schema
COPY package.json package-lock.json ./
COPY prisma ./prisma/

# Install all dependencies including devDependencies for build
RUN npm ci

# Copy application TypeScript source files
COPY tsconfig.json ./
COPY src ./src/

# Generate Prisma Client for PostgreSQL
RUN npx prisma generate

# Compile TypeScript to JavaScript (dist/index.js)
RUN npm run build

# Stage 2: Production Lean Runtime
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Install production dependencies only (includes prisma CLI for runtime migrations)
COPY package.json package-lock.json ./
COPY prisma ./prisma/
COPY start.sh ./start.sh
COPY entrypoint.sh ./entrypoint.sh

RUN npm ci --omit=dev
RUN npx prisma generate

# Sanitize Unix LF line endings and ensure executable permissions
RUN tr -d '\r' < ./start.sh > ./start.sh.tmp && mv ./start.sh.tmp ./start.sh && chmod +x ./start.sh
RUN tr -d '\r' < ./entrypoint.sh > ./entrypoint.sh.tmp && mv ./entrypoint.sh.tmp ./entrypoint.sh && chmod +x ./entrypoint.sh

# Copy compiled JavaScript output from builder stage
COPY --from=builder /app/dist ./dist

# Ensure node user owns the application files
RUN chown -R node:node /app

# Non-root user for security
USER node

EXPOSE 3000

# 15s start-period ensures container has time to deploy migrations before health check begins
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/api/health || exit 1

ENTRYPOINT ["./entrypoint.sh"]
CMD ["npm", "start"]
