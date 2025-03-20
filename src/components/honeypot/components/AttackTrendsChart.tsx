
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'SQL Inj.', count: 42 },
  { name: 'XSS', count: 38 },
  { name: 'Brute Force', count: 71 },
  { name: 'File Upload', count: 25 },
  { name: 'Command Inj.', count: 19 },
  { name: 'DoS', count: 13 }
];

export const AttackTrendsChart: React.FC = () => {
  return (
    <div className="w-full h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.4} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--background)',
              borderColor: 'var(--border)',
              borderRadius: '8px'
            }}
          />
          <Legend />
          <Bar 
            dataKey="count" 
            fill="#3b82f6" 
            name="Attack Type Frequency"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
