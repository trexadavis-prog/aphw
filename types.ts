import { LucideIcon } from 'lucide-react';

export interface Discipline {
  id: string;
  title: string;
  description: string;
  details: string[];
  icon: LucideIcon;
  image: string;
}

export interface GearCategory {
  id: string;
  label: string;
  title: string;
  content: string;
  comparison: {
    label: string;
    description: string;
  }[];
  technicalNote?: string;
}

export interface CalibrationFrame {
  id: string;
  title: string;
  description: string;
  method: string;
  icon: LucideIcon;
}

export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}
