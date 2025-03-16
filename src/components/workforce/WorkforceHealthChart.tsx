
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Activity } from 'lucide-react';

interface WorkforceHealthChartProps {
  data: {
    name: string;
    compliant: number;
    nonCompliant: number;
    active: number;
    inactive: number;
  }[];
  className?: string;
}

const WorkforceHealthChart = ({ data, className }: WorkforceHealthChartProps) => {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium flex items-center">
            <Activity className="mr-2 h-5 w-5 text-primary" />
            Workforce Health by Department
          </CardTitle>
          <Badge variant="outline" className="ml-auto">
            Last 30 days
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--background)', borderRadius: '8px', border: '1px solid var(--border)' }}
                labelStyle={{ fontWeight: 'bold' }}
              />
              <Legend />
              <Bar name="Compliant Devices" dataKey="compliant" stackId="devices" fill="#10b981" />
              <Bar name="Non-Compliant Devices" dataKey="nonCompliant" stackId="devices" fill="#f43f5e" />
              <Bar name="Active Users" dataKey="active" stackId="users" fill="#3b82f6" />
              <Bar name="Inactive Users" dataKey="inactive" stackId="users" fill="#94a3b8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkforceHealthChart;
