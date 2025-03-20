
import React, { useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const trafficData = [
  { time: '00:00', bandwidth: 42, latency: 8, throughput: 38 },
  { time: '02:00', bandwidth: 38, latency: 7, throughput: 35 },
  { time: '04:00', bandwidth: 30, latency: 5, throughput: 28 },
  { time: '06:00', bandwidth: 35, latency: 6, throughput: 32 },
  { time: '08:00', bandwidth: 58, latency: 12, throughput: 52 },
  { time: '10:00', bandwidth: 75, latency: 18, throughput: 68 },
  { time: '12:00', bandwidth: 82, latency: 22, throughput: 75 },
  { time: '14:00', bandwidth: 78, latency: 20, throughput: 72 },
  { time: '16:00', bandwidth: 85, latency: 24, throughput: 78 },
  { time: '18:00', bandwidth: 68, latency: 16, throughput: 62 },
  { time: '20:00', bandwidth: 55, latency: 12, throughput: 50 },
  { time: '22:00', bandwidth: 48, latency: 10, throughput: 45 },
];

const TrafficMetricsChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState('24h');
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <ToggleGroup type="single" value={timeRange} onValueChange={(value) => value && setTimeRange(value)}>
          <ToggleGroupItem value="1h">1h</ToggleGroupItem>
          <ToggleGroupItem value="6h">6h</ToggleGroupItem>
          <ToggleGroupItem value="24h">24h</ToggleGroupItem>
          <ToggleGroupItem value="7d">7d</ToggleGroupItem>
          <ToggleGroupItem value="30d">30d</ToggleGroupItem>
        </ToggleGroup>
        
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
            <span>Bandwidth</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <span>Latency</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span>Throughput</span>
          </div>
        </div>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={trafficData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--background)', 
                borderColor: 'var(--border)',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }} 
            />
            <Area 
              type="monotone" 
              dataKey="bandwidth" 
              stackId="1" 
              stroke="#3b82f6" 
              fill="#3b82f6" 
              fillOpacity={0.2} 
            />
            <Area 
              type="monotone" 
              dataKey="latency" 
              stackId="2" 
              stroke="#ef4444" 
              fill="#ef4444" 
              fillOpacity={0.2} 
            />
            <Area 
              type="monotone" 
              dataKey="throughput" 
              stackId="3" 
              stroke="#22c55e" 
              fill="#22c55e" 
              fillOpacity={0.2} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrafficMetricsChart;
