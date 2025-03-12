
import React from 'react';
import { WorkforceStats } from '@/types/workforce';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Laptop, Users, Globe } from 'lucide-react';

interface WorkforceMetricsProps {
  stats: WorkforceStats;
}

const WorkforceMetrics = ({ stats }: WorkforceMetricsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalActiveUsers}</div>
          <p className="text-xs text-muted-foreground">
            Total active users across all systems
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">VPN Sessions</CardTitle>
          <Globe className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.connectedVPNSessions}</div>
          <p className="text-xs text-muted-foreground">
            Currently active VPN connections
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Endpoints Status</CardTitle>
          <Laptop className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-success"></div>
              <span className="text-xs">{stats.endpointsByStatus.healthy}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-warning"></div>
              <span className="text-xs">{stats.endpointsByStatus.needsUpdate}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-destructive"></div>
              <span className="text-xs">{stats.endpointsByStatus.insecure}</span>
            </div>
          </div>
          <div className="mt-2 grid grid-cols-3 text-xs text-muted-foreground">
            <span>Healthy</span>
            <span>Updates</span>
            <span>Insecure</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkforceMetrics;
