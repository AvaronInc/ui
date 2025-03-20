
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import { Network, Activity, Shield, Share2, FileText, Settings, Globe, HeartPulse } from 'lucide-react';
import SDNOverview from './tabs/SDNOverview';
import VirtualNetworksTab from './tabs/VirtualNetworksTab';
import FailoverHighAvailabilityTab from './tabs/FailoverHighAvailabilityTab';

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
            <TabsTrigger value="failover" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2">
              <HeartPulse className="h-4 w-4" />
              <span>{isMobile ? "Failover" : "Failover & HA"}</span>
            </TabsTrigger>
            <TabsTrigger value="traffic" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2">
              <Activity className="h-4 w-4" />
              <span>{isMobile ? "Traffic" : "Traffic Management"}</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2">
              <Shield className="h-4 w-4" />
              <span>{isMobile ? "Security" : "Network Security"}</span>
            </TabsTrigger>
            <TabsTrigger value="tunnels" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2">
              <Share2 className="h-4 w-4" />
              <span>{isMobile ? "Tunnels" : "Tunnel Management"}</span>
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2">
              <FileText className="h-4 w-4" />
              <span>{isMobile ? "Logs" : "Network Logs"}</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2">
              <Settings className="h-4 w-4" />
              <span>{isMobile ? "Settings" : "SDN Settings"}</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-4">
          <SDNOverview />
        </TabsContent>

        <TabsContent value="virtual" className="space-y-4">
          <VirtualNetworksTab />
        </TabsContent>

        <TabsContent value="failover" className="space-y-4">
          <FailoverHighAvailabilityTab />
        </TabsContent>

        <TabsContent value="traffic" className="space-y-4">
          <div className="text-center p-8 bg-muted rounded-md">
            <p className="text-muted-foreground">Traffic Management will be available in an upcoming release.</p>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <div className="text-center p-8 bg-muted rounded-md">
            <p className="text-muted-foreground">Network Security will be available in an upcoming release.</p>
          </div>
        </TabsContent>

        <TabsContent value="tunnels" className="space-y-4">
          <div className="text-center p-8 bg-muted rounded-md">
            <p className="text-muted-foreground">Tunnel Management will be available in an upcoming release.</p>
          </div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <div className="text-center p-8 bg-muted rounded-md">
            <p className="text-muted-foreground">Network Logs will be available in an upcoming release.</p>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="text-center p-8 bg-muted rounded-md">
            <p className="text-muted-foreground">SDN Settings will be available in an upcoming release.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SDNPanel;
