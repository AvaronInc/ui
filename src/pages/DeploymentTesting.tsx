
import React from 'react';
import { PageTransition } from '@/components/transitions/PageTransition';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTitle from '@/components/common/PageTitle';
import DeploymentTestingPanel from '@/components/deployment-testing/DeploymentTestingPanel';
import { Wrench } from 'lucide-react';

const DeploymentTesting = () => {
  return (
    <PageTransition>
      <DashboardLayout>
        <div className="p-2 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
          <PageTitle 
            title="Deployment Testing" 
            description="Safely simulate and test infrastructure changes in a virtualized sandbox environment"
            icon={<Wrench className="h-6 w-6" />}
          />
          <DeploymentTestingPanel />
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default DeploymentTesting;
