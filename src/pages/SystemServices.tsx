
import { useEffect } from 'react';
import { Toaster } from 'sonner';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTransition from '@/components/transitions/PageTransition';
import PageTitle from '@/components/common/PageTitle';
import SystemServicesPanel from '@/components/services/components/system-services/SystemServicesPanel';
import { useDemoNotifications } from '@/components/notifications/demoNotifications';

const SystemServices = () => {
  // Load demo notifications
  useDemoNotifications();
  
  useEffect(() => {
    document.title = 'System Services - Network Pulse Management';
  }, []);

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="px-3 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6 flex-1 overflow-auto">
          <PageTitle 
            title="System Services" 
            subtitle="Monitor and manage core system services" 
          />
          <SystemServicesPanel />
          <Toaster />
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default SystemServices;
