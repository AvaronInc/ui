
import React, { useEffect } from 'react';
import { Toaster } from 'sonner';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTitle from '@/components/common/PageTitle';
import { Shield } from 'lucide-react';
import { PageTransition } from '@/components/transitions/PageTransition';
import SecurityPanel from '@/components/security/SecurityPanel';
import { useIsMobile } from '@/hooks/use-mobile';

const Security = () => {
  const isMobile = useIsMobile();
  
  useEffect(() => {
    document.title = 'Security Center - Network Pulse Management';
  }, []);

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="container mx-auto p-2 sm:p-6 space-y-4 sm:space-y-6">
          <PageTitle 
            title="Security Center" 
            subtitle={isMobile ? "Monitor security across your infrastructure" : "Monitor and manage enterprise-grade security across your infrastructure"}
            icon={<Shield className="h-6 w-6" />}
          />
          
          <SecurityPanel />
          <Toaster />
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default Security;
