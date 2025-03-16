
import React from 'react';
import { Service } from '@/types/services';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface ResourceUsageChartProps {
  services: Service[];
}

const ResourceUsageChart = ({ services }: ResourceUsageChartProps) => {
  // Aggregate resources by service
  const data = services.map(service => ({
    name: service.name,
    CPU: service.resources.cpu,
    Memory: service.resources.memory,
    Network: service.resources.network,
    Storage: service.resources.storage
  }));

  return (
    <div className="w-full h-[240px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} height={60} tickFormatter={(value) => value.length > 12 ? `${value.substring(0, 12)}...` : value} />
          <YAxis tickFormatter={(value) => `${value}%`} />
          <Tooltip formatter={(value) => [`${value}%`, '']} />
          <Legend />
          <Bar dataKey="CPU" fill="#3b82f6" />
          <Bar dataKey="Memory" fill="#10b981" />
          <Bar dataKey="Network" fill="#8b5cf6" />
          <Bar dataKey="Storage" fill="#f59e0b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResourceUsageChart;
