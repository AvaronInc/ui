
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { PageTransition } from '@/components/transitions/PageTransition';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import TicketList from '@/components/tickets/TicketList';
import TicketFilters from '@/components/tickets/TicketFilters';
import TicketDetailPanel from '@/components/tickets/TicketDetailPanel';
import NewTicketForm from '@/components/tickets/NewTicketForm';
import { Ticket, TicketFilter, TicketStatus } from '@/types/tickets';
import { useToast } from '@/hooks/use-toast';

// Sample data for tickets
const sampleTickets: Ticket[] = [
  {
    id: 'TK-1001',
    title: 'Cannot access file server',
    description: 'Users in the marketing department are unable to access the shared file server since this morning.',
    status: 'open',
    priority: 'high',
    assignedTo: 'Alex Johnson',
    createdBy: 'Sarah Miller',
    createdAt: '2023-06-15T09:30:00Z',
    updatedAt: '2023-06-15T10:15:00Z',
    notes: [
      {
        id: 'note-1',
        content: 'Checked network connectivity, all seems normal.',
        author: 'Alex Johnson',
        timestamp: '2023-06-15T10:15:00Z',
        isInternal: true
      }
    ]
  },
  {
    id: 'TK-1002',
    title: 'Email delivery delayed',
    description: 'External emails are taking over 30 minutes to be delivered. Internal emails work fine.',
    status: 'in-progress',
    priority: 'medium',
    assignedTo: 'James Wilson',
    createdBy: 'David Chen',
    createdAt: '2023-06-14T15:20:00Z',
    updatedAt: '2023-06-15T09:45:00Z',
    notes: [
      {
        id: 'note-2',
        content: 'Investigating mail server logs for potential issues.',
        author: 'James Wilson',
        timestamp: '2023-06-14T16:30:00Z',
        isInternal: false
      },
      {
        id: 'note-3',
        content: 'Found high volume of spam emails causing delay. Working on filter adjustment.',
        author: 'James Wilson',
        timestamp: '2023-06-15T09:45:00Z',
        isInternal: true
      }
    ]
  },
  {
    id: 'TK-1003',
    title: 'New software installation request',
    description: 'Need Adobe Creative Suite installed on design team computers.',
    status: 'open',
    priority: 'low',
    createdBy: 'Lisa Wang',
    createdAt: '2023-06-15T11:00:00Z',
    updatedAt: '2023-06-15T11:00:00Z'
  },
  {
    id: 'TK-1004',
    title: 'Printer not working',
    description: 'The main office printer is showing error code E-723 and not responding to print jobs.',
    status: 'resolved',
    priority: 'medium',
    assignedTo: 'Robert Davis',
    createdBy: 'Emma Thompson',
    createdAt: '2023-06-13T14:10:00Z',
    updatedAt: '2023-06-14T08:30:00Z',
    notes: [
      {
        id: 'note-4',
        content: 'Checked printer, found paper jam in tray 2.',
        author: 'Robert Davis',
        timestamp: '2023-06-13T15:45:00Z',
        isInternal: false
      },
      {
        id: 'note-5',
        content: 'Cleared paper jam and reset printer. Working now.',
        author: 'Robert Davis',
        timestamp: '2023-06-14T08:30:00Z',
        isInternal: false
      }
    ]
  },
  {
    id: 'TK-1005',
    title: 'VPN connection issues',
    description: 'Remote workers are experiencing intermittent VPN disconnections.',
    status: 'in-progress',
    priority: 'critical',
    assignedTo: 'Alex Johnson',
    createdBy: 'Michael Brown',
    createdAt: '2023-06-15T08:00:00Z',
    updatedAt: '2023-06-15T11:30:00Z',
    notes: [
      {
        id: 'note-6',
        content: 'Initial investigation shows possible ISP routing issue.',
        author: 'Alex Johnson',
        timestamp: '2023-06-15T09:20:00Z',
        isInternal: false
      },
      {
        id: 'note-7',
        content: 'Contacted ISP to escalate the issue. They are investigating.',
        author: 'Alex Johnson',
        timestamp: '2023-06-15T11:30:00Z',
        isInternal: true
      }
    ]
  }
];

// Sample technicians
const sampleTechnicians = [
  'Alex Johnson',
  'James Wilson',
  'Robert Davis',
  'Maria Garcia',
  'Sophia Lee'
];

