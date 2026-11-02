# Multi-stage Dockerfile for Uni Help Frontend (React + Vite + Tailwind CSS)
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency specifications
COPY package.json package-lock.json ./
RUN npm ci

# Copy source files and build production static bundle
COPY . .
RUN npm run build

# Stage 2: Production Nginx Server
FROM nginx:alpine

# Copy custom Nginx configuration with dual-port listening (80 and 3000) and SPA fallback routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose both 80 and 3000 to prevent port configuration mismatches in Dokploy
EXPOSE 80 3000

CMD ["nginx", "-g", "daemon off;"]
