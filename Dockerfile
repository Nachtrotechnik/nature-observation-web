FROM node:24-alpine

# Set working directory to app root
WORKDIR /usr/local/app

# Copy package.json first (for dependency caching)
COPY server/package.json ./server/

# Install dependencies (run from server directory)
WORKDIR /usr/local/app/server
RUN npm install

# Copy all server files
WORKDIR /usr/local/app
COPY server/ ./server/

# Copy client folder
COPY client/ ./client/

# Set working directory back to server for running
WORKDIR /usr/local/app/server

# Expose port
EXPOSE 3000

# Start command
CMD ["npm", "start"]