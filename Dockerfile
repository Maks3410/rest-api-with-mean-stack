# Use Node.js image for the backend
FROM node:20-alpine AS backend
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the backend files
COPY . .

# Expose port and run the server
EXPOSE 5000
CMD ["node", "server.js"]
