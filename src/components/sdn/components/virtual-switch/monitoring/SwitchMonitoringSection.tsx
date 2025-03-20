
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Activity, Zap, RefreshCw, TestTube, Database } from 'lucide-react';
import TrafficAnalyticsTab from './tabs/TrafficAnalyticsTab';
import AIOptimizationTab from './tabs/AIOptimizationTab';
import SelfHealingTab from './tabs/SelfHealingTab';
import SimulationTab from './tabs/SimulationTab';
import ChangeHistoryTab from './tabs/ChangeHistoryTab';

interface SwitchMonitoringSectionProps {
  selectedSwitch: string | null;
}

const SwitchMonitoringSection: React.FC<SwitchMonitoringSectionProps> = ({ 
  selectedSwitch 
}) => {
  const [activeTab, setActiveTab] = useState('traffic');

  if (!selectedSwitch) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="mr-2 h-5 w-5 text-primary" />
            Monitoring & Optimization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-6 text-center text-muted-foreground">
            <p>Select a virtual switch to view monitoring and optimization options</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="md:col-span-3">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="mr-2 h-5 w-5 text-primary" />
          Monitoring & Optimization
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="traffic" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Traffic Analytics</span>
              <span className="sm:hidden">Traffic</span>
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <span className="hidden sm:inline">AI Optimization</span>
              <span className="sm:hidden">AI</span>
            </TabsTrigger>
            <TabsTrigger value="healing" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Self-Healing</span>
              <span className="sm:hidden">Healing</span>
            </TabsTrigger>
            <TabsTrigger value="simulation" className="flex items-center gap-2">
              <TestTube className="h-4 w-4" />
              <span className="hidden sm:inline">Simulation</span>
              <span className="sm:hidden">Sim</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span className="hidden sm:inline">Change History</span>
              <span className="sm:hidden">History</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="traffic">
            <TrafficAnalyticsTab selectedSwitch={selectedSwitch} />
          </TabsContent>
          
          <TabsContent value="ai">
            <AIOptimizationTab selectedSwitch={selectedSwitch} />
          </TabsContent>
          
          <TabsContent value="healing">
            <SelfHealingTab selectedSwitch={selectedSwitch} />
          </TabsContent>
          
          <TabsContent value="simulation">
            <SimulationTab selectedSwitch={selectedSwitch} />
          </TabsContent>
          
          <TabsContent value="history">
            <ChangeHistoryTab selectedSwitch={selectedSwitch} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SwitchMonitoringSection;
