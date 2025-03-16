
import React from 'react';
import { Service } from '@/types/services';

interface ComplianceAuditProps {
  service?: Service;
}

const ComplianceAudit = ({ service }: ComplianceAuditProps) => {
  if (!service) {
    return <div className="text-center p-4">Please select a service to view compliance data</div>;
  }
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Compliance & Audit for {service.name}</h3>
      <p>This component will display compliance status, audit logs, and regulatory reports for the selected service.</p>
    </div>
  );
};

export default ComplianceAudit;
