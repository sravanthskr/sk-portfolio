import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { useContent } from '@/contexts/ContentContext';

export default function AboutEditor() {
  const { content, updateContent } = useContent();
  const about = content.about || {};

  const addKpiCard = () => {
    const newKpi = { value: '', label: '' };
    const updatedKpis = [...(about.kpiCards || []), newKpi];
    updateContent('about.kpiCards', updatedKpis);
  };

  const removeKpiCard = (index: number) => {
    const updatedKpis = (about.kpiCards || []).filter((_, i) => i !== index);
    updateContent('about.kpiCards', updatedKpis);
  };

  const updateKpiCard = (index: number, field: 'value' | 'label', value: string) => {
    const updatedKpis = [...(about.kpiCards || [])];
    updatedKpis[index][field] = value;
    updateContent('about.kpiCards', updatedKpis);
  };

  const addKeyTechnology = () => {
    const newTech = { name: '' };
    const updatedTechs = [...(about.keyTechnologies || []), newTech];
    updateContent('about.keyTechnologies', updatedTechs);
  };

  const removeKeyTechnology = (index: number) => {
    const updatedTechs = (about.keyTechnologies || []).filter((_, i) => i !== index);
    updateContent('about.keyTechnologies', updatedTechs);
  };

  const updateKeyTechnology = (index: number, value: string) => {
    const updatedTechs = [...(about.keyTechnologies || [])];
    updatedTechs[index].name = value;
    updateContent('about.keyTechnologies', updatedTechs);
  };

  const addEducation = () => {
    const newEdu = {
      id: `edu-${Date.now()}`,
      degree: '',
      institution: '',
      period: '',
      description: ''
    };
    const updatedEducation = [...(about.education || []), newEdu];
    updateContent('about.education', updatedEducation);
  };

  const removeEducation = (index: number) => {
    const updatedEducation = (about.education || []).filter((_, i) => i !== index);
    updateContent('about.education', updatedEducation);
  };

  const updateEducation = (index: number, field: keyof typeof about.education[0], value: string) => {
    const updatedEducation = [...(about.education || [])];
    updatedEducation[index][field] = value;
    updateContent('about.education', updatedEducation);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">About Section</h2>
        <p className="text-muted-foreground">
          Edit your personal information, KPIs, key technologies, and education.
        </p>
      </div>

      <div className="space-y-6">
        {/* Basic Information */}
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Basic Information</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="about-title">Section Title</Label>
              <Input
                id="about-title"
                value={about.title || ''}
                onChange={(e) => updateContent('about.title', e.target.value)}
                placeholder="About"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="about-description">First Paragraph</Label>
              <Textarea
                id="about-description"
                value={about.description || ''}
                onChange={(e) => updateContent('about.description', e.target.value)}
                placeholder="Enter the first paragraph about yourself"
                className="mt-2"
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="about-second-paragraph">Second Paragraph</Label>
              <Textarea
                id="about-second-paragraph"
                value={about.secondParagraph || ''}
                onChange={(e) => updateContent('about.secondParagraph', e.target.value)}
                placeholder="Enter the second paragraph about yourself"
                className="mt-2"
                rows={4}
              />
            </div>
          </div>
        </Card>

        {/* KPI Cards */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">KPI Cards</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={addKpiCard}
              className="gap-2"
            >
              <Icon icon="lucide:plus" className="w-4 h-4" />
              Add KPI
            </Button>
          </div>
          <div className="space-y-4">
            {about.kpiCards.map((kpi, index) => (
              <Card key={index} className="p-4 border-dashed">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="font-medium">KPI #{index + 1}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeKpiCard(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Icon icon="lucide:trash-2" className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`kpi-value-${index}`}>Value</Label>
                    <Input
                      id={`kpi-value-${index}`}
                      value={kpi.value}
                      onChange={(e) => updateKpiCard(index, 'value', e.target.value)}
                      placeholder="5+ Years"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`kpi-label-${index}`}>Label</Label>
                    <Input
                      id={`kpi-label-${index}`}
                      value={kpi.label}
                      onChange={(e) => updateKpiCard(index, 'label', e.target.value)}
                      placeholder="Experience"
                      className="mt-2"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Key Technologies */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Key Technologies</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={addKeyTechnology}
              className="gap-2"
            >
              <Icon icon="lucide:plus" className="w-4 h-4" />
              Add Technology
            </Button>
          </div>
          <div className="space-y-4">
            {about.keyTechnologies.map((tech, index) => (
              <Card key={index} className="p-4 border-dashed">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Label htmlFor={`tech-${index}`}>Technology Name</Label>
                    <Input
                      id={`tech-${index}`}
                      value={tech.name}
                      onChange={(e) => updateKeyTechnology(index, e.target.value)}
                      placeholder="React"
                      className="mt-2"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeKeyTechnology(index)}
                    className="text-destructive hover:text-destructive mt-6"
                  >
                    <Icon icon="lucide:trash-2" className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Education */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Education</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={addEducation}
              className="gap-2"
            >
              <Icon icon="lucide:plus" className="w-4 h-4" />
              Add Education
            </Button>
          </div>
          <div className="space-y-4">
            {about.education.map((edu, index) => (
              <Card key={index} className="p-4 border-dashed">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="font-medium">Education #{index + 1}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeEducation(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Icon icon="lucide:trash-2" className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor={`edu-degree-${index}`}>Degree</Label>
                    <Input
                      id={`edu-degree-${index}`}
                      value={edu.degree}
                      onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                      placeholder="Bachelor of Science in Computer Science"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`edu-institution-${index}`}>Institution</Label>
                    <Input
                      id={`edu-institution-${index}`}
                      value={edu.institution}
                      onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                      placeholder="University Name"
                      className="mt-2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`edu-period-${index}`}>Period</Label>
                    <Input
                      id={`edu-period-${index}`}
                      value={edu.period}
                      onChange={(e) => updateEducation(index, 'period', e.target.value)}
                      placeholder="2018 - 2022"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`edu-description-${index}`}>Description</Label>
                    <Textarea
                      id={`edu-description-${index}`}
                      value={edu.description}
                      onChange={(e) => updateEducation(index, 'description', e.target.value)}
                      placeholder="Brief description of the program"
                      className="mt-2"
                      rows={2}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </motion.div>
  );
}