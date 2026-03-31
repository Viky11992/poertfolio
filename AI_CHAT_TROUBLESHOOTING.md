# 🤖 AI Chat Bot Troubleshooting Guide

## Issue: AI Chat Bot Not Working

### 🔍 Common Causes & Solutions

---

## 1️⃣ Backend Server Not Running

**Problem:** The backend FastAPI server is not running.

**Solution:**
```bash
cd D:\portfolio\backend

# Activate virtual environment
venv\Scripts\activate  # Windows
# or
source venv/bin/activate  # macOS/Linux

# Start the server
uvicorn app.main:app --reload
```

**Expected Output:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete.
```

---

## 2️⃣ Check Backend API

**Test the AI Chat Endpoint:**

Open browser and go to:
```
http://localhost:8000/api/ai/chat
```

Or use curl:
```bash
curl -X POST http://localhost:8000/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello"}'
```

**Expected Response:**
```json
{
  "response": "Hi! I'm Shoaib's AI assistant...",
  "conversation_history": []
}
```

---

## 3️⃣ OpenAI API Key Not Configured

**Problem:** OpenAI API key is missing in backend `.env` file.

**Solution:**

1. Open `backend/.env`
2. Add your OpenAI API key:
```env
OPENAI_API_KEY=sk-your-actual-api-key-here
```

3. Restart backend server

**Get API Key:** https://platform.openai.com/api-keys

---

## 4️⃣ CORS Issues

**Problem:** Frontend can't connect to backend due to CORS.

**Solution:**

Check `backend/.env`:
```env
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

Make sure frontend is running on port 3000.

---

## 5️⃣ Frontend API URL Incorrect

**Problem:** Frontend is trying to connect to wrong URL.

**Solution:**

Check `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

Restart frontend after changing:
```bash
cd D:\portfolio\frontend
npm run dev
```

---

## 6️⃣ Check Browser Console

**Open Developer Tools:**
- Press `F12` or `Ctrl+Shift+I`
- Go to "Console" tab
- Look for errors

**Common Errors:**
- `Failed to fetch` → Backend not running
- `CORS policy` → CORS configuration issue
- `404 Not Found` → Wrong API endpoint
- `500 Internal Server Error` → Backend error

---

## 7️⃣ Test Backend Connection

**Create Test File:** `test-backend.js`

```javascript
fetch('http://localhost:8000/api/health')
  .then(res => res.json())
  .then(data => console.log('Backend is running:', data))
  .catch(err => console.error('Backend error:', err));
```

Run in browser console or Node.js.

---

## ✅ Quick Fix Checklist

- [ ] Backend server running on port 8000
- [ ] Frontend server running on port 3000
- [ ] OpenAI API key added to `backend/.env`
- [ ] `NEXT_PUBLIC_API_URL` set in `frontend/.env.local`
- [ ] No CORS errors in browser console
- [ ] Backend `/api/health` endpoint responds
- [ ] Backend `/api/ai/chat` endpoint responds

---

## 🧪 Test Each Endpoint

### Backend Health Check:
```
GET http://localhost:8000/health
```

**Expected:**
```json
{"status": "healthy", "api_version": "1.0.0"}
```

### AI Chat (without API key):
```
POST http://localhost:8000/api/ai/chat
{"message": "Hello"}
```

**Expected:** Mock response

### AI Chat (with API key):
```
POST http://localhost:8000/api/ai/chat
{"message": "What is Shoaib's expertise?"}
```

**Expected:** Real AI response

---

## 🔧 Restart Everything

**Complete Restart:**

```bash
# Stop both servers (Ctrl+C)

# 1. Restart Backend
cd D:\portfolio\backend
venv\Scripts\activate
uvicorn app.main:app --reload

# 2. In new terminal, restart Frontend
cd D:\portfolio\frontend
npm run dev
```

---

## 📝 Debug Mode

**Enable Debug Logging:**

In `backend/.env`:
```env
DEBUG=true
```

Check backend logs for errors.

---

## 🆘 Still Not Working?

### Check These Files:
1. `backend/.env` - OpenAI API key
2. `frontend/.env.local` - API URL
3. Browser console - Error messages
4. Backend terminal - Error logs

### Common Error Messages:

**"Failed to fetch"**
→ Backend not running or wrong URL

**"OpenAI API key is not configured"**
→ Add API key to `backend/.env`

**"Network request failed"**
→ Check firewall/antivirus

**"CORS policy"**
→ Update `ALLOWED_ORIGINS` in `backend/.env`

---

## 💡 Without OpenAI API Key

The chat bot will work in **mock mode** without an API key:
- Shows predefined responses
- Still demonstrates functionality
- Displays message about API key

**Mock Response:**
```
Hi! I'm Shoaib's AI assistant. Currently, the OpenAI API key 
is not configured, so I can't provide intelligent responses...
```

---

## 🎯 Working Setup Example

**Backend (.env):**
```env
OPENAI_API_KEY=sk-...your-key-here
HOST=0.0.0.0
PORT=8000
ALLOWED_ORIGINS=http://localhost:3000
DEBUG=true
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Run Commands:**
```bash
# Terminal 1 - Backend
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload

# Terminal 2 - Frontend
cd frontend
npm run dev
```

**Access:**
- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/api/docs

---

**Need Help?** Email: Shoaibarshad470@gmail.com
