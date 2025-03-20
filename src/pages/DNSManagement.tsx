
import React from 'react';
import { PageTransition } from '@/components/transitions/PageTransition';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTitle from '@/components/common/PageTitle';
import DNSPanel from '@/components/dns/DNSPanel';
import { Server } from 'lucide-react';

const DNSManagement = () => {
  return (
    <PageTransition>
      <DashboardLayout>
        <div className="p-2 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
          <PageTitle 
            title="DNS Management" 
            description="Enterprise-grade DNS configuration and monitoring for CyberNest NESTS, cloud instances, and external domains"
            icon={<Server className="h-6 w-6" />}
          />
          <DNSPanel />
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default DNSManagement;
