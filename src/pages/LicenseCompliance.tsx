
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTitle from '@/components/common/PageTitle';
import LicenseCompliancePanel from '@/components/license-compliance/LicenseCompliancePanel';

const LicenseCompliance: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        <PageTitle 
          title="License Compliance" 
          subtitle="Manage and monitor open source license usage and compliance" 
        />
        <LicenseCompliancePanel />
      </div>
    </DashboardLayout>
  );
};

export default LicenseCompliance;
