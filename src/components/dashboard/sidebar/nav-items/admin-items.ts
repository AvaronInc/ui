
import { CreditCard, Settings, FileCheck } from 'lucide-react';
import { NavItem } from './types';

// Admin
export const adminItems: NavItem[] = [
  {
    title: 'Billing',
    icon: CreditCard,
    href: '/billing',
    adminOnly: true
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/settings',
    adminOnly: true
  },
  {
    title: 'License Compliance',
    icon: FileCheck,
    href: '/license-compliance',
    adminOnly: true
  },
];
