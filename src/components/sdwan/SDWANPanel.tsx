
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NetworkConnectivityTab from './tabs/NetworkConnectivityTab';
import FailoverRulesTab from './tabs/FailoverRulesTab';
import SecurityAccessTab from './tabs/SecurityAccessTab';
import BGPIntegrationsTab from './tabs/BGPIntegrationsTab';
import MonitoringLogsTab from './tabs/MonitoringLogsTab';
import AdvancedConfigTab from './tabs/AdvancedConfigTab';
import AIIntelligentFailoverTab from './tabs/AIIntelligentFailoverTab';

const SDWANPanel = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="connectivity" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 mb-6">
          <TabsTrigger value="connectivity">Network Connectivity</TabsTrigger>
          <TabsTrigger value="failover">Failover Rules</TabsTrigger>
          <TabsTrigger value="security">Security & Access</TabsTrigger>
          <TabsTrigger value="bgp">BGP & Integrations</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring & Logs</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Config</TabsTrigger>
          <TabsTrigger value="ai-failover">AI Intelligent Failover</TabsTrigger>
        </TabsList>
        
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
