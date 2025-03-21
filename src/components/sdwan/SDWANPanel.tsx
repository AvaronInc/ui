
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NetworkConnectivityTab from './tabs/NetworkConnectivityTab';
import FailoverRulesTab from './tabs/FailoverRulesTab';
import SecurityAccessTab from './tabs/SecurityAccessTab';
import BGPIntegrationsTab from './tabs/BGPIntegrationsTab';
import MonitoringLogsTab from './tabs/MonitoringLogsTab';
import AdvancedConfigTab from './tabs/AdvancedConfigTab';
import AIIntelligentFailoverTab from './tabs/AIIntelligentFailoverTab';
import PolicyRoutingTab from './tabs/PolicyRoutingTab';
import { useIsMobile } from '@/hooks/use-mobile';
import { Network, HeartPulse, Shield, Globe, Activity, Settings, Zap, Route } from 'lucide-react';

const SDWANPanel = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-4 sm:space-y-6">
      <Tabs defaultValue="connectivity" className="w-full">
        <div className="overflow-x-auto pb-2">
          <TabsList className="inline-flex min-w-full sm:grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 mb-4 sm:mb-6">
            <TabsTrigger value="connectivity" className="flex items-center gap-2">
              <Network className="h-4 w-4" />
              {!isMobile && "Network"}
            </TabsTrigger>
            <TabsTrigger value="failover" className="flex items-center gap-2">
              <HeartPulse className="h-4 w-4" />
              {!isMobile && "Failover"}
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              {!isMobile && "Security"}
            </TabsTrigger>
            <TabsTrigger value="bgp" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              {!isMobile && "BGP"}
            </TabsTrigger>
            <TabsTrigger value="policy-routing" className="flex items-center gap-2">
              <Route className="h-4 w-4" />
              {!isMobile && "Policy Routing"}
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              {!isMobile && "Monitoring"}
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              {!isMobile && "Advanced"}
            </TabsTrigger>
            <TabsTrigger value="ai-failover" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              {!isMobile && "AI Failover"}
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="connectivity" className="mt-0">
          <NetworkConnectivityTab />
        </TabsContent>
        
        <TabsContent value="failover" className="mt-0">
          <FailoverRulesTab />
        </TabsContent>
        
        <TabsContent value="security" className="mt-0">
          <SecurityAccessTab />
        </TabsContent>
        
        <TabsContent value="bgp" className="mt-0">
          <BGPIntegrationsTab />
        </TabsContent>
        
        <TabsContent value="policy-routing" className="mt-0">
          <PolicyRoutingTab />
        </TabsContent>
        
        <TabsContent value="monitoring" className="mt-0">
          <MonitoringLogsTab />
        </TabsContent>
        
        <TabsContent value="advanced" className="mt-0">
          <AdvancedConfigTab />
        </TabsContent>

        <TabsContent value="ai-failover" className="mt-0">
          <AIIntelligentFailoverTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SDWANPanel;
