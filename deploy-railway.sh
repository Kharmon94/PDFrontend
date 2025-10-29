#!/bin/bash

# Quick Railway Deployment Script for Preferred Deals
echo "🚀 Starting Railway deployment for Preferred Deals..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Installing..."
    npm install -g @railway/cli
fi

# Login to Railway
echo "🔐 Logging into Railway..."
railway login

# Create new project
echo "📦 Creating Railway project..."
railway project create preferred-deals-app

# Deploy backend first
echo "🔧 Deploying Rails API backend..."
cd preferred_deals_api
railway service create backend
railway up --service backend
cd ..

# Wait for backend to be ready
echo "⏳ Waiting for backend to be ready..."
sleep 30

# Deploy frontend
echo "🎨 Deploying React frontend..."
railway service create frontend
railway up --service frontend

# Get service URLs
echo "🌐 Getting service URLs..."
BACKEND_URL=$(railway domain --service backend)
FRONTEND_URL=$(railway domain --service frontend)

echo "✅ Deployment complete!"
echo "🔗 Backend URL: $BACKEND_URL"
echo "🔗 Frontend URL: $FRONTEND_URL"

# Set environment variables
echo "⚙️ Setting up environment variables..."
railway variables set REACT_APP_API_URL=$BACKEND_URL --service frontend

# Generate secret key for Rails
echo "🔑 Generating Rails secret key..."
SECRET_KEY=$(cd preferred_deals_api && bundle exec rails secret)
railway variables set SECRET_KEY_BASE=$SECRET_KEY --service backend

echo "🎉 All done! Your application is now deployed on Railway!"
echo "📱 Frontend: $FRONTEND_URL"
echo "🔧 Backend: $BACKEND_URL"
