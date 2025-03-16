
import { Shield, Mail, FileText } from 'lucide-react';
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
    title: 'Logging & Audit',
    icon: FileText,
    href: '/logging'
  },
];
