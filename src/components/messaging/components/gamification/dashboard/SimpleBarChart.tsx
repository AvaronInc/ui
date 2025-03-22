
import React from 'react';

type SimpleBarChartProps = {
  data: {date: string, count: number}[];
  maxValue: number;
};

const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ data, maxValue }) => {
  return (
    <div className="flex items-end h-32 gap-1 mt-2">
      {data.map((item) => (
        <div key={item.date} className="flex flex-col items-center flex-1">
          <div 
            className="w-full bg-primary/80 rounded-t hover:bg-primary transition-all" 
            style={{ height: `${(item.count / maxValue) * 100}%`, minHeight: '4px' }}
          ></div>
          <div className="text-xs text-muted-foreground mt-1 rotate-45 origin-left truncate max-w-[24px]">
            {item.date}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SimpleBarChart;
