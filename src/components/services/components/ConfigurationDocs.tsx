
import React from 'react';
import { Service } from '@/types/services';

interface ConfigurationDocsProps {
  service?: Service;
}

const ConfigurationDocs = ({ service }: ConfigurationDocsProps) => {
  if (!service) {
    return <div className="text-center p-4">Please select a service to view configuration documentation</div>;
  }
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Configuration Documentation for {service.name}</h3>
      <p>This component will display service configuration settings and specifications for the selected service.</p>
    </div>
  );
};

export default ConfigurationDocs;
