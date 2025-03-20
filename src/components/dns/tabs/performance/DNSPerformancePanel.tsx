
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import { Lightning, Server, BarChart2, Cog } from 'lucide-react';

import FailoverTab from './tabs/FailoverTab';
import LoadBalancingTab from './tabs/LoadBalancingTab';
import CachingTab from './tabs/CachingTab';
import PerformanceAnalyticsTab from './tabs/PerformanceAnalyticsTab';

const DNSPerformancePanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState("failover");
  const isMobile = useIsMobile();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">DNS Failover, Caching & Performance</h2>
      </div>
      
      <Tabs 
        defaultValue="failover" 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="failover" className="flex items-center gap-2">
            <Server className="h-4 w-4" />
            <span>{isMobile ? "Failover" : "DNS Failover"}</span>
          </TabsTrigger>
          <TabsTrigger value="load-balancing" className="flex items-center gap-2">
            <Lightning className="h-4 w-4" />
            <span>{isMobile ? "Load Balancing" : "DNS Load Balancing"}</span>
          </TabsTrigger>
          <TabsTrigger value="caching" className="flex items-center gap-2">
            <Cog className="h-4 w-4" />
            <span>{isMobile ? "Caching" : "DNS Caching"}</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            <span>{isMobile ? "Analytics" : "Performance Analytics"}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="failover" className="space-y-4 min-h-[300px]">
          <FailoverTab />
        </TabsContent>

        <TabsContent value="load-balancing" className="space-y-4 min-h-[300px]">
          <LoadBalancingTab />
        </TabsContent>

        <TabsContent value="caching" className="space-y-4 min-h-[300px]">
          <CachingTab />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4 min-h-[300px]">
          <PerformanceAnalyticsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DNSPerformancePanel;
