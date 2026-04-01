"""
API Routes for the portfolio backend.
"""
from fastapi import APIRouter, HTTPException, status, UploadFile, File, Depends
from fastapi.responses import FileResponse
from typing import List
from pathlib import Path
import shutil
import uuid
import logging
from datetime import datetime

from app.schemas import (
    ContactMessage,
    ContactResponse,
    Project,
    Skill,
    Experience,
    AIQuery,
    AIResponse,
    AboutMe,
    UploadResponse,
    ProjectCreate,
    ProjectUpdate,
)

logger = logging.getLogger(__name__)
router = APIRouter()

# Configure upload directory
UPLOAD_DIR = Path(__file__).parent.parent.parent / "uploads"
PROJECTS_DIR = UPLOAD_DIR / "projects"
TEMP_DIR = UPLOAD_DIR / "temp"

# Ensure directories exist
UPLOAD_DIR.mkdir(exist_ok=True)
PROJECTS_DIR.mkdir(exist_ok=True)
TEMP_DIR.mkdir(exist_ok=True)

# Allowed file types
ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"]
ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/ogg"]
MAX_FILE_SIZE = 50 * 1024 * 1024  # 50MB

# Mock data - In production, this would come from a database
PROJECTS_DATA: List[Project] = [
    Project(
        id=1,
        title="Study Notes Summarizer & Quiz Generator Agent",
        description="An intelligent agent that converts PDF study notes into: "
     "1. Structured summaries (markdown format) "
     "2. Interactive quizzes (MCQs + short answer questions)",
        technologies=["Streamlit", "FastAPI", "OpenAI API", "AI Model: Google Gemini 2.5 Flash", "TypeScript","PDF Processing: pypdf","Protocol: Model Context Protocol (MCP)","Config: dotenv for API keys"],
        image_url="/images/Study helper robot in colorful learning design.png",
        video_url=None,
        media_urls=["/projects/code-assistant-1.png", "/projects/code-assistant-2.png"],
        github_url="https://github.com/Viky11992/Summarizer-Quiz-Generator.git",
        live_url="https://study-notes-agent.vercel.app",
        featured=True,
    ),
    Project(
        id=2,
        title="Physical AI Textbook with RAG Chatbot",
        description="A comprehensive educational platform combining a textbook on Physical AI & Humanoid Robotics with an AI-powered RAG (Retrieval-Augmented Generation) chatbot for interactive learning.",
        technologies=["Docasource", "Python", "FastAPI", "NeonDB","Qdrent","OPenAIAgentSDK","Nextjs","PostgreSQL"],
        image_url="/images/8fabcf04-2bd1-440b-8970-f0cf1518cb0e.png",
        video_url="/projects/teams-bot-demo.mp4",
        media_urls=["/projects/teams-bot-1.png"],
        github_url="https://github.com/Viky11992/Heckathone-001.git",
        live_url="https://humanoid-robotics-docusource.vercel.app/",
        featured=True,
    ),
    Project(
        id=3,
        title="Full-Stack Todo Application with AI Chatbot",
        description=" A comprehensive multi-phase Todo Application ecosystem that evolved from a simple console-based prototype to a production-ready, enterprise-grade full-stack web application with AI capabilities, containerization, and Kubernetes deployment support, This project demonstrates the complete software development lifecycle from a minimal viable product (MVP) to a scalable cloud-native application with modern architecture, authentication, AI integration, and DevOps infrastructure.",
        technologies=["Next.js 15", "TypeScript", "Tailwind CSS", "FastAPI", "PostgreSQL","Python","BetterAuth With JWT",],
        image_url="/images/Gemini_Generated_Image_2nokf2nokf2nokf2.png",
        video_url=None,
        media_urls=["/projects/ecommerce-1.png", "/projects/ecommerce-2.png", "/projects/ecommerce-3.png"],
        github_url="https://github.com/Viky11992/Heckathone_02_Phase_02_Todo_web_App.git",
        live_url="https://heckathone-phase-03-todo-chatbot.vercel.app/",
        featured=True,
    ),
    Project(
        id=4,
        title="Full Stack Next.js 15 E-Commerece Web Application",
        description="This is a modern, production-ready full-stack web application built with cutting-edge technologies. The project features a complete CMS backend, user authentication, payment processing, and a responsive frontend.",
        technologies=["Next-js", "Tailwind", "Senity", "Clerk","Stripe","Typescript"],
        image_url="/images/ecommerce.png",
        video_url=None,
        media_urls=None,
        github_url="https://github.com/Viky11992/Heckathone_0_FigmaTemplate.git",
        live_url="https://heckathone-0-figma-template-egf7.vercel.app/",
        featured=False,
    ),
    
]

