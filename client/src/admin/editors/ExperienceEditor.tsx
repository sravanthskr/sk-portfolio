import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@iconify/react';
import { useContent } from '@/contexts/ContentContext';

export default function ExperienceEditor() {
  const { content, updateContent } = useContent();
  const experience = content.experience;

  const addExperience = () => {
    const newExperience = {
      id: `exp-${Date.now()}`,
      position: '',
      company: '',
      period: '',
      description: '',
      achievements: [],
      technologies: []
    };
    const updatedExperiences = [...experience.experiences, newExperience];
    updateContent('experience.experiences', updatedExperiences);
  };

  const removeExperience = (index: number) => {
    const updatedExperiences = experience.experiences.filter((_, i) => i !== index);
    updateContent('experience.experiences', updatedExperiences);
  };

  const updateExperience = (index: number, field: string, value: any) => {
    const updatedExperiences = [...experience.experiences];
    (updatedExperiences[index] as any)[field] = value;
    updateContent('experience.experiences', updatedExperiences);
  };

  const addAchievement = (expIndex: number, achievement: string) => {
    if (!achievement.trim()) return;
    
    const updatedExperiences = [...experience.experiences];
    updatedExperiences[expIndex].achievements = [...updatedExperiences[expIndex].achievements, achievement.trim()];
    updateContent('experience.experiences', updatedExperiences);
  };

  const removeAchievement = (expIndex: number, achievementIndex: number) => {
    const updatedExperiences = [...experience.experiences];
    updatedExperiences[expIndex].achievements = updatedExperiences[expIndex].achievements.filter((_, i) => i !== achievementIndex);
    updateContent('experience.experiences', updatedExperiences);
  };

  const addTechnology = (expIndex: number, tech: string) => {
    if (!tech.trim()) return;
    
    const updatedExperiences = [...experience.experiences];
    updatedExperiences[expIndex].technologies = [...updatedExperiences[expIndex].technologies, tech.trim()];
    updateContent('experience.experiences', updatedExperiences);
  };

  const removeTechnology = (expIndex: number, techIndex: number) => {
    const updatedExperiences = [...experience.experiences];
    updatedExperiences[expIndex].technologies = updatedExperiences[expIndex].technologies.filter((_, i) => i !== techIndex);
    updateContent('experience.experiences', updatedExperiences);
  };

  const handleAchievementKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, expIndex: number) => {
    if (e.key === 'Enter') {
      const input = e.target as HTMLInputElement;
      addAchievement(expIndex, input.value);
      input.value = '';
    }
  };

  const handleTechKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, expIndex: number) => {
    if (e.key === 'Enter') {
      const input = e.target as HTMLInputElement;
      addTechnology(expIndex, input.value);
      input.value = '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Experience Section</h2>
        <p className="text-muted-foreground">
          Manage your professional work experience, achievements, and technologies used.
        </p>
      </div>

      <div className="space-y-6">
        {/* Basic Information */}
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Section Title</h3>
          <div>
            <Label htmlFor="experience-title">Title</Label>
            <Input
              id="experience-title"
              value={experience.title}
              onChange={(e) => updateContent('experience.title', e.target.value)}
              placeholder="Professional Experience"
              className="mt-2"
            />
          </div>
        </Card>

        {/* Work Experiences */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Work Experience</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={addExperience}
              className="gap-2"
            >
              <Icon icon="lucide:plus" className="w-4 h-4" />
              Add Experience
            </Button>
          </div>
          
          <div className="space-y-8">
            {experience.experiences.map((exp, expIndex) => (
              <Card key={exp.id} className="p-6 border-dashed">
                <div className="flex items-start justify-between mb-6">
                  <h4 className="font-medium">Experience #{expIndex + 1}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeExperience(expIndex)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Icon icon="lucide:trash-2" className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Basic Experience Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`exp-position-${expIndex}`}>Position/Role</Label>
                      <Input
                        id={`exp-position-${expIndex}`}
                        value={exp.position}
                        onChange={(e) => updateExperience(expIndex, 'position', e.target.value)}
                        placeholder="Senior Software Engineer"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`exp-company-${expIndex}`}>Company</Label>
                      <Input
                        id={`exp-company-${expIndex}`}
                        value={exp.company}
                        onChange={(e) => updateExperience(expIndex, 'company', e.target.value)}
                        placeholder="Tech Company Inc."
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor={`exp-period-${expIndex}`}>Time Period</Label>
                    <Input
                      id={`exp-period-${expIndex}`}
                      value={exp.period}
                      onChange={(e) => updateExperience(expIndex, 'period', e.target.value)}
                      placeholder="January 2020 - Present"
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Format: "Month Year - Month Year" or "Month Year - Present"
                    </p>
                  </div>

                  <div>
                    <Label htmlFor={`exp-description-${expIndex}`}>Job Description</Label>
                    <Textarea
                      id={`exp-description-${expIndex}`}
                      value={exp.description}
                      onChange={(e) => updateExperience(expIndex, 'description', e.target.value)}
                      placeholder="Brief overview of your role and responsibilities..."
                      className="mt-2"
                      rows={4}
                    />
                  </div>

                  {/* Achievements */}
                  <div>
                    <Label htmlFor={`exp-achievements-${expIndex}`}>Key Achievements</Label>
                    <div className="mt-2 space-y-3">
                      {/* Current Achievements */}
                      <div className="space-y-2">
                        {exp.achievements.map((achievement, achievementIndex) => (
                          <div key={achievementIndex} className="flex items-start gap-2 p-3 bg-muted/20 rounded-md">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <div className="flex-1 text-sm">{achievement}</div>
                            <button
                              onClick={() => removeAchievement(expIndex, achievementIndex)}
                              className="text-muted-foreground hover:text-destructive mt-1"
                            >
                              <Icon icon="lucide:x" className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                        {exp.achievements.length === 0 && (
                          <p className="text-sm text-muted-foreground">No achievements added yet</p>
                        )}
                      </div>

                      {/* Add New Achievement */}
                      <div>
                        <Input
                          id={`exp-achievements-${expIndex}`}
                          placeholder="Add achievement (press Enter to add)"
                          onKeyPress={(e) => handleAchievementKeyPress(e, expIndex)}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Type achievement and press Enter to add
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <Label htmlFor={`exp-technologies-${expIndex}`}>Technologies Used</Label>
                    <div className="mt-2 space-y-3">
                      {/* Current Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="secondary" className="gap-1">
                            {tech}
                            <button
                              onClick={() => removeTechnology(expIndex, techIndex)}
                              className="ml-1 hover:text-destructive"
                            >
                              <Icon icon="lucide:x" className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                        {exp.technologies.length === 0 && (
                          <p className="text-sm text-muted-foreground">No technologies added yet</p>
                        )}
                      </div>

                      {/* Add New Technology */}
                      <div>
                        <Input
                          id={`exp-technologies-${expIndex}`}
                          placeholder="Add technology (press Enter to add)"
                          onKeyPress={(e) => handleTechKeyPress(e, expIndex)}
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

            {experience.experiences.length === 0 && (
              <Card className="p-8 border-dashed text-center">
                <p className="text-muted-foreground mb-4">No work experience yet</p>
                <Button onClick={addExperience} variant="outline" className="gap-2">
                  <Icon icon="lucide:plus" className="w-4 h-4" />
                  Add Your First Experience
                </Button>
              </Card>
            )}
          </div>
        </Card>

        {/* Tips Card */}
        <Card className="p-6 bg-primary/5 border-primary/20">
          <h3 className="text-lg font-medium mb-3">💼 Experience Tips</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• <strong>Position:</strong> Use clear, specific job titles that reflect your actual role</p>
            <p>• <strong>Description:</strong> Focus on what you accomplished, not just what you did</p>
            <p>• <strong>Achievements:</strong> Use metrics and numbers when possible (e.g., "Improved performance by 40%")</p>
            <p>• <strong>Technologies:</strong> Include relevant programming languages, frameworks, and tools</p>
            <p>• <strong>Order:</strong> List experiences from most recent to oldest</p>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}