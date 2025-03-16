
import { Monitor, CircleEllipsis } from 'lucide-react';
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
];
