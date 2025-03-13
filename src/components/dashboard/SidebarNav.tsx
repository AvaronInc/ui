
import React from 'react';
import SidebarHeader from './SidebarHeader';
import SidebarNavItems from './SidebarNavItems';
import SidebarFooter from './SidebarFooter';

const SidebarNav: React.FC = () => {
  const systemName = localStorage.getItem('systemName') || 'Network Pulse Management';

  return (
    <>
      <SidebarHeader systemName={systemName} />
      <SidebarNavItems />
      <SidebarFooter />
    </>
  );
};

export default SidebarNav;
