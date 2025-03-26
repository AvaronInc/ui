
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { SecurityEvent, SecurityStats } from '@/types/security';
import SecurityOverview from './tabs/SecurityOverview';
import ThreatDetection from './tabs/ThreatDetection';
import ComplianceZeroTrust from './tabs/ComplianceZeroTrust';
import SecurityAutomation from './tabs/SecurityAutomation';
import SecurityLogs from './tabs/SecurityLogs';
import CVEIntelligencePanel from './cve/CVEIntelligencePanel';
import RootCauseAnalysis from './cve/tabs/RootCauseAnalysis';
import IPThreatIntelligence from './tabs/IPThreatIntelligence';
import { Shield, AlertTriangle, FileCheck, Zap, FileSearch, Database, LineChart, Wifi } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const SecurityPanel: React.FC = () => {
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
              <Shield className="h-4 w-4" />
              <span>{isMobile ? "Overview" : "Security Overview"}</span>
            </TabsTrigger>
            <TabsTrigger value="threat-detection" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2">
              <AlertTriangle className="h-4 w-4" />
              <span>{isMobile ? "Threats" : "Threat Detection"}</span>
            </TabsTrigger>
            <TabsTrigger value="compliance" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2">
              <FileCheck className="h-4 w-4" />
              <span>{isMobile ? "Compliance" : "Compliance & Zero-Trust"}</span>
            </TabsTrigger>
            <TabsTrigger value="automation" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2">
              <Zap className="h-4 w-4" />
              <span>{isMobile ? "Automation" : "Security Automation"}</span>
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2">
              <FileSearch className="h-4 w-4" />
              <span>{isMobile ? "Logs" : "Logs & Forensics"}</span>
            </TabsTrigger>
            <TabsTrigger value="cve" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2">
              <Database className="h-4 w-4" />
              <span>{isMobile ? "CVE" : "CVE Intelligence"}</span>
            </TabsTrigger>
            <TabsTrigger value="ip-threat" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2">
              <Wifi className="h-4 w-4" />
              <span>{isMobile ? "IP Intel" : "IP Threat Intelligence"}</span>
            </TabsTrigger>
            <TabsTrigger value="rca" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2">
              <LineChart className="h-4 w-4" />
              <span>{isMobile ? "RCA" : "Root Cause Analysis"}</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-4">
          <SecurityOverview />
        </TabsContent>

        <TabsContent value="threat-detection" className="space-y-4">
          <ThreatDetection />
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <ComplianceZeroTrust />
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <SecurityAutomation />
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <SecurityLogs />
        </TabsContent>

        <TabsContent value="cve" className="space-y-4">
          <CVEIntelligencePanel />
        </TabsContent>

        <TabsContent value="ip-threat" className="space-y-4">
          <IPThreatIntelligence />
        </TabsContent>

        <TabsContent value="rca" className="space-y-4">
          <RootCauseAnalysis />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityPanel;
