
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

import { 
  LoggingHeader,
  LogStorageCard,
  FirewallLogsTable,
  ForensicAnalysisForm,
  ComplianceReportsTable,
  ComplianceFrameworksPanel,
  ComplianceActionsPanel,
  SIEMIntegrationPanel,
  AlertConfigurationPanel
} from './components';

type LoggingComplianceProps = {
  form?: UseFormReturn<any>;
};

const LoggingCompliance: React.FC<LoggingComplianceProps> = ({ form }) => {
  const [fullLoggingEnabled, setFullLoggingEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState('logs');
  
  const handleExportLogs = () => {
    toast.success('Log export initiated. Download will begin shortly.');
  };
  
  const handleExportReport = (id: number) => {
    toast.success(`Report #${id} export initiated. Download will begin shortly.`);
  };

  return (
    <div className="space-y-4">
      <LoggingHeader 
        fullLoggingEnabled={fullLoggingEnabled}
        setFullLoggingEnabled={setFullLoggingEnabled}
      />
      
      <LogStorageCard />
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="logs">Firewall Logs</TabsTrigger>
          <TabsTrigger value="forensics">Forensic Mode</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Reports</TabsTrigger>
          <TabsTrigger value="siem">SIEM Integration</TabsTrigger>
          <TabsTrigger value="alerts">Real-Time Alerts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="logs" className="space-y-4 pt-4">
          <FirewallLogsTable onExportLogs={handleExportLogs} />
        </TabsContent>
        
        <TabsContent value="forensics" className="pt-4 space-y-4">
          <ForensicAnalysisForm />
        </TabsContent>
        
        <TabsContent value="compliance" className="pt-4 space-y-4">
          <ComplianceReportsTable onExportReport={handleExportReport} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ComplianceFrameworksPanel />
            <ComplianceActionsPanel />
          </div>
        </TabsContent>
        
        <TabsContent value="siem" className="pt-4 space-y-4">
          <SIEMIntegrationPanel />
        </TabsContent>
        
        <TabsContent value="alerts" className="pt-4 space-y-4">
          <AlertConfigurationPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoggingCompliance;
