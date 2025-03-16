
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
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
  ChevronDown,
} from 'lucide-react';
import { SidebarContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarGroup, SidebarGroupLabel, SidebarSeparator } from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

// Core System Management
const coreSystemItems = [
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
const networkItems = [
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

// IT Operations & Automation
const operationsItems = [
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
const securityItems = [
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
const assetsItems = [
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
const adminItems = [
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

interface SidebarNavItemsProps {
  className?: string;
}

const AccordionNavGroup = ({ 
  title, 
  items, 
  isAdmin = false 
}: { 
  title: string; 
  items: any[];
  isAdmin?: boolean;
}) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  
  // Check if any item in this group is active
  const isAnyActive = React.useMemo(() => {
    return items.some(item => location.pathname === item.href);
  }, [items, location.pathname]);
  
  // Open the accordion by default if any item is active
  React.useEffect(() => {
    if (isAnyActive) {
      setIsOpen(true);
    }
  }, [isAnyActive]);

  return (
    <SidebarGroup>
      <Collapsible 
        open={isOpen} 
        onOpenChange={setIsOpen}
        className="w-full"
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between px-3 py-2 text-sm font-semibold tracking-wide text-sidebar-foreground/80 hover:bg-sidebar-accent/30 rounded-md">
          <span>{title}</span>
          <ChevronDown 
            className={cn("h-4 w-4 text-sidebar-foreground/70 transition-transform", 
              isOpen && "transform rotate-180"
            )} 
          />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenu>
            {items.map((item) => {
              // Skip items that require admin if user is not admin
              if (item.adminOnly && !isAdmin) return null;
              
              const isActive = location.pathname === item.href;
              
              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={isActive}>
                    <Link 
                      to={item.href} 
                      className={cn(
                        "nav-link text-sm flex items-center",
                        isActive && "active"
                      )}
                    >
                      <item.icon className="h-4 w-4 mr-3" />
                      <span className="flex-1">{item.title}</span>
                      {item.adminOnly && (
                        <Badge 
                          variant="outline" 
                          className="ml-2 text-[0.6rem] py-0 h-4 px-1 bg-slate-100 dark:bg-slate-800"
                        >
                          Admin
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </CollapsibleContent>
      </Collapsible>
    </SidebarGroup>
  );
};

const SidebarNavItems: React.FC<SidebarNavItemsProps> = ({ className }) => {
  const { isAdmin } = useAuth();
  
  return (
    <SidebarContent className={cn("px-2 py-2", className)}>
      {/* Core System Management */}
      <AccordionNavGroup title="Core System" items={coreSystemItems} isAdmin={isAdmin} />
      
      <SidebarSeparator className="my-1" />
      
      {/* Network & Infrastructure Management */}
      <AccordionNavGroup title="Network & Infrastructure" items={networkItems} isAdmin={isAdmin} />
      
      <SidebarSeparator className="my-1" />
      
      {/* IT Operations & Automation */}
      <AccordionNavGroup title="IT Operations" items={operationsItems} isAdmin={isAdmin} />
      
      <SidebarSeparator className="my-1" />
      
      {/* Security & Compliance */}
      <AccordionNavGroup title="Security & Compliance" items={securityItems} isAdmin={isAdmin} />
      
      <SidebarSeparator className="my-1" />
      
      {/* IT Assets & Storage */}
      <AccordionNavGroup title="IT Assets & Storage" items={assetsItems} isAdmin={isAdmin} />
      
      <SidebarSeparator className="my-1" />
      
      {/* Business & Administration */}
      <AccordionNavGroup title="Business & Admin" items={adminItems} isAdmin={isAdmin} />
    </SidebarContent>
  );
};

export default SidebarNavItems;
