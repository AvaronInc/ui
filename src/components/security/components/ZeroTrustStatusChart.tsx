
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ZeroTrustStatusChart: React.FC = () => {
  const data = [
    {
      name: 'Network Access',
      verified: 85,
      unverified: 15,
    },
    {
      name: 'User Identity',
      verified: 92,
      unverified: 8,
    },
    {
      name: 'Device Trust',
      verified: 78,
      unverified: 22,
    },
    {
      name: 'Resource Access',
      verified: 88,
      unverified: 12,
    },
    {
      name: 'Session Trust',
      verified: 82,
      unverified: 18,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        layout="vertical"
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" domain={[0, 100]} />
        <YAxis dataKey="name" type="category" />
        <Tooltip 
          formatter={(value, name) => [`${value}%`, name === 'verified' ? 'Verified' : 'Unverified']}
          labelFormatter={(label) => `${label} Security Status`}
        />
        <Legend formatter={(value) => value === 'verified' ? 'Verified Access' : 'Unverified Access'} />
        <Bar dataKey="verified" stackId="a" fill="#16a34a" />
        <Bar dataKey="unverified" stackId="a" fill="#ef4444" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ZeroTrustStatusChart;
