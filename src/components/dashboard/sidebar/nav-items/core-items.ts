
import { LayoutDashboard, Server } from 'lucide-react';
import { NavItem } from './types';

// Core System Management
export const coreSystemItems: NavItem[] = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/'
  },
  {
    title: 'N.E.S.T.',
    icon: Server,
    href: '/nest'
  },
];
