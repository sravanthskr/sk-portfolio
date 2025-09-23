import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from '@iconify/react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useProjectsContent } from "@/contexts/ContentContext";

export default function ProjectsSection() {
  const projectsContent = useProjectsContent();
  const [selectedFilter, setSelectedFilter] = useState("All Projects");
  const [selectedProject, setSelectedProject] = useState<
    (typeof projectsContent.projects)[0] | null
  >(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollViewportRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filteredProjects =
    selectedFilter === "All Projects"
      ? projectsContent.projects
      : projectsContent.projects.filter(
          (project) => project.category === selectedFilter,
        );

  useEffect(() => {
    if (
      selectedProject &&
      !filteredProjects.find((p) => p.id === selectedProject.id)
    ) {
      setSelectedProject(null);
    }
  }, [selectedFilter, selectedProject, filteredProjects]);

  const handleScroll = () => {
    setIsScrolling(true);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 600);
  };
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <TooltipProvider>
      <section className="min-h-screen-safe section-padding section-spacing pt-20 lg:pt-24">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-8 sm:mb-12"
          >
            <h2 className="text-fluid-4xl lg:text-fluid-5xl font-light mb-4 sm:mb-6">
              {projectsContent.title}
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-primary rounded-full" />
          </motion.div>

          {/* Filter Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-8 sm:mb-12"
          >
            <div className="flex flex-wrap gap-2">
              {projectsContent.filterCategories.map((category) => (
                <Button
                  key={category}
                  variant={selectedFilter === category ? "default" : "outline"}
                  onClick={() => setSelectedFilter(category)}
                  className="text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-md transition-all duration-300 text-center min-w-0"
                  data-testid={`filter-${category.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Left Project Thumbnail Rail */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="lg:w-20"
            >
              {/* Desktop: Vertical Scrolling */}
              <div className="hidden lg:block relative">
                <div
                  className={`h-[60vh] w-full overflow-y-auto pr-2 py-4 flex flex-col gap-4 scrollbar-thin scrollbar-track-transparent transition-all duration-500 ease-in-out ${
                    isScrolling
                      ? "scrollbar-thumb-primary/60"
                      : "scrollbar-thumb-transparent"
                  }`}
                  data-scrolling={isScrolling}
                  style={{
                    scrollbarColor: isScrolling
                      ? "rgba(var(--primary), 0.6) transparent"
                      : "transparent transparent",
                    scrollbarWidth: "thin",
                  }}
                  ref={scrollViewportRef}
                  onScroll={handleScroll}
                >
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex-shrink-0"
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => setSelectedProject(project)}
                            className={`w-16 h-16 rounded-lg border-2 transition-all duration-300 overflow-hidden hover-elevate group ${
                              selectedProject?.id === project.id
                                ? "border-primary shadow-lg ring-2 ring-primary/20"
                                : "border-border hover:border-primary/50"
                            }`}
                            data-testid={`project-${project.id}`}
                            aria-label={project.title}
                          >
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              loading="lazy"
                            />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="max-w-xs">
                          <div className="space-y-2">
                            <p className="font-medium">{project.title}</p>
                            <div className="flex flex-wrap gap-1">
                              {project.technologies.slice(0, 4).map((tech) => (
                                <span
                                  key={tech}
                                  className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                                >
                                  {tech}
                                </span>
                              ))}
                              {project.technologies.length > 4 && (
                                <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">
                                  +{project.technologies.length - 4}
                                </span>
                              )}
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Mobile: Horizontal Scrolling */}
              <div className="lg:hidden">
                <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex-shrink-0 snap-start"
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => setSelectedProject(project)}
                            className={`w-14 h-14 rounded-lg border-2 transition-all duration-300 overflow-hidden hover-elevate group ${
                              selectedProject?.id === project.id
                                ? "border-primary shadow-lg ring-2 ring-primary/20"
                                : "border-border hover:border-primary/50"
                            }`}
                            data-testid={`project-${project.id}`}
                            aria-label={project.title}
                          >
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              loading="lazy"
                            />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs">
                          <div className="space-y-2">
                            <p className="font-medium">{project.title}</p>
                            <div className="flex flex-wrap gap-1">
                              {project.technologies.slice(0, 3).map((tech) => (
                                <span
                                  key={tech}
                                  className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                                >
                                  {tech}
                                </span>
                              ))}
                              {project.technologies.length > 3 && (
                                <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">
                                  +{project.technologies.length - 3}
                                </span>
                              )}
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Main Content Area */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                {selectedProject ? (
                  <motion.div
                    key={selectedProject.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.6 }}
                    className="motion-reduce-ok"
                  >
                    <Card className="overflow-hidden">
                      {/* Project Image */}
                      <div className="relative h-48 sm:h-64 lg:h-80">
                        <img
                          src={selectedProject.image}
                          alt={selectedProject.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>

                      {/* Project Details */}
                      <div className="p-4 sm:p-6 lg:p-8">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-6 mb-6">
                          <div className="min-w-0">
                            <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                              {selectedProject.title}
                            </h3>
                            <p className="text-muted-foreground text-base sm:text-lg">
                              Project Overview
                            </p>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                            {selectedProject.github && (
                              <Button
                                variant="outline"
                                onClick={() =>
                                  window.open(
                                    selectedProject.github,
                                    "_blank",
                                    "noopener,noreferrer",
                                  )
                                }
                                data-testid="button-github"
                                className="min-h-[44px]"
                              >
                                <Icon icon="lucide:github" className="w-4 h-4 mr-2" />
                                GitHub
                              </Button>
                            )}
                            {selectedProject.url && (
                              <Button
                                onClick={() =>
                                  window.open(
                                    selectedProject.url,
                                    "_blank",
                                    "noopener,noreferrer",
                                  )
                                }
                                data-testid="button-demo"
                                className="min-h-[44px]"
                              >
                                <Icon icon="lucide:external-link" className="w-4 h-4 mr-2" />
                                Live Demo
                              </Button>
                            )}
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-6 lg:mb-8 leading-relaxed text-base sm:text-lg">
                          {selectedProject.description}
                        </p>

                        <div>
                          <h4 className="font-semibold mb-4 text-base lg:text-lg">
                            Technologies Used
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.technologies.map((tech) => (
                              <Badge
                                key={tech}
                                variant="secondary"
                                className="text-xs sm:text-sm"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="motion-reduce-ok"
                  >
                    <Card className="border-dashed border-2 border-muted-foreground/20 bg-muted/10">
                      <div className="flex flex-col items-center justify-center min-h-[300px] lg:min-h-[400px] p-8 text-center">
                        <h3 className="text-lg font-medium mb-3 text-muted-foreground">
                          Select Project
                        </h3>
                        <p className="text-sm text-muted-foreground max-w-sm">
                          Click on any project thumbnail to view details
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
}
