
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Network, Brain, ActivitySquare, ServerCog } from 'lucide-react';
import MultiWANBalancingSection from '../components/failover/MultiWANBalancingSection';
import AIIntelligentFailoverTab from './AIIntelligentFailoverTab';
import HealthMonitoringSection from '../components/failover/HealthMonitoringSection';
import CustomFailoverPoliciesSection from '../components/failover/CustomFailoverPoliciesSection';

const FailoverHighAvailabilityTab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState('wan-balancing');

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Failover & High Availability</h2>
        <Button>Create New Failover Policy</Button>
      </div>
      
      <Tabs defaultValue="wan-balancing" value={activeSubTab} onValueChange={setActiveSubTab}>
        <TabsList>
          <TabsTrigger value="wan-balancing" className="flex items-center gap-2">
            <Network className="h-4 w-4" />
            <span>Multi-WAN Balancing</span>
          </TabsTrigger>
          <TabsTrigger value="ai-failover" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span>AI Intelligent Failover</span>
          </TabsTrigger>
          <TabsTrigger value="health-monitoring" className="flex items-center gap-2">
            <ActivitySquare className="h-4 w-4" />
            <span>Health Monitoring</span>
          </TabsTrigger>
          <TabsTrigger value="custom-policies" className="flex items-center gap-2">
            <ServerCog className="h-4 w-4" />
            <span>Custom Policies</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="wan-balancing" className="space-y-4">
          <Card className="p-6">
            <MultiWANBalancingSection />
          </Card>
        </TabsContent>
        
        <TabsContent value="ai-failover" className="space-y-4">
          <AIIntelligentFailoverTab />
        </TabsContent>
        
        <TabsContent value="health-monitoring" className="space-y-4">
          <Card className="p-6">
            <HealthMonitoringSection />
          </Card>
        </TabsContent>
        
        <TabsContent value="custom-policies" className="space-y-4">
          <Card className="p-6">
            <CustomFailoverPoliciesSection />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FailoverHighAvailabilityTab;
