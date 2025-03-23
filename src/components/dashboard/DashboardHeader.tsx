
import React from 'react';
import { CompanyName, ThemeToggle, UserProfileMenu, AIMButton, NotificationButton, CLIButton } from './header';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/context/auth';
import { useCliModal } from '@/hooks/use-cli-modal';

const DashboardHeader = () => {
  const isMobile = useIsMobile();
  const { logout } = useAuth();
  const { openCliModal } = useCliModal();
  
  const handleLogout = () => {
    logout();
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="flex h-14 items-center justify-between px-4">
        <CompanyName companyName="Avaron Systems" />
        
        <div className="flex items-center space-x-1">
          {!isMobile && <AIMButton />}
          <NotificationButton onClick={() => {}} />
          <CLIButton onClick={openCliModal} />
          <ThemeToggle />
          <UserProfileMenu onLogoutConfirm={handleLogout} />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
