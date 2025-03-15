
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Monitor, 
  Map, 
  Ticket, 
  Briefcase, 
  Users, 
  HardDrive,
  Network,
  Shield,
  Laptop,
  MapPin,
  FileText,
  Mail,
  Server,
  Globe,
  Contact,
  Puzzle,
  CreditCard
} from 'lucide-react';
import { SidebarContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarAutomationButton } from '@/components/ui/sidebar';
import { useAuth } from '@/context/AuthContext';

export const navItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/'
  },
  {
    title: 'RMM',
    icon: Monitor,
    href: '/rmm'
  },
  {
    title: 'IPAM',
    icon: Map,
    href: '/ipam'
  },
  {
    title: 'Tickets',
    icon: Ticket,
    href: '/tickets'
  },
  {
    title: 'Topology',
    icon: Network,
    href: '/topology'
  },
  {
    title: 'N.E.S.T.',
    icon: MapPin,
    href: '/nest'
  },
  {
    title: 'SD-WAN',
    icon: Globe,
    href: '/sdwan'
  },
  {
    title: 'Projects',
    icon: Briefcase,
    href: '/projects'
  },
  {
    title: 'Identity',
    icon: Users,
    href: '/identity'
  },
  {
    title: 'Integrations',
    icon: Puzzle,
    href: '/integrations'
  },
  {
    title: 'Storage',
    icon: HardDrive,
    href: '/storage'
  },
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
    title: 'Asset Management',
    icon: Server,
    href: '/asset-management'
  },
  {
    title: 'Workforce EMS',
    icon: Laptop,
    href: '/workforce'
  },
  {
    title: 'SDMS',
    icon: FileText,
    href: '/sdms'
  },
  {
    title: 'Contacts',
    icon: Contact,
    href: '/contacts'
  }
];

// Admin-only menu items
export const adminNavItems = [
  {
    title: 'Billing',
    icon: CreditCard,
    href: '/billing'
  }
];

interface SidebarNavItemsProps {
  className?: string;
}

const SidebarNavItems: React.FC<SidebarNavItemsProps> = ({ className }) => {
  const location = useLocation();
  const { isAdmin } = useAuth();
  
  // Combine the regular items with admin items if the user is an admin
  const allNavItems = [...navItems, ...(isAdmin ? adminNavItems : [])];
  
  return (
    <SidebarContent className={cn("px-3 py-4", className)}>
      <SidebarMenu>
        {allNavItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton asChild>
              <Link 
                to={item.href} 
                className={cn(
                  "nav-link",
                  location.pathname === item.href && "active"
                )}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        <SidebarAutomationButton />
      </SidebarMenu>
    </SidebarContent>
  );
};

export default SidebarNavItems;
