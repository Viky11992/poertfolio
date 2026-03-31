"""
Main FastAPI application entry point.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging

from app.core.config import settings
from app.api.routes import router

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)

logger = logging.getLogger(__name__)

# Create FastAPI application
app = FastAPI(
    title=settings.app_name,
    description="""
## Portfolio API for Shoaib Arshad

This API provides endpoints for:
- **Projects** - Retrieve portfolio projects
- **Skills** - Get technical skills and proficiency levels
- **Experience** - Work history and achievements
- **Contact** - Submit contact form messages
- **AI Chat** - Interact with AI assistant about Shoaib's expertise

### Technologies Used
- FastAPI
- Python
- OpenAI API
    """,
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(router, prefix="/api")


@app.get("/", tags=["Health"])
async def root():
    """Root endpoint - Health check."""
    return {
        "message": "Welcome to Shoaib Arshad's Portfolio API",
        "docs": "/api/docs",
        "version": "1.0.0",
    }


@app.get("/health", tags=["Health"])
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "api_version": "1.0.0",
    }


if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        "app.main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug,
    )
