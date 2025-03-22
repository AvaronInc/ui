
import { Users, ShieldCheck } from 'lucide-react';
import { NavItem } from './types';

// Identity Management
export const identityItems: NavItem[] = [
  {
    title: 'Identity',
    icon: Users,
    href: '/identity'
  },
  {
    title: 'Authenticator',
    icon: ShieldCheck,
    href: '/authenticator'
  },
];
