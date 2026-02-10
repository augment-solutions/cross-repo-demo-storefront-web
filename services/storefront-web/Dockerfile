# syntax=docker/dockerfile:1.4
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy ui-components package first
COPY packages/ui-components /packages/ui-components
WORKDIR /packages/ui-components

# Build ui-components with BuildKit cache mount
RUN --mount=type=cache,target=/root/.npm,sharing=locked \
    npm install && npm run build

# Back to app directory
WORKDIR /app

# Copy package files and update workspace reference
COPY services/storefront-web/package*.json ./
RUN sed -i 's|"workspace:\*"|"file:/packages/ui-components"|g' package.json

# Install dependencies with BuildKit cache mount
RUN --mount=type=cache,target=/root/.npm,sharing=locked \
    npm install

# Copy source code
COPY services/storefront-web/ ./

# Ensure public directory exists
RUN mkdir -p public

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Install stress-ng for chaos engineering
RUN apk add --no-cache stress-ng iproute2

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Copy built application
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Create non-root user (use different GID/UID since 1000 may be in use)
RUN addgroup -g 1001 appgroup && \
    adduser -u 1001 -G appgroup -s /bin/sh -D appuser && \
    chown -R appuser:appgroup /app

USER appuser

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1:3000 || exit 1

CMD ["node", "server.js"]

