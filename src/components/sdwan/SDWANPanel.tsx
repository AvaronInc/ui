
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NetworkConnectivityTab from './tabs/NetworkConnectivityTab';
import FailoverRulesTab from './tabs/FailoverRulesTab';
import SecurityAccessTab from './tabs/SecurityAccessTab';
import BGPIntegrationsTab from './tabs/BGPIntegrationsTab';
import MonitoringLogsTab from './tabs/MonitoringLogsTab';
import AdvancedConfigTab from './tabs/AdvancedConfigTab';
import AIIntelligentFailoverTab from './tabs/AIIntelligentFailoverTab';
import { useIsMobile } from '@/hooks/use-mobile';

const SDWANPanel = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-4 sm:space-y-6">
      <Tabs defaultValue="connectivity" className="w-full">
        <div className="overflow-x-auto pb-2">
          <TabsList className="inline-flex min-w-full sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 mb-4 sm:mb-6">
            <TabsTrigger value="connectivity">{isMobile ? 'Network' : 'Network'}</TabsTrigger>
            <TabsTrigger value="failover">{isMobile ? 'Failover' : 'Failover'}</TabsTrigger>
            <TabsTrigger value="security">{isMobile ? 'Security' : 'Security'}</TabsTrigger>
            <TabsTrigger value="bgp">{isMobile ? 'BGP' : 'BGP'}</TabsTrigger>
            <TabsTrigger value="monitoring">{isMobile ? 'Monitor' : 'Monitoring'}</TabsTrigger>
            <TabsTrigger value="advanced">{isMobile ? 'Advanced' : 'Advanced'}</TabsTrigger>
            <TabsTrigger value="ai-failover">{isMobile ? 'AI' : 'AI Failover'}</TabsTrigger>
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
