
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
        <div className="overflow-x-auto pb-2">
          <TabsList className="inline-flex min-w-full sm:grid sm:grid-cols-3 md:grid-cols-6 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="deployment">Deploy</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="optimization">AI Optimization</TabsTrigger>
            <TabsTrigger value="documentation">Docs</TabsTrigger>
          </TabsList>
        </div>

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
