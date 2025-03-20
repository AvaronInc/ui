
import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { date: 'Jan 5', score: 74 },
  { date: 'Jan 12', score: 76 },
  { date: 'Jan 19', score: 72 },
  { date: 'Jan 26', score: 78 },
  { date: 'Feb 2', score: 75 },
  { date: 'Feb 9', score: 82 },
  { date: 'Feb 16', score: 86 }
];

const SecurityScoreChart: React.FC = () => {
  return (
    <div className="w-full h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.4} />
          <XAxis dataKey="date" />
          <YAxis domain={[50, 100]} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--background)',
              borderColor: 'var(--border)',
              borderRadius: '8px'
            }} 
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="score" 
            stroke="#3b82f6" 
            strokeWidth={2}
            activeDot={{ r: 6 }} 
            name="Security Score"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SecurityScoreChart;
