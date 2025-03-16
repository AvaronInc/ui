
import { useEffect } from 'react';
import { Toaster } from 'sonner';
import BillingPanel from '@/components/billing/BillingPanel';
import PageTransition from '@/components/transitions/PageTransition';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTitle from '@/components/common/PageTitle';
import { CreditCard } from 'lucide-react';

const Billing = () => {
  useEffect(() => {
    document.title = 'Billing & Payments - Network Pulse Management';
  }, []);

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="px-3 sm:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6 flex-1 overflow-auto">
          <PageTitle 
            title="Billing & Payments" 
            subtitle="Manage your billing, payments, and subscription details"
            icon={<CreditCard className="h-6 w-6" />}
          />
          <BillingPanel />
          <Toaster />
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default Billing;
