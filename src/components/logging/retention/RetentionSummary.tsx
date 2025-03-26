
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, HardDrive, CloudOff, AlertTriangle } from 'lucide-react';

const RetentionSummary = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium flex items-center">
            <Clock className="h-4 w-4 mr-2 text-blue-500" />
            Time-Based Retention
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">System Logs</p>
                <p className="text-xs text-muted-foreground">90 days retention</p>
              </div>
              <Badge variant="outline" className="text-xs">
                85% used
              </Badge>
            </div>
            <Progress value={85} className="h-2" />
            
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Security Events</p>
                <p className="text-xs text-muted-foreground">180 days retention</p>
              </div>
              <Badge variant="outline" className="text-xs">
                42% used
              </Badge>
            </div>
            <Progress value={42} className="h-2" />
            
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Audit Trails</p>
                <p className="text-xs text-muted-foreground">365 days retention</p>
              </div>
              <Badge variant="outline" className="text-xs">
                28% used
              </Badge>
            </div>
            <Progress value={28} className="h-2" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium flex items-center">
            <HardDrive className="h-4 w-4 mr-2 text-purple-500" />
            Size-Based Retention
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Network Traffic</p>
                <p className="text-xs text-muted-foreground">500 GB capacity</p>
              </div>
              <Badge variant="outline" className="text-xs">
                73% used
              </Badge>
            </div>
            <Progress value={73} className="h-2" />
            
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Packet Captures</p>
                <p className="text-xs text-muted-foreground">2 TB capacity</p>
              </div>
              <Badge variant="outline" className="text-xs">
                64% used
              </Badge>
            </div>
            <Progress value={64} className="h-2" />
            
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Application Logs</p>
                <p className="text-xs text-muted-foreground">350 GB capacity</p>
              </div>
              <Badge className="text-xs bg-amber-500 hover:bg-amber-600">
                91% used
              </Badge>
            </div>
            <Progress value={91} className="h-2" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium flex items-center">
            <CloudOff className="h-4 w-4 mr-2 text-green-500" />
            Offsite Archiving
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Cold Storage</p>
                <p className="text-xs text-muted-foreground">Last sync: 2 hours ago</p>
              </div>
              <Badge variant="outline" className="text-xs">
                Synced
              </Badge>
            </div>
            <Progress value={100} className="h-2" />
            
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Legal Hold</p>
                <p className="text-xs text-muted-foreground">5 cases active</p>
              </div>
              <Badge variant="outline" className="text-xs">
                Protected
              </Badge>
            </div>
            <Progress value={100} className="h-2" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
            Warnings & Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 rounded-md border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/50">
              <p className="text-sm font-medium text-amber-800 dark:text-amber-300">Application Logs approaching capacity</p>
              <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
                Consider increasing storage allocation or review retention policy
              </p>
            </div>
            
            <div className="p-3 rounded-md border border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/50">
              <p className="text-sm font-medium text-blue-800 dark:text-blue-300">7 days remaining until compliance audit</p>
              <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                Verify all retention policies are in compliance with regulations
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RetentionSummary;
