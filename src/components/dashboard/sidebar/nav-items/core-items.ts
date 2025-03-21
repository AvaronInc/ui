
import { LayoutDashboard, Server, Bot } from 'lucide-react';
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
  {
    title: 'AIM',
    icon: Bot,
    href: '/aim'
  },
];
