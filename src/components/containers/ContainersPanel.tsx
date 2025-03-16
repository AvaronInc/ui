
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Box, Dock, LineChart, Shield, Zap, Inbox } from 'lucide-react';
import ContainersOverview from './ContainersOverview';
import DeploymentConfiguration from './tabs/DeploymentConfiguration';
import MonitoringLogs from './tabs/MonitoringLogs';
import SecurityCompliance from './tabs/SecurityCompliance';
import AutoHealingOptimization from './tabs/AutoHealingOptimization';
import RegistryImageManagement from './tabs/RegistryImageManagement';
import PageTitle from '@/components/common/PageTitle';

const ContainersPanel = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const handleTabChange = (value: string) => {
    // Set the active tab without affecting the sidebar state
    setActiveTab(value);
  };

  return (
    <div className="space-y-6">
      <PageTitle 
        title="Containers Management" 
        description="Deploy, monitor, and manage containerized applications across your infrastructure"
        icon={<Dock className="h-6 w-6" />}
      />

      <Tabs 
        defaultValue="overview" 
        value={activeTab} 
        onValueChange={handleTabChange} 
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 overflow-x-auto">
          <TabsTrigger value="overview" className="px-2 sm:px-4">Overview</TabsTrigger>
          <TabsTrigger value="deployment" className="px-2 sm:px-4">Deployment</TabsTrigger>
          <TabsTrigger value="monitoring" className="px-2 sm:px-4">Monitoring</TabsTrigger>
          <TabsTrigger value="security" className="px-2 sm:px-4">Security</TabsTrigger>
          <TabsTrigger value="optimization" className="px-2 sm:px-4">Auto-Healing</TabsTrigger>
          <TabsTrigger value="registry" className="px-2 sm:px-4">Registry</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <ContainersOverview />
        </TabsContent>

        <TabsContent value="deployment" className="space-y-4">
          <DeploymentConfiguration />
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <MonitoringLogs />
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <SecurityCompliance />
        </TabsContent>

        <TabsContent value="optimization" className="space-y-4">
          <AutoHealingOptimization />
        </TabsContent>

        <TabsContent value="registry" className="space-y-4">
          <RegistryImageManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContainersPanel;
