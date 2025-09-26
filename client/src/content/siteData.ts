export const personalInfo = {
  name: {
    first: "Sravanth",
    last: "Kumar",
  },
  email: "sravanthkumarrr@gmail.com",
  tagline: "Every bug I face becomes the path to understanding; every challenge, a lesson in clarity.",
};

export const socialLinks = [
  { platform: 'GitHub', url: 'https://github.com/sravanthskr', label: 'GitHub', iconName: 'Github' },
  { platform: 'LinkedIn', url: 'https://linkedin.com/in/sravanth-kumar-sanam', label: 'LinkedIn', iconName: 'Linkedin' },
  { platform: 'Behance', url: 'https://www.behance.net/sravanthkumar1', label: 'Behance', iconName: 'Behance' },
];

export const heroContent = {
  title: {
    first: "Sravanth", // Will use theme color
    last: "Kumar", // Will use white/foreground color
  },
  description: personalInfo.tagline,
  buttons: {
    primary: {
      text: "My Resume",
      action: "resume",
      url: "https://drive.google.com/file/d/1234567890/view", // This can be updated in admin
    },
  },
};

export const navigationSections = [
  { id: 'home', label: 'Home', shortcut: '1' },
  { id: 'about', label: 'About', shortcut: '2' },
  { id: 'skills', label: 'Skills', shortcut: '3' },
  { id: 'projects', label: 'Projects', shortcut: '4' },
  { id: 'experience', label: 'Experience', shortcut: '5' },
  { id: 'certifications', label: 'Certifications', shortcut: '6' },
  { id: 'contact', label: 'Contact', shortcut: '7' },
];

export const aboutContent = {
  title: "About Me",
  description: "I'm a passionate developer with experience in building modern web applications and solving complex problems through innovative solutions.",
  secondParagraph: "I specialize in modern web technologies, with expertise in React, TypeScript, Node.js, and cloud platforms. I believe in writing clean, maintainable code and creating user experiences that are both beautiful and intuitive.",
  kpiCards: [
    { value: "50+", label: "Projects Completed" },
    { value: "5+", label: "Years Experience" }
  ],
  keyTechnologies: [
    { name: "React & TypeScript" },
    { name: "Node.js & Express" },
    { name: "PostgreSQL & MongoDB" },
    { name: "AWS & Cloud Platforms" }
  ],
  education: [
    {
      id: "1",
      institution: "University Name",
      degree: "Bachelor's in Computer Science",
      period: "2018 - 2022",
      description: "Focused on software engineering, data structures, and web development.",
    },
    {
      id: "2", 
      institution: "Institute Name",
      degree: "Full Stack Development Certification",
      period: "2022",
      description: "Specialized in React, Node.js, and modern web technologies.",
    },
  ],
};

export const skillsContent = {
  title: "Skills",
  categories: [
    {
      name: "Frontend",
      skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Vue.js"],
    },
    {
      name: "Backend", 
      skills: ["Node.js", "Express", "Python", "PostgreSQL", "MongoDB"],
    },
    {
      name: "Tools & Technologies",
      skills: ["Git", "Docker", "AWS", "Figma", "VSCode"],
    },
  ],
};

