import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { AdminSection } from '../AdminApp';
import { Button } from '@/components/ui/button';

interface AdminSidebarProps {
  activeSection: AdminSection;
  onSectionChange: (section: AdminSection) => void;
}

const sectionConfig = [
  { id: 'hero' as AdminSection, label: 'Hero Section', icon: 'lucide:home', description: 'Main landing content' },
  { id: 'about' as AdminSection, label: 'About', icon: 'lucide:user', description: 'Personal information' },
  { id: 'skills' as AdminSection, label: 'Skills', icon: 'lucide:code', description: 'Technical skills' },
  { id: 'projects' as AdminSection, label: 'Projects', icon: 'lucide:briefcase', description: 'Portfolio projects' },
  { id: 'experience' as AdminSection, label: 'Experience', icon: 'lucide:award', description: 'Work history' },
  { id: 'certifications' as AdminSection, label: 'Certifications', icon: 'lucide:trophy', description: 'Achievements' },
  { id: 'contact' as AdminSection, label: 'Contact', icon: 'lucide:mail', description: 'Contact information' },
  { id: 'navigation' as AdminSection, label: 'Navigation', icon: 'lucide:navigation', description: 'Menu items' },
  { id: 'social' as AdminSection, label: 'Social Links', icon: 'lucide:share-2', description: 'Social media links' },
];

export default function AdminSidebar({ activeSection, onSectionChange }: AdminSidebarProps) {
  return (
    <div className="w-80 border-r border-border bg-background/50 backdrop-blur-sm overflow-y-auto">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-6">Content Sections</h2>
        
        <div className="space-y-2">
          {sectionConfig.map((section, index) => {
            const isActive = activeSection === section.id;
            const iconName = section.icon;
            
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start gap-3 h-auto p-4 ${
                    isActive 
                      ? 'bg-primary/10 text-primary border-primary/20' 
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => onSectionChange(section.id)}
                >
                  <div className={`p-2 rounded-lg ${
                    isActive 
                      ? 'bg-primary/20' 
                      : 'bg-muted'
                  }`}>
                    <Icon icon={iconName} className="w-4 h-4" />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <div className="font-medium truncate">{section.label}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {section.description}
                    </div>
                  </div>
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}