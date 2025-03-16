
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Box, Docker, LineChart, Shield, Zap, Inbox } from 'lucide-react';
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
        icon={<Docker className="h-6 w-6" />}
      />

      <Tabs 
        defaultValue="overview" 
        value={activeTab} 
        onValueChange={handleTabChange} 
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="deployment">Deployment</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="optimization">Auto-Healing</TabsTrigger>
          <TabsTrigger value="registry">Registry</TabsTrigger>
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
