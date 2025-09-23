import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { useContent } from '@/contexts/ContentContext';

export default function ContactEditor() {
  const { content, updateContent } = useContent();
  const contact = content.contact || {};

  const addBulletPoint = () => {
    const text = prompt('Enter bullet point text:');
    if (text && text.trim()) {
      const newPoint = { text: text.trim() };
      const updatedPoints = [...(contact.bulletPoints || []), newPoint];
      updateContent('contact.bulletPoints', updatedPoints);
    }
  };

  const removeBulletPoint = (index: number) => {
    const updatedPoints = (contact.bulletPoints || []).filter((_, i) => i !== index);
    updateContent('contact.bulletPoints', updatedPoints);
  };

  const updateBulletPoint = (index: number, text: string) => {
    const updatedPoints = [...(contact.bulletPoints || [])];
    updatedPoints[index].text = text;
    updateContent('contact.bulletPoints', updatedPoints);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Contact Section</h2>
        <p className="text-muted-foreground">
          Configure contact information, descriptions, and form settings.
        </p>
      </div>

      <div className="space-y-6">
        {/* Basic Information */}
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Section Content</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="contact-title">Section Title</Label>
              <Input
                id="contact-title"
                value={contact.title || ''}
                onChange={(e) => updateContent('contact.title', e.target.value)}
                placeholder="Let's Work Together"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="contact-subtitle">Subtitle</Label>
              <Input
                id="contact-subtitle"
                value={contact.subtitle || ''}
                onChange={(e) => updateContent('contact.subtitle', e.target.value)}
                placeholder="Ready to start your next project?"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="contact-description">Description</Label>
              <Textarea
                id="contact-description"
                value={contact.description || ''}
                onChange={(e) => updateContent('contact.description', e.target.value)}
                placeholder="Brief description about working together..."
                className="mt-2"
                rows={3}
              />
            </div>
          </div>
        </Card>

        {/* Email Card */}
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Email Card</h3>
          <div>
            <Label htmlFor="email-card-title">Email Card Title</Label>
            <Input
              id="email-card-title"
              value={contact.emailCard?.title || ''}
              onChange={(e) => updateContent('contact.emailCard.title', e.target.value)}
              placeholder="Send Me a Message"
              className="mt-2"
            />
          </div>
        </Card>

        {/* Bullet Points */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Bullet Points</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={addBulletPoint}
              className="gap-2"
            >
              <Icon icon="lucide:plus" className="w-4 h-4" />
              Add Point
            </Button>
          </div>
          <div className="space-y-4">
            {contact.bulletPoints.map((point, index) => (
              <Card key={index} className="p-4 border-dashed">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <Label htmlFor={`bullet-${index}`}>Point #{index + 1}</Label>
                    <Input
                      id={`bullet-${index}`}
                      value={point.text}
                      onChange={(e) => updateBulletPoint(index, e.target.value)}
                      placeholder="Quick response time"
                      className="mt-2"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeBulletPoint(index)}
                    className="text-destructive hover:text-destructive mt-6"
                  >
                    <Icon icon="lucide:trash-2" className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
            {contact.bulletPoints.length === 0 && (
              <p className="text-sm text-muted-foreground">No bullet points yet. Add points about your work process or benefits.</p>
            )}
          </div>
        </Card>

        {/* Contact Form */}
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Contact Form Settings</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="form-title">Form Title</Label>
              <Input
                id="form-title"
                value={contact.form.title}
                onChange={(e) => updateContent('contact.form.title', e.target.value)}
                placeholder="Get In Touch"
                className="mt-2"
              />
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first-name-label">First Name Field Label</Label>
                <Input
                  id="first-name-label"
                  value={contact.form.fields.firstName.label}
                  onChange={(e) => updateContent('contact.form.fields.firstName.label', e.target.value)}
                  placeholder="First Name"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="first-name-placeholder">First Name Placeholder</Label>
                <Input
                  id="first-name-placeholder"
                  value={contact.form.fields.firstName.placeholder}
                  onChange={(e) => updateContent('contact.form.fields.firstName.placeholder', e.target.value)}
                  placeholder="John"
                  className="mt-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="last-name-label">Last Name Field Label</Label>
                <Input
                  id="last-name-label"
                  value={contact.form.fields.lastName.label}
                  onChange={(e) => updateContent('contact.form.fields.lastName.label', e.target.value)}
                  placeholder="Last Name"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="last-name-placeholder">Last Name Placeholder</Label>
                <Input
                  id="last-name-placeholder"
                  value={contact.form.fields.lastName.placeholder}
                  onChange={(e) => updateContent('contact.form.fields.lastName.placeholder', e.target.value)}
                  placeholder="Doe"
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="submit-button-text">Submit Button Text</Label>
              <Input
                id="submit-button-text"
                value={contact.form.submitButton.text}
                onChange={(e) => updateContent('contact.form.submitButton.text', e.target.value)}
                placeholder="Send Message"
                className="mt-2"
              />
            </div>
          </div>
        </Card>

        {/* Tips Card */}
        <Card className="p-6 bg-primary/5 border-primary/20">
          <h3 className="text-lg font-medium mb-3">📧 Contact Tips</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• <strong>Title & Subtitle:</strong> Make it clear and inviting for potential clients</p>
            <p>• <strong>Description:</strong> Briefly explain your availability and preferred contact method</p>
            <p>• <strong>Bullet Points:</strong> Highlight benefits like "Quick response", "Free consultation", etc.</p>
            <p>• <strong>Form Labels:</strong> Use clear, professional field labels</p>
            <p>• <strong>CTA Button:</strong> Use action-oriented text like "Send Message" or "Get In Touch"</p>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}