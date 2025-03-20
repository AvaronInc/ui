
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { category: 'Firewall', score: 68, benchmark: 90 },
  { category: 'Network', score: 75, benchmark: 85 },
  { category: 'Endpoint', score: 82, benchmark: 90 },
  { category: 'Authentication', score: 91, benchmark: 95 },
  { category: 'Encryption', score: 89, benchmark: 90 },
  { category: 'Access Control', score: 72, benchmark: 85 }
];

const AIInsightsChart: React.FC = () => {
  return (
    <div className="w-full h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.4} />
          <XAxis dataKey="category" />
          <YAxis domain={[0, 100]} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--background)',
              borderColor: 'var(--border)',
              borderRadius: '8px'
            }}
          />
          <Legend />
          <Bar 
            dataKey="score" 
            fill="#8884d8" 
            name="Current Score"
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="benchmark" 
            fill="#82ca9d" 
            name="Industry Benchmark"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AIInsightsChart;
