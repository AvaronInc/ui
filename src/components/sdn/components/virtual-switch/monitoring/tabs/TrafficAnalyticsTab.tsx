
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { AlertTriangle, Maximize2 } from 'lucide-react';

interface TrafficAnalyticsTabProps {
  selectedSwitch: string;
}

const TrafficAnalyticsTab: React.FC<TrafficAnalyticsTabProps> = ({ selectedSwitch }) => {
  // Mock real-time traffic data
  const trafficData = [
    { time: '00:00', ingress: 150, egress: 100, congestion: 2 },
    { time: '05:00', ingress: 220, egress: 180, congestion: 5 },
    { time: '10:00', ingress: 480, egress: 430, congestion: 15 },
    { time: '15:00', ingress: 580, egress: 520, congestion: 25 },
    { time: '20:00', ingress: 680, egress: 640, congestion: 35 },
    { time: '25:00', ingress: 780, egress: 740, congestion: 45 },
    { time: '30:00', ingress: 680, egress: 620, congestion: 30 },
    { time: '35:00', ingress: 580, egress: 520, congestion: 20 },
    { time: '40:00', ingress: 480, egress: 430, congestion: 10 },
    { time: '45:00', ingress: 380, egress: 340, congestion: 5 },
    { time: '50:00', ingress: 280, egress: 250, congestion: 3 },
    { time: '55:00', ingress: 180, egress: 150, congestion: 2 },
  ];

  // Identify high-traffic ports
  const highTrafficPorts = [
    { port: "Port 3", usage: 92, status: "high" },
    { port: "Port 7", usage: 87, status: "high" },
    { port: "Port 12", usage: 85, status: "high" },
  ];

  // Identify low-traffic ports
  const lowTrafficPorts = [
    { port: "Port 5", usage: 12, status: "low" },
    { port: "Port 9", usage: 8, status: "low" },
    { port: "Port 15", usage: 5, status: "low" },
  ];

  const chartConfig = {
    ingress: { label: 'Ingress Traffic (Mbps)', color: '#3b82f6' },
    egress: { label: 'Egress Traffic (Mbps)', color: '#10b981' },
    congestion: { label: 'Congestion (%)', color: '#ef4444' },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Live Traffic Analytics for {selectedSwitch}</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Maximize2 className="h-4 w-4" />
            <span>Expand View</span>
          </Button>
        </div>
      </div>

      <div className="border rounded-lg p-4">
        <h4 className="text-sm font-medium mb-4">Traffic Flow Monitoring</h4>
        <div className="h-[300px] w-full">
          <ChartContainer config={chartConfig}>
            <LineChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="time" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="ingress" stroke="#3b82f6" activeDot={{ r: 8 }} strokeWidth={2} />
              <Line type="monotone" dataKey="egress" stroke="#10b981" activeDot={{ r: 8 }} strokeWidth={2} />
              <Line type="monotone" dataKey="congestion" stroke="#ef4444" activeDot={{ r: 8 }} strokeWidth={2} />
              <Legend />
            </LineChart>
          </ChartContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <h4 className="text-sm font-medium mb-3">High-Traffic Ports</h4>
            {highTrafficPorts.map((port) => (
              <div key={port.port} className="flex items-center justify-between mb-2 p-2 bg-red-50 dark:bg-red-950 rounded">
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                  <span>{port.port}</span>
                </div>
                <span className="text-sm font-medium">{port.usage}% utilized</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h4 className="text-sm font-medium mb-3">Underutilized Ports</h4>
            {lowTrafficPorts.map((port) => (
              <div key={port.port} className="flex items-center justify-between mb-2 p-2 bg-green-50 dark:bg-green-950 rounded">
                <div className="flex items-center">
                  <span>{port.port}</span>
                </div>
                <span className="text-sm font-medium">{port.usage}% utilized</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="p-4 border rounded-lg bg-amber-50 dark:bg-amber-950/30">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium">Traffic Alert</h4>
            <p className="text-sm text-muted-foreground">Potential bottleneck detected on Port 7. Consider redistributing traffic or increasing capacity.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficAnalyticsTab;
