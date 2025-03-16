
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Shield, AlertTriangle, FileCheck, Play, BarChart, Search, RefreshCw, FileText } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useSecurityData } from '@/hooks/use-security-data';
import ThreatMap from '../components/ThreatMap';
import SecurityScoreCard from '../components/SecurityScoreCard';
import ComplianceStatusCard from '../components/ComplianceStatusCard';
import RecentEventsTable from '../components/RecentEventsTable';
import { useIsMobile } from '@/hooks/use-mobile';

const SecurityOverview: React.FC = () => {
  const { toast } = useToast();
  const { securityStats, recentEvents, securityScore, complianceStatus, lastScanTime } = useSecurityData();
  const isMobile = useIsMobile();

  const handleEnableAIResponse = () => {
    toast({
      title: "AI Threat Response Enabled",
      description: "AI-powered automatic threat response has been activated.",
    });
  };

  const handleRunSecurityScan = () => {
    toast({
      title: "Security Scan Initiated",
      description: "A comprehensive security scan has been started.",
    });
  };

  const handleViewComplianceReport = () => {
    toast({
      title: "Generating Compliance Report",
      description: "Your compliance report is being generated.",
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        <SecurityScoreCard score={securityScore} />
        
        <Card>
          <CardHeader className="pb-1 sm:pb-2 p-3 sm:p-4">
            <CardTitle className="text-sm font-medium flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
              Security Events (24h)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 pt-0 sm:pt-0">
            <div className="text-2xl font-bold">{securityStats.total24h}</div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div>
                <div className="text-xs text-muted-foreground">Critical</div>
                <div className="flex items-center">
                  <span className="text-sm font-semibold text-red-500">{securityStats.bySeverity.critical}</span>
                  <Progress value={securityStats.bySeverity.critical / securityStats.total24h * 100} className="h-1.5 ml-2 bg-red-100" />
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">High</div>
                <div className="flex items-center">
                  <span className="text-sm font-semibold text-amber-500">{securityStats.bySeverity.high}</span>
                  <Progress value={securityStats.bySeverity.high / securityStats.total24h * 100} className="h-1.5 ml-2 bg-amber-100" />
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Medium</div>
                <div className="flex items-center">
                  <span className="text-sm font-semibold text-blue-500">{securityStats.bySeverity.medium}</span>
                  <Progress value={securityStats.bySeverity.medium / securityStats.total24h * 100} className="h-1.5 ml-2 bg-blue-100" />
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Low</div>
                <div className="flex items-center">
                  <span className="text-sm font-semibold text-green-500">{securityStats.bySeverity.low}</span>
                  <Progress value={securityStats.bySeverity.low / securityStats.total24h * 100} className="h-1.5 ml-2 bg-green-100" />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap mt-3 items-center gap-2">
              <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 text-xs">
                {securityStats.activeThreats} Active Threats
              </Badge>
              <span className="text-xs text-muted-foreground">
                {lastScanTime ? `Last scan: ${formatDistanceToNow(new Date(lastScanTime), { addSuffix: true })}` : 'Never scanned'}
              </span>
            </div>
          </CardContent>
        </Card>
        
        <ComplianceStatusCard compliance={complianceStatus} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        <Card className="md:col-span-2">
          <CardHeader className="pb-1 sm:pb-2 p-3 sm:p-4">
            <CardTitle className="text-base sm:text-lg font-medium">Threat Intelligence Map</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Worldwide threat activity affecting your network</CardDescription>
          </CardHeader>
          <CardContent className={`p-0 ${isMobile ? 'h-[300px]' : 'h-[300px]'}`}>
            <ThreatMap />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-1 sm:pb-2 p-3 sm:p-4">
            <CardTitle className="text-base sm:text-lg font-medium">Quick Actions</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Security operations and reporting</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 p-3 sm:p-4 pt-0 sm:pt-0">
            <Button 
              className="w-full flex items-center justify-start text-sm" 
              size={isMobile ? "sm" : "default"}
              onClick={handleEnableAIResponse}
            >
              <Play className="mr-2 h-4 w-4" />
              Enable AI Threat Response
            </Button>
            <Button 
              className="w-full flex items-center justify-start text-sm" 
              size={isMobile ? "sm" : "default"}
              onClick={handleRunSecurityScan}
              variant="outline"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Run Full Security Scan
            </Button>
            <Button 
              className="w-full flex items-center justify-start text-sm" 
              size={isMobile ? "sm" : "default"}
              onClick={handleViewComplianceReport}
              variant="outline"
            >
              <FileText className="mr-2 h-4 w-4" />
              View Compliance Report
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-1 sm:pb-2 p-3 sm:p-4">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Recent Security Events</span>
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Latest security incidents and events across your infrastructure
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 pt-0 sm:pt-0 overflow-x-auto">
          <RecentEventsTable events={recentEvents.slice(0, isMobile ? 3 : 5)} />
        </CardContent>
        <CardFooter className="p-3 sm:p-4 pt-0 sm:pt-0">
          <Button variant="outline" size={isMobile ? "sm" : "default"} className="w-full">View All Security Events</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SecurityOverview;