const TicketsPage = () => {
  const { toast } = useToast();
  const [tickets, setTickets] = useState<Ticket[]>(sampleTickets);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [detailPanelOpen, setDetailPanelOpen] = useState(false);
  const [filters, setFilters] = useState<TicketFilter>({
    search: '',
    status: 'all',
    priority: 'all',
    technician: 'all'
  });
  
  // Filter tickets based on the current filters
  const filteredTickets = tickets.filter(ticket => {
    // Search filter
    const searchMatch = 
      filters.search === '' || 
      ticket.id.toLowerCase().includes(filters.search.toLowerCase()) ||
      ticket.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      ticket.description.toLowerCase().includes(filters.search.toLowerCase());
    
    // Status filter
    const statusMatch = 
      filters.status === 'all' || 
      ticket.status === filters.status;
    
    // Priority filter
    const priorityMatch = 
      filters.priority === 'all' || 
      ticket.priority === filters.priority;
    
    // Technician filter
    const technicianMatch = 
      filters.technician === 'all' || 
      ticket.assignedTo === filters.technician;
    
    return searchMatch && statusMatch && priorityMatch && technicianMatch;
  });
  
  const handleTicketSelect = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setDetailPanelOpen(true);
  };
  
  const handleStatusChange = (ticketId: string, status: TicketStatus) => {
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId 
        ? { 
            ...ticket, 
            status, 
            updatedAt: new Date().toISOString() 
          } 
        : ticket
    ));
    
    toast({
      title: "Status updated",
      description: `Ticket ${ticketId} status changed to ${status.replace('-', ' ')}`
    });
  };
  
  const handlePriorityChange = (ticketId: string, priority: string) => {
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId 
        ? { 
            ...ticket, 
            priority: priority as any, 
            updatedAt: new Date().toISOString() 
          } 
        : ticket
    ));
    
    toast({
      title: "Priority updated",
      description: `Ticket ${ticketId} priority changed to ${priority}`
    });
  };
  
  const handleAssignTicket = (ticketId: string, technicianName: string) => {
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId 
        ? { 
            ...ticket, 
            assignedTo: technicianName, 
            updatedAt: new Date().toISOString() 
          } 
        : ticket
    ));
    
    setSelectedTicket(prev => 
      prev && prev.id === ticketId 
        ? { ...prev, assignedTo: technicianName, updatedAt: new Date().toISOString() } 
        : prev
    );
    
    toast({
      title: "Ticket assigned",
      description: `Ticket ${ticketId} assigned to ${technicianName}`
    });
  };
  
  const handleAddNote = (ticketId: string, content: string, isInternal: boolean) => {
    const timestamp = new Date().toISOString();
    const newNote = {
      id: `note-${Date.now()}`,
      content,
      author: 'Current User', // This would be the logged-in user in a real app
      timestamp,
      isInternal
    };
    
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId 
        ? { 
            ...ticket, 
            notes: [...(ticket.notes || []), newNote],
            updatedAt: timestamp
          } 
        : ticket
    ));
    
    setSelectedTicket(prev => 
      prev && prev.id === ticketId 
        ? { 
            ...prev, 
            notes: [...(prev.notes || []), newNote],
            updatedAt: timestamp
          } 
        : prev
    );
    
    toast({
      title: "Note added",
      description: `Note added to ticket ${ticketId}`
    });
  };
  
  const handleSubmitTicket = (data: {
    title: string;
    description: string;
    priority: any;
    attachments: File[];
  }) => {
    const newTicket: Ticket = {
      id: `TK-${1000 + tickets.length + 1}`,
      title: data.title,
      description: data.description,
      status: 'open',
      priority: data.priority,
      createdBy: 'Current User', // This would be the logged-in user in a real app
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      attachments: data.attachments.map(file => URL.createObjectURL(file))
    };
    
    setTickets([newTicket, ...tickets]);
    
    toast({
      title: "Ticket created",
      description: `Ticket ${newTicket.id} has been created successfully`
    });
  };
  
  return (
    <PageTransition>
      <DashboardLayout>
        <div className="container p-4 md:p-6 space-y-6">
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
          
          <TicketFilters 
            filters={filters}
            onFilterChange={setFilters}
            technicians={sampleTechnicians}
          />
          
          <TicketList 
            tickets={filteredTickets}
            onTicketSelect={handleTicketSelect}
            selectedTicket={selectedTicket}
          />
          
          <TicketDetailPanel 
            ticket={selectedTicket}
            isOpen={detailPanelOpen}
            onClose={() => setDetailPanelOpen(false)}
            onStatusChange={handleStatusChange}
            onPriorityChange={handlePriorityChange}
            onAssignTicket={handleAssignTicket}
            onAddNote={handleAddNote}
            technicians={sampleTechnicians}
          />
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default TicketsPage;
