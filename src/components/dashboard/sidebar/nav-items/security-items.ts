
import { Shield, Mail, FileText, Lock, Bug, TestTube, Database } from 'lucide-react';
import { NavItem } from './types';

// Security & Compliance
export const securityItems: NavItem[] = [
  {
    title: 'Security',
    icon: Shield,
    href: '/security'
  },
  {
    title: 'Intelligence',
    icon: Database,
    href: '/intelligence'
  },
  {
    title: 'Firewall',
    icon: Lock,
    href: '/firewall'
  },
  {
    title: 'Logging & Audit',
    icon: FileText,
    href: '/logging-audit'
  },
  {
    title: 'Honeypot',
    icon: Bug,
    href: '/honeypot'
  },
];
