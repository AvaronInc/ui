
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Database, HardDrive } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const data = [
  { name: 'Zone A', used: 1.2, allocated: 2, color: '#8b5cf6' },
  { name: 'Zone B', used: 2.3, allocated: 3, color: '#3b82f6' },
  { name: 'Zone C', used: 0.8, allocated: 1, color: '#10b981' },
  { name: 'Zone D', used: 2.9, allocated: 4, color: '#f59e0b' },
];

const formatStorage = (value: number) => `${value} TB`;

const ZoneStorageUsage = () => {
  return (
    <div className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium flex items-center justify-between">
          <div className="flex items-center">
            <span>Zone Storage Usage</span>
            <Badge variant="outline" className="ml-2">NestVault</Badge>
          </div>
          <span className="text-xs font-normal text-muted-foreground">
            <HardDrive className="h-3.5 w-3.5 inline mr-1" />
            Total: 10 TB
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 p-1">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={formatStorage} />
            <Tooltip 
              formatter={(value, name) => [formatStorage(value as number), name === 'used' ? 'Used' : 'Allocated']}
              contentStyle={{ borderRadius: '8px' }}
            />
            <Bar dataKey="allocated" fill="#d1d5db" radius={[4, 4, 0, 0]} />
            <Bar dataKey="used" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </div>
  );
};

export default ZoneStorageUsage;
