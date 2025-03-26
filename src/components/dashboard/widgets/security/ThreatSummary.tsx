
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const data = [
  { name: 'Critical', value: 3, color: '#ef4444' },
  { name: 'High', value: 8, color: '#f97316' },
  { name: 'Medium', value: 17, color: '#eab308' },
  { name: 'Low', value: 32, color: '#22c55e' },
];

const weekComparison = {
  change: 7,
  direction: 'down',
  critical: -1,
  high: -2,
};

const ThreatSummary = () => {
  return (
    <div className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium flex items-center justify-between">
          <div className="flex items-center">
            <span>Threat Summary</span>
            <Badge variant="outline" className="ml-2">This Week</Badge>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="bg-red-500/10 border border-red-200 dark:border-red-900/30 rounded-md p-2">
            <div className="text-xs text-muted-foreground">Critical</div>
            <div className="text-xl font-semibold text-red-600 dark:text-red-400">{data[0].value}</div>
          </div>
          <div className="bg-orange-500/10 border border-orange-200 dark:border-orange-900/30 rounded-md p-2">
            <div className="text-xs text-muted-foreground">High</div>
            <div className="text-xl font-semibold text-orange-600 dark:text-orange-400">{data[1].value}</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between px-2 py-1 bg-muted/50 rounded-md mb-2">
          <span className="text-sm font-medium">Total Events</span>
          <div className="flex items-center">
            <span className="text-sm font-semibold">{data.reduce((acc, item) => acc + item.value, 0)}</span>
            <div className={`flex items-center ml-2 text-xs ${weekComparison.direction === 'down' ? 'text-green-500' : 'text-red-500'}`}>
              {weekComparison.direction === 'down' ? (
                <TrendingDown className="h-3 w-3 mr-0.5" />
              ) : (
                <TrendingUp className="h-3 w-3 mr-0.5" />
              )}
              {weekComparison.change}%
            </div>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={130}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={30}
              outerRadius={55}
              paddingAngle={2}
              dataKey="value"
              label={({ name }) => name}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`${value} events`, null]}
              contentStyle={{ borderRadius: '8px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </div>
  );
};

export default ThreatSummary;
