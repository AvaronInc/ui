
import React from 'react';
import { Activity } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import StatusBadge from './StatusBadge';

interface SystemPerformanceProps {
  data: {
    status: 'healthy' | 'warning' | 'critical';
    cpu: number;
    memory: number;
    storage: number;
  };
}

const SystemPerformance: React.FC<SystemPerformanceProps> = ({ data }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-sm flex items-center gap-1">
          <Activity className="h-4 w-4" /> System Performance
        </h3>
        <StatusBadge status={data.status} />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="space-y-1">
                <div className="text-xs text-center">CPU</div>
                <Progress value={data.cpu} className="h-1" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">CPU: {data.cpu}%</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="space-y-1">
                <div className="text-xs text-center">RAM</div>
                <Progress value={data.memory} className="h-1" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Memory: {data.memory}%</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="space-y-1">
                <div className="text-xs text-center">Disk</div>
                <Progress value={data.storage} className="h-1" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Storage: {data.storage}%</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default SystemPerformance;
