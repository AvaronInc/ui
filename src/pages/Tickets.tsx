
import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { PageTransition } from '@/components/transitions/PageTransition';
import { TicketProvider } from '@/context/TicketContext';
import TicketPageHeader from '@/components/tickets/TicketPageHeader';
import TicketMainContent from '@/components/tickets/TicketMainContent';

const TicketsPage = () => {
  return (
    <PageTransition>
      <DashboardLayout>
        <TicketProvider>
          <div className="container p-4 md:p-6 space-y-6">
            <TicketPageHeader />
            <TicketMainContent />
          </div>
        </TicketProvider>
      </DashboardLayout>
    </PageTransition>
  );
};

export default TicketsPage;
