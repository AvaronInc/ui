
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useChangeManagement } from '@/hooks/use-change-management';
import { ChangeType } from '@/types/change-management';

const ChangeTypeDistribution: React.FC = () => {
  const { changeStats } = useChangeManagement();
  
  // Prepare data from change stats
  const data = Object.entries(changeStats.changesByType).map(([type, count]) => ({
    name: formatTypeName(type as ChangeType),
    value: count
  }));
  
  // Custom tooltip format
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-md shadow-sm p-2 text-sm">
          <p className="font-medium">{label}</p>
          <p className="text-primary">{`${payload[0].value} changes`}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis 
          dataKey="name" 
          fontSize={12}
          tickMargin={10}
          className="text-muted-foreground"
        />
        <YAxis 
          allowDecimals={false}
          fontSize={12}
          className="text-muted-foreground"
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

// Helper function to format type names
function formatTypeName(type: ChangeType): string {
  switch (type) {
    case 'standard': return 'Standard';
    case 'emergency': return 'Emergency';
    case 'major': return 'Major';
    case 'minor': return 'Minor';
    case 'routine': return 'Routine';
    case 'security': return 'Security';
    default: 
      // Type assertion to make TypeScript know that type is a string here
      return (type as string).charAt(0).toUpperCase() + (type as string).slice(1);
  }
}

export default ChangeTypeDistribution;
