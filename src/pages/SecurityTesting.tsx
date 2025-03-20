
import React, { useEffect } from 'react';
import { Toaster } from 'sonner';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTitle from '@/components/common/PageTitle';
import { TestTube } from 'lucide-react';
import { PageTransition } from '@/components/transitions/PageTransition';
import SecurityTestingPanel from '@/components/security-testing/SecurityTestingPanel';
import { useIsMobile } from '@/hooks/use-mobile';

const SecurityTesting = () => {
  const isMobile = useIsMobile();
  
  useEffect(() => {
    document.title = 'Security Testing - Network Pulse Management';
  }, []);

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="container mx-auto p-2 sm:p-6 space-y-4 sm:space-y-6">
          <PageTitle 
            title="Security Testing" 
            subtitle={isMobile ? "Automated security testing and validation" : "Automated security testing and validation for network devices and infrastructure"}
            icon={<TestTube className="h-6 w-6" />}
          />
          
          <SecurityTestingPanel />
          <Toaster />
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default SecurityTesting;
