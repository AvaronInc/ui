
import React from 'react';
import { PageTransition } from '@/components/transitions/PageTransition';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTitle from '@/components/common/PageTitle';
import SDWANPanel from '@/components/sdwan/SDWANPanel';
import { Share2 } from 'lucide-react';

const SDWAN = () => {
  return (
    <PageTransition>
      <DashboardLayout>
        <div className="p-2 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
          <PageTitle 
            title="SD-WAN Management" 
            description="Configure and manage enterprise-wide networking across Vertices using full mesh SD-WAN architecture"
            icon={<Share2 className="h-6 w-6" />}
          />
          <SDWANPanel />
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default SDWAN;
