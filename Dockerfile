# ==========================================
# Stage 1: Build static assets
# ==========================================

FROM node:20-alpine AS build

WORKDIR /app

# Copy only package files for cache
COPY package*.json ./

RUN npm ci

# Copy entire project
COPY . .

# Build arguments
ARG VITE_API_URL=/
ENV VITE_API_URL=$VITE_API_URL

# Build output → dist/
RUN npm run build

# ==========================================
# Stage 2: Serve with Nginx
# ==========================================

FROM nginx:alpine AS runner

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
