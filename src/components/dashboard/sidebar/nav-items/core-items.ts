
import { LayoutDashboard, Server, Brain, Fingerprint, CircleEllipsis, Settings } from 'lucide-react';
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
    icon: Brain,
    href: '/aim'
  },
  {
    title: 'Quantum Encryption',
    icon: Fingerprint,
    href: '/quantum-encryption'
  },
  {
    title: 'System Services',
    icon: CircleEllipsis,
    href: '/system-services'
  },
  {
    title: 'System Configuration',
    icon: Settings,
    href: '/system-configuration'
  },
];
