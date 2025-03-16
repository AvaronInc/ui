
import React from 'react';
import SidebarHeader from './SidebarHeader';
import SidebarNavItems from './SidebarNavItems';
import SidebarFooter from './SidebarFooter';

const SidebarNav: React.FC = () => {
  const systemName = localStorage.getItem('systemName') || 'Network Pulse Management';

  return (
    <div className="flex flex-col h-full">
      <SidebarHeader systemName={systemName} />
      <div className="flex-1 overflow-y-auto">
        <SidebarNavItems />
      </div>
      <SidebarFooter />
    </div>
  );
};

export default SidebarNav;
