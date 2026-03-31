# Shoaib Arshad - Portfolio Website

A modern, professional portfolio website built with Next.js 15, FastAPI, and AI integration.

![Portfolio Preview](./preview.png)

## 🚀 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful UI components
- **next-themes** - Dark/light mode support

### Backend
- **FastAPI** - Modern Python web framework
- **Python** - Backend logic and AI integration
- **OpenAI API** - AI chat functionality
- **Pydantic** - Data validation

### Features
- ✅ Modern, clean design with dark/light mode
- ✅ Fully responsive (mobile + desktop)
- ✅ Smooth animations and transitions
- ✅ AI-powered chat assistant
- ✅ Contact form with validation
- ✅ SEO optimized
- ✅ Type-safe codebase
- ✅ RESTful API endpoints

## 📁 Project Structure

```
portfolio/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── api/            # API routes
│   │   ├── core/           # Configuration
│   │   ├── models/         # Database models
│   │   ├── schemas/        # Pydantic schemas
│   │   └── main.py         # Application entry
│   ├── requirements.txt    # Python dependencies
│   └── .env.example        # Environment template
│
├── frontend/               # Next.js frontend
│   ├── src/
│   │   ├── app/           # App Router pages
│   │   ├── components/    # React components
│   │   │   ├── sections/  # Page sections
│   │   │   └── ui/        # UI components
│   │   └── lib/           # Utilities & API
│   ├── package.json       # Node dependencies
│   └── .env.example       # Environment template
│
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.9+
- **OpenAI API Key** (optional, for AI chat)

### 1. Clone the Repository

```bash
cd portfolio
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file from example
copy .env.example .env   # Windows
# or
cp .env.example .env     # macOS/Linux

# Edit .env and add your OpenAI API key (optional)
# OPENAI_API_KEY=your_key_here
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Create .env.local file from example
copy .env.example .env.local   # Windows
# or
cp .env.example .env.local     # macOS/Linux
```

### 4. Running the Application

#### Option A: Run Both (Recommended)

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
# Activate venv if not already activated
uvicorn app.main:app --reload --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

#### Option B: Using npm scripts

```bash
# From project root, install concurrently if needed
npm install -g concurrently

# Run both servers
concurrently "cd backend && uvicorn app.main:app --reload" "cd frontend && npm run dev"
```

### 5. Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000
- **API Documentation:** http://localhost:8000/api/docs

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | Get all projects |
| GET | `/api/projects?featured_only=true` | Get featured projects |
| GET | `/api/projects/{id}` | Get project by ID |
| GET | `/api/skills` | Get all skills |
| GET | `/api/skills?category=Frontend` | Get skills by category |
| GET | `/api/experience` | Get work experience |
| GET | `/api/about` | Get about info |
| POST | `/api/contact` | Submit contact form |
| POST | `/api/ai/chat` | Chat with AI assistant |

## 🎨 Customization

### Update Personal Information

1. **Backend Data** - Edit `backend/app/api/routes.py`:
   - `PROJECTS_DATA` - Your projects
   - `SKILLS_DATA` - Your skills
   - `EXPERIENCE_DATA` - Your work history
   - `ABOUT_ME_DATA` - Your bio

2. **Frontend Content** - Edit component files in `frontend/src/components/sections/`:
   - Update social media links in `navigation.tsx` and `footer.tsx`
   - Modify section content as needed

3. **Environment Variables**:
   - Backend: `backend/.env`
   - Frontend: `frontend/.env.local`

### Adding Your Resume

Place your resume PDF at `frontend/public/resume.pdf`

### Changing Theme Colors

Edit `frontend/src/app/globals.css` to modify CSS variables for light/dark themes.

## 🚀 Deployment

### Backend (FastAPI)

**Option 1: Railway**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy
railway init
railway up
```

**Option 2: Render**
1. Create new Web Service on Render
2. Connect your repository
3. Set build command: `pip install -r backend/requirements.txt`
4. Set start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

**Option 3: Docker**
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY backend/requirements.txt .
RUN pip install -r requirements.txt
COPY backend/ .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Frontend (Next.js)

**Vercel (Recommended):**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel
```

**Netlify:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd frontend
netlify deploy --prod
```

## 🧪 Testing

### Backend
```bash
cd backend
pytest  # Add tests in backend/tests/
```

### Frontend
```bash
cd frontend
npm run lint
npm run build
```

## 📝 Environment Variables

### Backend (.env)
```env
OPENAI_API_KEY=your_openai_api_key
HOST=0.0.0.0
PORT=8000
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
APP_NAME="Shoaib Arshad Portfolio API"
DEBUG=true
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_SITE_NAME="Shoaib Arshad - Portfolio"
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🤝 Contributing

This is a personal portfolio, but feel free to fork and customize for your own use!

## 📄 License

MIT License - Feel free to use this template for your own portfolio.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenAI](https://openai.com/)

---

**Built with ❤️ by Shoaib Arshad**

For questions or collaborations, reach out at [Shoaibarshad470@gmail.com](mailto:Shoaibarshad470@gmail.com)