SKILLS_DATA: List[Skill] = [
    # Frontend
    Skill(name="React", category="Frontend", proficiency=95, icon="react"),
    Skill(name="Next.js", category="Frontend", proficiency=92, icon="nextjs"),
    Skill(name="TypeScript", category="Frontend", proficiency=90, icon="typescript"),
    Skill(name="Tailwind CSS", category="Frontend", proficiency=88, icon="tailwind"),
    Skill(name="HTML5/CSS3", category="Frontend", proficiency=95, icon="html5"),
    Skill(name="JavaScript (ES6+)", category="Frontend", proficiency=93, icon="javascript"),
    # Backend
    Skill(name="Python", category="Backend", proficiency=95, icon="python"),
    Skill(name="FastAPI", category="Backend", proficiency=92, icon="fastapi"),
    Skill(name="Node.js", category="Backend", proficiency=85, icon="nodejs"),
    Skill(name="PostgreSQL", category="Backend", proficiency=82, icon="postgresql"),
    Skill(name="MongoDB", category="Backend", proficiency=80, icon="mongodb"),
    # AI/ML
    Skill(name="OpenAI API", category="AI/ML", proficiency=90, icon="openai"),
    Skill(name="OpenAI Agents SDK", category="AI/ML", proficiency=88, icon="openai"),
    Skill(name="Context Engineering", category="AI/ML", proficiency=87, icon="brain"),
    Skill(name="LangChain", category="AI/ML", proficiency=82, icon="langchain"),
    Skill(name="Prompt Engineering", category="AI/ML", proficiency=92, icon="brain"),
    Skill(name="AI with Different Models", category="AI/ML", proficiency=85, icon="brain"),
    # Tools
    Skill(name="Git/GitHub", category="Tools", proficiency=90, icon="git"),
    Skill(name="Docker", category="Tools", proficiency=78, icon="docker"),
    Skill(name="Azure", category="Tools", proficiency=80, icon="azure"),
]

EXPERIENCE_DATA: List[Experience] = [
    Experience(
        id=1,
        company="Freelance Full Stack Developer",
        position="Self-Employed",
        start_date="2023-01",
        end_date=None,
        current=True,
        description=[
            "Developing AI-powered web applications for clients using Next.js, Python, and OpenAI API",
            "Building intelligent chatbots and agents with OpenAI Agents SDK and Google Gemini",
            "Creating modern, responsive websites with React, TypeScript, and Tailwind CSS",
            "Implementing spec-driven development practices to ensure code quality and client satisfaction",
            "Working with Context Engineering and RAG systems for advanced AI integrations",
        ],
        technologies=["React", "Next.js", "Python", "FastAPI", "OpenAI API", "Gemini API", "TypeScript"],
    ),
    Experience(
        id=2,
        company="Personal Projects & Open Source",
        position="Full Stack Developer",
        start_date="2022-06",
        end_date="2022-12",
        current=False,
        description=[
            "Built Study Notes Summarizer & Quiz Generator Agent using Google Gemini API",
            "Created Physical AI Textbook with RAG Chatbot for interactive learning",
            "Developed multiple AI-powered tools showcasing expertise in modern web development",
            "Contributed to open-source projects and maintained active GitHub portfolio",
            "Learned and implemented AI-driven development workflows to accelerate coding",
        ],
        technologies=["Next.js", "FastAPI", "OpenAI", "Gemini", "PostgreSQL", "Tailwind CSS"],
    ),
    Experience(
        id=3,
        company="Self-Taught Developer Journey",
        position="Learning & Skill Development",
        start_date="2021-01",
        end_date="2022-05",
        current=False,
        description=[
            "Mastered full-stack development through online courses and hands-on projects",
            "Focused on modern technologies: React, Node.js, Python, and cloud platforms",
            "Built foundational understanding of AI/ML concepts and prompt engineering",
            "Developed strong problem-solving skills through coding challenges and projects",
            "Started freelancing and working on real-world client projects",
        ],
        technologies=["JavaScript", "Python", "React", "Node.js", "MongoDB", "Git"],
    ),
]

