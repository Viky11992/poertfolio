"use client";

import { useEffect, useState } from "react";
import {
  FileText,
  Target,
  Shield,
  Layers,
  GitBranch,
  ClipboardCheck,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function SpecDriven() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const principles = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Clear Specifications",
      description:
        "Every project starts with detailed requirements documentation. I work closely with clients to understand exact needs before writing a single line of code.",
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Architecture First",
      description:
        "I design system architecture upfront, defining components, data flow, and APIs. This ensures scalability and maintainability from day one.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Type Safety",
      description:
        "Using TypeScript and Python type hints to catch errors early. Type-safe code is self-documenting and reduces runtime bugs significantly.",
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: "Clean Code",
      description:
        "Following SOLID principles, DRY, and design patterns. Code is written to be read by humans, not just executed by machines.",
    },
    {
      icon: <GitBranch className="h-6 w-6" />,
      title: "Version Control",
      description:
        "Git workflows with meaningful commits, feature branches, and PR reviews. Every change is tracked and documented.",
    },
    {
      icon: <ClipboardCheck className="h-6 w-6" />,
      title: "Testing",
      description:
        "Comprehensive test coverage including unit, integration, and E2E tests. Tests are written alongside features, not as an afterthought.",
    },
  ];

  const benefits = [
    "Reduced bugs and technical debt",
    "Faster onboarding for new team members",
    "Easier maintenance and updates",
    "Clear project milestones and deliverables",
    "Better client communication and expectations",
    "Scalable and extensible codebase",
  ];

  return (
    <section className="py-20 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <FileText className="h-4 w-4" />
            Spec-Driven Development
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Building with <span className="gradient-text">Precision</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            While I leverage AI for speed, I never compromise on following 
            specifications, architecture, and client requirements.
          </p>
        </div>

        {/* Principles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {principles.map((principle, index) => (
            <Card
              key={index}
              className="card-hover border-blue-500/20 h-full"
            >
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white mb-4">
                  {principle.icon}
                </div>
                <CardTitle className="text-lg">{principle.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {principle.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Two column layout */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Benefits List */}
          <div>
            <h3 className="text-2xl font-bold mb-6">
              Why Spec-Driven Development?
            </h3>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="h-4 w-4 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Code Example */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl transform rotate-2" />
            <div className="relative bg-card border rounded-xl p-6 overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span className="text-xs text-muted-foreground ml-2">
                  example.ts
                </span>
              </div>
              <pre className="text-sm overflow-x-auto">
                <code className="language-typescript">
                  {`// Type-safe interface
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// Clear function signature
async function getUser(
  id: string
): Promise<Result<User, Error>> {
  // Implementation follows spec
  // with proper error handling
}`}
                </code>
              </pre>
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="mt-16 text-center">
          <blockquote className="text-xl md:text-2xl font-medium italic text-muted-foreground max-w-3xl mx-auto">
            "AI accelerates development, but specifications ensure we're building
            the <span className="text-primary font-semibold">right thing</span>, the{" "}
            <span className="text-primary font-semibold">right way</span>."
          </blockquote>
        </div>
      </div>
    </section>
  );
}
