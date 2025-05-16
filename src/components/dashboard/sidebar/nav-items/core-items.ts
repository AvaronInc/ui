
import { LayoutDashboard, Server, Brain, Fingerprint, CircleEllipsis, Settings, Layers, Wrench, Globe } from 'lucide-react';
import { NavItem } from './types';

// Core System Management
export const coreSystemItems: NavItem[] = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/'
  },
  {
    title: 'AIM',
    icon: Brain,
    href: '/aim'
  },
  {
    title: 'Vertex',
    icon: Server,
    href: '/vertex'
  },
  {
    title: 'Zones',
    icon: Layers,
    href: '/zones'
  },
  {
    title: 'Regions',
    icon: Globe,
    href: '/regions'
  },
  {
    title: 'Deployment Testing',
    icon: Wrench,
    href: '/deployment-testing'
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
