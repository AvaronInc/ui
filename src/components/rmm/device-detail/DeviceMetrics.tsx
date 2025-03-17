
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AreaChart, Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Area } from 'recharts';
import { Cpu, HardDrive, Network } from 'lucide-react';
import { MetricPoint } from '@/types/rmm';

interface DeviceMetricsProps {
  cpuData: MetricPoint[];
  memoryData: MetricPoint[];
  networkData: MetricPoint[];
  isDarkMode: boolean;
}

const DeviceMetrics = ({ cpuData, memoryData, networkData, isDarkMode }: DeviceMetricsProps) => {
  // Chart colors that work in both light and dark mode
  const chartColors = {
    cpu: isDarkMode ? "#3B82F6" : "#3B82F6",
    memory: isDarkMode ? "#10B981" : "#10B981",
    network: isDarkMode ? "#F59E0B" : "#F59E0B",
    grid: isDarkMode ? "#333333" : "#e5e7eb",
    text: isDarkMode ? "#FFFFFF" : "#000000"
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Cpu className="h-4 w-4" />
            CPU Usage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[150px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cpuData}>
                <XAxis 
                  dataKey="time" 
                  stroke={chartColors.text} 
                  tick={{ fill: chartColors.text }}
                />
                <YAxis 
                  tickFormatter={(value) => `${value}%`} 
                  stroke={chartColors.text}
                  tick={{ fill: chartColors.text }}
                />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'CPU Usage']}
                  contentStyle={{ 
                    backgroundColor: isDarkMode ? '#1f2937' : 'white',
                    color: chartColors.text,
                    border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`
                  }}
                  labelStyle={{ color: chartColors.text }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke={chartColors.cpu} 
                  fill={chartColors.cpu} 
                  fillOpacity={0.2} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <HardDrive className="h-4 w-4" />
            Memory Usage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[150px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={memoryData}>
                <XAxis 
                  dataKey="time" 
                  stroke={chartColors.text}
                  tick={{ fill: chartColors.text }}
                />
                <YAxis 
                  tickFormatter={(value) => `${value}%`} 
                  stroke={chartColors.text}
                  tick={{ fill: chartColors.text }}
                />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Memory Usage']}
                  contentStyle={{ 
                    backgroundColor: isDarkMode ? '#1f2937' : 'white',
                    color: chartColors.text,
                    border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`
                  }}
                  labelStyle={{ color: chartColors.text }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke={chartColors.memory} 
                  fill={chartColors.memory} 
                  fillOpacity={0.2} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Network className="h-4 w-4" />
            Network Latency
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[150px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={networkData}>
                <XAxis 
                  dataKey="time" 
                  stroke={chartColors.text}
                  tick={{ fill: chartColors.text }}
                />
                <YAxis 
                  tickFormatter={(value) => `${value}ms`} 
                  stroke={chartColors.text}
                  tick={{ fill: chartColors.text }}
                />
                <Tooltip 
                  formatter={(value) => [`${value}ms`, 'Latency']}
                  contentStyle={{ 
                    backgroundColor: isDarkMode ? '#1f2937' : 'white',
                    color: chartColors.text,
                    border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`
                  }}
                  labelStyle={{ color: chartColors.text }}
                />
                <Bar 
                  dataKey="value" 
                  fill={chartColors.network} 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeviceMetrics;
