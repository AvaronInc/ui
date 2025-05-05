
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, AlertTriangle, XCircle, Clock, Server } from 'lucide-react';

const statusData = [
  { 
    id: 'headquarters', 
    name: 'Headquarters Vertex', 
    status: 'healthy', 
    devices: 45, 
    utilization: '72%',
    latency: '4ms' 
  },
  { 
    id: 'cloud', 
    name: 'Cloud Infrastructure', 
    status: 'healthy', 
    devices: 28, 
    utilization: '64%',
    latency: '18ms' 
  },
  { 
    id: 'branch1', 
    name: 'Branch Office 1', 
    status: 'degraded', 
    devices: 16, 
    utilization: '89%',
    latency: '45ms',
    issue: 'High bandwidth utilization' 
  },
  { 
    id: 'branch2', 
    name: 'Branch Office 2', 
    status: 'offline', 
    devices: 12, 
    utilization: '0%',
    latency: 'N/A',
    issue: 'Connection lost 4 minutes ago'
  },
  { 
    id: 'datacenter', 
    name: 'Data Center', 
    status: 'healthy', 
    devices: 34, 
    utilization: '51%',
    latency: '7ms' 
  }
];

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case 'healthy':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'degraded':
      return <AlertTriangle className="h-5 w-5 text-amber-500" />;
    case 'offline':
      return <XCircle className="h-5 w-5 text-red-500" />;
    default:
      return <Clock className="h-5 w-5 text-gray-500" />;
  }
};

const NetworkStatusCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {statusData.map((item) => (
        <Card key={item.id} className={`
          ${item.status === 'healthy' ? 'border-green-100 dark:border-green-900' : ''}
          ${item.status === 'degraded' ? 'border-amber-100 dark:border-amber-900' : ''}
          ${item.status === 'offline' ? 'border-red-100 dark:border-red-900' : ''}
        `}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <StatusIcon status={item.status} />
                  <h3 className="font-medium">{item.name}</h3>
                </div>
                <div className="text-sm text-muted-foreground">
                  {item.devices} active devices
                </div>
                {item.issue && (
                  <div className="text-sm font-medium text-amber-600 dark:text-amber-400">
                    {item.issue}
                  </div>
                )}
              </div>
              <div className="flex items-center">
                <Server className="h-4 w-4 text-muted-foreground mr-1" />
                <span className="text-sm font-medium">{item.utilization}</span>
              </div>
            </div>
            <div className="mt-3 flex justify-between text-xs text-muted-foreground">
              <span>Latency: {item.latency}</span>
              <span className="capitalize">{item.status}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default NetworkStatusCards;
