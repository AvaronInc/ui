
import React from 'react';
import { PageTransition } from '@/components/transitions/PageTransition';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTitle from '@/components/common/PageTitle';
import { Scroll } from 'lucide-react';
import SDMSPanel from '@/components/sdms/SDMSPanel';
import { TooltipProvider } from '@/components/ui/tooltip';

const SDMS = () => {
  return (
    <PageTransition>
      <TooltipProvider>
        <DashboardLayout>
          <div className="p-2 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
            <PageTitle 
              title="Service Documentation Management" 
              description="Create, manage, and organize documentation for all services and infrastructure"
              icon={<Scroll className="h-6 w-6" />}
            />
            <SDMSPanel />
          </div>
        </DashboardLayout>
      </TooltipProvider>
    </PageTransition>
  );
};

export default SDMS;