ABOUT_ME_DATA = AboutMe(
    name="Shoaib Arshad",
    title="Full Stack Developer | AI-Powered Applications Specialist",
    location="Karachi, Pakistan",
    bio="""I'm a passionate Full Stack Developer with expertise in building modern,
    scalable web applications powered by artificial intelligence. My journey in tech
    started with curiosity about how websites work, and it has evolved into a career
    where I get to solve complex problems using cutting-edge technologies.

    I specialize in combining traditional full-stack development with AI capabilities,
    creating intelligent applications that not only function flawlessly but also
    adapt and learn from user interactions. My approach to development is rooted in
    two core principles: leveraging AI to accelerate development without compromising
    quality, and strictly adhering to specifications to ensure client requirements
    are met precisely.""",
    summary="Full Stack Developer specializing in AI-powered applications with expertise in Next.js, Python, FastAPI, and OpenAI integration.",
    avatar_url="/avatar.png",
    phone="+92-300-2062669",
    email="Shoaibarshad470@gmail.com",
)


def validate_file(file: UploadFile, allowed_types: List[str], max_size: int) -> bool:
    """Validate file type and size."""
    if file.content_type not in allowed_types:
        return False
    
    # Get file size
    file.file.seek(0, 2)  # Seek to end
    file_size = file.file.tell()
    file.file.seek(0)  # Reset to beginning
    
    if file_size > max_size:
        return False
    
    return True


def save_uploaded_file(file: UploadFile, directory: Path) -> str:
    """Save uploaded file and return filename."""
    # Generate unique filename
    file_extension = Path(file.filename).suffix if file.filename else ".bin"
    unique_filename = f"{uuid.uuid4().hex}{file_extension}"
    file_path = directory / unique_filename
    
    # Save file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    return unique_filename


@router.get("/projects", response_model=List[Project], tags=["Projects"])
async def get_projects(featured_only: bool = False) -> List[Project]:
    """
    Get all projects or filter by featured status.
    
    - **featured_only**: If True, returns only featured projects
    """
    if featured_only:
        return [p for p in PROJECTS_DATA if p.featured]
    return PROJECTS_DATA


@router.get("/projects/{project_id}", response_model=Project, tags=["Projects"])
async def get_project(project_id: int) -> Project:
    """Get a specific project by ID."""
    for project in PROJECTS_DATA:
        if project.id == project_id:
            return project
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Project with id {project_id} not found",
    )


@router.post("/projects", response_model=Project, tags=["Projects"])
async def create_project(project: ProjectCreate) -> Project:
    """Create a new project."""
    new_id = max([p.id for p in PROJECTS_DATA], default=0) + 1
    new_project = Project(
        id=new_id,
        **project.model_dump(),
        image_url=None,
        video_url=None,
        media_urls=None,
    )
    PROJECTS_DATA.append(new_project)
    return new_project


@router.put("/projects/{project_id}", response_model=Project, tags=["Projects"])
async def update_project(project_id: int, project: ProjectUpdate) -> Project:
    """Update an existing project."""
    for i, p in enumerate(PROJECTS_DATA):
        if p.id == project_id:
            update_data = project.model_dump(exclude_unset=True)
            updated_project = Project(**{**p.model_dump(), **update_data})
            PROJECTS_DATA[i] = updated_project
            return updated_project
    
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Project with id {project_id} not found",
    )


@router.post(
    "/upload/project-image",
    response_model=UploadResponse,
    tags=["Upload"]
)
async def upload_project_image(file: UploadFile = File(...)):
    """
    Upload a project image.
    
    - **file**: Image file (JPEG, PNG, WebP, GIF)
    - **Max size**: 50MB
    """
    try:
        if not validate_file(file, ALLOWED_IMAGE_TYPES, MAX_FILE_SIZE):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid file type. Allowed: {', '.join(ALLOWED_IMAGE_TYPES)}. Max size: 50MB"
            )
        
        filename = save_uploaded_file(file, PROJECTS_DIR)
        file_url = f"/uploads/projects/{filename}"
        
        return UploadResponse(
            success=True,
            message="Image uploaded successfully",
            file_url=file_url,
            file_type=file.content_type,
            file_size=file.size or 0,
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Upload error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to upload file",
        )


