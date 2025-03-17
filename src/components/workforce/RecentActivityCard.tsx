
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Activity, AlertTriangle, Network, Lock, Server } from 'lucide-react';

const RecentActivityCard = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium flex items-center">
          <Activity className="mr-2 h-5 w-5 text-primary" />
          Recent Activity
        </CardTitle>
        <CardDescription>Last 24 hours</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="h-9 w-9 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center text-amber-600">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium">Failed login attempt</p>
            <p className="text-xs text-muted-foreground">John Doe from unusual location</p>
            <p className="text-xs text-muted-foreground">15 minutes ago</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
            <Network className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium">New VPN connection</p>
            <p className="text-xs text-muted-foreground">Sarah Johnson from Chicago</p>
            <p className="text-xs text-muted-foreground">45 minutes ago</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="h-9 w-9 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center text-red-600">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium">Security patch required</p>
            <p className="text-xs text-muted-foreground">Critical update for 15 devices</p>
            <p className="text-xs text-muted-foreground">2 hours ago</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="h-9 w-9 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600">
            <Server className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium">Patching completed</p>
            <p className="text-xs text-muted-foreground">23 devices successfully updated</p>
            <p className="text-xs text-muted-foreground">3 hours ago</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivityCard;
