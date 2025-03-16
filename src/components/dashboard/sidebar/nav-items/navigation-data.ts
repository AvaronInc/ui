
import { 
  LayoutDashboard, 
  ListChecks,
  Network,
  Server, 
  Share2,
  MapPin,
  Monitor,
  Zap,
  Package,
  List,
  Shield,
  Mail,
  Users,
  FileText,
  HardDrive,
  Database,
  Scroll,
  CreditCard,
  Contact,
  Puzzle,
  Settings,
  Laptop,
  UserCheck,
  Terminal,
  Phone,
} from 'lucide-react';

// Type for navigation items
export interface NavItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  adminOnly?: boolean;
}

// Core System Management
export const coreSystemItems: NavItem[] = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/'
  },
  {
    title: 'Projects',
    icon: ListChecks,
    href: '/projects'
  },
];

// Network & Infrastructure Management
export const networkItems: NavItem[] = [
  {
    title: 'Topology',
    icon: Network,
    href: '/topology'
  },
  {
    title: 'N.E.S.T.',
    icon: Server,
    href: '/nest'
  },
  {
    title: 'SD-WAN',
    icon: Share2,
    href: '/sdwan'
  },
  {
    title: 'IPAM',
    icon: MapPin,
    href: '/ipam'
  },
];

// End User Management
export const endUserItems: NavItem[] = [
  {
    title: 'Workforce EMS',
    icon: Laptop,
    href: '/workforce-ems'
  },
];

// IT Operations & Automation
export const operationsItems: NavItem[] = [
  {
    title: 'RMM',
    icon: Monitor,
    href: '/rmm'
  },
  {
    title: 'Automation Panel',
    icon: Zap,
    href: '/automation'
  },
  {
    title: 'Containers',
    icon: Package,
    href: '/containers'
  },
  {
    title: 'Services',
    icon: List,
    href: '/tickets'
  },
];

// Security & Compliance
export const securityItems: NavItem[] = [
  {
    title: 'Security',
    icon: Shield,
    href: '/security'
  },
  {
    title: 'Email Security',
    icon: Mail,
    href: '/email-security'
  },
  {
    title: 'Identity',
    icon: Users,
    href: '/identity'
  },
  {
    title: 'Logging & Audit',
    icon: FileText,
    href: '/sdms'
  },
];

// IT Assets & Storage
export const assetsItems: NavItem[] = [
  {
    title: 'Asset Management',
    icon: HardDrive,
    href: '/asset-management'
  },
  {
    title: 'Storage',
    icon: Database,
    href: '/storage'
  },
  {
    title: 'SDMS',
    icon: Scroll,
    href: '/sdms'
  },
];

// Business & Administration
export const adminItems: NavItem[] = [
  {
    title: 'Billing',
    icon: CreditCard,
    href: '/billing',
    adminOnly: true
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
  {
    title: 'Settings',
    icon: Settings,
    href: '/settings',
    adminOnly: true
  },
];

// Navigation section definitions
export interface NavSection {
  title: string;
  items: NavItem[];
}

export const navSections: NavSection[] = [
  { title: "Core System", items: coreSystemItems },
  { title: "Network & Infrastructure", items: networkItems },
  { title: "End User", items: endUserItems },
  { title: "IT Operations", items: operationsItems },
  { title: "Security & Compliance", items: securityItems },
  { title: "IT Assets & Storage", items: assetsItems },
  { title: "Business & Admin", items: adminItems },
];
