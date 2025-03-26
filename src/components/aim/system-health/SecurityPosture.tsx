
import React from 'react';
import { Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import StatusBadge from './StatusBadge';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';

interface SecurityPostureProps {
  data: {
    status: 'healthy' | 'warning' | 'critical';
    alerts: {
      critical: number;
      warning: number;
      info: number;
    };
    lastScan: string;
    complianceScore: number;
  } | null;
  isLoading?: boolean;
  error?: Error | null;
}

const SecurityPosture: React.FC<SecurityPostureProps> = ({ data, isLoading = false, error = null }) => {
  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error.message} />;
  if (!data) return <ErrorState message="Security posture data is unavailable" />;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-sm flex items-center gap-1">
          <Shield className="h-4 w-4" /> Security Posture
        </h3>
        <StatusBadge status={data.status} />
      </div>
      <div className="text-xs text-muted-foreground">
        <div className="flex justify-between">
          <span>Alerts</span>
          <div className="space-x-1">
            <Badge variant="destructive" className="text-[0.65rem] px-1 py-0">
              {data.alerts.critical}
            </Badge>
            <Badge variant="default" className="text-[0.65rem] px-1 py-0 bg-amber-500">
              {data.alerts.warning}
            </Badge>
            <Badge variant="secondary" className="text-[0.65rem] px-1 py-0">
              {data.alerts.info}
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
                <span>{data.complianceScore}%</span>
              </div>
              <Progress value={data.complianceScore} />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">
              Last scan: {data.lastScan}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default SecurityPosture;
