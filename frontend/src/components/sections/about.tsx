"use client";

import NextImage from "next/image";
import { useEffect, useState } from "react";
import { User, Code, Brain, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function About() {
  const [mounted, setMounted] = useState(false);
  const [hasImage, setHasImage] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if profile image exists
    const img = new (window as any).Image();
    img.onload = () => setHasImage(true);
    img.onerror = () => setHasImage(false);
    img.src = "/images/profile.jpg";
  }, []);

  if (!mounted) return null;

  // Use profile.jpg if it exists, otherwise use the SVG placeholder
  const profileImageSrc = hasImage ? "/images/profile.jpg" : "/images/profile.svg";

  const highlights = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Full Stack Expert",
      description: "5+ years building modern web applications",
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI Integration",
      description: "Specialized in OpenAI API & Agents SDK",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "AI-Driven Development",
      description: "Leveraging AI to accelerate development",
    },
    {
      icon: <User className="h-6 w-6" />,
      title: "Spec-Driven Approach",
      description: "Strict adherence to requirements & architecture",
    },
  ];

  return (
    <section id="about" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              About <span className="gradient-text">Me</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Passionate about creating intelligent solutions that make a difference
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image/Avatar */}
            <div className="relative">
              <div className="aspect-[2/3] max-w-md mx-auto relative">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl transform rotate-6" />

                {/* Avatar - Image or Initials */}
                {hasImage ? (
                  <div className="relative h-full w-full rounded-2xl shadow-2xl overflow-hidden">
                    <NextImage
                      src="/images/profile.jpg"
                      alt="Shoaib Arshad"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 256px, 512px"
                      priority
                      quality={90}
                    />
                  </div>
                ) : (
                  <div className="relative h-full w-full rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white text-8xl font-bold">SA</span>
                  </div>
                )}

                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 bg-card border rounded-lg p-3 shadow-lg animate-float">
                  <span className="text-2xl">🚀</span>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-card border rounded-lg p-3 shadow-lg animate-float delay-500">
                  <span className="text-2xl">💡</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Hi, I'm Shoaib Arshad 👋
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                I'm a passionate Full Stack Developer with expertise in building 
                modern, scalable web applications powered by artificial intelligence. 
                My journey in tech started with curiosity about how websites work, 
                and it has evolved into a career where I get to solve complex 
                problems using cutting-edge technologies.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                I specialize in combining traditional full-stack development with 
                AI capabilities, creating intelligent applications that not only 
                function flawlessly but also adapt and learn from user interactions.
              </p>

              {/* Highlights Grid */}
              <div className="grid grid-cols-2 gap-4">
                {highlights.map((item, index) => (
                  <Card key={index} className="card-hover border-muted">
                    <CardContent className="p-4">
                      <div className="text-primary mb-2">{item.icon}</div>
                      <h4 className="font-semibold text-sm mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
