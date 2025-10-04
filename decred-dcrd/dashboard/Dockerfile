# Multi-stage build for Umbrel deployment
# Stage 1: Build the application
FROM node:18-alpine AS builder

# Install build tools needed for many node packages with native dependencies (like cryptography)
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (npm ci ensures dependencies are installed exactly as per package-lock.json)
RUN npm ci

# Copy source code
COPY . .

# Build the application (Vite default output is 'dist')
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy built files from builder stage
# /app/dist is the default output for 'vite build'
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (standard for Umbrel app dashboards)
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
