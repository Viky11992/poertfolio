"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink, Github, Star, Folder, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { api, type Project } from "@/lib/api";

export function Projects() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "featured">("all");
  const [mediaIndex, setMediaIndex] = useState<Record<number, number>>({});

  useEffect(() => {
    api
      .getProjects(filter === "featured")
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [filter]);

  const toggleFilter = () => {
    setFilter(filter === "all" ? "featured" : "all");
  };

  const getMediaItems = (project: Project) => {
    const items: Array<{ url: string; type: "image" | "video" }> = [];
    if (project.image_url) items.push({ url: project.image_url, type: "image" });
    if (project.video_url) items.push({ url: project.video_url, type: "video" });
    if (project.media_urls) {
      project.media_urls.forEach((url) => {
        const isVideo = url.endsWith(".mp4") || url.endsWith(".webm");
        items.push({ url, type: isVideo ? "video" : "image" });
      });
    }
    return items;
  };

  const getCurrentMedia = (project: Project) => {
    const mediaItems = getMediaItems(project);
    const currentIndex = mediaIndex[project.id] || 0;
    return mediaItems[currentIndex] || null;
  };

  const nextMedia = (projectId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setMediaIndex((prev) => {
      const project = projects.find((p) => p.id === projectId);
      if (!project) return prev;
      const mediaItems = getMediaItems(project);
      const currentIndex = prev[projectId] || 0;
      const nextIndex = (currentIndex + 1) % mediaItems.length;
      return { ...prev, [projectId]: nextIndex };
    });
  };

  const prevMedia = (projectId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setMediaIndex((prev) => {
      const project = projects.find((p) => p.id === projectId);
      if (!project) return prev;
      const mediaItems = getMediaItems(project);
      const currentIndex = prev[projectId] || 0;
      const prevIndex = currentIndex === 0 ? mediaItems.length - 1 : currentIndex - 1;
      return { ...prev, [projectId]: prevIndex };
    });
  };

  const handleCardClick = (projectId: number) => {
    router.push(`/projects/${projectId}`);
  };

  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            A showcase of my work, from AI-powered applications to full-stack solutions
          </p>

          {/* Filter Toggle */}
          <Button variant="outline" onClick={toggleFilter} className="gap-2">
            <Folder className="h-4 w-4" />
            {filter === "all" ? "Show Featured Only" : "Show All Projects"}
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center text-muted-foreground py-16">
            No projects found.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              const currentMedia = getCurrentMedia(project);
              const mediaItems = getMediaItems(project);
              const hasMultipleMedia = mediaItems.length > 1;

              return (
                <Card
                  key={project.id}
                  className="card-hover overflow-hidden group flex flex-col h-full cursor-pointer"
                  onClick={() => handleCardClick(project.id)}
                >
                  <CardHeader className="pb-4">
                    {/* Project Media (Image/Video) */}
                    <div className="relative aspect-video bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-lg mb-4 overflow-hidden group-hover:cursor-pointer">
                      {currentMedia ? (
                        <>
                          {currentMedia.type === "video" ? (
                            <video
                              src={currentMedia.url}
                              className="w-full h-full object-cover"
                              controls
                            />
                          ) : (
                            <img
                              src={currentMedia.url}
                              alt={project.title}
                              className="w-full h-full object-contain bg-black/5"
                            />
                          )}
                          
                          {/* Navigation Arrows */}
                          {hasMultipleMedia && (
                            <>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-black/50 hover:bg-black/70"
                                onClick={(e) => prevMedia(project.id, e)}
                              >
                                <ChevronLeft className="h-4 w-4 text-white" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-black/50 hover:bg-black/70"
                                onClick={(e) => nextMedia(project.id, e)}
                              >
                                <ChevronRight className="h-4 w-4 text-white" />
                              </Button>
                            </>
                          )}

                          {/* Media Type Badge */}
                          {currentMedia.type === "video" && (
                            <Badge className="absolute bottom-2 right-2 bg-black/70">
                              <Play className="h-3 w-3 mr-1" />
                              Video
                            </Badge>
                          )}

                          {/* Media Counter */}
                          {hasMultipleMedia && (
                            <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                              {(mediaIndex[project.id] || 0) + 1} / {mediaItems.length}
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <Folder className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-xl line-clamp-1">
                        {project.title}
                      </CardTitle>
                      {project.featured && (
                        <Badge variant="secondary" className="flex-shrink-0">
                          <Star className="h-3 w-3 mr-1 fill-yellow-500 text-yellow-500" />
                          Featured
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="flex-grow">
                    <CardDescription className="text-sm mb-4 line-clamp-3">
                      {project.description}
                    </CardDescription>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 4}
                        </Badge>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter className="pt-4 border-t">
                  <div className="flex gap-2 w-full">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(project.id);
                      }}
                    >
                      View Details
                    </Button>
                    {project.github_url && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-2"
                        asChild
                        onClick={(e) => e.stopPropagation()}
                      >
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-4 w-4" />
                          Code
                        </a>
                      </Button>
                    )}
                    {project.live_url && (
                      <Button
                        size="sm"
                        className="flex-1 gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
                        asChild
                        onClick={(e) => e.stopPropagation()}
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
                      <span className="text-sm text-muted-foreground">
                        Private project
                      </span>
                    )}
                  </div>
                </CardFooter>
              </Card>
            );
          })}
          </div>
        )}

        {/* View More CTA */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <a
              href="https://github.com/Viky11992"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4 mr-2" />
              View More on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
