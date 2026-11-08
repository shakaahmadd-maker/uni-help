# Multi-stage Dockerfile for Uni Help Frontend (React + Vite + Tailwind CSS)
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency specifications and install all dependencies for build
COPY package.json package-lock.json ./
RUN npm ci

# Copy application source code and compile production bundle into /app/dist
COPY . .
RUN npm run build

# Stage 2: Production Lean Node.js Runtime (No Nginx/Caddy required)
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy package definitions and install production dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy compiled dist bundle and vite config from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/vite.config.ts ./vite.config.ts

# Ensure files are owned by the node user
RUN chown -R node:node /app

USER node

# Dokploy target port
EXPOSE 3000

# Runs continuously in foreground, serving dist on 0.0.0.0:3000
CMD ["npm", "start"]
