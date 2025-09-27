#!/bin/bash

echo "🚀 Uploading MyVPN App to GitHub"
echo "================================"

# Add the remote repository (replace with your actual GitHub username if different)
echo "📡 Adding remote repository..."
git remote add origin https://github.com/ShoaibNaseri/myVPN-app.git

# Rename branch to main (GitHub's default)
echo "🌿 Renaming branch to main..."
git branch -M main

# Push to GitHub
echo "⬆️  Pushing code to GitHub..."
git push -u origin main

echo ""
echo "✅ Success! Your VPN app is now on GitHub!"
echo "🌐 Repository URL: https://github.com/ShoaibNaseri/myVPN-app"
echo ""
echo "📋 Next steps:"
echo "1. Visit your repository on GitHub"
echo "2. Add a description and topics"
echo "3. Enable GitHub Pages if you want to deploy it"
echo "4. Share your awesome VPN app with the world!"
