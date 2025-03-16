
import React from 'react';
import { Service } from '@/types/services';

interface TLSCertificatesProps {
  service?: Service;
}

const TLSCertificates = ({ service }: TLSCertificatesProps) => {
  if (!service) {
    return <div className="text-center p-4">Please select a service to view TLS/SSL certificates</div>;
  }
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">TLS/SSL Certificates for {service.name}</h3>
      <p>This component will display and manage encryption certificates for the selected service.</p>
    </div>
  );
};

export default TLSCertificates;
