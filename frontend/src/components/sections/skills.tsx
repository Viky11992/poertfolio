"use client";

import { useEffect, useState } from "react";
import { Code, Server, Brain, Wrench } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api, type Skill } from "@/lib/api";

const categoryIcons: Record<string, JSX.Element> = {
  Frontend: <Code className="h-5 w-5" />,
  Backend: <Server className="h-5 w-5" />,
  "AI/ML": <Brain className="h-5 w-5" />,
  Tools: <Wrench className="h-5 w-5" />,
};

const categoryColors: Record<string, string> = {
  Frontend: "from-blue-500 to-cyan-500",
  Backend: "from-green-500 to-emerald-500",
  "AI/ML": "from-purple-500 to-pink-500",
  Tools: "from-orange-500 to-amber-500",
};

export function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getSkills()
      .then(setSkills)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const categories = Array.from(new Set(skills.map((s) => s.category)));

  const getProficiencyColor = (proficiency: number) => {
    if (proficiency >= 90) return "bg-green-500";
    if (proficiency >= 75) return "bg-blue-500";
    if (proficiency >= 60) return "bg-yellow-500";
    return "bg-orange-500";
  };

  return (
    <section id="skills" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Skills & <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, intelligent applications
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
          </div>
        ) : (
          <>
            {/* Tabs for categories */}
            <Tabs defaultValue={categories[0]} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8 max-w-md mx-auto">
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category} className="gap-2">
                    {categoryIcons[category]}
                    <span className="hidden sm:inline">{category}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map((category) => (
                <TabsContent key={category} value={category}>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {skills
                      .filter((s) => s.category === category)
                      .map((skill, index) => (
                        <Card
                          key={skill.name}
                          className="card-hover overflow-hidden"
                        >
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">
                                {skill.name}
                              </CardTitle>
                              <Badge variant="secondary">{skill.proficiency}%</Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            {/* Progress bar */}
                            <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className={`absolute inset-y-0 left-0 bg-gradient-to-r ${categoryColors[category]} rounded-full transition-all duration-1000`}
                                style={{ width: `${skill.proficiency}%` }}
                              />
                            </div>

                            {/* Tech tags */}
                            <div className="mt-4 flex flex-wrap gap-2">
                              {skill.name === "React" && (
                                <>
                                  <Badge variant="outline" className="text-xs">
                                    Hooks
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    Redux
                                  </Badge>
                                </>
                              )}
                              {skill.name === "Next.js" && (
                                <>
                                  <Badge variant="outline" className="text-xs">
                                    App Router
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    SSR
                                  </Badge>
                                </>
                              )}
                              {skill.name === "Python" && (
                                <>
                                  <Badge variant="outline" className="text-xs">
                                    Async
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    FastAPI
                                  </Badge>
                                </>
                              )}
                              {skill.name === "OpenAI API" && (
                                <>
                                  <Badge variant="outline" className="text-xs">
                                    GPT-4
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    Embeddings
                                  </Badge>
                                </>
                              )}
                              {skill.name === "OpenAI Agents SDK" && (
                                <>
                                  <Badge variant="outline" className="text-xs">
                                    Agents
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    Handoffs
                                  </Badge>
                                </>
                              )}
                              {skill.name === "Context Engineering" && (
                                <>
                                  <Badge variant="outline" className="text-xs">
                                    RAG
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    Memory Systems
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    Vector DBs
                                  </Badge>
                                </>
                              )}
                              {skill.name === "AI with Different Models" && (
                                <>
                                  <Badge variant="outline" className="text-xs">
                                    GPT-4
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    Claude
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    Llama
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    Gemini
                                  </Badge>
                                </>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            {/* Additional expertise */}
            <div className="mt-16">
              <h3 className="text-xl font-semibold text-center mb-8">
                Additional Expertise
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  "RESTful APIs",
                  "GraphQL",
                  "WebSocket",
                  "PostgreSQL",
                  "MongoDB",
                  "Redis",
                  "Docker",
                  "CI/CD",
                  "Git",
                  "Agile",
                  "TDD",
                  "RAG Systems",
                  "Context Engineering",
                  "OpenAI Agents SDK",
                  "Multi-Model AI",
                  "Azure",
                  "Vercel",
                ].map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="px-4 py-2 text-sm card-hover cursor-default"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
