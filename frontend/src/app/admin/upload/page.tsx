"use client";

import { useState } from "react";
import { Upload, Image as ImageIcon, Video, Save } from "lucide-react";
import { ProjectMediaUploader } from "@/components/project-media-uploader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

export default function AdminUploadPage() {
  const { toast } = useToast();
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    technologies: "",
    githubUrl: "",
    liveUrl: "",
  });
  const [mediaUrls, setMediaUrls] = useState<{
    image?: string;
    video?: string;
    media?: string[];
  }>({});

  const handleMediaUpload = (urls: {
    image?: string;
    video?: string;
    media?: string[];
  }) => {
    setMediaUrls((prev) => ({ ...prev, ...urls }));
  };

  const handleSaveProject = async () => {
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: projectData.title,
          description: projectData.description,
          technologies: projectData.technologies
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t),
          github_url: projectData.githubUrl,
          live_url: projectData.liveUrl,
          image_url: mediaUrls.image,
          video_url: mediaUrls.video,
          media_urls: mediaUrls.media,
          featured: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save project");
      }

      toast({
        title: "Project Saved!",
        description: "Your project has been added successfully",
        variant: "success",
      });

      // Reset form
      setProjectData({
        title: "",
        description: "",
        technologies: "",
        githubUrl: "",
        liveUrl: "",
      });
      setMediaUrls({});
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save project. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">Upload Project</h1>
          <p className="text-muted-foreground">
            Add a new project to your portfolio with images and videos
          </p>
        </div>

        {/* Project Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Project Details
            </CardTitle>
            <CardDescription>
              Enter the basic information about your project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Project Title</label>
              <Input
                placeholder="My Awesome Project"
                value={projectData.title}
                onChange={(e) =>
                  setProjectData((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder="Describe your project..."
                rows={4}
                value={projectData.description}
                onChange={(e) =>
                  setProjectData((prev) => ({ ...prev, description: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Technologies (comma-separated)
              </label>
              <Input
                placeholder="Next.js, Python, FastAPI, OpenAI"
                value={projectData.technologies}
                onChange={(e) =>
                  setProjectData((prev) => ({ ...prev, technologies: e.target.value }))
                }
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">GitHub URL</label>
                <Input
                  placeholder="https://github.com/your-username/project"
                  value={projectData.githubUrl}
                  onChange={(e) =>
                    setProjectData((prev) => ({ ...prev, githubUrl: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Live Demo URL</label>
                <Input
                  placeholder="https://project-demo.com"
                  value={projectData.liveUrl}
                  onChange={(e) =>
                    setProjectData((prev) => ({ ...prev, liveUrl: e.target.value }))
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Media Upload */}
        <ProjectMediaUploader onMediaUpload={handleMediaUpload} />

        {/* Save Button */}
        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => {
              setProjectData({
                title: "",
                description: "",
                technologies: "",
                githubUrl: "",
                liveUrl: "",
              });
              setMediaUrls({});
            }}
          >
            Reset
          </Button>
          <Button onClick={handleSaveProject} className="gap-2">
            <Save className="h-4 w-4" />
            Save Project
          </Button>
        </div>

        {/* Preview */}
        {(mediaUrls.image || mediaUrls.video) && (
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {mediaUrls.image && (
                  <div>
                    <Badge className="mb-2">Main Image</Badge>
                    <img
                      src={mediaUrls.image}
                      alt="Preview"
                      className="w-full rounded-lg"
                    />
                  </div>
                )}
                {mediaUrls.video && (
                  <div>
                    <Badge className="mb-2">Video</Badge>
                    <video
                      src={mediaUrls.video}
                      controls
                      className="w-full rounded-lg"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Instructions
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p><strong>Supported Formats:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Images: JPG, PNG, WebP, GIF</li>
              <li>Videos: MP4, WebM, OGG</li>
            </ul>
            <p><strong>File Size Limit:</strong> 50MB per file</p>
            <p><strong>Tips:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Use high-quality images (recommended: 1200x630px)</li>
              <li>Keep videos under 2 minutes for better performance</li>
              <li>Compress large files before uploading</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
