
import React from 'react';
import { PageTransition } from '@/components/transitions/PageTransition';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTitle from '@/components/common/PageTitle';
import { Scroll } from 'lucide-react';
import SDMSPanel from '@/components/sdms/SDMSPanel';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const SDMS = () => {
  useDocumentTitle('SDMS');
  
  return (
    <PageTransition>
      <DashboardLayout>
        <div className="p-2 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
          <PageTitle 
            title="System Documentation Management Service" 
            description="Create, manage, and organize documentation for all services and infrastructure"
            icon={<Scroll className="h-6 w-6" />}
          />
          <SDMSPanel />
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default SDMS;
