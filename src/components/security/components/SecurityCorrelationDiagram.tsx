
import React from 'react';
import { ResponsiveContainer, Sankey, Tooltip } from 'recharts';

const SecurityCorrelationDiagram: React.FC = () => {
  // Sample data for security event correlation
  const data = {
    nodes: [
      { name: 'External Traffic' },
      { name: 'Firewall' },
      { name: 'IDS/IPS' },
      { name: 'Authentication' },
      { name: 'Network Hosts' },
      { name: 'Database' },
      { name: 'Web Applications' },
      { name: 'Endpoints' },
      { name: 'Legitimate Access' },
      { name: 'Potential Threats' },
      { name: 'Confirmed Threats' },
      { name: 'Incident Response' },
    ],
    links: [
      { source: 0, target: 1, value: 100 },
      { source: 1, target: 2, value: 80 },
      { source: 1, target: 9, value: 20 },
      { source: 2, target: 3, value: 50 },
      { source: 2, target: 4, value: 15 },
      { source: 2, target: 9, value: 15 },
      { source: 3, target: 5, value: 20 },
      { source: 3, target: 6, value: 20 },
      { source: 3, target: 8, value: 10 },
      { source: 4, target: 7, value: 15 },
      { source: 5, target: 8, value: 15 },
      { source: 5, target: 9, value: 5 },
      { source: 6, target: 8, value: 15 },
      { source: 6, target: 9, value: 5 },
      { source: 7, target: 8, value: 10 },
      { source: 7, target: 9, value: 5 },
      { source: 9, target: 10, value: 30 },
      { source: 10, target: 11, value: 30 },
    ],
  };

  return (
    <div className="h-[300px] w-full">
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
          link={{ stroke: '#d1d5db' }}
        >
          <Tooltip formatter={(value) => [`${value} events`, 'Event Flow']} />
        </Sankey>
      </ResponsiveContainer>
    </div>
  );
};

export default SecurityCorrelationDiagram;
