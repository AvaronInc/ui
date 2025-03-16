
import { LucideIcon } from 'lucide-react';

// Type for navigation items
export interface NavItem {
  title: string;
  icon: LucideIcon;
  href: string;
  adminOnly?: boolean;
}

// Navigation section definitions
export interface NavSection {
  title: string;
  items: NavItem[];
}
