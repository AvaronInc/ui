
import React from 'react';
import { SidebarHeader as Header } from '@/components/ui/sidebar';

interface SidebarHeaderProps {
  systemName: string;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ systemName }) => {
  return (
    <Header className="px-4 py-4 flex items-center justify-center border-b border-slate-200/60 dark:border-slate-700/60">
      <div className="flex items-center">
        <div className="relative mr-3">
          <img 
            src="/lovable-uploads/135ba5fa-132c-4d75-924f-a5b9a6d32116.png" 
            alt="Avaron Logo" 
            className="w-8 h-8" 
          />
        </div>
        <div className="flex flex-col relative">
          <div className="flex items-center">
            <h2 className="text-base font-semibold text-sidebar-foreground leading-tight">Avaron</h2>
            <div className="ml-2 w-3 h-3 bg-green-500 rounded-full border-2 border-sidebar"></div>
          </div>
          <span className="text-xs text-sidebar-foreground/70">Protecting Digital Assets</span>
        </div>
      </div>
    </Header>
  );
};

export default SidebarHeader;
