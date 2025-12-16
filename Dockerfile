# ==========================================
# Multi-stage Dockerfile for Vite + React FE
# ==========================================

# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app

# Copy package.json / package-lock.json first for caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build argument for API URL
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL

# Build React app
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy built static assets
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