@router.post(
    "/upload/project-video",
    response_model=UploadResponse,
    tags=["Upload"]
)
async def upload_project_video(file: UploadFile = File(...)):
    """
    Upload a project video.
    
    - **file**: Video file (MP4, WebM, OGG)
    - **Max size**: 50MB
    """
    try:
        if not validate_file(file, ALLOWED_VIDEO_TYPES, MAX_FILE_SIZE):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid file type. Allowed: {', '.join(ALLOWED_VIDEO_TYPES)}. Max size: 50MB"
            )
        
        filename = save_uploaded_file(file, PROJECTS_DIR)
        file_url = f"/uploads/projects/{filename}"
        
        return UploadResponse(
            success=True,
            message="Video uploaded successfully",
            file_url=file_url,
            file_type=file.content_type,
            file_size=file.size or 0,
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Upload error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to upload file",
        )


@router.post(
    "/upload/project-media",
    response_model=UploadResponse,
    tags=["Upload"]
)
async def upload_project_media(file: UploadFile = File(...)):
    """
    Upload project media (image or video).
    Auto-detects file type and saves accordingly.
    
    - **file**: Image or Video file
    - **Max size**: 50MB
    """
    try:
        allowed_types = ALLOWED_IMAGE_TYPES + ALLOWED_VIDEO_TYPES
        if not validate_file(file, allowed_types, MAX_FILE_SIZE):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid file type. Allowed: Images ({', '.join(['.jpg', '.png', '.webp', '.gif'])}) or Videos ({', '.join(['.mp4', '.webm', '.ogg'])}). Max size: 50MB"
            )
        
        filename = save_uploaded_file(file, PROJECTS_DIR)
        file_url = f"/uploads/projects/{filename}"
        
        file_type = "image" if file.content_type in ALLOWED_IMAGE_TYPES else "video"
        
        return UploadResponse(
            success=True,
            message=f"{file_type.capitalize()} uploaded successfully",
            file_url=file_url,
            file_type=file.content_type,
            file_size=file.size or 0,
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Upload error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to upload file",
        )


@router.get("/uploads/projects/{filename}")
async def serve_project_file(filename: str):
    """Serve uploaded project files."""
    file_path = PROJECTS_DIR / filename
    if not file_path.exists():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="File not found",
        )
    return FileResponse(file_path)


@router.get("/skills", response_model=List[Skill], tags=["Skills"])
async def get_skills(category: str = None) -> List[Skill]:
    """
    Get all skills or filter by category.
    
    - **category**: Optional filter (Frontend, Backend, AI/ML, Tools)
    """
    if category:
        return [s for s in SKILLS_DATA if s.category.lower() == category.lower()]
    return SKILLS_DATA


@router.get("/experience", response_model=List[Experience], tags=["Experience"])
async def get_experience() -> List[Experience]:
    """Get all work experience."""
    return EXPERIENCE_DATA


@router.get("/about", response_model=AboutMe, tags=["About"])
async def get_about() -> AboutMe:
    """Get about me information."""
    return ABOUT_ME_DATA


@router.post("/contact", response_model=ContactResponse, tags=["Contact"])
async def submit_contact(message: ContactMessage) -> ContactResponse:
    """
    Submit a contact form message.
    
    This endpoint would typically:
    - Validate the message
    - Send an email notification
    - Store in database
    - Return success response
    """
    logger.info(f"Contact form submission from {message.name} ({message.email})")
    
    # In production, implement email sending and database storage here
    # For now, just return success
    
    return ContactResponse(
        success=True,
        message=f"Thank you, {message.name}! Your message has been received. I'll get back to you soon.",
    )


