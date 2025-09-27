FROM node:18-alpine

# Install OpenVPN and required packages
RUN apk add --no-cache \
    openvpn \
    iptables \
    net-tools \
    curl \
    wget

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy source code
COPY . .

# Create configs directory
RUN mkdir -p /app/configs

# Set proper permissions
RUN chmod +x /app/server.js

# Expose port
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
