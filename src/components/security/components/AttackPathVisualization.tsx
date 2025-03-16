
import React from 'react';
import { ResponsiveContainer, Sankey, Tooltip } from 'recharts';

const AttackPathVisualization: React.FC = () => {
  // Sample data for attack path visualization
  const data = {
    nodes: [
      { name: 'External Access' },
      { name: 'Vulnerable Web App' },
      { name: 'Web Server' },
      { name: 'Admin Account' },
      { name: 'Database Server' },
      { name: 'Internal Network' },
      { name: 'Domain Controller' },
      { name: 'Sensitive Data' },
    ],
    links: [
      { source: 0, target: 1, value: 10, time: '15:32' },
      { source: 1, target: 2, value: 8, time: '15:35' },
      { source: 2, target: 3, value: 6, time: '15:40' },
      { source: 3, target: 4, value: 5, time: '15:43' },
      { source: 3, target: 5, value: 5, time: '15:46' },
      { source: 5, target: 6, value: 3, time: '15:50' },
      { source: 4, target: 7, value: 3, time: '15:55' },
      { source: 6, target: 7, value: 2, time: '16:02' },
    ],
  };

  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <Sankey
          data={data}
          nodeWidth={15}
          nodePadding={10}
          margin={{
            top: 10,
            right: 10,
            bottom: 10,
            left: 10,
          }}
          link={{ 
            stroke: '#ef4444',
            opacity: 0.3
          }}
        >
          <Tooltip 
            formatter={(value, name, props) => {
              const link = props.payload;
              if (link && link.time) {
                return [`Attack step at ${link.time}`, 'Time'];
              }
              return [`Security compromise`, 'Attack Path'];
            }} 
          />
        </Sankey>
      </ResponsiveContainer>
    </div>
  );
};

export default AttackPathVisualization;
