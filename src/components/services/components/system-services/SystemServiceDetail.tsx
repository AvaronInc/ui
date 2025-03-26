
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { SystemService } from '@/types/services';
import ServiceHeader from './ServiceHeader';
import ServiceTabs from './ServiceTabs';
import OverviewTab from './tabs/OverviewTab';
import ResourceUsageCharts from './ResourceUsageCharts';
import NetworkTab from './tabs/NetworkTab';
import LogsTab from './tabs/LogsTab';
import DependenciesTab from './tabs/DependenciesTab';
import RCATab from './tabs/RCATab';

interface SystemServiceDetailProps {
  service: SystemService;
  onRefresh: () => void;
}

const SystemServiceDetail: React.FC<SystemServiceDetailProps> = ({ service, onRefresh }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <Card className="h-full">
      <ServiceHeader service={service} onRefresh={onRefresh} />
      
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <ServiceTabs activeTab={activeTab} onTabChange={setActiveTab} />
          
          <TabsContent value="overview">
            <OverviewTab service={service} />
          </TabsContent>
          
          <TabsContent value="resources" className="p-4">
            <ResourceUsageCharts service={service} />
          </TabsContent>
          
          <TabsContent value="network">
            <NetworkTab service={service} />
          </TabsContent>
          
          <TabsContent value="logs">
            <LogsTab service={service} />
          </TabsContent>
          
          <TabsContent value="dependencies">
            <DependenciesTab service={service} />
          </TabsContent>
          
          <TabsContent value="rca">
            <RCATab service={service} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SystemServiceDetail;
