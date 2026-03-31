"use client";

import { useState, useRef } from "react";
import { Upload, X, Image, Video, Loader2, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

interface MediaFile {
  id: string;
  file: File;
  preview: string;
  type: "image" | "video";
  uploadProgress: number;
  uploaded: boolean;
  url?: string;
}

interface ProjectMediaUploaderProps {
  onMediaUpload: (urls: { image?: string; video?: string; media?: string[] }) => void;
  initialImage?: string;
  initialVideo?: string;
  initialMedia?: string[];
}

export function ProjectMediaUploader({
  onMediaUpload,
  initialImage,
  initialVideo,
  initialMedia,
}: ProjectMediaUploaderProps) {
  const { toast } = useToast();
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | undefined>(initialImage);
  const [uploadedVideo, setUploadedVideo] = useState<string | undefined>(initialVideo);
  const [uploadedMedia, setUploadedMedia] = useState<string[]>(initialMedia || []);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");

      if (!isImage && !isVideo) {
        toast({
          title: "Invalid File",
          description: "Please upload only images or videos",
          variant: "destructive",
        });
        return;
      }

      const preview = isVideo ? "/video-placeholder.png" : URL.createObjectURL(file);
      
      const newFile: MediaFile = {
        id: Math.random().toString(36).substring(7),
        file,
        preview,
        type: isImage ? "image" : "video",
        uploadProgress: 0,
        uploaded: false,
      };

      setMediaFiles((prev) => [...prev, newFile]);
    });

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (id: string) => {
    setMediaFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const uploadFile = async (mediaFile: MediaFile): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", mediaFile.file);

    const endpoint = mediaFile.type === "video" 
      ? "/api/upload/project-video" 
      : "/api/upload/project-image";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      return data.file_url;
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload file. Please try again.",
        variant: "destructive",
      });
      return null;
    }
  };

  const handleUpload = async () => {
    setUploading(true);
    const newImageUrls: string[] = [];
    const newVideoUrls: string[] = [];

    for (const mediaFile of mediaFiles) {
      // Simulate progress
      for (let i = 0; i <= 100; i += 10) {
        setMediaFiles((prev) =>
          prev.map((f) =>
            f.id === mediaFile.id ? { ...f, uploadProgress: i } : f
          )
        );
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      const url = await uploadFile(mediaFile);
      if (url) {
        if (mediaFile.type === "image") {
          if (!uploadedImage) {
            setUploadedImage(url);
          } else {
            newImageUrls.push(url);
          }
        } else {
          if (!uploadedVideo) {
            setUploadedVideo(url);
          } else {
            newVideoUrls.push(url);
          }
        }

        setMediaFiles((prev) =>
          prev.map((f) =>
            f.id === mediaFile.id ? { ...f, uploaded: true, url } : f
          )
        );
      }
    }

    // Notify parent component
    onMediaUpload({
      image: uploadedImage,
      video: uploadedVideo || newVideoUrls[0],
      media: [...uploadedMedia, ...newImageUrls, ...newVideoUrls],
    });

    // Remove uploaded files
    setMediaFiles((prev) => prev.filter((f) => !f.uploaded));
    setUploading(false);

    toast({
      title: "Upload Complete",
      description: `${mediaFiles.length} file(s) uploaded successfully`,
      variant: "success",
    });
  };

  const removeUploadedMedia = async (url: string, type: "image" | "video" | "media") => {
    if (type === "image") {
      setUploadedImage(undefined);
    } else if (type === "video") {
      setUploadedVideo(undefined);
    } else {
      setUploadedMedia((prev) => prev.filter((u) => u !== url));
    }

    onMediaUpload({
      image: type === "image" ? undefined : uploadedImage,
      video: type === "video" ? undefined : uploadedVideo,
      media: uploadedMedia.filter((u) => u !== url),
    });

    toast({
      title: "Removed",
      description: "Media removed successfully",
    });
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Project Media</CardTitle>
          <CardDescription>
            Upload images and videos for your project (Max 50MB per file)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Drop Zone */}
            <div
              className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground mb-2">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">
                Images: JPG, PNG, WebP, GIF | Videos: MP4, WebM, OGG
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {/* Files to Upload */}
            {mediaFiles.length > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">
                    Files to upload ({mediaFiles.length})
                  </p>
                  <Button
                    size="sm"
                    onClick={handleUpload}
                    disabled={uploading}
                    className="gap-2"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4" />
                        Upload All
                      </>
                    )}
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {mediaFiles.map((file) => (
                    <div
                      key={file.id}
                      className="relative border rounded-lg overflow-hidden group"
                    >
                      {file.type === "image" ? (
                        <img
                          src={file.preview}
                          alt="Preview"
                          className="w-full h-32 object-cover"
                        />
                      ) : (
                        <div className="w-full h-32 bg-muted flex items-center justify-center">
                          <Video className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}

                      {/* Progress Bar */}
                      {file.uploadProgress > 0 && file.uploadProgress < 100 && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
                          <div
                            className="h-full bg-primary transition-all"
                            style={{ width: `${file.uploadProgress}%` }}
                          />
                        </div>
                      )}

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFile(file.id)}
                        className="absolute top-2 right-2 p-1 bg-destructive text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>

                      {/* Type Badge */}
                      <Badge
                        variant="secondary"
                        className="absolute top-2 left-2"
                      >
                        {file.type === "image" ? (
                          <Image className="h-3 w-3 mr-1" />
                        ) : (
                          <Video className="h-3 w-3 mr-1" />
                        )}
                        {file.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Uploaded Media */}
            {(uploadedImage || uploadedVideo || uploadedMedia.length > 0) && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Uploaded Media</p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {/* Main Image */}
                  {uploadedImage && (
                    <div className="relative border rounded-lg overflow-hidden group">
                      <img
                        src={uploadedImage}
                        alt="Project"
                        className="w-full h-32 object-cover"
                      />
                      <Badge className="absolute top-2 left-2">
                        <Image className="h-3 w-3 mr-1" />
                        Main Image
                      </Badge>
                      <button
                        onClick={() => removeUploadedMedia(uploadedImage, "image")}
                        className="absolute top-2 right-2 p-1 bg-destructive text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}

                  {/* Video */}
                  {uploadedVideo && (
                    <div className="relative border rounded-lg overflow-hidden group">
                      <video
                        src={uploadedVideo}
                        className="w-full h-32 object-cover"
                        controls
                      />
                      <Badge className="absolute top-2 left-2">
                        <Video className="h-3 w-3 mr-1" />
                        Video
                      </Badge>
                      <button
                        onClick={() => removeUploadedMedia(uploadedVideo, "video")}
                        className="absolute top-2 right-2 p-1 bg-destructive text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}

                  {/* Additional Media */}
                  {uploadedMedia.map((url, index) => (
                    <div
                      key={url}
                      className="relative border rounded-lg overflow-hidden group"
                    >
                      {url.endsWith(".mp4") || url.endsWith(".webm") ? (
                        <video src={url} className="w-full h-32 object-cover" controls />
                      ) : (
                        <img src={url} alt={`Media ${index}`} className="w-full h-32 object-cover" />
                      )}
                      <button
                        onClick={() => removeUploadedMedia(url, "media")}
                        className="absolute top-2 right-2 p-1 bg-destructive text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
