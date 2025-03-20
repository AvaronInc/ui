
import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Gauge, Zap, Server } from 'lucide-react';

interface PerformanceData {
  time: string;
  throughput: number;
  latency: number;
  load: number;
}

// Generate sample performance data
const generatePerformanceData = () => {
  const now = new Date();
  const data: PerformanceData[] = [];
  
  for (let i = 10; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000);
    const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Base values with random variations
    data.push({
      time: timeString,
      throughput: Math.floor(Math.random() * 100) + 400,
      latency: Math.floor(Math.random() * 10) + 2,
      load: Math.floor(Math.random() * 25) + 20,
    });
  }
  
  return data;
};

const PerformanceMetrics: React.FC = () => {
  const [data, setData] = useState<PerformanceData[]>(generatePerformanceData());
  
  // Update performance data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const newData = [...data.slice(1)];
      const lastTime = new Date();
      const timeString = lastTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      // Add a new data point with some variation from the last one
      const lastPoint = data[data.length - 1];
      newData.push({
        time: timeString,
        throughput: Math.max(350, Math.min(600, lastPoint.throughput + (Math.random() * 60 - 30))),
        latency: Math.max(1, Math.min(20, lastPoint.latency + (Math.random() * 4 - 2))),
        load: Math.max(10, Math.min(70, lastPoint.load + (Math.random() * 10 - 5))),
      });
      
      setData(newData);
    }, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, [data]);
  
  // Get current values for display
  const currentThroughput = Math.round(data[data.length - 1].throughput);
  const currentLatency = data[data.length - 1].latency.toFixed(1);
  const currentLoad = Math.round(data[data.length - 1].load);
  
  // Determine load status color
  const getLoadColor = (load: number) => {
    if (load < 30) return 'text-green-500';
    if (load < 60) return 'text-amber-500';
    return 'text-red-500';
  };
  
  const loadColor = getLoadColor(currentLoad);
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            <span className="text-sm font-medium">Throughput</span>
          </div>
          <span className="text-lg font-bold">{currentThroughput} Mbps</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gauge className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-medium">Latency</span>
          </div>
          <span className="text-lg font-bold">{currentLatency} ms</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Server className="h-5 w-5 text-purple-500" />
            <span className="text-sm font-medium">System Load</span>
          </div>
          <span className={`text-lg font-bold ${loadColor}`}>{currentLoad}%</span>
        </div>
      </div>
      
      <div className="h-[150px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              width={30}
            />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="throughput" 
              stroke="#EAB308" 
              name="Throughput (Mbps)"
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="load" 
              stroke="#8B5CF6" 
              name="Load (%)"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
