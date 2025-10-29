# Multi-stage build for React frontend
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including dev dependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create a simple health check file
RUN echo "OK" > /usr/share/nginx/html/health

# Create health check script
RUN echo '#!/bin/sh' > /usr/share/nginx/html/health.sh && \
    echo 'echo "OK"' >> /usr/share/nginx/html/health.sh && \
    chmod +x /usr/share/nginx/html/health.sh

# Install curl for health check testing
RUN apk add --no-cache curl

# Test nginx configuration (this will now pass because nginx.conf uses 'listen 80;')
RUN nginx -t

# Expose port (Railway will set this dynamically)
EXPOSE $PORT

# Default command (will be overridden by railway.toml)
CMD ["nginx", "-g", "daemon off;"]