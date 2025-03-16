
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const sampleData = [
  {
    name: 'api-server',
    current: 2000,
    recommended: 1200,
  },
  {
    name: 'web-frontend',
    current: 4000,
    recommended: 3000,
  },
  {
    name: 'db-service',
    current: 3000,
    recommended: 3200,
  },
  {
    name: 'auth-service',
    current: 1500,
    recommended: 800,
  },
  {
    name: 'cache-redis',
    current: 2500,
    recommended: 2800,
  },
  {
    name: 'queue-service',
    current: 3500,
    recommended: 1800,
  },
];

export const AIRecommendationChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={sampleData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 70,
        }}
        barGap={0}
        barCategoryGap={20}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(140, 140, 140, 0.15)" />
        <XAxis 
          dataKey="name" 
          angle={-45} 
          textAnchor="end" 
          height={70} 
          tick={{ fontSize: 11 }} 
          tickLine={false}
          axisLine={{ stroke: 'rgba(140, 140, 140, 0.15)' }} 
        />
        <YAxis 
          tick={{ fontSize: 11 }} 
          tickLine={false}
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
          formatter={(value) => [`${value} MB`, '']}
        />
        <Legend 
          verticalAlign="top" 
          formatter={(value) => value === 'current' ? 'Current Allocation' : 'AI Recommended'}
        />
        <Bar dataKey="current" fill="#3498db" radius={[4, 4, 0, 0]} />
        <Bar dataKey="recommended" fill="#2ecc71" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
