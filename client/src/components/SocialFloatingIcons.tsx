import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useSocialLinks, usePersonalInfo } from '@/contexts/ContentContext';

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

export default function SocialFloatingIcons() {
  const socialLinks = useSocialLinks();
  const personalInfo = usePersonalInfo();
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="fixed top-24 right-4 z-40 hidden lg:block"
      data-testid="social-floating-icons"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Email at top */}
        <motion.a
          href={`mailto:${personalInfo.email}`}
          className="text-xs text-muted-foreground hover:text-primary transition-colors whitespace-nowrap cursor-pointer mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          whileHover={{ scale: 1.05 }}
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          {personalInfo.email}
        </motion.a>
        
        {/* Connecting Line */}
        <motion.div
          className="w-px h-20 bg-gradient-to-b from-primary/40 via-border to-transparent"
          initial={{ height: 0 }}
          animate={{ height: 80 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        />

        {/* Social Icons */}
        <div className="flex flex-col gap-3">
          {socialLinks.map((social, index) => {
            const iconName = getIconComponent(social.iconName);
            return (
              <motion.a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-12 h-12 bg-background/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center hover-elevate transition-all duration-300"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                onClick={(e) => {
                  console.log(`${social.label} clicked:`, social.url);
                }}
                data-testid={`social-${social.label.toLowerCase()}`}
              >
                <Icon icon={iconName} className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Tooltip */}
              <div className="absolute right-full mr-3 px-2 py-1 bg-background border border-border rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {social.label}
              </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}