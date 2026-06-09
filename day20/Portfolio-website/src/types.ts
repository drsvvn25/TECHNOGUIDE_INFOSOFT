export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  demoType: "link" | "code" | "visibility";
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  periodBadgeColor: string;
  tagline: string;
}

export interface Hackathon {
  id: string;
  year: string;
  title: string;
  award: string;
  borderColor: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: Date;
}
