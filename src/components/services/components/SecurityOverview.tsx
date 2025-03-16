
import React from 'react';
import { Service } from '@/types/services';

interface SecurityOverviewProps {
  service?: Service;
}

const SecurityOverview = ({ service }: SecurityOverviewProps) => {
  if (!service) {
    return <div className="text-center p-4">Please select a service to view security details</div>;
  }
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Security Overview for {service.name}</h3>
      <p>This component will display security status, threats, and vulnerabilities for the selected service.</p>
    </div>
  );
};

export default SecurityOverview;
