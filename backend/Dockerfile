# Multi-stage Dockerfile for Uni Help Backend Node.js API
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency specifications and Prisma schema
COPY package.json package-lock.json ./
COPY prisma ./prisma/
RUN npm ci

# Copy application source code and compile TypeScript
COPY . .
RUN npx prisma generate
RUN npm run build

# Stage 2: Production Lean Runtime
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Install production dependencies only
COPY package.json package-lock.json ./
COPY prisma ./prisma/
RUN npm ci --omit=dev
RUN npx prisma generate

# Copy compiled JavaScript output
COPY --from=builder /app/dist ./dist

# Non-root user for enhanced security
USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/api/health || exit 1

CMD ["npm", "start"]
