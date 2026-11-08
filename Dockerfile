# Multi-stage Dockerfile for Uni Help Frontend (React + Vite + Tailwind CSS)
# Stage 1: Build the static production bundle
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package specifications and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy project source files and compile Vite SPA
COPY . .
RUN npm run build

# Stage 2: Production Web Server with Nginx
FROM nginx:alpine

# Copy custom Nginx configuration (dual-listen on 80 & 3000 with SPA routing fallback)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose both 80 and 3000 to eliminate Dokploy container port configuration mismatches
EXPOSE 80 3000

# Health check to ensure Nginx is actively serving index.html
HEALTHCHECK --interval=20s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:80/ || wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
