import React from 'react';
import { AdminSection } from '../AdminApp';
import HeroEditor from '../editors/HeroEditor';
import AboutEditor from '../editors/AboutEditor';
import SkillsEditor from '../editors/SkillsEditor';
import ProjectsEditor from '../editors/ProjectsEditor';
import ExperienceEditor from '../editors/ExperienceEditor';
import CertificationsEditor from '../editors/CertificationsEditor';
import ContactEditor from '../editors/ContactEditor';
import NavigationEditor from '../editors/NavigationEditor';
import SocialEditor from '../editors/SocialEditor';

interface AdminContentProps {
  activeSection: AdminSection;
}

export default function AdminContent({ activeSection }: AdminContentProps) {
  const renderEditor = () => {
    switch (activeSection) {
      case 'hero':
        return <HeroEditor />;
      case 'about':
        return <AboutEditor />;
      case 'skills':
        return <SkillsEditor />;
      case 'projects':
        return <ProjectsEditor />;
      case 'experience':
        return <ExperienceEditor />;
      case 'certifications':
        return <CertificationsEditor />;
      case 'contact':
        return <ContactEditor />;
      case 'navigation':
        return <NavigationEditor />;
      case 'social':
        return <SocialEditor />;
      default:
        return <div className="p-6">Section editor not implemented yet</div>;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
        {renderEditor()}
      </div>
    </div>
  );
}