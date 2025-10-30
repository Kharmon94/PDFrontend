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

# Build the application with API URL from environment variable
# This allows Railway to inject the correct backend URL at build time
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Copy nginx configuration as template
COPY nginx.conf /etc/nginx/conf.d/default.conf.template

# Create a simple health check file
RUN mkdir -p /usr/share/nginx/html && echo "OK" > /usr/share/nginx/html/health

# Create health check script
RUN echo '#!/bin/sh' > /usr/share/nginx/html/health.sh && \
    echo 'echo "OK"' >> /usr/share/nginx/html/health.sh && \
    chmod +x /usr/share/nginx/html/health.sh

# Install curl for health check testing
RUN apk add --no-cache curl

# Install gettext for envsubst
RUN apk add --no-cache gettext

# Create startup script that uses Railway's PORT
RUN echo '#!/bin/sh' > /docker-entrypoint.sh && \
    echo 'PORT=${PORT:-80}' >> /docker-entrypoint.sh && \
    echo 'envsubst '"'"'$$PORT'"'"' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf' >> /docker-entrypoint.sh && \
    echo 'exec nginx -g "daemon off;"' >> /docker-entrypoint.sh && \
    chmod +x /docker-entrypoint.sh

# Expose port 80
EXPOSE 80

# Default command
CMD ["/docker-entrypoint.sh"]