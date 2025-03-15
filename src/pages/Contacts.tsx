
import { useEffect } from 'react';
import { Toaster } from 'sonner';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTransition from '@/components/transitions/PageTransition';
import PageTitle from '@/components/common/PageTitle';
import ContactSystemPanel from '@/components/contacts/ContactSystemPanel';

const Contacts = () => {
  useEffect(() => {
    document.title = 'Contacts - Network Pulse Management';
  }, []);

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="p-6 space-y-6 flex-1 overflow-auto">
          <PageTitle 
            title="Contact Management System" 
            subtitle="Manage IT contacts, service providers, and support information" 
          />
          <ContactSystemPanel />
          <Toaster />
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default Contacts;
