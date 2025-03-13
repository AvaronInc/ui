
import React from 'react';
import { cn } from '@/lib/utils';
import DashboardHeader from './DashboardHeader';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarTrigger, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter
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
  Mail
} from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
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
  const systemName = localStorage.getItem('systemName') || 'Network Pulse Management';
  
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
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="px-3 py-4 border-t">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/settings" className={cn(
                    "nav-link",
                    location.pathname === "/settings" && "active"
                  )}>
                    <Settings className="h-5 w-5 mr-3" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button variant="ghost" className="nav-link w-full justify-start">
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
            <DashboardHeader className="flex-1 border-0" />
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
