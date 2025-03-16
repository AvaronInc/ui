
import React from 'react';
import { IPAddress } from '@/types/ipam';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { AlertTriangle, Check, XCircle, List, Network, Server, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';

interface IPAMOverviewProps {
  ipAddresses: IPAddress[];
  subnetData: any;
}

const IPAMOverview: React.FC<IPAMOverviewProps> = ({ ipAddresses, subnetData }) => {
  // Calculate summary metrics
  const totalIPs = subnetData.totalIPs;
  const usedIPs = ipAddresses.filter(ip => ip.status === 'in-use').length;
  const availableIPs = ipAddresses.filter(ip => ip.status === 'available').length;
  const conflictIPs = ipAddresses.filter(ip => ip.status === 'conflict').length;
  
  const ipUsageData = [
    { name: 'In Use', value: usedIPs },
    { name: 'Available', value: availableIPs },
    { name: 'Conflict', value: conflictIPs }
  ];
  
  const COLORS = ['#FEC6A1', '#4ADE80', '#F87171'];

  // Get 24-hour activity (real implementation would filter by timestamp)
  const recentActivity = ipAddresses.slice(0, 5);
  
  // Determine network health status based on conflicts and utilization
  const getNetworkHealth = () => {
    if (conflictIPs > 0) return 'warning';
    if (usedIPs / totalIPs > 0.9) return 'warning'; // >90% utilization
    return 'healthy';
  };
  
  const networkHealth = getNetworkHealth();
  
  const formatTime = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, h:mm a');
    } catch (e) {
      return 'Unknown';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Network Health Status */}
        <Card className={cn(
          "shadow-sm",
          networkHealth === 'healthy' ? "border-l-8 border-l-success" : 
          networkHealth === 'warning' ? "border-l-8 border-l-warning" : 
          "border-l-8 border-l-destructive"
        )}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Network Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              {networkHealth === 'healthy' ? (
                <Check className="h-8 w-8 text-success" />
              ) : networkHealth === 'warning' ? (
                <AlertTriangle className="h-8 w-8 text-warning" />
              ) : (
                <XCircle className="h-8 w-8 text-destructive" />
              )}
              <div>
                <div className="text-2xl font-bold">
                  {networkHealth === 'healthy' ? 'Healthy' : 
                   networkHealth === 'warning' ? 'Warning' : 'Critical'}
                </div>
                <p className="text-xs text-muted-foreground">
                  {conflictIPs > 0 ? `${conflictIPs} IP conflicts detected` : 
                   usedIPs / totalIPs > 0.9 ? 'High IP utilization' : 
                   'All systems normal'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* IP Address Stats */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">IP Address Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Network className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold">{usedIPs} / {totalIPs}</div>
                <p className="text-xs text-muted-foreground">In use of total IPs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Active Devices */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Server className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold">
                  {ipAddresses.filter(ip => ip.deviceName).length}
                </div>
                <p className="text-xs text-muted-foreground">Connected devices</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Subnet Usage */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Subnet Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Network className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold">
                  {Math.round((usedIPs / totalIPs) * 100)}%
                </div>
                <p className="text-xs text-muted-foreground">Of subnet space used</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* IP Allocation Chart */}
        <Card>
          <CardHeader>
            <CardTitle>IP Allocation Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ipUsageData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={4}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {ipUsageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value} IPs`, '']}
                    contentStyle={{
                      borderRadius: '8px',
                      border: '1px solid #f0f0f0',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.01)',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FEC6A1]"></div>
                  <span className="text-sm font-medium">In Use</span>
                </div>
                <p className="text-2xl font-bold">{usedIPs}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#4ADE80]"></div>
                  <span className="text-sm font-medium">Available</span>
                </div>
                <p className="text-2xl font-bold">{availableIPs}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#F87171]"></div>
                  <span className="text-sm font-medium">Conflicts</span>
                </div>
                <p className="text-2xl font-bold">{conflictIPs}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Activity */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <List className="h-5 w-5" />
              Recent Network Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[360px] pr-4">
              <div className="space-y-4">
                {recentActivity.map((ip) => (
                  <div key={ip.id} className="flex items-start space-x-3 p-3 rounded-md border">
                    <div className={cn(
                      "mt-0.5 flex h-9 w-9 items-center justify-center rounded-full",
                      ip.status === 'in-use' ? "bg-warning/20 text-warning" :
                      ip.status === 'available' ? "bg-success/20 text-success" :
                      "bg-destructive/20 text-destructive"
                    )}>
                      {ip.status === 'in-use' && <Network className="h-5 w-5" />}
                      {ip.status === 'available' && <Check className="h-5 w-5" />}
                      {ip.status === 'conflict' && <AlertTriangle className="h-5 w-5" />}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium leading-none">
                          {ip.address}
                          <span className={cn(
                            "ml-2 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                            ip.status === 'in-use' ? "bg-warning/20 text-warning" :
                            ip.status === 'available' ? "bg-success/20 text-success" :
                            "bg-destructive/20 text-destructive"
                          )}>
                            {ip.status}
                          </span>
                        </p>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatTime(ip.lastUpdated)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {ip.deviceName ? `Assigned to ${ip.deviceName}` : 'IP Available'}
                        {ip.assignedUser ? ` (${ip.assignedUser})` : ''}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IPAMOverview;
