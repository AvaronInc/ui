
import React from 'react';
import SidebarHeader from './SidebarHeader';
import SidebarFooter from './SidebarFooter';
import SidebarNavItems from './sidebar/nav-items';
import { ScrollArea } from '@/components/ui/scroll-area';

const SidebarNav: React.FC = () => {
  // Keep the system name in localStorage for other functionality
  const systemName = localStorage.getItem('systemName') || 'Network Pulse Management';

  return (
    <div className="flex flex-col h-full">
      <SidebarHeader systemName={systemName} />
      <ScrollArea className="flex-1">
        <SidebarNavItems />
      </ScrollArea>
      <SidebarFooter />
    </div>
  );
};

export default SidebarNav;
