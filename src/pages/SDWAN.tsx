
import React from 'react';
import { PageTransition } from '@/components/transitions/PageTransition';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTitle from '@/components/common/PageTitle';
import SDWANPanel from '@/components/sdwan/SDWANPanel';

const SDWAN = () => {
  return (
    <PageTransition>
      <DashboardLayout>
        <div className="p-6 space-y-6">
          <PageTitle 
            title="SD-WAN Management" 
            description="Configure and manage enterprise-wide networking across NESTS using full mesh SD-WAN architecture" 
          />
          <SDWANPanel />
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default SDWAN;
