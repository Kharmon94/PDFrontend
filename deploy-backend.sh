#!/bin/bash

# Backend Deployment Script for Railway
echo "🚀 Starting Rails backend deployment to Railway..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Please install it first:"
    echo "npm install -g @railway/cli"
    exit 1
fi

# Navigate to backend directory
cd preferred_deals_api

# Check if we're linked to a Railway project
if ! railway status &> /dev/null; then
    echo "🔗 Linking to Railway project..."
    railway link
fi

# Deploy the backend
echo "📦 Deploying Rails backend..."
railway up

echo "✅ Backend deployment initiated!"
echo "📊 Check the Railway dashboard for deployment status and logs."
echo "🔗 Once deployed, you'll get a Railway URL for your API."
