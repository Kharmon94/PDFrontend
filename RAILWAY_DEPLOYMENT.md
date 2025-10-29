# Railway Deployment Guide for Preferred Deals

## Prerequisites
1. Install Railway CLI: `npm install -g @railway/cli`
2. Login to Railway: `railway login`
3. Have your application ready with Docker configurations

## Deployment Steps

### Step 1: Create Railway Project
```bash
railway project create preferred-deals-app
```

### Step 2: Deploy Backend (Rails API)
```bash
cd preferred_deals_api
railway service create backend
railway up --service backend
```

### Step 3: Deploy Frontend (React)
```bash
cd ..
railway service create frontend
railway up --service frontend
```

### Step 4: Set Environment Variables

#### Backend Environment Variables:
```bash
railway variables set RAILS_ENV=production --service backend
railway variables set SECRET_KEY_BASE=your_secret_key_here --service backend
railway variables set RAILS_SERVE_STATIC_FILES=true --service backend
```

#### Frontend Environment Variables:
```bash
# Get backend URL first
BACKEND_URL=$(railway domain --service backend)
railway variables set REACT_APP_API_URL=$BACKEND_URL --service frontend
```

### Step 5: Get Service URLs
```bash
echo "Backend URL: $(railway domain --service backend)"
echo "Frontend URL: $(railway domain --service frontend)"
```

## Environment Variables Reference

### Backend (Rails API)
- `RAILS_ENV`: production
- `SECRET_KEY_BASE`: Generate with `rails secret`
- `RAILS_SERVE_STATIC_FILES`: true
- `DATABASE_URL`: Automatically provided by Railway PostgreSQL

### Frontend (React)
- `NODE_ENV`: production
- `REACT_APP_API_URL`: Backend service URL

## Local Development with Docker
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Troubleshooting

### Common Issues:
1. **CORS Errors**: Ensure `ALLOWED_ORIGINS` includes your frontend URL
2. **Database Connection**: Check `DATABASE_URL` is set correctly
3. **Build Failures**: Check Docker logs for specific errors
4. **Environment Variables**: Verify all required variables are set

### Useful Commands:
```bash
# View service logs
railway logs --service backend
railway logs --service frontend

# Check service status
railway status

# Redeploy service
railway redeploy --service backend
```

## Production URLs
After deployment, your application will be available at:
- Frontend: `https://your-frontend-service.railway.app`
- Backend: `https://your-backend-service.railway.app`
