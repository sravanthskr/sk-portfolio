import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { useContent } from '@/contexts/ContentContext';

export default function NavigationEditor() {
  const { content, updateContent } = useContent();
  // Ensure navigation is always an array with proper fallback
  const navigation = Array.isArray(content.navigation) ? content.navigation : [
    { id: 'home', label: 'Home', shortcut: '1' },
    { id: 'about', label: 'About', shortcut: '2' },
    { id: 'skills', label: 'Skills', shortcut: '3' },
    { id: 'projects', label: 'Projects', shortcut: '4' },
    { id: 'experience', label: 'Experience', shortcut: '5' },
    { id: 'certifications', label: 'Certifications', shortcut: '6' },
    { id: 'contact', label: 'Contact', shortcut: '7' },
  ];

  const addNavigationItem = () => {
    const newItem = {
      id: 'new-section',
      label: 'New Section',
      shortcut: '9'
    };
    const updatedNavigation = [...navigation, newItem];
    updateContent('navigation', updatedNavigation);
  };

  const removeNavigationItem = (index: number) => {
    const updatedNavigation = navigation.filter((_, i) => i !== index);
    updateContent('navigation', updatedNavigation);
  };

  const updateNavigationItem = (index: number, field: string, value: string) => {
    const updatedNavigation = [...navigation];
    (updatedNavigation[index] as any)[field] = value;
    updateContent('navigation', updatedNavigation);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Navigation Menu</h2>
        <p className="text-muted-foreground">
          Configure the navigation menu items and their keyboard shortcuts.
        </p>
      </div>

      <div className="space-y-4">
        {navigation.map((item, index) => (
          <Card key={item.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <Icon icon="lucide:grip-vertical" className="w-4 h-4 text-muted-foreground" />
                <h3 className="text-lg font-medium">
                  Navigation Item #{index + 1}
                </h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeNavigationItem(index)}
                className="text-destructive hover:text-destructive"
              >
                <Icon icon="lucide:trash-2" className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor={`nav-id-${index}`}>Section ID</Label>
                <Input
                  id={`nav-id-${index}`}
                  value={item.id}
                  onChange={(e) => updateNavigationItem(index, 'id', e.target.value)}
                  placeholder="section-id"
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Unique identifier for the section
                </p>
              </div>
              <div>
                <Label htmlFor={`nav-label-${index}`}>Display Label</Label>
                <Input
                  id={`nav-label-${index}`}
                  value={item.label}
                  onChange={(e) => updateNavigationItem(index, 'label', e.target.value)}
                  placeholder="Section Name"
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Text shown in navigation
                </p>
              </div>
              <div>
                <Label htmlFor={`nav-shortcut-${index}`}>Keyboard Shortcut</Label>
                <Input
                  id={`nav-shortcut-${index}`}
                  value={item.shortcut}
                  onChange={(e) => updateNavigationItem(index, 'shortcut', e.target.value)}
                  placeholder="1"
                  maxLength={1}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Single key shortcut
                </p>
              </div>
            </div>
          </Card>
        ))}

        <Card className="p-6 border-dashed">
          <Button
            onClick={addNavigationItem}
            className="w-full gap-2"
            variant="ghost"
          >
            <Icon icon="lucide:plus" className="w-4 h-4" />
            Add Navigation Item
          </Button>
        </Card>
      </div>
    </motion.div>
  );
}