export const projectsContent = {
  title: "Projects",
  filterCategories: ["All Projects", "Web", "Mobile", "AI/ML", "Open Source"],
  projects: [
    {
      id: "ecommerce",
      title: "E-Commerce Platform",
      category: "Web",
      description: "A full-stack e-commerce solution with modern UI and secure payments.",
      technologies: ["React", "Node.js", "Stripe", "PostgreSQL"],
      icon: "🛍️",
      url: "https://ecommerce.demo",
      github: "https://github.com/example/ecommerce",
      image: "/attached_assets/generated_images/Web_application_interface_mockup_414f218b.png",
    },
    {
      id: "task-app",
      title: "Task Management App", 
      category: "Web",
      description: "Collaborative task management with real-time updates.",
      technologies: ["React", "Socket.io", "MongoDB"],
      icon: "✅",
      url: "https://tasks.app",
      github: "https://github.com/example/tasks",
      image: "/attached_assets/generated_images/Mobile_app_interface_mockup_9cace1c0.png",
    },
    {
      id: "analytics",
      title: "Analytics Dashboard",
      category: "Web", 
      description: "Data visualization dashboard with interactive charts.",
      technologies: ["React", "D3.js", "Express", "PostgreSQL"],
      icon: "📊",
      url: "https://analytics.demo",
      github: "https://github.com/example/analytics",
      image: "/attached_assets/generated_images/Web_application_interface_mockup_414f218b.png",
    },
    {
      id: "chatbot-ai",
      title: "AI Chat Assistant",
      category: "AI/ML",
      description: "Intelligent chatbot powered by GPT with conversation memory and context awareness.",
      technologies: ["Python", "OpenAI", "FastAPI", "React"],
      icon: "🤖",
      url: "https://ai-chat.demo",
      github: "https://github.com/example/ai-chat",
      image: "/attached_assets/generated_images/Creative_skills_visualization_2e77d3bb.png",
    },
    {
      id: "image-classifier",
      title: "Image Classification Tool",
      category: "AI/ML",
      description: "Real-time image classification using TensorFlow with custom model training capabilities.",
      technologies: ["TensorFlow", "Python", "Flask", "React"],
      icon: "🔍",
      url: "https://classifier.demo",
      github: "https://github.com/example/classifier",
      image: "/attached_assets/generated_images/Creative_skills_visualization_2e77d3bb.png",
    },
    {
      id: "mobile-tracker",
      title: "Fitness Tracker App",
      category: "Mobile",
      description: "Cross-platform mobile app for tracking workouts and health metrics.",
      technologies: ["React Native", "SQLite", "Firebase"],
      icon: "📱",
      url: "https://fitness.app",
      github: "https://github.com/example/fitness",
      image: "/attached_assets/generated_images/Mobile_app_interface_mockup_9cace1c0.png",
    },
  ],
};

export const experienceContent = {
  title: "Experience",
  experiences: [
    {
      id: "1",
      company: "Tech Company",
      position: "Senior Frontend Developer",
      period: "2022 - Present",
      location: "Remote",
      description: "Led frontend development for multiple high-traffic applications, mentored junior developers, and implemented modern development practices.",
      achievements: [
        "Improved application performance by 40%",
        "Led a team of 5 developers",
        "Implemented CI/CD pipelines",
      ],
      technologies: ["React", "TypeScript", "Next.js", "GraphQL"],
    },
    {
      id: "2",
      company: "Startup Inc.",
      position: "Full Stack Developer",
      period: "2020 - 2022",
      location: "New York, NY",
      description: "Developed and maintained full-stack applications, worked closely with design team to implement pixel-perfect UIs.",
      achievements: [
        "Built 3 major applications from scratch",
        "Reduced loading times by 60%",
        "Implemented automated testing",
      ],
      technologies: ["React", "Node.js", "MongoDB", "AWS"],
    },
  ],
};

export const certificationsContent = {
  title: "Certifications",
  certifications: [
    {
      id: "1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023",
      credentialId: "AWS-12345",
      url: "https://aws.amazon.com/certification/",
      icon: "☁️",
    },
    {
      id: "2", 
      name: "React Developer Certification",
      issuer: "Meta",
      date: "2022",
      credentialId: "META-67890",
      url: "https://developers.facebook.com/",
      icon: "⚛️",
    },
    {
      id: "3",
      name: "Google Cloud Professional",
      issuer: "Google Cloud",
      date: "2023",
      credentialId: "GCP-11111",
      url: "https://cloud.google.com/certification/",
      icon: "🏗️",
    },
  ],
};

export const contactContent = {
  title: "Let's Connect",
  subtitle: "Let's build something meaningful together.",
  description: "I'm always excited to work on new projects and collaborate with creative teams. Whether you have a clear vision or just an idea, I'd love to help bring it to life.",
  bulletPoints: [
    { text: "Full-stack development expertise" },
    { text: "Modern technology stack" },
    { text: "Agile development process" },
    { text: "Focus on user experience" }
  ],
  form: {
    title: "Or contact through this form",
    fields: {
      firstName: {
        label: "First Name",
        placeholder: "John"
      },
      lastName: {
        label: "Last Name",
        placeholder: "Doe"
      },
      email: {
        label: "Email",
        placeholder: "john@example.com"
      },
      subject: {
        label: "Subject",
        placeholder: "Project inquiry"
      },
      message: {
        label: "Message",
        placeholder: "Tell me about your project..."
      }
    },
    submitButton: {
      text: "Send Message"
    }
  },
  email: personalInfo.email,
  emailCard: {
    title: "Ready to Start a Project?"
  }
};
