
import { 
  Settings as SettingsIcon, 
  User, 
  Users, 
  Briefcase, 
  Shield, 
  Network, 
  MapPin, 
  HardDrive, 
  List, 
  Bot, 
  Bell, 
  Code, 
  Database, 
  FileText 
} from 'lucide-react';
import { SectionType } from './types';

export const settingsSections: SectionType[] = [
  { id: 'general', name: 'General System Settings', icon: SettingsIcon },
  { id: 'user-access', name: 'User & Access Management', icon: Users },
  { id: 'workforce', name: 'Workforce EMS Settings', icon: Briefcase },
  { id: 'security', name: 'Security & Compliance Settings', icon: Shield },
  { id: 'network', name: 'Network & Infrastructure Settings', icon: Network },
  { id: 'nest', name: 'CyberNest Management Settings', icon: MapPin },
  { id: 'storage', name: 'File Storage (MinIO) Settings', icon: HardDrive },
  { id: 'logging', name: 'Logging & Audit Settings', icon: List },
  { id: 'ai', name: 'AI & Automation Settings', icon: Bot },
  { id: 'notification', name: 'Notification & Alert Settings', icon: Bell },
  { id: 'api', name: 'API & Integration Settings', icon: Code },
  { id: 'backup', name: 'Backup & Disaster Recovery Settings', icon: Database },
  { id: 'compliance', name: 'Compliance & Legal Settings', icon: FileText }
];
