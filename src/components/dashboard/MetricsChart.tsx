
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  AreaChart, 
  Area, 
  BarChart,
  Bar,
  Cell,
  PieChart, 
  Pie, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip,
  CartesianGrid
} from 'recharts';

interface MetricsChartProps {
  title: string;
  type: 'area' | 'bar' | 'pie';
  data: any[];
  category?: string;
  value?: string;
  colors?: string[];
  percentage?: boolean;
  height?: number;
  className?: string;
}

const defaultColors = {
  area: ['#3B82F6'],
  bar: ['#3B82F6'],
  pie: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']
};

export const MetricsChart = ({ 
  title, 
  type, 
  data, 
  category = 'name', 
  value = 'value',
  colors,
  percentage = false,
  height = 240,
  className 
}: MetricsChartProps) => {
  
  const chartColors = colors || defaultColors[type];
  
  const formatYAxis = (value: number) => {
    return percentage ? `${value}%` : value;
  };
  
  const renderChart = () => {
    switch (type) {
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartColors[0]} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={chartColors[0]} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
              <XAxis 
                dataKey={category} 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                dy={10}
              />
              <YAxis 
                tickFormatter={formatYAxis}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                dx={-10}
              />
              <Tooltip
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: '1px solid #f0f0f0',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.01)',
                }}
                formatter={(value: number) => [percentage ? `${value}%` : value, title]}
              />
              <Area 
                type="monotone" 
                dataKey={value} 
                stroke={chartColors[0]} 
                fillOpacity={1} 
                fill="url(#colorValue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
              <XAxis 
                dataKey={category} 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                dy={10}
              />
              <YAxis 
                tickFormatter={formatYAxis}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                dx={-10}
              />
              <Tooltip
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: '1px solid #f0f0f0',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.01)',
                }}
                formatter={(value: number) => [percentage ? `${value}%` : value, title]}
              />
              <Bar 
                dataKey={value} 
                fill={chartColors[0]} 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey={value}
                nameKey={category}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={chartColors[index % chartColors.length]} 
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: '1px solid #f0f0f0',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.01)',
                }}
                formatter={(value: number, name: string) => [
                  percentage ? `${value}%` : value, 
                  name
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <Card className={cn("glass-card overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-2 pb-2 pt-0">
        {renderChart()}
      </CardContent>
    </Card>
  );
};

export default MetricsChart;
