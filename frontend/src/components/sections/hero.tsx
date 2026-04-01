"use client";

import { useEffect, useState } from "react";
import { ArrowDown, Github, Linkedin, Mail, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-start relative overflow-hidden pt-32 pb-16"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-500/5 dark:via-purple-500/5 dark:to-pink-500/5" />

      {/* Animated background elements */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float delay-1000" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Greeting Badge */}
          <Badge
            variant="secondary"
            className="mb-6 px-4 py-2 text-sm animate-fade-in"
          >
            👋 Hello, I'm
          </Badge>

          {/* Name */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in">
            <span className="gradient-text">Shoaib Arshad</span>
          </h1>

          {/* Title */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
            Full Stack Developer | AI-Powered Applications Specialist
          </p>

          {/* Location */}
          <p className="text-muted-foreground mb-8 flex items-center justify-center gap-2 animate-fade-in">
            <span className="text-2xl">📍</span> Karachi, Pakistan
          </p>

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            I build intelligent web applications that combine cutting-edge AI
            with modern full-stack development. Specializing in Next.js, Python,
            FastAPI, OpenAI API, and OpenAI Agents SDK with multi-model AI integration.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in">
            <Button size="lg" className="gap-2" asChild>
              <a href="#contact">
                Get In Touch
                <Mail className="h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="gap-2" asChild>
              <a href="#projects">
                View Projects
                <ArrowDown className="h-4 w-4" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="gap-2"
              asChild
            >
              <a
                href="https://linkedin.com/in/shoaibarshad92/"
                target="_blank"
                rel="noopener noreferrer"
              >
                View LinkedIn
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 animate-fade-in">
            <Button variant="ghost" size="icon" className="rounded-full" asChild>
              <a
                href="https://github.com/Viky11992"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-6 w-6" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full" asChild>
              <a
                href="https://www.linkedin.com/in/shoaibarshad92/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full" asChild>
              <a href="mailto:Shoaibarshad470@gmail.com">
                <Mail className="h-6 w-6" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  );
}
