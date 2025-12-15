# Dockerfile
FROM node:22-alpine

WORKDIR /usr/src/app

# Copy package files
COPY package.json tsconfig.json ./

# Install all dependencies (including devDependencies for build)
RUN npm install

# Copy source code
COPY src ./src

# Build TypeScript
RUN npm run build

# Remove devDependencies to save space
RUN npm prune --production

CMD ["node", "dist/index.js"]
