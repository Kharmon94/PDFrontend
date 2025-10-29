@echo off
echo 🚀 Starting Rails backend deployment to Railway...

REM Check if Railway CLI is installed
where railway >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Railway CLI not found. Please install it first:
    echo npm install -g @railway/cli
    pause
    exit /b 1
)

REM Navigate to backend directory
cd preferred_deals_api

REM Check if we're linked to a Railway project
railway status >nul 2>nul
if %errorlevel% neq 0 (
    echo 🔗 Linking to Railway project...
    railway link
)

REM Deploy the backend
echo 📦 Deploying Rails backend...
railway up

echo ✅ Backend deployment initiated!
echo 📊 Check the Railway dashboard for deployment status and logs.
echo 🔗 Once deployed, you'll get a Railway URL for your API.
pause
