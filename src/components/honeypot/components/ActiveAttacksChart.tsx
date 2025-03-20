
import React from 'react';
import { Card } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { time: '00:00', attacks: 8 },
  { time: '01:00', attacks: 5 },
  { time: '02:00', attacks: 3 },
  { time: '03:00', attacks: 4 },
  { time: '04:00', attacks: 6 },
  { time: '05:00', attacks: 15 },
  { time: '06:00', attacks: 17 }
];

export const ActiveAttacksChart: React.FC = () => {
  return (
    <div className="w-full h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.4} />
          <XAxis dataKey="time" />
          <YAxis />
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
            dataKey="attacks" 
            stroke="#ef4444" 
            strokeWidth={2}
            activeDot={{ r: 6 }} 
            name="Attack Attempts"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
