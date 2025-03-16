
import { useEffect } from 'react';
import { Toaster } from 'sonner';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTransition from '@/components/transitions/PageTransition';
import PageTitle from '@/components/common/PageTitle';
import ServicesPanel from '@/components/services/ServicesPanel';
import { useDemoNotifications } from '@/components/notifications/demoNotifications';

const Services = () => {
  // Load demo notifications
  useDemoNotifications();
  
  useEffect(() => {
    document.title = 'Services - Network Pulse Management';
  }, []);

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="px-3 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6 flex-1 overflow-auto">
          <PageTitle 
            title="Service Management" 
            subtitle="Manage service deployments, monitoring, and documentation" 
          />
          <ServicesPanel />
          <Toaster />
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default Services;
