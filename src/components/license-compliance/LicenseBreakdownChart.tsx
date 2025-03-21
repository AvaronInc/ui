
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { licenseBreakdown } from './mockLicenseData';

const LicenseBreakdownChart: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">License Distribution</h3>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={licenseBreakdown}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="count"
              nameKey="licenseType"
              label={({ licenseType }) => licenseType}
              labelLine={true}
            >
              {licenseBreakdown.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value, name, props) => [`${value} components`, props.payload.licenseType]}
              contentStyle={{ borderRadius: '6px', border: '1px solid #e2e8f0' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mt-4">
        {licenseBreakdown.map((entry) => (
          <div key={entry.licenseType} className="flex items-center text-sm">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: entry.color }}
            />
            <span>{entry.licenseType}</span>
            <span className="ml-auto font-medium">{entry.count}</span>
          </div>
        ))}
      </div>
      
      <p className="text-xs text-muted-foreground mt-4">
        Hover over the chart segments for detailed information about each license type.
      </p>
    </div>
  );
};

export default LicenseBreakdownChart;
