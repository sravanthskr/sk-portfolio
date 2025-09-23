import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useNavigation, useSocialLinks } from '@/contexts/ContentContext';
import { motion } from 'framer-motion';

const getIconComponent = (iconName: string) => {
  if (iconName && iconName.includes(':')) {
    return iconName;
  }
  
  const iconMap: Record<string, string> = {
    'Mail': 'lucide:mail',
    'Github': 'lucide:github', 
    'Linkedin': 'lucide:linkedin',
    'Twitter': 'lucide:twitter',
    'ExternalLink': 'lucide:external-link',
    'Send': 'lucide:send',
    'Phone': 'lucide:phone',
    'MessageCircle': 'lucide:message-circle',
    'Instagram': 'lucide:instagram',
    'Facebook': 'lucide:facebook',
    'Youtube': 'lucide:youtube',
    'Globe': 'lucide:globe',
    'User': 'lucide:user',
    'MapPin': 'lucide:map-pin',
    'Calendar': 'lucide:calendar',
    'Briefcase': 'lucide:briefcase',
    'Behance': 'simple-icons:behance'
  };
  
  return iconMap[iconName] || 'lucide:mail';
};

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const { theme, toggleTheme } = useTheme();
  const navigationSections = useNavigation();
  const socialLinksData = useSocialLinks();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const section = navigationSections.find(s => s.shortcut === e.key);
      if (section) {
        onSectionChange(section.id);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSectionChange]);

  const handleSectionClick = (sectionId: string) => {
    onSectionChange(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav 
        className={`fixed top-2 sm:top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 hidden lg:block ${
          isScrolled ? 'backdrop-blur-md bg-background/85' : 'backdrop-blur-sm bg-background/50'
        } border border-border rounded-full px-4 xl:px-6 py-3 shadow-lg mx-4`}
        data-testid="navigation-main"
      >
        <div className="flex items-center gap-4 xl:gap-6">
          <div className="flex items-center gap-1">
            {navigationSections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className={`relative px-3 xl:px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full hover-elevate min-h-[36px] ${
                  activeSection === section.id
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                data-testid={`nav-${section.id}`}
              >
                {section.label}
                {activeSection === section.id && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>
          
          <div className="w-px h-6 bg-border" />
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full min-h-[36px] min-w-[36px]"
            data-testid="theme-toggle"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Icon icon="lucide:moon" className="w-4 h-4" />
            ) : (
              <Icon icon="lucide:sun" className="w-4 h-4" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 lg:hidden ${
          isScrolled ? 'backdrop-blur-md bg-background/90' : 'backdrop-blur-sm bg-background/70'
        } border-b border-border shadow-sm safe-top`}
        data-testid="navigation-mobile"
      >
        <div className="flex items-center justify-end section-padding py-3">
          <div className="flex items-center gap-2">
            {socialLinksData.map((social) => {
              const iconName = getIconComponent(social.iconName);
              return (
                <a
                  key={social.label}
                  href={social.url}
                  target={social.platform !== 'Email' ? '_blank' : undefined}
                  rel={social.platform !== 'Email' ? 'noopener noreferrer' : undefined}
                  className="w-9 h-9 bg-background/60 backdrop-blur-sm border border-border rounded-full flex items-center justify-center hover:border-primary/40 hover:bg-primary/10 transition-all duration-300"
                >
                  <Icon icon={iconName} className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
                </a>
              );
            })}
            
            <div className="w-px h-6 bg-border mx-1" />
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full min-h-[44px] min-w-[44px]"
              data-testid="theme-toggle-mobile"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Icon icon="lucide:moon" className="w-5 h-5" />
              ) : (
                <Icon icon="lucide:sun" className="w-5 h-5" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-full min-h-[44px] min-w-[44px]"
              data-testid="mobile-menu-toggle"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <Icon icon="lucide:x" className="w-5 h-5" />
              ) : (
                <Icon icon="lucide:menu" className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu - Connected Button Layout */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-full right-4 mt-2 z-50"
          >
            <div className="relative">
              {/* Connecting Lines */}
              <div className="absolute left-1 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-border to-primary/40" />
              
              {/* Navigation Buttons */}
              <div className="flex flex-col gap-1">
                {navigationSections.map((section, index) => (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, x: 20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: index * 0.1,
                      ease: "easeOut" 
                    }}
                    className="relative flex items-center"
                  >
                    {/* Connection Node */}
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 z-10" />
                    
                    {/* Button */}
                    <motion.button
                      onClick={() => handleSectionClick(section.id)}
                      className={`relative ml-4 px-4 py-2 text-sm font-medium rounded-full border backdrop-blur-sm transition-all duration-300 min-w-[120px] ${
                        activeSection === section.id
                          ? 'text-primary bg-primary/20 border-primary/40 shadow-lg shadow-primary/20'
                          : 'text-muted-foreground hover:text-foreground bg-background/80 border-border hover:border-primary/30 hover:bg-primary/10'
                      }`}
                      whileHover={{ scale: 1.05, x: 4 }}
                      whileTap={{ scale: 0.95 }}
                      data-testid={`nav-mobile-${section.id}`}
                    >
                      {section.label}
                      {activeSection === section.id && (
                        <motion.div
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/10 to-primary/20"
                          layoutId="mobileActiveTab"
                          initial={false}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        />
                      )}
                    </motion.button>
                  </motion.div>
                ))}
              </div>
              
            </div>
          </motion.div>
        )}
      </nav>

      {/* Add spacing to sections when mobile nav is visible */}
      <div className="h-16 lg:h-0" />
    </>
  );
}