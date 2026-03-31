"use client";

import { useEffect, useState } from "react";
import {
  Sparkles,
  Zap,
  Lightbulb,
  Rocket,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function AIDevelopment() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const benefits = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Faster Development",
      description: "AI-assisted coding reduces development time by 40-60%",
    },
    {
      icon: <Lightbulb className="h-5 w-5" />,
      title: "Smart Solutions",
      description: "Leveraging AI to find optimal solutions to complex problems",
    },
    {
      icon: <CheckCircle2 className="h-5 w-5" />,
      title: "Better Code Quality",
      description: "AI-powered code review and automated testing",
    },
    {
      icon: <Rocket className="h-5 w-5" />,
      title: "Rapid Prototyping",
      description: "Quick iteration and validation of ideas with AI assistance",
    },
  ];

  const workflow = [
    {
      step: "01",
      title: "Requirement Analysis",
      description: "AI helps break down requirements into actionable tasks",
    },
    {
      step: "02",
      title: "Architecture Design",
      description: "Generate architecture diagrams and component structures",
    },
    {
      step: "03",
      title: "Code Generation",
      description: "AI-assisted boilerplate and complex algorithm implementation",
    },
    {
      step: "04",
      title: "Code Review",
      description: "Automated review for bugs, security, and best practices",
    },
    {
      step: "05",
      title: "Testing",
      description: "AI-generated test cases for comprehensive coverage",
    },
    {
      step: "06",
      title: "Documentation",
      description: "Auto-generated docs and inline comments",
    },
  ];

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-600 dark:text-purple-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            AI-Driven Development
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How I Use <span className="gradient-text">AI</span> to Build Better
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I leverage AI tools and techniques to accelerate development while 
            maintaining high code quality and adhering to specifications.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="card-hover border-purple-500/20">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white mb-4">
                  {benefit.icon}
                </div>
                <CardTitle className="text-lg">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  {benefit.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Workflow */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">
            My AI-Enhanced Workflow
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflow.map((item, index) => (
              <div
                key={index}
                className="relative group p-6 rounded-lg border bg-card hover:border-purple-500/50 transition-colors"
              >
                <div className="absolute -top-3 -left-3 h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                  {item.step}
                </div>
                <h4 className="font-semibold mb-2 mt-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tools Section */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold mb-6">AI Tools I Use</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "OpenAI GPT-4",
              "OpenAI GPT-4o",
              "Claude 3/3.5",
              "Llama 3",
              "Google Gemini",
              "GitHub Copilot",
              "Cursor IDE",
              "Anthropic API",
              "Together AI",
            ].map((tool) => (
              <Badge
                key={tool}
                variant="outline"
                className="px-4 py-2 card-hover cursor-default"
              >
                {tool}
              </Badge>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button variant="outline" className="gap-2" asChild>
            <a href="#ai-chat">
              Try AI Chat
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function Badge({ variant, className, children }: any) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${
        variant === "outline"
          ? "border-border text-foreground"
          : "border-transparent bg-primary text-primary-foreground"
      } ${className || ""}`}
    >
      {children}
    </span>
  );
}
