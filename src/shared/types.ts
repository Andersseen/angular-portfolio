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
  pages: {
    hero: {
      title: string;
    };
    about: {
      text: string;
      hiddenText: string;
      markText: string;
    };
    projects: {
      button: string;
    };
    contact: {
      nameInput: string;
      lastNameInput: string;
      emailInput: string;
      messageInput: string;
      title: string;
      button: string;
    };
  };
  footer: { allRights: string };
  preload: {
    description: string;
    title: string;
  };
}

export type Language = 'en' | 'es' | 'ua';
export type Theme = 'light' | 'dark';

export interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}
