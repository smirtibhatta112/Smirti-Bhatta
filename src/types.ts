export interface CvProfile {
  name: string;
  tagline: string;
  motto: string;
  title: string;
  enrolledDegree: string;
  location: string;
  phone: string;
  email: string;
  nationality: string;
  languages: string[];
  photoUrl: string;
  objective: string;
  declaration: string;
}

export interface AcademicRecord {
  id: string;
  degree: string;
  institution: string;
  board: string;
  status: string;
  year?: string;
  highlights: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: {
    name: string;
    level: string;
    details: string;
  }[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  scope: string;
  specs: { label: string; value: string }[];
}

export interface CursorState {
  id: string;
  name: string;
  role: string;
  color: string;
  badgeBg: string;
  textColor: string;
  currentAction: string;
  x: number; // percentage of viewport width
  y: number; // percentage of section height or viewport height
  targetElement?: string;
}

export interface BoqItem {
  itemNo: string;
  description: string;
  quantity: number;
  unit: string;
  unitRate: number;
  total: number;
}
