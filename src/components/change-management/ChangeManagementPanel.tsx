
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import ChangeOverview from './tabs/ChangeOverview';
import ChangeLifecycle from './tabs/ChangeLifecycle';
import ChangeApproval from './tabs/ChangeApproval';
import RiskAssessment from './tabs/RiskAssessment';
import ChangeHistory from './tabs/ChangeHistory';
import { FileWarning, Workflow, CheckCircle2, PieChart, History } from 'lucide-react';

const ChangeManagementPanel: React.FC = () => {
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
              <FileWarning className="h-4 w-4" />
              <span>{isMobile ? "Overview" : "Change Overview"}</span>
            </TabsTrigger>
            <TabsTrigger value="lifecycle" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2">
              <Workflow className="h-4 w-4" />
              <span>{isMobile ? "Lifecycle" : "Change Lifecycle"}</span>
            </TabsTrigger>
            <TabsTrigger value="approval" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>{isMobile ? "Approval" : "Change Approval"}</span>
            </TabsTrigger>
            <TabsTrigger value="risk" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2">
              <PieChart className="h-4 w-4" />
              <span>{isMobile ? "Risk" : "Risk Assessment"}</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2">
              <History className="h-4 w-4" />
              <span>{isMobile ? "History" : "History & Logs"}</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-4">
          <ChangeOverview />
        </TabsContent>

        <TabsContent value="lifecycle" className="space-y-4">
          <ChangeLifecycle />
        </TabsContent>

        <TabsContent value="approval" className="space-y-4">
          <ChangeApproval />
        </TabsContent>

        <TabsContent value="risk" className="space-y-4">
          <RiskAssessment />
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <ChangeHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChangeManagementPanel;
