#!/bin/bash

# ShortForge Deployment Script
# This script helps prepare the codebase for deployment

set -e

echo "🚀 ShortForge Deployment Preparation"
echo "==================================="

# Check if we're in the right directory
if [ ! -f "docker-compose.yml" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "✅ Project structure verified"

# Check if all required files exist
required_files=(
    "backend/requirements.txt"
    "backend/Procfile"
    "backend/runtime.txt"
    "frontend/package.json"
    "frontend/vercel.json"
    "frontend/next.config.js"
)

for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ Error: Required file $file is missing"
        exit 1
    fi
done

echo "✅ All required deployment files present"

# Test backend dependencies
echo "🔍 Checking backend dependencies..."
cd backend
python -c "import fastapi, uvicorn, sqlalchemy, pydantic; print('✅ Backend dependencies OK')"
cd ..

# Test frontend dependencies
echo "🔍 Checking frontend dependencies..."
cd frontend
if command -v node &> /dev/null; then
    npm list --depth=0 > /dev/null 2>&1 && echo "✅ Frontend dependencies OK" || echo "⚠️  Frontend dependencies may need installation"
else
    echo "⚠️  Node.js not found - skipping frontend dependency check"
fi
cd ..

echo ""
echo "🎯 Deployment Ready!"
echo ""
echo "Next steps:"
echo "1. Push your code to GitHub:"
echo "   git add ."
echo "   git commit -m 'Ready for deployment'"
echo "   git push origin main"
echo ""
echo "2. Deploy Backend to Railway:"
echo "   - Go to https://railway.app"
echo "   - Connect your GitHub repo"
echo "   - Set environment variables (see DEPLOYMENT.md)"
echo ""
echo "3. Deploy Frontend to Vercel:"
echo "   - Go to https://vercel.com"
echo "   - Connect your GitHub repo"
echo "   - Set root directory to 'frontend'"
echo "   - Set NEXT_PUBLIC_API_URL to your Railway backend URL"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
echo ""
echo "🔗 Useful links:"
echo "   - Railway: https://railway.app"
echo "   - Vercel: https://vercel.com"
echo "   - Deployment Guide: ./DEPLOYMENT.md"
