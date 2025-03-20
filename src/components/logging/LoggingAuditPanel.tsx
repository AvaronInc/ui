
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import { FileText, Settings, Activity, FileCheck, Brain } from 'lucide-react';
import LoggingDashboard from './tabs/LoggingDashboard';
import LogRetentionTab from './tabs/LogRetentionTab';
import AuditTrailTab from './tabs/AuditTrailTab';
import ComplianceReportingTab from './tabs/ComplianceReportingTab';
import AnomalyDetectionTab from './tabs/AnomalyDetectionTab';

const LoggingAuditPanel: React.FC = () => {
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
              <FileText className="h-4 w-4" />
              <span>{isMobile ? "Dashboard" : "Logging Dashboard"}</span>
            </TabsTrigger>
            <TabsTrigger value="retention" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2">
              <Settings className="h-4 w-4" />
              <span>{isMobile ? "Retention" : "Log Retention & Storage"}</span>
            </TabsTrigger>
            <TabsTrigger value="audit" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2">
              <Activity className="h-4 w-4" />
              <span>{isMobile ? "Audit" : "Audit Trails"}</span>
            </TabsTrigger>
            <TabsTrigger value="compliance" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2">
              <FileCheck className="h-4 w-4" />
              <span>{isMobile ? "Compliance" : "Compliance Reporting"}</span>
            </TabsTrigger>
            <TabsTrigger value="anomaly" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2">
              <Brain className="h-4 w-4" />
              <span>{isMobile ? "AI" : "Anomaly Detection"}</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="dashboard" className="space-y-4">
          <LoggingDashboard />
        </TabsContent>

        <TabsContent value="retention" className="space-y-4">
          <LogRetentionTab />
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <AuditTrailTab />
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <ComplianceReportingTab />
        </TabsContent>

        <TabsContent value="anomaly" className="space-y-4">
          <AnomalyDetectionTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoggingAuditPanel;
