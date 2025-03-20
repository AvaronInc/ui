
import { Shield, Mail, FileText, Lock, Bug } from 'lucide-react';
import { NavItem } from './types';

// Security & Compliance
export const securityItems: NavItem[] = [
  {
    title: 'Security',
    icon: Shield,
    href: '/security'
  },
  {
    title: 'Email Security',
    icon: Mail,
    href: '/email-security'
  },
  {
    title: 'Firewall',
    icon: Lock,
    href: '/firewall'
  },
  {
    title: 'Logging & Audit',
    icon: FileText,
    href: '/logging'
  },
  {
    title: 'Honeypot',
    icon: Bug,
    href: '/honeypot'
  },
];
