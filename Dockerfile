# ----------------------------------------------------
# Stage 1: Build & Generate Prisma Client
# ----------------------------------------------------
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies needed for node-gyp and prisma
RUN apk add --no-cache python3 make g++ openssl

COPY package*.json ./
COPY prisma ./prisma/

# Install ALL dependencies (including devDependencies) to build the app
RUN npm ci

COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the NestJS application
RUN npm run build

# ----------------------------------------------------
# Stage 2: Production Runner
# ----------------------------------------------------
FROM node:20-alpine AS runner
WORKDIR /app

# Need openssl for Prisma in production
RUN apk add --no-cache openssl

ENV NODE_ENV=production

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install ONLY production dependencies to keep image small
RUN npm ci --only=production

# Copy compiled files and generated prisma client from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Expose the API port
EXPOSE 3000

# The entry command: Run migrations and start the server
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]
