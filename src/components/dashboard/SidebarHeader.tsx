
import React from 'react';
import { SidebarHeader as Header } from '@/components/ui/sidebar';

interface SidebarHeaderProps {
  systemName: string;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ systemName }) => {
  return (
    <Header className="px-4 py-5 flex flex-col items-center justify-center border-b border-slate-200/60 dark:border-slate-700/60">
      <div className="flex items-center justify-center">
        <img 
          src="/lovable-uploads/e407f19b-556c-465a-a9c4-ea2ebac2de0e.png" 
          alt="Avaron.AI Logo" 
          className="h-10 logo-transparent" 
        />
      </div>
    </Header>
  );
};

export default SidebarHeader;
