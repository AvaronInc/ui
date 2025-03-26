
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cloud, AlertCircle, CheckCircle, Clock, ArrowDownToLine, ArrowUpToLine } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const syncItems = [
  { 
    id: 1, 
    name: 'Primary Backup', 
    status: 'success', 
    lastSync: '10 minutes ago',
    progress: 100,
    syncInfo: { total: '2.3 TB', delta: '12 MB' }
  },
  { 
    id: 2, 
    name: 'User Data', 
    status: 'syncing', 
    lastSync: 'In progress',
    progress: 68,
    syncInfo: { total: '1.7 TB', delta: '523 MB' }
  },
  { 
    id: 3, 
    name: 'Archive Storage', 
    status: 'warning', 
    lastSync: '3 hours ago',
    progress: 100,
    syncInfo: { total: '4.1 TB', delta: '1.2 GB' }
  },
  { 
    id: 4, 
    name: 'Log Files', 
    status: 'error', 
    lastSync: 'Failed',
    progress: 45,
    syncInfo: { total: '560 GB', delta: '85 MB' }
  },
];

const getStatusIcon = (status: string) => {
  switch(status) {
    case 'success':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'syncing':
      return <Clock className="h-4 w-4 text-blue-500 animate-pulse" />;
    case 'warning':
      return <AlertCircle className="h-4 w-4 text-amber-500" />;
    case 'error':
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    default:
      return <Cloud className="h-4 w-4" />;
  }
};

const CloudSyncStatus = () => {
  return (
    <div className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium flex items-center justify-between">
          <div className="flex items-center">
            <span>Cloud Sync Status</span>
            <Badge variant="outline" className="ml-2">Wasabi</Badge>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1">
        <div className="space-y-3">
          {syncItems.map(item => (
            <div key={item.id} className="p-2 rounded-lg border bg-background/50">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  {getStatusIcon(item.status)}
                  <span className="text-sm ml-2 font-medium">{item.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">{item.lastSync}</span>
              </div>
              
              {item.status === 'syncing' && (
                <Progress value={item.progress} className="h-1.5 mt-1" />
              )}
              
              <div className="flex justify-between text-xs mt-1 text-muted-foreground">
                <span className="flex items-center">
                  <ArrowUpToLine className="h-3 w-3 mr-1" />
                  {item.syncInfo.total}
                </span>
                <span className="flex items-center">
                  <ArrowDownToLine className="h-3 w-3 mr-1" />
                  Delta: {item.syncInfo.delta}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </div>
  );
};

export default CloudSyncStatus;
