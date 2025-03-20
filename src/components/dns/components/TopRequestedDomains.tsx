
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const TopRequestedDomains: React.FC = () => {
  // Mock top requested domains data
  const domainsData = [
    { name: 'example.com', queries: 1842 },
    { name: 'api.example.com', queries: 1245 },
    { name: 'cdn.example.com', queries: 986 },
    { name: 'internal.local', queries: 756 },
    { name: 'mail.example.com', queries: 542 },
    { name: 'cloud.example.com', queries: 498 },
    { name: 'auth.example.com', queries: 423 },
  ];

  return (
    <div className="h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={domainsData}
          margin={{ top: 5, right: 5, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} horizontal={false} />
          <XAxis type="number" />
          <YAxis 
            dataKey="name" 
            type="category" 
            tick={{ fontSize: 12 }}
            width={120}
          />
          <Tooltip
            contentStyle={{ 
              backgroundColor: 'var(--background)', 
              borderColor: 'var(--border)',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Bar 
            dataKey="queries" 
            fill="#3b82f6" 
            name="DNS Queries"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopRequestedDomains;
