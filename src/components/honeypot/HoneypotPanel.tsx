
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import { Bug, Server, Brain, FileSearch, Settings } from 'lucide-react';
import HoneypotOverview from './tabs/HoneypotOverview';
import HoneypotDeployment from './tabs/HoneypotDeployment';
import AITraining from './tabs/AITraining';
import HoneypotLogging from './tabs/HoneypotLogging';
import ConfigurationPolicies from './tabs/ConfigurationPolicies';

const HoneypotPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const isMobile = useIsMobile();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="space-y-4">
      <Tabs 
        defaultValue="overview" 
        value={activeTab} 
        onValueChange={handleTabChange} 
        className="space-y-4"
      >
        <div className="flex overflow-x-auto pb-2 scrollbar-hide">
          <TabsList className="flex flex-nowrap min-w-max">
            <TabsTrigger value="overview" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2">
              <Bug className="h-4 w-4" />
              <span>{isMobile ? "Overview" : "Honeypot Overview"}</span>
            </TabsTrigger>
            <TabsTrigger value="deployment" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2">
              <Server className="h-4 w-4" />
              <span>{isMobile ? "Deploy" : "Deployment"}</span>
            </TabsTrigger>
            <TabsTrigger value="ai-training" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2">
              <Brain className="h-4 w-4" />
              <span>{isMobile ? "AI" : "AI Training"}</span>
            </TabsTrigger>
            <TabsTrigger value="logging" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2">
              <FileSearch className="h-4 w-4" />
              <span>{isMobile ? "Logs" : "Logging & Analysis"}</span>
            </TabsTrigger>
            <TabsTrigger value="config" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2">
              <Settings className="h-4 w-4" />
              <span>{isMobile ? "Config" : "Configuration & Policies"}</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-4">
          <HoneypotOverview />
        </TabsContent>

        <TabsContent value="deployment" className="space-y-4">
          <HoneypotDeployment />
        </TabsContent>

        <TabsContent value="ai-training" className="space-y-4">
          <AITraining />
        </TabsContent>

        <TabsContent value="logging" className="space-y-4">
          <HoneypotLogging />
        </TabsContent>

        <TabsContent value="config" className="space-y-4">
          <ConfigurationPolicies />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HoneypotPanel;
