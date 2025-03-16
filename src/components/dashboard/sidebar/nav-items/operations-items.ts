
import { Zap, Server, List, Scroll } from 'lucide-react';
import { NavItem } from './types';

// IT Operations & Automation
export const operationsItems: NavItem[] = [
  {
    title: 'Automation Panel',
    icon: Zap,
    href: '/automation'
  },
  {
    title: 'Services',
    icon: Server,
    href: '/services'
  },
  {
    title: 'Tickets',
    icon: List,
    href: '/tickets'
  },
  {
    title: 'SDMS',
    icon: Scroll,
    href: '/sdms'
  },
];
