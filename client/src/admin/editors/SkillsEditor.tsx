import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@iconify/react';
import { useContent } from '@/contexts/ContentContext';

export default function SkillsEditor() {
  const { content, updateContent } = useContent();
  const skills = content.skills || {};

  const addCategory = () => {
    const newCategory = {
      name: '',
      skills: []
    };
    const updatedCategories = [...(skills.categories || []), newCategory];
    updateContent('skills.categories', updatedCategories);
  };

  const removeCategory = (index: number) => {
    const updatedCategories = skills.categories.filter((_, i) => i !== index);
    updateContent('skills.categories', updatedCategories);
  };

  const updateCategoryName = (index: number, name: string) => {
    const updatedCategories = [...skills.categories];
    updatedCategories[index].name = name;
    updateContent('skills.categories', updatedCategories);
  };

  const addSkillToCategory = (categoryIndex: number, skill: string) => {
    if (!skill.trim()) return;
    
    const updatedCategories = [...skills.categories];
    updatedCategories[categoryIndex].skills = [...updatedCategories[categoryIndex].skills, skill.trim()];
    updateContent('skills.categories', updatedCategories);
  };

  const removeSkillFromCategory = (categoryIndex: number, skillIndex: number) => {
    const updatedCategories = [...skills.categories];
    updatedCategories[categoryIndex].skills = updatedCategories[categoryIndex].skills.filter((_, i) => i !== skillIndex);
    updateContent('skills.categories', updatedCategories);
  };

  const handleSkillKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, categoryIndex: number) => {
    if (e.key === 'Enter') {
      const input = e.target as HTMLInputElement;
      addSkillToCategory(categoryIndex, input.value);
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
        <h2 className="text-2xl font-semibold mb-2">Skills Section</h2>
        <p className="text-muted-foreground">
          Organize your skills into categories like Frontend, Backend, Tools, etc.
        </p>
      </div>

      <div className="space-y-6">
        {/* Basic Information */}
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Section Title</h3>
          <div>
            <Label htmlFor="skills-title">Title</Label>
            <Input
              id="skills-title"
              value={skills.title}
              onChange={(e) => updateContent('skills.title', e.target.value)}
              placeholder="Skills & Expertise"
              className="mt-2"
            />
          </div>
        </Card>

        {/* Skills Categories */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Skills Categories</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={addCategory}
              className="gap-2"
            >
              <Icon icon="lucide:plus" className="w-4 h-4" />
              Add Category
            </Button>
          </div>
          <div className="space-y-6">
            {skills.categories.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="p-6 border-dashed">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="font-medium">Category #{categoryIndex + 1}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCategory(categoryIndex)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Icon icon="lucide:trash-2" className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor={`category-name-${categoryIndex}`}>Category Name</Label>
                    <Input
                      id={`category-name-${categoryIndex}`}
                      value={category.name}
                      onChange={(e) => updateCategoryName(categoryIndex, e.target.value)}
                      placeholder="Frontend Development"
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Categories like "Frontend", "Backend", "Tools & Technologies", "Design & UX"
                    </p>
                  </div>

                  <div>
                    <Label htmlFor={`category-skills-${categoryIndex}`}>Skills</Label>
                    <div className="mt-2 space-y-3">
                      {/* Current Skills */}
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="secondary" className="gap-1">
                            {skill}
                            <button
                              onClick={() => removeSkillFromCategory(categoryIndex, skillIndex)}
                              className="ml-1 hover:text-destructive"
                            >
                              <Icon icon="lucide:x" className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                        {category.skills.length === 0 && (
                          <p className="text-sm text-muted-foreground">No skills added yet</p>
                        )}
                      </div>

                      {/* Add New Skill */}
                      <div>
                        <Input
                          id={`category-skills-${categoryIndex}`}
                          placeholder="Add a skill (press Enter to add)"
                          onKeyPress={(e) => handleSkillKeyPress(e, categoryIndex)}
                          className="max-w-sm"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Type skill name and press Enter to add
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {skills.categories.length === 0 && (
              <Card className="p-8 border-dashed text-center">
                <p className="text-muted-foreground mb-4">No skill categories yet</p>
                <Button onClick={addCategory} variant="outline" className="gap-2">
                  <Icon icon="lucide:plus" className="w-4 h-4" />
                  Add Your First Category
                </Button>
              </Card>
            )}
          </div>
        </Card>

        {/* Tips Card */}
        <Card className="p-6 bg-primary/5 border-primary/20">
          <h3 className="text-lg font-medium mb-3">📝 Tips for Organizing Skills</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• <strong>Frontend:</strong> React, Vue, TypeScript, HTML/CSS</p>
            <p>• <strong>Backend:</strong> Node.js, Python, Java, PostgreSQL</p>
            <p>• <strong>Tools & Technologies:</strong> Docker, AWS, Git, CI/CD</p>
            <p>• <strong>Design & UX:</strong> Figma, Adobe Creative Suite, Prototyping</p>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}