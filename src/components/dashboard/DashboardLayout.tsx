
import React from 'react';
import { cn } from '@/lib/utils';
import DashboardHeader from './DashboardHeader';
import { SidebarProvider, Sidebar, SidebarTrigger } from '@/components/ui/sidebar';
import SidebarNav from './SidebarNav';
import CopyrightFooter from '@/components/common/CopyrightFooter';

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const DashboardLayout = ({ children, className }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="border-r bg-sidebar">
          <SidebarNav />
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
