"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Calendar,
  Tag,
  Play,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api, type Project } from "@/lib/api";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [mediaIndex, setMediaIndex] = useState(0);

  const projectId = parseInt(params.id as string);

  useEffect(() => {
    if (projectId) {
      api
        .getProject(projectId)
        .then(setProject)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [projectId]);

  const getMediaItems = () => {
    if (!project) return [];
    const items: Array<{ url: string; type: "image" | "video" }> = [];
    if (project.image_url)
      items.push({ url: project.image_url, type: "image" });
    if (project.video_url)
      items.push({ url: project.video_url, type: "video" });
    if (project.media_urls) {
      project.media_urls.forEach((url) => {
        const isVideo = url.endsWith(".mp4") || url.endsWith(".webm");
        items.push({ url, type: isVideo ? "video" : "image" });
      });
    }
    return items;
  };

  const mediaItems = getMediaItems();
  const currentMedia = mediaItems[mediaIndex];
  const hasMultipleMedia = mediaItems.length > 1;

  const nextMedia = () => {
    setMediaIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const prevMedia = () => {
    setMediaIndex((prev) =>
      prev === 0 ? mediaItems.length - 1 : prev - 1
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <Button onClick={() => router.push("/#projects")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/80 backdrop-blur-lg z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/#projects")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">{project.title}</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Media Gallery */}
          <Card>
            <CardContent className="p-0">
              <div className="relative aspect-video bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20">
                {currentMedia ? (
                  <>
                    {currentMedia.type === "video" ? (
                      <video
                        src={currentMedia.url}
                        className="w-full h-full object-cover"
                        controls
                        autoPlay
                        loop
                      />
                    ) : (
                      <img
                        src={currentMedia.url}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    )}

                    {/* Navigation */}
                    {hasMultipleMedia && (
                      <>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 bg-black/50 hover:bg-black/70"
                          onClick={prevMedia}
                        >
                          <ChevronLeft className="h-6 w-6 text-white" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 bg-black/50 hover:bg-black/70"
                          onClick={nextMedia}
                        >
                          <ChevronRight className="h-6 w-6 text-white" />
                        </Button>

                        {/* Media Counter */}
                        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1.5 rounded-full text-sm">
                          {mediaIndex + 1} / {mediaItems.length}
                        </div>
                      </>
                    )}

                    {/* Video Badge */}
                    {currentMedia.type === "video" && (
                      <Badge className="absolute top-4 right-4 bg-black/70">
                        <Play className="h-3 w-3 mr-1" />
                        Video
                      </Badge>
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Tag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        No media available
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Project Info */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              {/* Title & Featured Badge */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
                  {project.featured && (
                    <Badge className="bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500">
                      <Star className="h-3 w-3 mr-1 fill-yellow-500" />
                      Featured Project
                    </Badge>
                  )}
                </div>
              </div>

              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">About the Project</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground leading-relaxed">
                  {project.description}
                </CardContent>
              </Card>

              {/* Technologies */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Technologies Used</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="px-4 py-2 text-sm"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Action Buttons */}
              <Card>
                <CardHeader>
                  <CardTitle>Project Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {project.github_url && (
                    <Button className="w-full gap-2" asChild>
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4" />
                        View Code
                      </a>
                    </Button>
                  )}
                  {project.live_url && (
                    <Button
                      className="w-full gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      asChild
                    >
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  {!project.github_url && !project.live_url && (
                    <p className="text-sm text-muted-foreground text-center">
                      Private project - Not publicly available
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Project Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {project.featured ? "Featured" : "Standard"} Project
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <span>{project.technologies.length} Technologies</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Play className="h-4 w-4 text-muted-foreground" />
                    <span>{mediaItems.length} Media Files</span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Navigation */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Navigation</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push("/#projects")}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to All Projects
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>
            Interested in this project?{" "}
            <a
              href="/#contact"
              className="text-primary hover:underline font-medium"
            >
              Get in touch
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
