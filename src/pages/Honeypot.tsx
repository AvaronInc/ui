
import React, { useEffect } from 'react';
import { Toaster } from 'sonner';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTitle from '@/components/common/PageTitle';
import { Bug } from 'lucide-react';
import { PageTransition } from '@/components/transitions/PageTransition';
import HoneypotPanel from '@/components/honeypot/HoneypotPanel';
import { useIsMobile } from '@/hooks/use-mobile';

const Honeypot = () => {
  const isMobile = useIsMobile();
  
  useEffect(() => {
    document.title = 'Honeypot Management - Network Pulse Management';
  }, []);

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="container mx-auto p-2 sm:p-6 space-y-4 sm:space-y-6">
          <PageTitle 
            title="Honeypot Management" 
            subtitle={isMobile ? "Deploy and monitor AI-driven honeypots" : "Deploy, manage, and monitor AI-driven honeypots to gather attack intelligence and improve security"}
            icon={<Bug className="h-6 w-6" />}
          />
          
          <HoneypotPanel />
          <Toaster />
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default Honeypot;
