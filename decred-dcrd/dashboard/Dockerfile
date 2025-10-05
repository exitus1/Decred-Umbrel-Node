# Simplified dashboard build
FROM node:18-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci

# Copy source files
COPY . .

# Build the React app
RUN npm run build

# Clean up dev dependencies and install only production deps
RUN npm ci --only=production

# Create package.json for ES modules
RUN echo '{"type":"module"}' > package.json && npm install express

EXPOSE 3000

CMD ["node", "server.js"]
