
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { FileSearch } from 'lucide-react';
import { Button } from '@/components/ui/button';

const data = [
  { name: 'Success', value: 83, color: '#4ade80' },
  { name: 'Failure', value: 17, color: '#f87171' },
];

const MFALoginAttempts = () => {
  return (
    <div className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium flex items-center justify-between">
          <span>MFA Login Attempts (24h)</span>
          <span className="text-xs font-normal text-muted-foreground">Updated 10 min ago</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={70}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`${value} attempts`, null]}
              contentStyle={{ borderRadius: '8px' }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-auto text-center">
          <Button variant="ghost" size="sm" className="text-xs mt-2">
            <FileSearch className="h-3.5 w-3.5 mr-1" />
            View VaultID Audit Logs
          </Button>
        </div>
      </CardContent>
    </div>
  );
};

export default MFALoginAttempts;
