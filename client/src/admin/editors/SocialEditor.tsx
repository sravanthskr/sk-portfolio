import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { useContent } from '@/contexts/ContentContext';

export default function SocialEditor() {
  const { content, updateContent } = useContent();
  const socialLinks = Array.isArray(content?.socialLinks) ? content.socialLinks : [];

  const addSocialLink = () => {
    const newLink = {
      platform: 'New Platform',
      url: 'https://example.com',
      label: 'New Platform',
      iconName: 'ExternalLink'
    };
    const updatedLinks = [...socialLinks, newLink];
    updateContent('socialLinks', updatedLinks);
  };

  const removeSocialLink = (index: number) => {
    const updatedLinks = socialLinks.filter((_, i) => i !== index);
    updateContent('socialLinks', updatedLinks);
  };

  const updateSocialLink = (index: number, field: string, value: string) => {
    const updatedLinks = [...socialLinks];
    (updatedLinks[index] as any)[field] = value;
    updateContent('socialLinks', updatedLinks);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Social Links</h2>
        <p className="text-muted-foreground">
          Manage your social media links that appear in navigation and floating icons.
        </p>
      </div>

      <div className="space-y-4">
        {socialLinks.map((link, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                Social Link #{index + 1}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(link.url, '_blank')}
                  disabled={!link.url || link.url === 'https://example.com'}
                >
                  <Icon icon="lucide:external-link" className="w-4 h-4" />
                </Button>
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeSocialLink(index)}
                className="text-destructive hover:text-destructive"
              >
                <Icon icon="lucide:trash-2" className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`social-platform-${index}`}>Platform Name</Label>
                <Input
                  id={`social-platform-${index}`}
                  value={link.platform}
                  onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
                  placeholder="Platform name"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor={`social-label-${index}`}>Display Label</Label>
                <Input
                  id={`social-label-${index}`}
                  value={link.label}
                  onChange={(e) => updateSocialLink(index, 'label', e.target.value)}
                  placeholder="Display label"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor={`social-url-${index}`}>URL</Label>
                <Input
                  id={`social-url-${index}`}
                  value={link.url}
                  onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                  placeholder="https://example.com"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor={`social-icon-${index}`}>Icon Name</Label>
                <Input
                  id={`social-icon-${index}`}
                  value={link.iconName}
                  onChange={(e) => updateSocialLink(index, 'iconName', e.target.value)}
                  placeholder="Icon name (e.g., Github, lucide:instagram, mdi:discord)"
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Use legacy names (Github, Instagram) or any Iconify icon (lucide:github, mdi:instagram)
                </p>
              </div>
            </div>
          </Card>
        ))}

        <Card className="p-6 border-dashed">
          <Button
            onClick={addSocialLink}
            className="w-full gap-2"
            variant="ghost"
          >
            <Icon icon="lucide:plus" className="w-4 h-4" />
            Add Social Link
          </Button>
        </Card>
      </div>
    </motion.div>
  );
}