
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
  Contact
} from 'lucide-react';
import { SidebarContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarAutomationButton } from '@/components/ui/sidebar';

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

interface SidebarNavItemsProps {
  className?: string;
}

const SidebarNavItems: React.FC<SidebarNavItemsProps> = ({ className }) => {
  const location = useLocation();
  
  return (
    <SidebarContent className={cn("px-3 py-4", className)}>
      <SidebarMenu>
        {navItems.map((item) => (
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
