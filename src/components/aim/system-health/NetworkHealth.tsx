
import React from 'react';
import { Server } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import StatusBadge from './StatusBadge';

interface NetworkHealthProps {
  data: {
    status: 'healthy' | 'warning' | 'critical';
    uptime: string;
    activeConnections: number;
    bandwidth: {
      used: number;
      total: number;
    };
  };
}

const NetworkHealth: React.FC<NetworkHealthProps> = ({ data }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-sm flex items-center gap-1">
          <Server className="h-4 w-4" /> Network Status
        </h3>
        <StatusBadge status={data.status} />
      </div>
      <div className="text-xs text-muted-foreground grid grid-cols-2 gap-2">
        <div>Uptime: {data.uptime}</div>
        <div>Active: {data.activeConnections}</div>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Bandwidth</span>
                <span>{data.bandwidth.used}%</span>
              </div>
              <Progress value={data.bandwidth.used} />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">
              {data.bandwidth.used}% of available bandwidth in use
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default NetworkHealth;
