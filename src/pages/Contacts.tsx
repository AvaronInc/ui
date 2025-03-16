
import { useEffect } from 'react';
import { Toaster } from 'sonner';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTransition from '@/components/transitions/PageTransition';
import PageTitle from '@/components/common/PageTitle';
import ContactSystemPanel from '@/components/contacts/ContactSystemPanel';
import { useIsMobile } from '@/hooks/use-mobile';

const Contacts = () => {
  const isMobile = useIsMobile();
  
  useEffect(() => {
    document.title = 'Contacts - Network Pulse Management';
  }, []);

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="px-3 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6 flex-1 overflow-auto">
          <PageTitle 
            title="Contact Management System" 
            subtitle={isMobile ? "Manage IT contacts and support" : "Manage IT contacts, service providers, and support information"} 
          />
          <ContactSystemPanel />
          <Toaster />
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default Contacts;
