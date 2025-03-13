
import React from 'react';
import { SidebarHeader as Header } from '@/components/ui/sidebar';

interface SidebarHeaderProps {
  systemName: string;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ systemName }) => {
  return (
    <Header className="px-6 py-5 flex items-center justify-center">
      <div className="flex items-center">
        <img 
          src="/lovable-uploads/135ba5fa-132c-4d75-924f-a5b9a6d32116.png" 
          alt="Network Pulse Logo" 
          className="w-9 h-9 mr-2" 
        />
        <h2 className="text-xl font-semibold text-sidebar-foreground">{systemName}</h2>
      </div>
    </Header>
  );
};

export default SidebarHeader;
