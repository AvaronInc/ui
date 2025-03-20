
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import { Activity, BarChart2, Globe, Shield, Cog, Server } from 'lucide-react';
import DNSOverview from './tabs/DNSOverview';
import DNSZones from './tabs/DNSZones';

const DNSPanel: React.FC = () => {
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
              <BarChart2 className="h-4 w-4" />
              <span>{isMobile ? "Overview" : "DNS Dashboard"}</span>
            </TabsTrigger>
            <TabsTrigger value="zones" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2">
              <Globe className="h-4 w-4" />
              <span>{isMobile ? "Zones" : "DNS Zones"}</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2">
              <Shield className="h-4 w-4" />
              <span>{isMobile ? "Security" : "DNS Security"}</span>
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2">
              <Activity className="h-4 w-4" />
              <span>{isMobile ? "Performance" : "Query Performance"}</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2">
              <Cog className="h-4 w-4" />
              <span>{isMobile ? "Settings" : "DNS Settings"}</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-4">
          <DNSOverview />
        </TabsContent>

        <TabsContent value="zones" className="space-y-4">
          <DNSZones />
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <div className="text-center text-muted-foreground py-8">
            DNS Security configuration will be implemented in a future prompt.
          </div>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-4">
          <div className="text-center text-muted-foreground py-8">
            Query Performance configuration will be implemented in a future prompt.
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <div className="text-center text-muted-foreground py-8">
            DNS Settings configuration will be implemented in a future prompt.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DNSPanel;
