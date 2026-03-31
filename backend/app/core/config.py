"""
Core configuration for the FastAPI application.
"""
from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    # OpenAI Configuration
    openai_api_key: str = ""
    
    # Google Gemini Configuration
    gemini_api_key: str = ""
    
    # AI Model Selection
    ai_model: str = "gemini"  # Options: "gemini", "openai"
    
    # Server Configuration
    host: str = "0.0.0.0"
    port: int = 8000
    
    # CORS Settings
    allowed_origins: str = "http://localhost:3000,http://localhost:3001"
    
    # Application Settings
    app_name: str = "Shoaib Arshad Portfolio API"
    debug: bool = True
    
    @property
    def allowed_origins_list(self) -> List[str]:
        """Parse allowed origins from comma-separated string."""
        return [origin.strip() for origin in self.allowed_origins.split(",")]
    
    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()
