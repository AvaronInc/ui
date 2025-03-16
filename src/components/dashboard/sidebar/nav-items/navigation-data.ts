
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
  {
    title: 'Containers',
    icon: Package,
    href: '/containers'
  },
];

// Monitoring 
export const monitoringItems: NavItem[] = [
  {
    title: 'RMM',
    icon: Monitor,
    href: '/rmm'
  },
];

// End User Management
export const endUserItems: NavItem[] = [
  {
    title: 'Workforce EMS',
    icon: Laptop,
    href: '/workforce'
  },
];

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

// Identity Management
export const identityItems: NavItem[] = [
  {
    title: 'Identity',
    icon: Users,
    href: '/identity'
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
    title: 'Logging & Audit',
    icon: FileText,
    href: '/logging'
  },
];

// IT Assets (separated from Storage)
export const assetItems: NavItem[] = [
  {
    title: 'Asset Management',
    icon: HardDrive,
    href: '/asset-management'
  },
];

// Storage (separated from IT Assets)
export const storageItems: NavItem[] = [
  {
    title: 'Storage',
    icon: Database,
    href: '/storage'
  },
];

// Business (separated from Admin)
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

// Admin (separated from Business)
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
];

// Navigation section definitions
export interface NavSection {
  title: string;
  items: NavItem[];
}

export const navSections: NavSection[] = [
  { title: "Core System", items: coreSystemItems },
  { title: "Network & Infrastructure", items: networkItems },
  { title: "Monitoring", items: monitoringItems },
  { title: "End User", items: endUserItems },
  { title: "IT Operations", items: operationsItems },
  { title: "Identity", items: identityItems },
  { title: "Security & Compliance", items: securityItems },
  { title: "IT Assets", items: assetItems },
  { title: "Storage", items: storageItems },
  { title: "Business", items: businessItems },
  { title: "Admin", items: adminItems },
];
