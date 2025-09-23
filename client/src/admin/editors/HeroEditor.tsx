import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useContent } from '@/contexts/ContentContext';

export default function HeroEditor() {
  const { content, updateContent } = useContent();
  const hero = content.hero || {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Hero Section</h2>
        <p className="text-muted-foreground">
          Edit the main landing section content that visitors see first.
        </p>
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Title</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="hero-first-name">First Name</Label>
              <Input
                id="hero-first-name"
                value={hero.title?.first || ''}
                onChange={(e) => updateContent('hero.title.first', e.target.value)}
                placeholder="Enter first name"
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                This will appear in the primary color
              </p>
            </div>
            <div>
              <Label htmlFor="hero-last-name">Last Name</Label>
              <Input
                id="hero-last-name"
                value={hero.title?.last || ''}
                onChange={(e) => updateContent('hero.title.last', e.target.value)}
                placeholder="Enter last name"
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                This will appear in the foreground color
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Description</h3>
          <div>
            <Label htmlFor="hero-description">Tagline / Description</Label>
            <Textarea
              id="hero-description"
              value={hero.description || ''}
              onChange={(e) => updateContent('hero.description', e.target.value)}
              placeholder="Enter your professional tagline"
              className="mt-2"
              rows={3}
            />
            <p className="text-xs text-muted-foreground mt-1">
              A brief description that appears below your name
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Primary Button</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="hero-button-text">Button Text</Label>
              <Input
                id="hero-button-text"
                value={hero.buttons?.primary?.text || ''}
                onChange={(e) => updateContent('hero.buttons.primary.text', e.target.value)}
                placeholder="Button text"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="hero-button-action">Button Action</Label>
              <Input
                id="hero-button-action"
                value={hero.buttons?.primary?.action || ''}
                onChange={(e) => updateContent('hero.buttons.primary.action', e.target.value)}
                placeholder="Action identifier"
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Internal action identifier (e.g., 'resume', 'contact')
              </p>
            </div>
          </div>
          <div className="mt-4">
            <Label htmlFor="hero-button-url">Button URL</Label>
            <Input
              id="hero-button-url"
              value={hero.buttons?.primary?.url || ''}
              onChange={(e) => updateContent('hero.buttons.primary.url', e.target.value)}
              placeholder="https://example.com/resume.pdf"
              className="mt-2"
              type="url"
            />
            <p className="text-xs text-muted-foreground mt-1">
              URL that opens when the button is clicked (leave empty to disable)
            </p>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}