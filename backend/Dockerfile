# Dockerfile for gRPC Server

# Use the official Node.js image as a base
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 50051

# Build the TypeScript code
RUN npm run build

# Start the server
CMD [ "node", "dist/index.js" ]
