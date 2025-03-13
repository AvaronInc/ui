import React from 'react';
import { cn } from '@/lib/utils';
import DashboardHeader from './DashboardHeader';
import { useAuth } from '@/context/AuthContext';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarTrigger, 
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
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CopyrightFooter from '@/components/common/CopyrightFooter';

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

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

export const DashboardLayout = ({ children, className }: DashboardLayoutProps) => {
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
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="border-r bg-sidebar">
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
        </Sidebar>
        <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
          <div className="flex items-center h-16 px-6 border-b bg-background/80 backdrop-blur-sm">
            <SidebarTrigger />
            <DashboardHeader />
          </div>
          <main className={cn("flex-1 overflow-auto", className)}>
            {children}
          </main>
          <CopyrightFooter />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
