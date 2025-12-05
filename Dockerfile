# ==========================================
# Multi-stage Dockerfile for Vite React frontend
# ==========================================

# Stage 1: Build static assets
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files first for caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build argument for API URL (override at build time if needed)
ARG VITE_API_URL=/
ENV VITE_API_URL=$VITE_API_URL

# Build the app (outputs to dist/)
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine AS runner

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]