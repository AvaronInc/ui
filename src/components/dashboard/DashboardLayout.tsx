
import React from 'react';
import { cn } from '@/lib/utils';
import DashboardHeader from './DashboardHeader';
import { SidebarProvider, Sidebar, SidebarTrigger } from '@/components/ui/sidebar';
import SidebarNav from './SidebarNav';
import CopyrightFooter from '@/components/common/CopyrightFooter';
import { useTheme } from '@/context/ThemeContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const DashboardLayout = ({ children, className }: DashboardLayoutProps) => {
  const { backgroundImage } = useTheme();
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {backgroundImage && (
          <div className="fixed inset-0 z-[-1] bg-opacity-10 pointer-events-none" 
               aria-hidden="true" />
        )}
        <Sidebar className="border-r bg-sidebar">
          <SidebarNav />
        </Sidebar>
        <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
          <div className="flex items-center h-16 px-6 border-b bg-background/80 backdrop-blur-sm">
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
