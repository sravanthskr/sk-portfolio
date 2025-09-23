// Using string-based icon names for Firebase compatibility

// Core content interfaces for the CMS system
export interface PersonalInfo {
  name: {
    first: string;
    last: string;
  };
  email: string;
  tagline: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
  iconName: string; // Store icon name as string for Firebase compatibility
}

export interface NavigationItem {
  id: string;
  label: string;
  shortcut: string;
}

export interface HeroContent {
  title: {
    first: string;
    last: string;
  };
  description: string;
  buttons: {
    primary: {
      text: string;
      action: string;
      url?: string;
    };
  };
}

export interface KpiCard {
  value: string;
  label: string;
}

export interface KeyTechnology {
  name: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
  description: string;
}

export interface AboutContent {
  title: string;
  description: string;
  secondParagraph: string;
  kpiCards: KpiCard[];
  keyTechnologies: KeyTechnology[];
  education: Education[];
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface SkillsContent {
  title: string;
  categories: SkillCategory[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  icon: string;
  url: string;
  github: string;
  image: string;
}

export interface ProjectsContent {
  title: string;
  filterCategories: string[];
  projects: Project[];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface ExperienceContent {
  title: string;
  experiences: Experience[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId: string;
  url: string;
  icon: string;
}

export interface CertificationsContent {
  title: string;
  certifications: Certification[];
}

export interface ContactBulletPoint {
  text: string;
}

export interface ContactForm {
  title: string;
  fields: {
    firstName: {
      label: string;
      placeholder: string;
    };
    lastName: {
      label: string;
      placeholder: string;
    };
    email: {
      label: string;
      placeholder: string;
    };
    subject: {
      label: string;
      placeholder: string;
    };
    message: {
      label: string;
      placeholder: string;
    };
  };
  submitButton: {
    text: string;
  };
}

export interface ContactContent {
  title: string;
  subtitle: string;
  description: string;
  bulletPoints: ContactBulletPoint[];
  form: ContactForm;
  email: string;
  emailCard: {
    title: string;
  };
}

// Main site content structure
export interface SiteContent {
  personalInfo: PersonalInfo;
  socialLinks: SocialLink[];
  navigation: NavigationItem[];
  hero: HeroContent;
  about: AboutContent;
  skills: SkillsContent;
  projects: ProjectsContent;
  experience: ExperienceContent;
  certifications: CertificationsContent;
  contact: ContactContent;
}

// For form editing - describes the structure of editable fields
export interface EditableField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'url' | 'email' | 'array' | 'object';
  placeholder?: string;
  maxLength?: number;
  required?: boolean;
}

export interface EditableSection {
  id: string;
  name: string;
  description: string;
  fields: EditableField[];
}

// Content update operations
export interface ContentUpdate {
  path: string;
  value: any;
}

export interface ContentState {
  content: SiteContent;
  isDirty: boolean;
  lastSaved: Date | null;
}