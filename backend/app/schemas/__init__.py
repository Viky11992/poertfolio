"""
Pydantic schemas for request/response validation.
"""
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime


class ContactMessage(BaseModel):
    """Schema for contact form submissions."""
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=2, max_length=200)
    message: str = Field(..., min_length=10, max_length=2000)


class ContactResponse(BaseModel):
    """Response schema for contact form."""
    success: bool
    message: str


class Project(BaseModel):
    """Schema for project data."""
    id: int
    title: str
    description: str
    technologies: List[str]
    image_url: Optional[str] = None
    video_url: Optional[str] = None
    media_urls: Optional[List[str]] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    featured: bool = False


class ProjectCreate(BaseModel):
    """Schema for creating a new project."""
    title: str = Field(..., min_length=2, max_length=200)
    description: str = Field(..., min_length=10, max_length=2000)
    technologies: List[str]
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    featured: bool = False


class ProjectUpdate(BaseModel):
    """Schema for updating a project."""
    title: Optional[str] = Field(None, min_length=2, max_length=200)
    description: Optional[str] = Field(None, min_length=10, max_length=2000)
    technologies: Optional[List[str]] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    featured: Optional[bool] = None


class Skill(BaseModel):
    """Schema for skill data."""
    name: str
    category: str
    proficiency: int = Field(..., ge=0, le=100)
    icon: Optional[str] = None


class Experience(BaseModel):
    """Schema for experience data."""
    id: int
    company: str
    position: str
    start_date: str
    end_date: Optional[str] = None
    current: bool = False
    description: List[str]
    technologies: List[str]


class AIQuery(BaseModel):
    """Schema for AI chat queries."""
    message: str = Field(..., min_length=1, max_length=500)
    conversation_history: Optional[List[dict]] = None


class AIResponse(BaseModel):
    """Response schema for AI chat."""
    response: str
    conversation_history: List[dict]


class AboutMe(BaseModel):
    """Schema for about me data."""
    name: str
    title: str
    location: str
    bio: str
    summary: str
    avatar_url: Optional[str] = None


class UploadResponse(BaseModel):
    """Response schema for file uploads."""
    success: bool
    message: str
    file_url: str
    file_type: str
    file_size: int
