
import React from 'react';
import { CompanyName, ThemeToggle, UserProfileMenu, AIMButton, NotificationButton, CLIButton } from './header';
import { useMediaQuery } from '@/hooks/use-media-query';

const DashboardHeader = () => {
  const isMobile = useMediaQuery('(max-width: 640px)');

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="flex h-14 items-center justify-between px-4">
        <CompanyName />
        
        <div className="flex items-center space-x-1">
          {!isMobile && <AIMButton />}
          <NotificationButton />
          <CLIButton />
          <ThemeToggle />
          <UserProfileMenu />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
