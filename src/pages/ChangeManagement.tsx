
import React, { useEffect } from 'react';
import { Toaster } from 'sonner';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTitle from '@/components/common/PageTitle';
import { ClipboardList } from 'lucide-react';
import { PageTransition } from '@/components/transitions/PageTransition';
import ChangeManagementPanel from '@/components/change-management/ChangeManagementPanel';
import { useIsMobile } from '@/hooks/use-mobile';

const ChangeManagement = () => {
  const isMobile = useIsMobile();
  
  useEffect(() => {
    document.title = 'Change Management - Network Pulse Management';
  }, []);

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="container mx-auto p-2 sm:p-6 space-y-4 sm:space-y-6">
          <PageTitle 
            title="Change Management" 
            subtitle={isMobile ? "Track and manage changes" : "Track, approve, and implement changes across your infrastructure"}
            icon={<ClipboardList className="h-6 w-6" />}
          />
          
          <ChangeManagementPanel />
          <Toaster />
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default ChangeManagement;
