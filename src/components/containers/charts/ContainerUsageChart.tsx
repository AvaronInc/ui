
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ContainerUsageChartProps {
  data: any[];
}

export const ContainerUsageChart: React.FC<ContainerUsageChartProps> = ({ data }) => {
  // Sample data if no data is provided
  const sampleData = [
    { name: '12:00', cpu: 65, memory: 45, network: 12 },
    { name: '13:00', cpu: 59, memory: 49, network: 18 },
    { name: '14:00', cpu: 80, memory: 52, network: 21 },
    { name: '15:00', cpu: 71, memory: 58, network: 19 },
    { name: '16:00', cpu: 56, memory: 60, network: 15 },
    { name: '17:00', cpu: 55, memory: 65, network: 22 },
    { name: '18:00', cpu: 62, memory: 70, network: 25 },
  ];

  const chartData = data && data.length > 0 ? data : sampleData;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={chartData}
        margin={{
          top: 5,
          right: 10,
          left: -20,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(140, 140, 140, 0.15)" />
        <XAxis 
          dataKey="name" 
          tick={{ fontSize: 10 }} 
          tickLine={false}
          axisLine={{ stroke: 'rgba(140, 140, 140, 0.15)' }} 
        />
        <YAxis 
          tick={{ fontSize: 10 }} 
          tickLine={false} 
          domain={[0, 100]}
          axisLine={{ stroke: 'rgba(140, 140, 140, 0.15)' }} 
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'rgba(25, 30, 35, 0.95)',
            border: 'none',
            borderRadius: '4px',
            color: 'white',
            fontSize: '12px'
          }} 
        />
        <Line type="monotone" dataKey="cpu" stroke="#3498db" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="memory" stroke="#2ecc71" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="network" stroke="#9b59b6" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};
