ARG NODE_VERSION=24.11.1-alpine
FROM node:${NODE_VERSION} AS base

# Set working directory
WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 -G nodejs && \
    chown -R nodejs:nodejs /app



# ========================================
# dependencies
# ========================================

FROM base AS deps

# Copy package files
COPY package*.json ./

# Install production dependencies
RUN --mount=type=cache,target=/root/.npm,sharing=locked \
    npm ci --omit=dev && \
    npm cache clean --force


# Set proper ownership
RUN chown -R nodejs:nodejs /app


# ========================================
# Build dependencies
# ========================================

FROM base AS build-deps

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./
COPY prisma.config.ts ./
COPY prisma ./prisma

# Install all dependencies with build optimizations
RUN --mount=type=cache,target=/root/.npm,sharing=locked \
    npm ci --no-audit --no-fund && \
    npm cache clean --force

#build prisma module

RUN npm install ./prisma/dist

# Create necessary directories and set permissions
RUN mkdir -p /app/node_modules/.vite

#RUN  chown -R nodejs:nodejs /app Already done up ??

# ========================================
# Build
# ========================================

FROM build-deps AS build

# Copy source files
COPY apps/back-end/ ./back-end

RUN chmod 755 ./back-end/entrypoint.sh

# Build the application
RUN npx tsc -p ./back-end/tsconfig.app.json
#  RUN npm run build

# Set proper ownership
RUN chown -R nodejs:nodejs /app

# ========================================
# Dev Stage
# ========================================

FROM build AS development

# Set environment
ENV NODE_ENV=development \
    NPM_CONFIG_LOGLEVEL=warn


# Ensure all directories have proper permissions
RUN mkdir -p /app/node_modules/.vite && \
    chown -R nodejs:nodejs /app && \
    chmod -R 755 /app

# Switch to non-root user
USER nodejs

# Expose ports
EXPOSE 3000

# Start development server
# CMD ["npm", "run", "start:dev"]
CMD ["./back-end/entrypoint.sh"]

# ========================================
# Production Stage
# ========================================

ARG NODE_VERSION=24.11.1-alpine
FROM node:${NODE_VERSION} AS production

# Set working directory
WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 -G nodejs && \
    chown -R nodejs:nodejs /app

# Set optimized environment variables
ENV NODE_ENV=production \
    NODE_OPTIONS="--max-old-space-size=256 --no-warnings" \
    NPM_CONFIG_LOGLEVEL=silent

# Copy production dependencies from deps stage
COPY --from=deps --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=deps --chown=nodejs:nodejs /app/package*.json ./
# Copy built application from build stage
COPY --from=build --chown=nodejs:nodejs /app/dist ./dist

# Switch to non-root user for security
USER nodejs

# Expose port
EXPOSE 3000

# Start production server
CMD ["npm", "run", "start:prod"]
