
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const sampleData = [
  { time: '00:00', cpu: 20, memory: 35, disk: 15, network: 5 },
  { time: '01:00', cpu: 25, memory: 36, disk: 15, network: 8 },
  { time: '02:00', cpu: 22, memory: 38, disk: 16, network: 10 },
  { time: '03:00', cpu: 18, memory: 40, disk: 16, network: 12 },
  { time: '04:00', cpu: 15, memory: 41, disk: 17, network: 15 },
  { time: '05:00', cpu: 22, memory: 42, disk: 17, network: 18 },
  { time: '06:00', cpu: 30, memory: 44, disk: 18, network: 20 },
  { time: '07:00', cpu: 45, memory: 48, disk: 18, network: 25 },
  { time: '08:00', cpu: 65, memory: 55, disk: 19, network: 30 },
  { time: '09:00', cpu: 85, memory: 65, disk: 20, network: 38 },
  { time: '10:00', cpu: 70, memory: 70, disk: 21, network: 42 },
  { time: '11:00', cpu: 55, memory: 72, disk: 22, network: 38 },
  { time: '12:00', cpu: 65, memory: 75, disk: 23, network: 35 },
  { time: '13:00', cpu: 75, memory: 80, disk: 24, network: 30 },
  { time: '14:00', cpu: 85, memory: 82, disk: 25, network: 28 },
  { time: '15:00', cpu: 65, memory: 80, disk: 25, network: 25 },
  { time: '16:00', cpu: 55, memory: 75, disk: 25, network: 22 },
  { time: '17:00', cpu: 45, memory: 70, disk: 25, network: 20 },
  { time: '18:00', cpu: 40, memory: 65, disk: 25, network: 18 },
  { time: '19:00', cpu: 35, memory: 60, disk: 25, network: 15 },
  { time: '20:00', cpu: 30, memory: 55, disk: 25, network: 12 },
  { time: '21:00', cpu: 25, memory: 50, disk: 25, network: 10 },
  { time: '22:00', cpu: 20, memory: 45, disk: 25, network: 8 },
  { time: '23:00', cpu: 15, memory: 40, disk: 25, network: 5 },
];

export const ResourceMonitoringChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={sampleData}
        margin={{
          top: 10,
          right: 20,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(140, 140, 140, 0.15)" />
        <XAxis 
          dataKey="time" 
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
        <Legend />
        <Area type="monotone" dataKey="cpu" stackId="1" stroke="#3498db" fill="#3498db" fillOpacity={0.6} />
        <Area type="monotone" dataKey="memory" stackId="2" stroke="#2ecc71" fill="#2ecc71" fillOpacity={0.6} />
        <Area type="monotone" dataKey="disk" stackId="3" stroke="#f39c12" fill="#f39c12" fillOpacity={0.6} />
        <Area type="monotone" dataKey="network" stackId="4" stroke="#9b59b6" fill="#9b59b6" fillOpacity={0.6} />
      </AreaChart>
    </ResponsiveContainer>
  );
};
