
import React from 'react';
import { Service } from '@/types/services';

interface TopologyMappingProps {
  service?: Service;
}

const TopologyMapping = ({ service }: TopologyMappingProps) => {
  if (!service) {
    return <div className="text-center p-4">Please select a service to view topology mapping</div>;
  }
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Topology Mapping for {service.name}</h3>
      <p>This component will display service dependencies and connection visualization for the selected service.</p>
    </div>
  );
};

export default TopologyMapping;
