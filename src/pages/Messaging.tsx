
import { useEffect } from 'react';
import { Toaster } from 'sonner';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTransition from '@/components/transitions/PageTransition';
import MessagingPanel from '@/components/messaging/MessagingPanel';

const Messaging = () => {
  useEffect(() => {
    document.title = 'Messaging - Network Pulse Management';
  }, []);
  
  return (
    <PageTransition>
      <DashboardLayout>
        <div className="px-0 py-0 flex h-[calc(100vh-4rem)] overflow-hidden">
          <MessagingPanel />
          <Toaster />
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default Messaging;
