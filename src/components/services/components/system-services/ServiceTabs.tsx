
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Cpu, HardDrive, Network, FileText, Link2 } from 'lucide-react';

interface ServiceTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const ServiceTabs: React.FC<ServiceTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <TabsList className="w-full rounded-none border-b justify-start px-4">
      <TabsTrigger value="overview" className="flex items-center gap-1">
        <Cpu className="h-4 w-4" />
        <span>Overview</span>
      </TabsTrigger>
      <TabsTrigger value="resources" className="flex items-center gap-1">
        <HardDrive className="h-4 w-4" />
        <span>Resources</span>
      </TabsTrigger>
      <TabsTrigger value="network" className="flex items-center gap-1">
        <Network className="h-4 w-4" />
        <span>Network</span>
      </TabsTrigger>
      <TabsTrigger value="logs" className="flex items-center gap-1">
        <FileText className="h-4 w-4" />
        <span>Logs</span>
      </TabsTrigger>
      <TabsTrigger value="dependencies" className="flex items-center gap-1">
        <Link2 className="h-4 w-4" />
        <span>Dependencies</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default ServiceTabs;
