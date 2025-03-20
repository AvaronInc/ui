
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Server } from 'lucide-react';
import { HoneypotInstancesTable } from '../components/HoneypotInstancesTable';
import { SegmentationZonesCard } from '../components/SegmentationZonesCard';

const HoneypotDeployment: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-1">Honeypot Deployment</h2>
          <p className="text-muted-foreground text-sm">Deploy and manage honeypot instances across your network</p>
        </div>
        <Button className="sm:self-start flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Deploy New Honeypot
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <Server className="h-5 w-5 mr-2 text-blue-500" />
            Active Honeypot Instances
          </CardTitle>
          <CardDescription>Currently deployed honeypot systems</CardDescription>
        </CardHeader>
        <CardContent>
          <HoneypotInstancesTable />
        </CardContent>
      </Card>
      
      <SegmentationZonesCard />
    </div>
  );
};

export default HoneypotDeployment;
