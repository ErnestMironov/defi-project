# Use the official Node.js 18 image as the builder
FROM node:18.18.0 AS builder

# Set the working directory
WORKDIR /app

# Copy all files
COPY . .

# Install necessary tools and libraries, install dependencies, then build
RUN apt-get update && \
    apt-get install -y git build-essential python3 && \
    npm install -g node-gyp && \
    yarn install --prefer-offline && \
    node --max-old-space-size=6144 node_modules/.bin/yarn build

# Use a lightweight Nginx image for serving the app
FROM nginx:1.19-alpine AS server

# Copy Nginx config and build files
COPY ./etc/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html