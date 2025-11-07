## Builder image
FROM node:20-alpine AS deps

WORKDIR /app

# Install build tools for native modules (kept minimal)
RUN apk add --no-cache --virtual .build-deps python3 make g++

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --prefer-offline --no-audit --progress=false || npm install

## Build image
FROM node:20-alpine AS builder
WORKDIR /app

# Copy node_modules from deps stage
COPY --from=deps /usr /usr
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
RUN npm run build

# Remove build deps and prune devDependencies
RUN npm prune --production

## Production image
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy only what's needed to run
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./next.config.mjs

EXPOSE 3000

CMD ["npm", "start"]
