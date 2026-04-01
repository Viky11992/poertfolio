# Portfolio Backend - Hugging Face Deployment Guide

This guide explains how to deploy the FastAPI backend to Hugging Face Spaces.

## 📁 Files Required for Deployment

```
backend/
├── Dockerfile              # Docker configuration (created)
├── .dockerignore           # Exclude unnecessary files (created)
├── requirements.txt        # Python dependencies
└── app/
    ├── __init__.py
    ├── main.py             # FastAPI entry point
    ├── api/
    │   ├── __init__.py
    │   └── routes.py       # API endpoints
    ├── core/
    │   ├── __init__.py
    │   └── config.py       # Configuration
    ├── models/
    │   └── __init__.py
    └── schemas/
        └── __init__.py     # Pydantic schemas
```

## 🚀 Deployment Steps

### Option 1: Deploy via Hugging Face UI

1. **Create New Space**
   - Go to https://huggingface.co/spaces
   - Click "Create new Space"
   - Choose **Docker** as the SDK
   - Select your repository

2. **Configure Secrets** (Settings → Repository secrets)
   Add these environment variables:
   ```
   OPENAI_API_KEY=your_openai_api_key
   GEMINI_API_KEY=your_gemini_api_key
   ALLOWED_ORIGINS=https://your-frontend-url.com
   PORT=7860
   ```

3. **Settings**
   - Set Port: `7860`
   - Hardware: Choose appropriate CPU/GPU tier

### Option 2: Deploy via Git Push

```bash
# Navigate to backend directory
cd backend

# Initialize git (if not already)
git init
git add .
git commit -m "Initial backend deployment"

# Add Hugging Face remote
git remote add hf https://huggingface.co/spaces/YOUR_USERNAME/YOUR_SPACE_NAME

# Push to Hugging Face
git push hf main
```

## 🔧 Configuration

### Environment Variables (.env)

```env
# AI API Keys (Add these in HF Secrets, NOT in code)
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=...

# Server Configuration
PORT=7860
HOST=0.0.0.0

# CORS (Your frontend URL)
ALLOWED_ORIGINS=https://your-frontend.vercel.app

# App Settings
APP_NAME="Portfolio API"
DEBUG=false
```

### AI Model Selection

In HF Secrets, add:
```
AI_MODEL=gemini  # or "openai"
```

## 📝 Testing Locally

Before deploying, test the Docker container locally:

```bash
# Build the Docker image
cd backend
docker build -t portfolio-backend .

# Run the container
docker run -p 7860:7860 \
  -e OPENAI_API_KEY=your_key \
  -e GEMINI_API_KEY=your_key \
  -e ALLOWED_ORIGINS=http://localhost:3000 \
  portfolio-backend
```

Visit: http://localhost:7860/api/docs

## 🔗 API Endpoints

Once deployed, your API will be available at:
- **Base URL**: `https://YOUR_USERNAME-YOUR_SPACE_NAME.hf.space`
- **API Docs**: `https://YOUR_USERNAME-YOUR_SPACE_NAME.hf.space/api/docs`
- **Health Check**: `https://YOUR_USERNAME-YOUR_SPACE_NAME.hf.space/health`

## ⚠️ Important Notes

1. **File Uploads**: Hugging Face Spaces have ephemeral storage. Uploaded files will be lost on restart.
   - Consider using external storage (S3, Cloudinary) for production

2. **Rate Limits**: Free tier has compute limits. Upgrade to PRO for better performance.

3. **CORS**: Update `ALLOWED_ORIGINS` secret with your actual frontend URL.

4. **Secrets**: Never commit `.env` file. Always use HF Repository secrets.

## 🐛 Troubleshooting

### Container won't start
- Check logs in HF Space dashboard
- Verify PORT environment variable is set to 7860
- Ensure all required files are in the repository

### AI chat not working
- Verify API keys are set in HF Secrets
- Check model availability in your region

### CORS errors
- Update ALLOWED_ORIGINS with your frontend URL
- Use comma-separated values for multiple origins

## 📊 Monitoring

- View logs: Space → Settings → Logs
- Monitor usage: Space → Metrics
- Check uptime: Use external monitoring service

---

**Built with FastAPI & Docker** 🚀