@router.post("/ai/chat", response_model=AIResponse, tags=["AI"])
async def ai_chat(query: AIQuery) -> AIResponse:
    """
    Chat with AI assistant about Shoaib's skills and experience.

    This endpoint uses Google Gemini API to answer questions about:
    - Technical skills and expertise
    - Work experience
    - Projects and portfolio
    - Availability and rates
    """
    from app.core.config import settings
    
    # System prompt for the AI assistant
    system_prompt = """You are an AI assistant for Shoaib Arshad, a Full Stack Developer
    based in Karachi, Pakistan. Answer questions about his skills, experience, and services
    in a friendly, professional manner.

    Key information about Shoaib:
    - Specializes in AI-powered web applications
    - Expert technologies: React, Next.js 15, TypeScript, Python, FastAPI, OpenAI API
    - Also skilled in: OpenAI Agents SDK, Tailwind CSS, PostgreSQL, MongoDB
    - Follows spec-driven development practices
    - Uses AI to accelerate development while maintaining code quality
    - Available for freelance projects and full-time opportunities
    - Contact: +92-300-2062669 | Shoaibarshad470@gmail.com

    Keep responses concise (2-4 sentences) unless more detail is requested.
    Be helpful and encourage potential clients to reach out via the contact form."""

    if not settings.gemini_api_key and not settings.openai_api_key:
        # Return a mock response if no API key is configured
        return AIResponse(
            response="""Hi! I'm Shoaib's AI assistant.

**About Shoaib:**
- Full Stack Developer based in Karachi, Pakistan
- Specializes in AI-powered applications
- Expert in React, Next.js 15, Python, FastAPI, and OpenAI API
- Passionate about spec-driven development and AI-driven development

**Skills:**
- Frontend: React, Next.js, TypeScript, Tailwind CSS
- Backend: Python, FastAPI, Node.js, PostgreSQL
- AI/ML: OpenAI API, OpenAI Agents SDK, Context Engineering, Prompt Engineering

**Contact:**
- Phone: +92-300-2062669
- Email: Shoaibarshad470@gmail.com

To enable full AI chat functionality, please configure the API keys in the backend .env file.""",
            conversation_history=query.conversation_history or [],
        )
    
    try:
        # Use Gemini API
        if settings.ai_model == "gemini" and settings.gemini_api_key:
            import google.generativeai as genai
            
            # Configure Gemini
            genai.configure(api_key=settings.gemini_api_key)
            
            # Create the model (using gemini-2.5-flash which is the latest)
            try:
                model = genai.GenerativeModel('gemini-2.5-flash')
            except Exception:
                # Fallback to gemini-1.5-flash if 2.5-flash is not available
                try:
                    model = genai.GenerativeModel('gemini-1.5-flash')
                except Exception:
                    # Final fallback to gemini-1.0-pro
                    model = genai.GenerativeModel('gemini-1.0-pro')
            
            # Generate content
            chat = model.start_chat(history=[])
            
            # Combine system prompt with user message
            full_message = f"{system_prompt}\n\nUser question: {query.message}"
            
            response = chat.send_message(full_message)
            
            ai_message = response.text
            
            # Update conversation history
            new_history = (query.conversation_history or []) + [
                {"role": "user", "content": query.message},
                {"role": "assistant", "content": ai_message},
            ]
            
            return AIResponse(
                response=ai_message,
                conversation_history=new_history[-10:],  # Keep last 10 messages
            )
        
        # Fallback to OpenAI if Gemini is not configured
        elif settings.openai_api_key:
            from openai import OpenAI
            
            client = OpenAI(api_key=settings.openai_api_key)
            
            messages = [
                {"role": "system", "content": system_prompt},
                *(query.conversation_history or []),
                {"role": "user", "content": query.message},
            ]
            
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=messages,
                max_tokens=500,
                temperature=0.7,
            )
            
            ai_message = response.choices[0].message.content
            
            # Update conversation history
            new_history = (query.conversation_history or []) + [
                {"role": "user", "content": query.message},
                {"role": "assistant", "content": ai_message},
            ]
            
            return AIResponse(
                response=ai_message,
                conversation_history=new_history[-10:],  # Keep last 10 messages
            )
        
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="No AI model configured. Please set up Gemini or OpenAI API key.",
            )
        
    except Exception as e:
        logger.error(f"AI API error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to get AI response: {str(e)}. Please try again later.",
        )
