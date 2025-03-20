
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import { Network, HeartPulse, Globe, LockKeyhole, Layout } from 'lucide-react';
import SDNOverview from './tabs/SDNOverview';
import VirtualNetworksTab from './tabs/VirtualNetworksTab';
import FailoverHighAvailabilityTab from './tabs/FailoverHighAvailabilityTab';
import SecurityComplianceTab from './tabs/SecurityComplianceTab';
import VirtualSwitchManagementTab from './tabs/VirtualSwitchManagementTab';

const SDNPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const isMobile = useIsMobile();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="space-y-4">
      <Tabs 
        defaultValue="overview" 
        value={activeTab} 
        onValueChange={handleTabChange} 
        className="space-y-4"
      >
        <div className="flex overflow-x-auto pb-2 scrollbar-hide">
          <TabsList className="flex flex-nowrap min-w-max">
            <TabsTrigger value="overview" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2">
              <Network className="h-4 w-4" />
              <span>{isMobile ? "Overview" : "Network Overview"}</span>
            </TabsTrigger>
            <TabsTrigger value="virtual" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2">
              <Globe className="h-4 w-4" />
              <span>{isMobile ? "Virtual" : "Virtual Networks"}</span>
            </TabsTrigger>
            <TabsTrigger value="switches" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2">
              <Layout className="h-4 w-4" />
              <span>{isMobile ? "Switches" : "Virtual Switches"}</span>
            </TabsTrigger>
            <TabsTrigger value="failover" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2">
              <HeartPulse className="h-4 w-4" />
              <span>{isMobile ? "Failover" : "Failover & HA"}</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2">
              <LockKeyhole className="h-4 w-4" />
              <span>{isMobile ? "Security" : "Security & Compliance"}</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-4">
          <SDNOverview />
        </TabsContent>

        <TabsContent value="virtual" className="space-y-4">
          <VirtualNetworksTab />
        </TabsContent>

        <TabsContent value="switches" className="space-y-4">
          <VirtualSwitchManagementTab />
        </TabsContent>

        <TabsContent value="failover" className="space-y-4">
          <FailoverHighAvailabilityTab />
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <SecurityComplianceTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SDNPanel;
