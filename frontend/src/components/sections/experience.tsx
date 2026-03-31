"use client";

import { useEffect, useState } from "react";
import { Briefcase, Calendar, MapPin, Building2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { api, type Experience } from "@/lib/api";

export function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getExperience()
      .then(setExperiences)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <section id="experience" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey and the companies I've had the pleasure to work with
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />

              {/* Experience items */}
              <div className="space-y-12">
                {experiences.map((exp, index) => (
                  <div
                    key={exp.id}
                    className={`relative flex flex-col md:flex-row gap-8 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-4 border-background z-10 mt-6" />

                    {/* Content */}
                    <div
                      className={`ml-8 md:ml-0 md:w-1/2 ${
                        index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                      }`}
                    >
                      <Card className="card-hover">
                        <CardHeader>
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 text-primary mb-2">
                                <Building2 className="h-4 w-4" />
                                <CardTitle className="text-xl">
                                  {exp.company}
                                </CardTitle>
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                                <Briefcase className="h-4 w-4" />
                                {exp.position}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {formatDate(exp.start_date)} -{" "}
                              {exp.current ? (
                                <span className="text-primary font-medium">
                                  Present
                                </span>
                              ) : (
                                formatDate(exp.end_date!)
                              )}
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent>
                          {/* Description */}
                          <ul className="space-y-2 mb-4">
                            {exp.description.map((item, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                              >
                                <span className="text-primary mt-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Technologies */}
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech) => (
                              <Badge key={tech} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Download Resume CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            Interested in my background?
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <a
                href="https://linkedin.com/in/shoaibarshad92/"
                target="_blank"
                rel="noopener noreferrer"
              >
                View LinkedIn Profile
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#contact">
                Contact Me
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
