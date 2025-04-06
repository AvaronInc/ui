
import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import DashboardHeader from './DashboardHeader';
import { SidebarProvider } from '@/components/ui/sidebar/sidebar-base';
import { Sidebar } from '@/components/ui/sidebar';
import SidebarNav from './SidebarNav';
import CopyrightFooter from '@/components/common/CopyrightFooter';
import { useTheme } from '@/context/ThemeContext';
import KeyboardAccessibility from './grid/KeyboardAccessibility';

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const DashboardLayout = ({ children, className }: DashboardLayoutProps) => {
  const { backgroundImage } = useTheme();
  
  // Add effect to set viewport meta tag for mobile optimization
  useEffect(() => {
    // Update viewport meta tag to ensure proper mobile scaling
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
      document.getElementsByTagName('head')[0].appendChild(meta);
    }

    // Prevent overscroll/bounce effect on iOS
    document.body.style.overscrollBehavior = 'none';

    return () => {
      // Reset when component unmounts
      document.body.style.overscrollBehavior = '';
    };
  }, []);
  
  return (
    <SidebarProvider>
      <KeyboardAccessibility>
        <div className="min-h-screen flex w-full overflow-hidden">
          {backgroundImage && (
            <div className="fixed inset-0 z-[-1] bg-opacity-10 pointer-events-none" 
                aria-hidden="true" />
          )}
          <Sidebar className="border-r bg-sidebar sticky top-0 h-screen z-20">
            <SidebarNav />
          </Sidebar>
          <div className="flex-1 flex flex-col h-screen overflow-hidden">
            <header className="sticky top-0 z-30 w-full flex items-center h-14 sm:h-16 px-3 sm:px-6 border-b bg-background/95 backdrop-blur-md shadow-sm">
              <DashboardHeader />
            </header>
            <main className={cn("flex-1 overflow-auto -mx-0 px-3 sm:px-6 py-4 sm:py-6", className)}>
              {children}
            </main>
            <CopyrightFooter />
          </div>
        </div>
      </KeyboardAccessibility>
    </SidebarProvider>
  );
};

export default DashboardLayout;
