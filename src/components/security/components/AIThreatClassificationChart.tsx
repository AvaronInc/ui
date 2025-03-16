
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const AIThreatClassificationChart: React.FC = () => {
  const data = [
    { name: 'Malware', value: 92, color: '#16a34a' },
    { name: 'Phishing', value: 88, color: '#2563eb' },
    { name: 'DDoS', value: 90, color: '#9333ea' },
    { name: 'Zero-Day', value: 78, color: '#f59e0b' },
    { name: 'Insider', value: 82, color: '#ef4444' },
  ];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={70}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value: number) => [`${value}% accuracy`, 'Detection Rate']}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default AIThreatClassificationChart;
