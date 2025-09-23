import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './Navigation';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import SkillsSection from './SkillsSection';
import ProjectsSection from './ProjectsSection';
import ExperienceSection from './ExperienceSection';
import CertificationsSection from './CertificationsSection';
import ContactSection from './ContactSection';
import SocialFloatingIcons from './SocialFloatingIcons';

const sections = [
  { id: 'home', component: HeroSection },
  { id: 'about', component: AboutSection },
  { id: 'skills', component: SkillsSection },
  { id: 'projects', component: ProjectsSection },
  { id: 'experience', component: ExperienceSection },
  { id: 'certifications', component: CertificationsSection },
  { id: 'contact', component: ContactSection },
];

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSectionChange = (sectionId: string) => {
    if (sectionId === activeSection || isTransitioning) return;
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      setActiveSection(sectionId);
      setTimeout(() => setIsTransitioning(false), 300);
    }, 150);
  };

  const handleScrollToNext = () => {
    const currentIndex = sections.findIndex(s => s.id === activeSection);
    const nextIndex = (currentIndex + 1) % sections.length;
    handleSectionChange(sections[nextIndex].id);
  };

  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.slice(1);
      if (hash && sections.find(s => s.id === hash)) {
        setActiveSection(hash);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    window.history.replaceState(null, '', `#${activeSection}`);
  }, [activeSection]);

  const CurrentSection = sections.find(s => s.id === activeSection)?.component || HeroSection;

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Navigation */}
      <Navigation activeSection={activeSection} onSectionChange={handleSectionChange} />
      
      {/* Section Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ 
            duration: 0.6, 
            ease: [0.4, 0, 0.2, 1],
            type: "tween"
          }}
          className="relative z-10"
        >
          {activeSection === 'home' && <HeroSection onScrollToNext={handleScrollToNext} />}
          {activeSection === 'about' && <AboutSection />}
          {activeSection === 'skills' && <SkillsSection />}
          {activeSection === 'projects' && <ProjectsSection />}
          {activeSection === 'experience' && <ExperienceSection />}
          {activeSection === 'certifications' && <CertificationsSection />}
          {activeSection === 'contact' && <ContactSection />}
        </motion.div>
      </AnimatePresence>

      {/* Overlay during transitions */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background z-20 pointer-events-none"
          />
        )}
      </AnimatePresence>
      
      {/* Social Icons */}
      <SocialFloatingIcons />
    </div>
  );
}