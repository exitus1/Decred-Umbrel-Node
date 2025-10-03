FROM node:18-bullseye-slim

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy all source files including configs
COPY . .

# Build the React app
RUN npm run build

# Production stage - can stay Alpine since it's just serving static files
FROM node:18-alpine

WORKDIR /app

# Copy built files
COPY --from=builder /app/dist ./dis

# Copy server
COPY server.js ./

# Install production dependencies
RUN npm install express

EXPOSE 3000

CMD ["node", "server.js"]
