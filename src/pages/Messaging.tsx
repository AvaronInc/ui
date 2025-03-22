
import { useEffect } from 'react';
import { Toaster } from 'sonner';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTransition from '@/components/transitions/PageTransition';
import PageTitle from '@/components/common/PageTitle';

const Messaging = () => {
  useEffect(() => {
    document.title = 'Messaging - Network Pulse Management';
  }, []);

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="px-3 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6 flex-1 overflow-auto">
          <PageTitle 
            title="Messaging" 
            subtitle="Internal IT employee messaging system" 
          />
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-card rounded-lg border shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Welcome to the Messaging System</h2>
              <p className="text-muted-foreground">
                This panel will contain the internal IT employee messaging functionality. 
                You can use this system to communicate with other IT staff members.
              </p>
            </div>
          </div>
          <Toaster />
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default Messaging;
