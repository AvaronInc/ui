
import { Monitor, CircleEllipsis, Server } from 'lucide-react';
import { NavItem } from './types';

// Monitoring 
export const monitoringItems: NavItem[] = [
  {
    title: 'RMM',
    icon: Monitor,
    href: '/rmm'
  },
  {
    title: 'Services',
    icon: CircleEllipsis,
    href: '/services'
  },
  {
    title: 'System Services',
    icon: Server,
    href: '/system-services'
  },
];
