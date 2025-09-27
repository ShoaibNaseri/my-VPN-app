#!/bin/bash

echo "🚀 MyVPN App - GitHub Repository Setup"
echo "======================================"
echo ""

echo "📋 Step 1: Create Repository on GitHub"
echo "1. Go to: https://github.com/new"
echo "2. Repository name: myVPN-app"
echo "3. Description: A modern, responsive VPN application built with React, Vite, Node.js, and Docker. Features real-time connection status, country selection, and beautiful UI with WebSocket communication."
echo "4. Make it PUBLIC"
echo "5. DON'T initialize with README, .gitignore, or license"
echo "6. Click 'Create repository'"
echo ""

read -p "Press Enter after you've created the repository on GitHub..."

echo ""
echo "📡 Step 2: Uploading your code..."

# Add remote repository
echo "Adding remote repository..."
git remote add origin https://github.com/ShoaibNaseri/myVPN-app.git

# Rename branch to main
echo "Renaming branch to main..."
git branch -M main

# Push to GitHub
echo "Pushing code to GitHub..."
git push -u origin main

echo ""
echo "✅ SUCCESS! Your VPN app is now on GitHub!"
echo "🌐 Repository URL: https://github.com/ShoaibNaseri/myVPN-app"
echo ""
echo "🎉 Your repository includes:"
echo "  • Complete React frontend with beautiful UI"
echo "  • Node.js backend with WebSocket support"
echo "  • Docker containerization"
echo "  • 12 VPN server locations"
echo "  • Real-time connection simulation"
echo "  • Complete documentation"
echo "  • Setup scripts and configuration"
echo ""
echo "📋 Next steps:"
echo "1. Visit your repository: https://github.com/ShoaibNaseri/myVPN-app"
echo "2. Add topics like: vpn, react, nodejs, docker, websocket"
echo "3. Enable GitHub Pages if you want to deploy it"
echo "4. Share your awesome project!"
