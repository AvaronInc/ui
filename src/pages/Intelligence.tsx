
import React, { useEffect } from 'react';
import { Toaster } from 'sonner';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTitle from '@/components/common/PageTitle';
import { Database } from 'lucide-react';
import { PageTransition } from '@/components/transitions/PageTransition';
import { IntelligencePanel } from '@/components/security/intelligence';
import { useIsMobile } from '@/hooks/use-mobile';

const Intelligence = () => {
  const isMobile = useIsMobile();
  
  useEffect(() => {
    document.title = 'Threat Intelligence - Network Pulse Management';
  }, []);

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="container mx-auto p-2 sm:p-6 space-y-4 sm:space-y-6">
          <PageTitle 
            title="Threat Intelligence" 
            subtitle={isMobile ? "Advanced threat analysis" : "Comprehensive analysis of threat actors, techniques, and exploits"}
            icon={<Database className="h-6 w-6" />}
          />
          
          <IntelligencePanel />
          <Toaster />
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default Intelligence;
