
import React from 'react';
import { Subnet } from '@/types/ipam';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';

interface SubnetUsageChartProps {
  subnet: Subnet;
}

export const SubnetUsageChart = ({ subnet }: SubnetUsageChartProps) => {
  const availableIPs = subnet.totalIPs - subnet.usedIPs;
  
  const data = [
    { name: 'In Use', value: subnet.usedIPs },
    { name: 'Available', value: availableIPs }
  ];
  
  const COLORS = ['#FEC6A1', '#4ADE80'];
  
  const percentage = Math.round((subnet.usedIPs / subnet.totalIPs) * 100);
  
  return (
    <Card className="bg-card shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex flex-wrap items-center justify-between gap-2">
          <span>Subnet Utilization</span>
          <span className="text-sm font-normal text-muted-foreground">{subnet.cidr}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-2">
          <h3 className="text-lg font-medium">{subnet.name}</h3>
          <p className="text-sm text-muted-foreground">{subnet.description}</p>
        </div>
        
        <div className="h-[200px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value} IPs`, `${value === subnet.usedIPs ? 'In Use' : 'Available'}`]}
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid #f0f0f0',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.01)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Used</p>
            <p className={cn(
              "font-medium",
              percentage > 90 ? "text-destructive" : 
              percentage > 70 ? "text-warning" : 
              "text-foreground"
            )}>
              {subnet.usedIPs} IPs
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Available</p>
            <p className="font-medium text-success">{availableIPs} IPs</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubnetUsageChart;
