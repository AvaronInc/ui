
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Network, Wifi, Router, Globe, Activity } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  Tooltip,
  CartesianGrid
} from 'recharts';

const NetworkStatusSection = () => {
  const networkData = [
    { name: '00:00', traffic: 20 },
    { name: '03:00', traffic: 15 },
    { name: '06:00', traffic: 28 },
    { name: '09:00', traffic: 52 },
    { name: '12:00', traffic: 67 },
    { name: '15:00', traffic: 60 },
    { name: '18:00', traffic: 45 },
    { name: '21:00', traffic: 35 },
  ];

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-card/50 pb-2">
        <CardTitle className="flex items-center text-lg font-medium">
          <Network className="h-5 w-5 mr-2 text-green-500" />
          Network & Infrastructure
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
          <div className="text-center p-2 bg-green-50 dark:bg-green-900/10 rounded-md">
            <Wifi className="h-5 w-5 text-green-500 mx-auto mb-1" />
            <div className="text-xs text-muted-foreground">Vertices Online</div>
            <div className="text-lg font-bold">16/18</div>
          </div>
          <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/10 rounded-md">
            <Router className="h-5 w-5 text-blue-500 mx-auto mb-1" />
            <div className="text-xs text-muted-foreground">SD-WAN</div>
            <div className="text-lg font-bold">Healthy</div>
          </div>
          <div className="text-center p-2 bg-purple-50 dark:bg-purple-900/10 rounded-md">
            <Globe className="h-5 w-5 text-purple-500 mx-auto mb-1" />
            <div className="text-xs text-muted-foreground">VPN Sessions</div>
            <div className="text-lg font-bold">37</div>
          </div>
          <div className="text-center p-2 bg-amber-50 dark:bg-amber-900/10 rounded-md">
            <Activity className="h-5 w-5 text-amber-500 mx-auto mb-1" />
            <div className="text-xs text-muted-foreground">Bandwidth</div>
            <div className="text-lg font-bold">76%</div>
          </div>
        </div>

        <div className="h-[150px] mb-2">
          <div className="text-sm font-medium mb-1">Network Traffic (24h)</div>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={networkData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip formatter={(value) => [`${value} Mbps`, 'Traffic']} />
              <Line 
                type="monotone" 
                dataKey="traffic" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-2 bg-card rounded-md shadow-sm border">
            <div className="text-xs text-muted-foreground mb-1">Failover Events (7d)</div>
            <div className="text-lg font-bold">2</div>
            <div className="text-xs text-muted-foreground">Last: 2 days ago</div>
          </div>
          <div className="p-2 bg-card rounded-md shadow-sm border">
            <div className="text-xs text-muted-foreground mb-1">BGP Status</div>
            <div className="text-lg font-bold">Stable</div>
            <div className="text-xs text-muted-foreground">4 peers connected</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkStatusSection;
