
import React from 'react';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import NewTicketForm from '@/components/tickets/NewTicketForm';
import { useTickets } from '@/context/TicketContext';

const TicketPageHeader = () => {
  const { handleSubmitTicket } = useTickets();
  
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Tickets</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl font-bold mt-2">Support Tickets</h1>
      </div>
      
      <NewTicketForm onSubmit={handleSubmitTicket} />
    </div>
  );
};

export default TicketPageHeader;
