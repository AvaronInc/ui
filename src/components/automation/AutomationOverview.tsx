
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Zap, 
  Terminal, 
  Brain, 
  Shield, 
  HardDrive, 
  AlertCircle, 
  CheckCircle, 
  Clock
} from 'lucide-react';
import { AutomationOverview as AutomationOverviewType, AIDecision } from '@/types/automation';
import { Progress } from '@/components/ui/progress';

interface AutomationOverviewProps {
  overview: AutomationOverviewType;
  aiDecisions: AIDecision[];
}

export const AutomationOverview = ({ overview, aiDecisions }: AutomationOverviewProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <Card className="lg:col-span-8">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Zap className="mr-2 h-5 w-5 text-primary" />
            Automation Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center space-x-2">
                <Terminal className="h-5 w-5 text-primary" />
                <span className="font-medium">Total Automations Running</span>
              </div>
              <span className="text-2xl font-bold">{overview.totalAutomations}</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span>PowerShell</span>
                <span className="font-medium">{overview.activeScriptCounts.PowerShell}</span>
              </div>
              <Progress value={(overview.activeScriptCounts.PowerShell / overview.totalAutomations) * 100} className="h-2 bg-muted" />
              
              <div className="flex items-center justify-between text-sm">
                <span>Ansible</span>
                <span className="font-medium">{overview.activeScriptCounts.Ansible}</span>
              </div>
              <Progress value={(overview.activeScriptCounts.Ansible / overview.totalAutomations) * 100} className="h-2 bg-muted" />
              
              <div className="flex items-center justify-between text-sm">
                <span>Python</span>
                <span className="font-medium">{overview.activeScriptCounts.Python}</span>
              </div>
              <Progress value={(overview.activeScriptCounts.Python / overview.totalAutomations) * 100} className="h-2 bg-muted" />
              
              <div className="flex items-center justify-between text-sm">
                <span>GoLang</span>
                <span className="font-medium">{overview.activeScriptCounts.GoLang}</span>
              </div>
              <Progress value={(overview.activeScriptCounts.GoLang / overview.totalAutomations) * 100} className="h-2 bg-muted" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex flex-col space-y-1 border rounded-md p-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Shield className="h-4 w-4 mr-1" />
                  <span>Last Security Report</span>
                </div>
                <div className="font-medium text-sm">{overview.lastSecurityReportTime}</div>
              </div>
              
              <div className="flex flex-col space-y-1 border rounded-md p-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <HardDrive className="h-4 w-4 mr-1" />
                  <span>Last Backup Status</span>
                </div>
                <div className="flex items-center font-medium text-sm">
                  {overview.lastBackupStatus === 'Success' ? (
                    <>
                      <CheckCircle className="h-3.5 w-3.5 mr-1 text-success" />
                      <span>Success</span>
                    </>
                  ) : overview.lastBackupStatus === 'Failed' ? (
                    <>
                      <AlertCircle className="h-3.5 w-3.5 mr-1 text-destructive" />
                      <span>Failed</span>
                    </>
                  ) : (
                    <>
                      <Clock className="h-3.5 w-3.5 mr-1 text-warning" />
                      <span>In Progress</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="lg:col-span-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Brain className="mr-2 h-5 w-5 text-primary" />
            AI Decision Logs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2">
            {aiDecisions.map((decision) => (
              <div key={decision.id} className="border rounded-md p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{decision.description}</span>
                  <div className="flex items-center">
                    <span className="text-xs text-muted-foreground mr-1">Confidence:</span>
                    <span className={`text-xs font-medium ${
                      decision.confidenceLevel >= 90 ? 'text-success' :
                      decision.confidenceLevel >= 70 ? 'text-warning' : 'text-destructive'
                    }`}>
                      {decision.confidenceLevel}%
                    </span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  Outcome: {decision.outcome}
                </div>
                <div className="text-xs text-muted-foreground">
                  {decision.timestamp}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutomationOverview;
