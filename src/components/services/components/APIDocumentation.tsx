
import React from 'react';
import { Service } from '@/types/services';

interface APIDocumentationProps {
  service?: Service;
}

const APIDocumentation = ({ service }: APIDocumentationProps) => {
  if (!service) {
    return <div className="text-center p-4">Please select a service to view API documentation</div>;
  }
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">API Documentation for {service.name}</h3>
      <p>This component will display endpoint specifications and usage examples for the selected service.</p>
    </div>
  );
};

export default APIDocumentation;
