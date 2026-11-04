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

# Install production dependencies (includes prisma for runtime migrations)
COPY package.json package-lock.json ./
COPY prisma ./prisma/
COPY start.sh ./start.sh
COPY entrypoint.sh ./entrypoint.sh

RUN npm ci --omit=dev
RUN npx prisma generate
RUN chmod +x ./start.sh ./entrypoint.sh

# Copy compiled JavaScript output from builder stage
COPY --from=builder /app/dist ./dist

# Non-root user for security
USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/api/health || exit 1

CMD ["./start.sh"]
