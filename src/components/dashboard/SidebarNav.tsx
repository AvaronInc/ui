
import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { 
  SidebarContent, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarAutomationButton
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  Monitor, 
  Map, 
  Ticket, 
  Briefcase, 
  Users, 
  HardDrive,
  Network,
  Settings, 
  LogOut,
  Shield,
  Laptop,
  MapPin,
  FileText,
  Mail,
  Server
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
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
  }
];

const SidebarNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const systemName = localStorage.getItem('systemName') || 'Network Pulse Management';

  const handleSettingsClick = () => {
    navigate('/settings');
  };
  
  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <>
      <SidebarHeader className="px-6 py-5 flex items-center justify-center">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/135ba5fa-132c-4d75-924f-a5b9a6d32116.png" 
            alt="Network Pulse Logo" 
            className="w-9 h-9 mr-2" 
          />
          <h2 className="text-xl font-semibold text-sidebar-foreground">{systemName}</h2>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-3 py-4">
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
      <SidebarFooter className="px-3 py-4 border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Button 
                variant="ghost" 
                className={cn(
                  "nav-link w-full justify-start",
                  location.pathname === "/settings" && "active"
                )}
                onClick={handleSettingsClick}
              >
                <Settings className="h-5 w-5 mr-3" />
                <span>Settings</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Button 
                variant="ghost" 
                className="nav-link w-full justify-start"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 mr-3" />
                <span>Log out</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
};

export default SidebarNav;
