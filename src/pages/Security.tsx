
import React, { useEffect } from 'react';
import { Toaster } from 'sonner';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTitle from '@/components/common/PageTitle';
import { Shield } from 'lucide-react';
import { PageTransition } from '@/components/transitions/PageTransition';
import SecurityPanel from '@/components/security/SecurityPanel';

const Security = () => {
  useEffect(() => {
    document.title = 'Security Center - Network Pulse Management';
  }, []);

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="container mx-auto p-4 sm:p-6 space-y-6">
          <PageTitle 
            title="Security Center" 
            subtitle="Monitor and manage enterprise-grade security across your infrastructure"
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
