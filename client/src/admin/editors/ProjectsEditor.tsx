import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useContent } from '@/contexts/ContentContext';

export default function ProjectsEditor() {
  const { content, updateContent } = useContent();
  const projects = content.projects || {};
  
  // Safe defaults for rendering
  const projectsList = projects.projects || [];
  const filterCategories = projects.filterCategories || [];
  const projectsTitle = projects.title || '';

  const addProject = () => {
    const newProject = {
      id: `project-${Date.now()}`,
      title: '',
      description: '',
      image: '',
      category: '',
      url: '',
      github: '',
      technologies: []
    };
    const updatedProjects = [...(projects.projects || []), newProject];
    updateContent('projects.projects', updatedProjects);
  };

  const removeProject = (index: number) => {
    const updatedProjects = (projects.projects || []).filter((_, i) => i !== index);
    updateContent('projects.projects', updatedProjects);
  };

  const updateProject = (index: number, field: string, value: any) => {
    const updatedProjects = [...projects.projects];
    (updatedProjects[index] as any)[field] = value;
    updateContent('projects.projects', updatedProjects);
  };

  const addTechnologyToProject = (projectIndex: number, tech: string) => {
    if (!tech.trim()) return;
    
    const updatedProjects = [...(projects.projects || [])];
    updatedProjects[projectIndex].technologies = [...updatedProjects[projectIndex].technologies, tech.trim()];
    updateContent('projects.projects', updatedProjects);
  };

  const removeTechnologyFromProject = (projectIndex: number, techIndex: number) => {
    const updatedProjects = [...(projects.projects || [])];
    updatedProjects[projectIndex].technologies = updatedProjects[projectIndex].technologies.filter((_, i) => i !== techIndex);
    updateContent('projects.projects', updatedProjects);
  };

  const handleTechKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, projectIndex: number) => {
    if (e.key === 'Enter') {
      const input = e.target as HTMLInputElement;
      addTechnologyToProject(projectIndex, input.value);
      input.value = '';
    }
  };

  const addFilterCategory = () => {
    const category = prompt('Enter category name:');
    if (category && category.trim()) {
      const updatedCategories = [...projects.filterCategories, category.trim()];
      updateContent('projects.filterCategories', updatedCategories);
    }
  };

  const removeFilterCategory = (index: number) => {
    const updatedCategories = projects.filterCategories.filter((_, i) => i !== index);
    updateContent('projects.filterCategories', updatedCategories);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Projects Section</h2>
        <p className="text-muted-foreground">
          Manage your portfolio projects, categories, and technologies.
        </p>
      </div>

      <div className="space-y-6">
        {/* Basic Information */}
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Section Title</h3>
          <div>
            <Label htmlFor="projects-title">Title</Label>
            <Input
              id="projects-title"
              value={projectsTitle}
              onChange={(e) => updateContent('projects.title', e.target.value)}
              placeholder="Featured Projects"
              className="mt-2"
            />
          </div>
        </Card>

        {/* Filter Categories */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Filter Categories</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={addFilterCategory}
              className="gap-2"
            >
              <Icon icon="lucide:plus" className="w-4 h-4" />
              Add Category
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {filterCategories.map((category, index) => (
              <Badge key={index} variant="secondary" className="gap-1">
                {category}
                <button
                  onClick={() => removeFilterCategory(index)}
                  className="ml-1 hover:text-destructive"
                >
                  <Icon icon="lucide:x" className="w-3 h-3" />
                </button>
              </Badge>
            ))}
            {filterCategories.length === 0 && (
              <p className="text-sm text-muted-foreground">No categories yet. Add categories like "Web Apps", "Mobile", "Open Source"</p>
            )}
          </div>
        </Card>

        {/* Projects */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Projects</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={addProject}
              className="gap-2"
            >
              <Icon icon="lucide:plus" className="w-4 h-4" />
              Add Project
            </Button>
          </div>
          
          <div className="space-y-8">
            {projectsList.map((project, projectIndex) => (
              <Card key={project.id} className="p-6 border-dashed">
                <div className="flex items-start justify-between mb-6">
                  <h4 className="font-medium">Project #{projectIndex + 1}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeProject(projectIndex)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Icon icon="lucide:trash-2" className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Basic Project Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`project-title-${projectIndex}`}>Project Title</Label>
                      <Input
                        id={`project-title-${projectIndex}`}
                        value={project.title}
                        onChange={(e) => updateProject(projectIndex, 'title', e.target.value)}
                        placeholder="Awesome Project"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`project-category-${projectIndex}`}>Category</Label>
                      <Select 
                        value={project.category} 
                        onValueChange={(value) => updateProject(projectIndex, 'category', value)}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {projects.filterCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor={`project-description-${projectIndex}`}>Description</Label>
                    <Textarea
                      id={`project-description-${projectIndex}`}
                      value={project.description}
                      onChange={(e) => updateProject(projectIndex, 'description', e.target.value)}
                      placeholder="Describe what this project does and its key features..."
                      className="mt-2"
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor={`project-image-${projectIndex}`}>Project Image URL</Label>
                    <Input
                      id={`project-image-${projectIndex}`}
                      value={project.image}
                      onChange={(e) => updateProject(projectIndex, 'image', e.target.value)}
                      placeholder="https://example.com/project-image.jpg"
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      URL to project screenshot or thumbnail
                    </p>
                  </div>

                  {/* Links */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`project-url-${projectIndex}`}>Live Demo URL</Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          id={`project-url-${projectIndex}`}
                          value={project.url}
                          onChange={(e) => updateProject(projectIndex, 'url', e.target.value)}
                          placeholder="https://demo.example.com"
                        />
                        {project.url && (
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => window.open(project.url, '_blank')}
                          >
                            <Icon icon="lucide:external-link" className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor={`project-github-${projectIndex}`}>GitHub Repository</Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          id={`project-github-${projectIndex}`}
                          value={project.github}
                          onChange={(e) => updateProject(projectIndex, 'github', e.target.value)}
                          placeholder="https://github.com/username/repo"
                        />
                        {project.github && (
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => window.open(project.github, '_blank')}
                          >
                            <Icon icon="lucide:github" className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <Label htmlFor={`project-technologies-${projectIndex}`}>Technologies Used</Label>
                    <div className="mt-2 space-y-3">
                      {/* Current Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="secondary" className="gap-1">
                            {tech}
                            <button
                              onClick={() => removeTechnologyFromProject(projectIndex, techIndex)}
                              className="ml-1 hover:text-destructive"
                            >
                              <Icon icon="lucide:x" className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                        {project.technologies.length === 0 && (
                          <p className="text-sm text-muted-foreground">No technologies added yet</p>
                        )}
                      </div>

                      {/* Add New Technology */}
                      <div>
                        <Input
                          id={`project-technologies-${projectIndex}`}
                          placeholder="Add technology (press Enter to add)"
                          onKeyPress={(e) => handleTechKeyPress(e, projectIndex)}
                          className="max-w-sm"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Type technology name and press Enter to add
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {projects.projects.length === 0 && (
              <Card className="p-8 border-dashed text-center">
                <p className="text-muted-foreground mb-4">No projects yet</p>
                <Button onClick={addProject} variant="outline" className="gap-2">
                  <Icon icon="lucide:plus" className="w-4 h-4" />
                  Add Your First Project
                </Button>
              </Card>
            )}
          </div>
        </Card>

        {/* Tips Card */}
        <Card className="p-6 bg-primary/5 border-primary/20">
          <h3 className="text-lg font-medium mb-3">💡 Project Tips</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Use high-quality screenshots or mockups for project images</p>
            <p>• Write clear, benefit-focused descriptions that highlight the problem you solved</p>
            <p>• Include both live demos and source code when possible</p>
            <p>• Group related technologies (e.g., "React", "TypeScript", "Node.js")</p>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}