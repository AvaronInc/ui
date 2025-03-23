
import React from 'react';
import { CompanyName, ThemeToggle, UserProfileMenu, AIMButton, NotificationButton, CLIButton } from './header';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/context/auth';
import { useCliModal } from '@/hooks/use-cli-modal';

const DashboardHeader = () => {
  const isMobile = useIsMobile();
  const { signOut } = useAuth();
  const { openCliModal } = useCliModal();
  
  const handleLogout = () => {
    signOut();
  };

  return (
    <div className="w-full flex items-center justify-between px-4 h-14">
      <div className="flex items-center">
        <CompanyName companyName="Avaron Systems" />
      </div>
      
      <div className="flex items-center space-x-2">
        {!isMobile && <AIMButton />}
        <NotificationButton onClick={() => {}} />
        <CLIButton onClick={openCliModal} />
        <ThemeToggle />
        <UserProfileMenu onLogoutConfirm={handleLogout} />
      </div>
    </div>
  );
};

export default DashboardHeader;
