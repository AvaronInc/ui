
import React, { useEffect } from 'react';
import { Toaster } from 'sonner';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTitle from '@/components/common/PageTitle';
import { FileText } from 'lucide-react';
import { PageTransition } from '@/components/transitions/PageTransition';
import LoggingAuditPanel from '@/components/logging/LoggingAuditPanel';
import { useIsMobile } from '@/hooks/use-mobile';

const LoggingAudit = () => {
  const isMobile = useIsMobile();
  
  useEffect(() => {
    document.title = 'Logging & Audit - Network Pulse Management';
  }, []);

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="container mx-auto p-2 sm:p-6 space-y-4 sm:space-y-6">
          <PageTitle 
            title="Logging & Audit" 
            subtitle={isMobile ? "Monitor system events and user actions" : "Comprehensive logging, audit trails, and compliance reporting for your network"}
            icon={<FileText className="h-6 w-6" />}
          />
          
          <LoggingAuditPanel />
          <Toaster />
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default LoggingAudit;
