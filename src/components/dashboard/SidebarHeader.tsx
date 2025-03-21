
import React from 'react';
import { SidebarHeader as Header } from '@/components/ui/sidebar';

interface SidebarHeaderProps {
  systemName: string;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ systemName }) => {
  return (
    <Header className="px-4 py-5 flex flex-col items-center justify-center border-b border-slate-200/60 dark:border-slate-700/60">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{systemName}</h2>
    </Header>
  );
};

export default SidebarHeader;
