
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
  MapPin
} from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

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
    title: 'Workforce EMS',
    icon: Laptop,
    href: '/workforce'
  }
];

export const DashboardLayout = ({ children, className }: DashboardLayoutProps) => {
  const location = useLocation();
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="border-r bg-sidebar">
          <SidebarHeader className="px-6 py-5 flex items-center justify-center">
            <h2 className="text-xl font-semibold">Network Pulse Management</h2>
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
                  <Link to="/settings" className="nav-link">
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
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
