
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Activity, Package, AlertTriangle, Clock } from 'lucide-react';
import { ChartContainer, ChartTooltipContent, ChartTooltip } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

interface PolicyStatsViewerProps {
  packetCount: number;
  trafficHandled: number;
  packetRate: number;
  byteRate: number;
  errorCount: number;
  lastUpdated: string;
}

// Mock data for the traffic graph
const generateTrafficData = () => {
  const data = [];
  const now = new Date();
  for (let i = 24; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 3600000);
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      traffic: Math.floor(Math.random() * 1000) + 500,
      packets: Math.floor(Math.random() * 500) + 100,
    });
  }
  return data;
};

export const PolicyStatsViewer: React.FC<PolicyStatsViewerProps> = ({
  packetCount,
  trafficHandled,
  packetRate,
  byteRate,
  errorCount,
  lastUpdated
}) => {
  const trafficData = generateTrafficData();
  
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Policy Statistics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg space-y-2">
            <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
              <Package className="h-4 w-4" />
              <span>Total Packets</span>
            </div>
            <div className="text-2xl font-bold">{packetCount.toLocaleString()}</div>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg space-y-2">
            <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
              <Activity className="h-4 w-4" />
              <span>Total Traffic</span>
            </div>
            <div className="text-2xl font-bold">{formatBytes(trafficHandled * 1024 * 1024)}</div>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg space-y-2">
            <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
              <AlertTriangle className="h-4 w-4" />
              <span>Errors</span>
            </div>
            <div className="text-2xl font-bold">{errorCount}</div>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg space-y-2">
            <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
              <Clock className="h-4 w-4" />
              <span>Last Updated</span>
            </div>
            <div className="text-lg font-medium">{new Date(lastUpdated).toLocaleTimeString()}</div>
          </div>
        </div>
        
        <div className="pt-4">
          <h3 className="text-sm font-medium mb-2">Traffic Volume Over Time</h3>
          <div className="h-72">
            <ChartContainer 
              config={{
                traffic: { theme: { light: '#8B5CF6', dark: '#A78BFA' } },
                packets: { theme: { light: '#60A5FA', dark: '#93C5FD' } }
              }}
              className="h-full w-full"
            >
              <AreaChart data={trafficData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-traffic)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--color-traffic)" stopOpacity={0.2}/>
                  </linearGradient>
                  <linearGradient id="colorPackets" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-packets)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--color-packets)" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="traffic" stroke="var(--color-traffic)" fillOpacity={1} fill="url(#colorTraffic)" name="traffic" />
                <Area type="monotone" dataKey="packets" stroke="var(--color-packets)" fillOpacity={1} fill="url(#colorPackets)" name="packets" />
              </AreaChart>
            </ChartContainer>
          </div>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <div>
            <span className="font-medium">Current Rates:</span> {packetRate} pps / {formatBytes(byteRate)}/s
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
