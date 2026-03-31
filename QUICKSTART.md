# Quick Start Guide

## Get Up and Running in 5 Minutes

### Step 1: Install Dependencies

```bash
# Install root dependencies (for running both servers together)
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend

# Windows:
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

# macOS/Linux:
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Step 2: Configure Environment Variables

The `.env` files are already created with default values. If you want to use OpenAI API:

1. Open `backend/.env`
2. Replace `your_openai_api_key_here` with your actual OpenAI API key

```
OPENAI_API_KEY=sk-your-actual-api-key
```

### Step 3: Run the Application

**Option A: Run Both Servers Together (Recommended)**

From the project root:
```bash
npm run dev
```

**Option B: Run Servers Separately**

Terminal 1 (Backend):
```bash
cd backend
# Activate venv first if not already activated
uvicorn app.main:app --reload
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

### Step 4: Open Your Browser

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000
- **API Docs:** http://localhost:8000/api/docs

## Troubleshooting

### Port Already in Use

If port 3000 or 8000 is already in use:

**Frontend (port 3000):**
```bash
# frontend/.env.local
NEXT_PUBLIC_SITE_URL=http://localhost:3001
# Then run: npm run dev -- -p 3001
```

**Backend (port 8000):**
```bash
# backend/.env
PORT=8001
# Then run: uvicorn app.main:app --reload --port 8001
```

### Module Not Found Errors

**Frontend:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

**Backend:**
```bash
cd backend
# Deactivate and reactivate venv
deactivate
python -m venv venv
# Windows: venv\Scripts\activate
# macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
```

### API Connection Issues

Make sure the backend is running on port 8000 and check `frontend/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Next Steps

1. **Customize Content**: Edit `backend/app/api/routes.py` to update your projects, skills, and experience
2. **Add Resume**: Place your resume PDF at `frontend/public/resume.pdf`
3. **Update Social Links**: Edit `frontend/src/components/navigation.tsx` and `footer.tsx`
4. **Deploy**: Follow the deployment instructions in README.md

## Testing the AI Chat

The AI chat feature works in two modes:

1. **Mock Mode** (without OpenAI API key): Returns predefined responses
2. **Full Mode** (with OpenAI API key): Uses GPT-3.5 for intelligent responses

To test with OpenAI:
1. Add your API key to `backend/.env`
2. Restart the backend server
3. Navigate to the "Ask Me Anything" section on the website

---

**Need Help?** Check the full README.md for detailed documentation.
