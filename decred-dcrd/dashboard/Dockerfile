FROM node:18-bullseye-slim AS builder

WORKDIR /app

# Install system dependencies needed for native module compilation (e.g., shadcn/bcrypt)
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy source files (including package.json, server.js, etc.)
COPY . .

# Install dependencies
RUN npm ci

# Build the Vite/React app (outputs to /app/dist)
RUN npm run build

# Production stage - use same base image for compatibility
FROM node:18-bullseye-slim

WORKDIR /app

# Copy built files from the builder stage
# CRITICAL FIX: Targets 'dist' and sets destination to 'dist' (matches server.js)
COPY --from=builder /app/dist ./dist

# Copy the server script
COPY server.js ./

# Install only the production dependencies needed for the server (e.g., express)
RUN npm install express

EXPOSE 3000

CMD ["node", "server.js"]
