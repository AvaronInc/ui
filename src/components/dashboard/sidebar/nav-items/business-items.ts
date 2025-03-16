
import { ListChecks, Contact, Puzzle } from 'lucide-react';
import { NavItem } from './types';

// Business
export const businessItems: NavItem[] = [
  {
    title: 'Projects',
    icon: ListChecks,
    href: '/projects'
  },
  {
    title: 'Contacts',
    icon: Contact,
    href: '/contacts'
  },
  {
    title: 'Integrations',
    icon: Puzzle,
    href: '/integrations'
  },
];
