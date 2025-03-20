
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import TestingDashboard from './tabs/TestingDashboard';
import AttackSimulation from './tabs/AttackSimulation';
import TestExecution from './tabs/TestExecution';
import AIRecommendations from './tabs/AIRecommendations';
import { TestTube, Zap, Play, Brain } from 'lucide-react';

const SecurityTestingPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const isMobile = useIsMobile();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="space-y-4">
      <Tabs 
        defaultValue="dashboard" 
        value={activeTab} 
        onValueChange={handleTabChange} 
        className="space-y-4"
      >
        <div className="flex overflow-x-auto pb-2 scrollbar-hide">
          <TabsList className="flex flex-nowrap min-w-max">
            <TabsTrigger value="dashboard" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2">
              <TestTube className="h-4 w-4" />
              <span>{isMobile ? "Dashboard" : "Testing Dashboard"}</span>
            </TabsTrigger>
            <TabsTrigger value="simulation" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2">
              <Zap className="h-4 w-4" />
              <span>{isMobile ? "Simulation" : "Attack Simulation"}</span>
            </TabsTrigger>
            <TabsTrigger value="execution" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2">
              <Play className="h-4 w-4" />
              <span>{isMobile ? "Execution" : "Test Execution"}</span>
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2">
              <Brain className="h-4 w-4" />
              <span>{isMobile ? "AI" : "AI Recommendations"}</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="dashboard" className="space-y-4">
          <TestingDashboard />
        </TabsContent>

        <TabsContent value="simulation" className="space-y-4">
          <AttackSimulation />
        </TabsContent>

        <TabsContent value="execution" className="space-y-4">
          <TestExecution />
        </TabsContent>

        <TabsContent value="ai" className="space-y-4">
          <AIRecommendations />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityTestingPanel;
