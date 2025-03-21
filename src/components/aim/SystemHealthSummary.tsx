
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { HeartPulse, Shield, AlertTriangle, Server } from 'lucide-react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

// Mock data - in a real implementation, this would come from an API
const healthData = {
  networkStatus: {
    status: 'healthy', // 'healthy', 'warning', 'critical'
    uptime: '99.98%',
    activeConnections: 547,
    bandwidth: {
      used: 78,
      total: 100
    }
  },
  securityPosture: {
    status: 'warning',
    alerts: {
      critical: 0,
      warning: 3,
      info: 12
    },
    lastScan: '2 hours ago',
    complianceScore: 92
  },
  systemPerformance: {
    status: 'healthy',
    cpu: 42,
    memory: 68,
    storage: 51
  }
};

const SystemHealthSummary: React.FC = () => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <HeartPulse className="h-5 w-5 text-primary" />
          <span>System Health Summary</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Network Health */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-sm flex items-center gap-1">
              <Server className="h-4 w-4" /> Network Status
            </h3>
            <StatusBadge status={healthData.networkStatus.status} />
          </div>
          <div className="text-xs text-muted-foreground grid grid-cols-2 gap-2">
            <div>Uptime: {healthData.networkStatus.uptime}</div>
            <div>Active: {healthData.networkStatus.activeConnections}</div>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Bandwidth</span>
                    <span>{healthData.networkStatus.bandwidth.used}%</span>
                  </div>
                  <Progress value={healthData.networkStatus.bandwidth.used} />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">
                  {healthData.networkStatus.bandwidth.used}% of available bandwidth in use
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Security Posture */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-sm flex items-center gap-1">
              <Shield className="h-4 w-4" /> Security Posture
            </h3>
            <StatusBadge status={healthData.securityPosture.status} />
          </div>
          <div className="text-xs text-muted-foreground">
            <div className="flex justify-between">
              <span>Alerts</span>
              <div className="space-x-1">
                <Badge variant="destructive" className="text-[0.65rem] px-1 py-0">
                  {healthData.securityPosture.alerts.critical}
                </Badge>
                <Badge variant="warning" className="text-[0.65rem] px-1 py-0 bg-amber-500">
                  {healthData.securityPosture.alerts.warning}
                </Badge>
                <Badge variant="secondary" className="text-[0.65rem] px-1 py-0">
                  {healthData.securityPosture.alerts.info}
                </Badge>
              </div>
            </div>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Compliance Score</span>
                    <span>{healthData.securityPosture.complianceScore}%</span>
                  </div>
                  <Progress value={healthData.securityPosture.complianceScore} />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">
                  Last scan: {healthData.securityPosture.lastScan}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* System Performance */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-sm flex items-center gap-1">
              <Activity className="h-4 w-4" /> System Performance
            </h3>
            <StatusBadge status={healthData.systemPerformance.status} />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="space-y-1">
                    <div className="text-xs text-center">CPU</div>
                    <Progress value={healthData.systemPerformance.cpu} className="h-1" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">CPU: {healthData.systemPerformance.cpu}%</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="space-y-1">
                    <div className="text-xs text-center">RAM</div>
                    <Progress value={healthData.systemPerformance.memory} className="h-1" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Memory: {healthData.systemPerformance.memory}%</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="space-y-1">
                    <div className="text-xs text-center">Disk</div>
                    <Progress value={healthData.systemPerformance.storage} className="h-1" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Storage: {healthData.systemPerformance.storage}%</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper component for status badges
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStatusProps = () => {
    switch (status) {
      case 'critical':
        return { variant: 'destructive' as const, text: 'Critical' };
      case 'warning':
        return { variant: 'outline' as const, className: 'border-amber-500 text-amber-500', text: 'Warning' };
      case 'healthy':
      default:
        return { variant: 'outline' as const, className: 'border-green-500 text-green-500', text: 'Healthy' };
    }
  };

  const { variant, className, text } = getStatusProps();

  return (
    <Badge variant={variant} className={className}>
      {text}
    </Badge>
  );
};

export default SystemHealthSummary;
