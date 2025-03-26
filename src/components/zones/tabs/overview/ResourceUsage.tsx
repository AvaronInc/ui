
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Cpu, MemoryStick, HardDrive } from 'lucide-react';
import { Zone } from '../../types';

interface ResourceUsageProps {
  zone: Zone;
}

const ResourceUsage: React.FC<ResourceUsageProps> = ({ zone }) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Resource Usage</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-1">
              <Cpu className="h-4 w-4 text-blue-500" />
              <span>CPU</span>
            </span>
            <span className="font-medium">{zone.resourceUsage.cpu}%</span>
          </div>
          <Progress value={zone.resourceUsage.cpu} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-1">
              <MemoryStick className="h-4 w-4 text-purple-500" />
              <span>RAM</span>
            </span>
            <span className="font-medium">{zone.resourceUsage.ram}%</span>
          </div>
          <Progress value={zone.resourceUsage.ram} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-1">
              <HardDrive className="h-4 w-4 text-amber-500" />
              <span>Storage</span>
            </span>
            <span className="font-medium">{zone.resourceUsage.storage}%</span>
          </div>
          <Progress value={zone.resourceUsage.storage} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceUsage;
