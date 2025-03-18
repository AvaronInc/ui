
import { NavItem } from './types';
import { Ticket, GitMerge, FolderCog, ClipboardList, BookText } from 'lucide-react';

export const operationsItems: NavItem[] = [
  {
    title: 'Tickets',
    icon: Ticket,
    href: '/tickets',
  },
  {
    title: 'Projects',
    icon: GitMerge,
    href: '/projects',
  },
  {
    title: 'Automation',
    icon: FolderCog,
    href: '/automation',
  },
  {
    title: 'Change Management',
    icon: ClipboardList,
    href: '/change-management',
  },
  {
    title: 'SDMS',
    icon: BookText,
    href: '/sdms',
  },
];
