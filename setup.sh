#!/bin/bash

echo "🚀 Setting up MyVPN - Real VPN Application"
echo "=========================================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p backend/configs
mkdir -p backend/certs

# Generate self-signed certificates for OpenVPN (for demo purposes)
echo "🔐 Generating demo certificates..."
cd backend/certs

# Create CA certificate
openssl req -x509 -newkey rsa:4096 -keyout ca-key.pem -out ca.crt -days 365 -nodes -subj "/C=US/ST=CA/L=San Francisco/O=MyVPN/OU=IT/CN=MyVPN-CA"

# Create client certificate
openssl req -newkey rsa:4096 -keyout client-key.pem -out client.csr -days 365 -nodes -subj "/C=US/ST=CA/L=San Francisco/O=MyVPN/OU=IT/CN=client"

# Sign client certificate
openssl x509 -req -in client.csr -CA ca.crt -CAkey ca-key.pem -out client.crt -days 365 -CAcreateserial

# Create TLS auth key
openvpn --genkey --secret ta.key

# Create auth file
echo "demo_user" > auth.txt
echo "demo_password" >> auth.txt

cd ../..

echo "✅ Certificates generated"

# Build and start the application
echo "🐳 Building and starting Docker containers..."
docker-compose down
docker-compose up --build -d

echo "⏳ Waiting for services to start..."
sleep 10

# Check if services are running
if docker ps | grep -q "myvpn-app"; then
    echo "✅ Frontend is running on http://localhost:3000"
else
    echo "❌ Frontend failed to start"
fi

if docker ps | grep -q "vpn-backend"; then
    echo "✅ Backend is running on http://localhost:5000"
else
    echo "❌ Backend failed to start"
fi

echo ""
echo "🎉 MyVPN is now running!"
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:5001"
echo ""
echo "📋 Available commands:"
echo "  docker-compose logs -f          # View logs"
echo "  docker-compose down             # Stop services"
echo "  docker-compose up -d            # Start services"
echo "  docker-compose restart          # Restart services"
echo ""
echo "⚠️  Note: This is a demo application. For production use:"
echo "   1. Replace demo certificates with real ones"
echo "   2. Configure actual VPN servers"
echo "   3. Implement proper authentication"
echo "   4. Add security measures and monitoring"
