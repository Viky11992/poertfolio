# 📤 Project Media Upload Guide

## Overview

The portfolio now supports uploading **images** and **videos** for projects. You can upload multiple media files per project and display them in a carousel.

---

## 🎯 Features

### **Supported File Types**
- **Images**: JPG, JPEG, PNG, WebP, GIF
- **Videos**: MP4, WebM, OGG

### **File Size Limit**
- Maximum **50MB** per file

### **Upload Locations**
- All files are saved to: `backend/uploads/projects/`
- Files are served at: `http://localhost:8000/uploads/projects/{filename}`

---

## 🚀 How to Upload Projects

### **Method 1: Using Admin Page (Recommended)**

1. **Navigate to Admin Upload Page**
   ```
   http://localhost:3000/admin/upload
   ```

2. **Fill in Project Details**
   - Title
   - Description
   - Technologies (comma-separated)
   - GitHub URL (optional)
   - Live Demo URL (optional)

3. **Upload Media**
   - Click the upload area or drag & drop files
   - Upload images and/or videos
   - First image becomes the main project image
   - Additional files appear in carousel

4. **Save Project**
   - Click "Save Project" button
   - Project is added to the portfolio

---

### **Method 2: Direct API Upload**

#### **Upload Image**
```bash
curl -X POST http://localhost:8000/api/upload/project-image \
  -F "file=@/path/to/image.jpg"
```

**Response:**
```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "file_url": "/uploads/projects/abc123.jpg",
  "file_type": "image/jpeg",
  "file_size": 245678
}
```

#### **Upload Video**
```bash
curl -X POST http://localhost:8000/api/upload/project-video \
  -F "file=@/path/to/video.mp4"
```

#### **Upload Any Media (Auto-detect)**
```bash
curl -X POST http://localhost:8000/api/upload/project-media \
  -F "file=@/path/to/file.jpg"
```

---

### **Method 3: Manually Add to Backend**

Edit `backend/app/api/routes.py`:

```python
Project(
    id=6,
    title="My Project",
    description="Description here...",
    technologies=["Next.js", "Python"],
    image_url="/projects/my-image.png",  # Main image
    video_url="/projects/demo.mp4",       # Optional video
    media_urls=[                          # Optional additional media
        "/projects/img1.png",
        "/projects/img2.png",
        "/projects/video2.mp4"
    ],
    github_url="https://github.com/...",
    live_url="https://...",
    featured=True,
),
```

Save your files in: `frontend/public/projects/`

---

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/upload/project-image` | Upload project image |
| POST | `/api/upload/project-video` | Upload project video |
| POST | `/api/upload/project-media` | Upload any media (auto-detect) |
| GET | `/uploads/projects/{filename}` | Serve uploaded file |
| POST | `/api/projects` | Create new project |
| PUT | `/api/projects/{id}` | Update existing project |

---

## 🎨 Frontend Display

Projects with media display in a **carousel**:
- **Multiple images/videos**: Navigation arrows appear
- **Video files**: Show play icon and "Video" badge
- **Media counter**: Shows current position (e.g., "2 / 5")
- **Hover effect**: Media scales slightly on hover
- **Video controls**: Built-in play/pause, volume, fullscreen

---

## 💡 Best Practices

### **Images**
- **Recommended size**: 1200x630px (16:9 aspect ratio)
- **Format**: PNG for screenshots, JPG for photos
- **Compression**: Use TinyPNG or Squoosh to reduce file size
- **Naming**: Use descriptive names (e.g., `project-dashboard.png`)

### **Videos**
- **Max length**: 2-3 minutes for demos
- **Resolution**: 720p or 1080p
- **Format**: MP4 (H.264 codec) for best compatibility
- **Compression**: Use HandBrake to reduce file size
- **Hosting alternative**: For large videos, use YouTube/Vimeo and embed

### **File Organization**
```
backend/uploads/projects/
├── abc123def456.jpg      # Auto-generated unique names
├── xyz789ghi012.mp4
└── ...
```

---

## 🔧 Troubleshooting

### **Upload Fails**
- Check file size (must be < 50MB)
- Verify file type is supported
- Ensure `backend/uploads/projects/` folder exists
- Check backend logs for errors

### **Media Not Displaying**
- Verify file exists in `backend/uploads/projects/`
- Check URL path is correct
- Restart backend server
- Clear browser cache

### **Video Not Playing**
- Ensure video format is MP4/WebM/OGG
- Check browser compatibility
- Verify file isn't corrupted
- Try re-encoding with HandBrake

---

## 📝 Example: Complete Project Upload

**Step 1: Upload Main Image**
```bash
curl -X POST http://localhost:8000/api/upload/project-image \
  -F "file=@dashboard.png"
# Returns: /uploads/projects/abc123.png
```

**Step 2: Upload Demo Video**
```bash
curl -X POST http://localhost:8000/api/upload/project-video \
  -F "file=@demo.mp4"
# Returns: /uploads/projects/xyz789.mp4
```

**Step 3: Create Project**
```bash
curl -X POST http://localhost:8000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "E-Commerce Dashboard",
    "description": "Analytics dashboard...",
    "technologies": ["Next.js", "FastAPI"],
    "image_url": "/uploads/projects/abc123.png",
    "video_url": "/uploads/projects/xyz789.mp4",
    "github_url": "https://github.com/...",
    "featured": true
  }'
```

---

## 🎯 Quick Reference

| Action | Location |
|--------|----------|
| Upload via UI | `/admin/upload` |
| Upload via API | `/api/upload/*` |
| Uploaded files | `backend/uploads/projects/` |
| Access files | `http://localhost:8000/uploads/projects/{filename}` |
| Create project | `/api/projects` (POST) |

---

**Need Help?** Email: Shoaibarshad470@gmail.com
