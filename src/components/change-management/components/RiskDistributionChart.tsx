
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useChangeManagement } from '@/hooks/use-change-management';
import { RiskLevel } from '@/types/change-management';

const RiskDistributionChart: React.FC = () => {
  const { changeRequests } = useChangeManagement();
  
  // Count changes by risk level
  const riskCounts = {
    critical: 0,
    high: 0,
    medium: 0,
    low: 0
  };
  
  changeRequests.forEach(change => {
    riskCounts[change.riskLevel]++;
  });
  
  const data = Object.entries(riskCounts).map(([riskLevel, count]) => ({
    name: riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1),
    value: count
  }));
  
  // Color mapping for risk levels
  const COLORS = {
    Critical: '#ef4444',  // red-500
    High: '#f59e0b',      // amber-500
    Medium: '#3b82f6',    // blue-500
    Low: '#22c55e'        // green-500
  };
  
  // Only show chart if there's data
  if (data.every(item => item.value === 0)) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">No risk data available</p>
      </div>
    );
  }
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => percent > 0 ? `${name} ${(percent * 100).toFixed(0)}%` : ''}
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={COLORS[entry.name as keyof typeof COLORS]} 
            />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value) => [`${value} changes`, 'Count']}
        />
        <Legend 
          layout="horizontal" 
          verticalAlign="bottom" 
          align="center"
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default RiskDistributionChart;
