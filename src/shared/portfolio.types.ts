export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  resume: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  username: string;
}

export interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools' | 'other';
  icon: string;
  experience: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  image: string;
  images: string[];
  demoUrl?: string;
  githubUrl?: string;
  status: 'completed' | 'in-progress' | 'planned';
  featured: boolean;
  category: string;
  year: number;
  client: string;
  duration: string;
  features: string[];
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string;
  achievements: string[];
}

export interface Education {
  institution: string;
  degree: string;
  duration: string;
  location: string;
  gpa: string;
  relevant_courses: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credential: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  socialLinks: SocialLink[];
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
}

export interface ContentData {
  hero: {
    greeting: string;
    title: string;
    description: string;
    viewWork: string;
    contact: string;
  };
  about: {
    title: string;
    subtitle: string;
    paragraphs: string[];
    stats: Array<{ number: string; label: string }>;
  };
  skills: {
    title: string;
    subtitle: string;
    categories: {
      frontend: string;
      backend: string;
      tools: string;
      other: string;
    };
  };
  projects: {
    title: string;
    subtitle: string;
    demo: string;
    code: string;
    viewAll: string;
  };
  contact: {
    title: string;
    subtitle: string;
    description: string;
    form: {
      name: string;
      email: string;
      subject: string;
      message: string;
      send: string;
      sending: string;
      success: string;
      error: string;
    };
    info: {
      email: string;
      phone: string;
      location: string;
    };
  };
  footer: {
    tagline: string;
    madeWith: string;
    using: string;
    rights: string;
    links: {
      home: string;
      about: string;
      projects: string;
      contact: string;
    };
  };
  navigation: {
    home: string;
    about: string;
    skills: string;
    projects: string;
    contact: string;
  };
}

export type Language = 'en' | 'es' | 'ua';
export type Theme = 'light' | 'dark';

export interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}