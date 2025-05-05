
import React from 'react';
import { PageTransition } from '@/components/transitions/PageTransition';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTitle from '@/components/common/PageTitle';
import SDNPanel from '@/components/sdn/SDNPanel';
import { Network } from 'lucide-react';

const SDN = () => {
  return (
    <PageTransition>
      <DashboardLayout>
        <div className="p-2 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
          <PageTitle 
            title="Software Defined Networking" 
            description="Automated network configuration and control across all Vertex deployments"
            icon={<Network className="h-6 w-6" />}
          />
          <SDNPanel />
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default SDN;
