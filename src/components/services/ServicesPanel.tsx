
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServicesOverview from './tabs/ServicesOverview';
import ServiceDeployment from './tabs/ServiceDeployment';
import MonitoringLogs from './tabs/MonitoringLogs';
import SecurityCompliance from './tabs/SecurityCompliance';
import AIOptimization from './tabs/AIOptimization';
import Documentation from './tabs/Documentation';

const ServicesPanel = () => {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-6 md:grid-cols-6 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="deployment">Deploy & Configure</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring & Logs</TabsTrigger>
          <TabsTrigger value="security">Security & Compliance</TabsTrigger>
          <TabsTrigger value="optimization">AI Optimization</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="p-0 border-0">
          <ServicesOverview />
        </TabsContent>

        <TabsContent value="deployment" className="p-0 border-0">
          <ServiceDeployment />
        </TabsContent>

        <TabsContent value="monitoring" className="p-0 border-0">
          <MonitoringLogs />
        </TabsContent>

        <TabsContent value="security" className="p-0 border-0">
          <SecurityCompliance />
        </TabsContent>

        <TabsContent value="optimization" className="p-0 border-0">
          <AIOptimization />
        </TabsContent>

        <TabsContent value="documentation" className="p-0 border-0">
          <Documentation />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ServicesPanel;
