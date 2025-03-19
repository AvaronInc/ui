
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Plus, Filter, Download, RefreshCw } from 'lucide-react';
import NewTicketForm from './NewTicketForm';
import TicketFilters from './TicketFilters';
import { useTickets } from '@/context/ticket/TicketContext';
import { sampleDepartments, sampleLocations, sampleTechnicians } from '@/context/ticket/types';
import { toast } from 'sonner';

const TicketActionDialog = ({ action, trigger }: { action: 'new' | 'filter', trigger: React.ReactNode }) => {
  const { handleSubmitTicket, setFilters } = useTickets();
  
  const handleNewTicket = (data: any) => {
    handleSubmitTicket(data);
    
    toast.success('Ticket created successfully', {
      description: `Ticket ${data.title} has been created.`
    });
  };
  
  const handleApplyFilters = (filters: any) => {
    setFilters(filters);
    
    toast('Filters applied', {
      description: 'The ticket list has been filtered.'
    });
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {action === 'new' ? 'Create New Ticket' : 'Filter Tickets'}
          </DialogTitle>
          <DialogDescription>
            {action === 'new' 
              ? 'Enter the details of the new ticket below.' 
              : 'Filter the ticket list based on your criteria.'}
          </DialogDescription>
        </DialogHeader>
        
        {action === 'new' ? (
          <NewTicketForm 
            onSubmit={handleNewTicket}
          />
        ) : (
          <TicketFilters 
            filters={{
              search: '',
              status: 'all',
              priority: 'all',
              technician: 'all',
              department: 'all',
              location: 'all',
              showAIResolved: false,
              aiGeneratedOnly: false
            }}
            onFilterChange={handleApplyFilters}
            technicians={sampleTechnicians}
            departments={sampleDepartments}
            locations={sampleLocations}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

const TicketPageHeader = () => {
  const { refreshTickets } = useTickets();
  
  const handleRefresh = async () => {
    await refreshTickets();
    toast.success('Tickets refreshed');
  };
  
  const handleExport = () => {
    toast.success('Tickets exported to CSV');
  };
  
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-3xl font-bold">Tickets</h2>
          <p className="text-muted-foreground">
            Manage and respond to support tickets
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <TicketActionDialog 
            action="filter" 
            trigger={
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filters</span>
              </Button>
            }
          />
          
          <Button variant="outline" size="sm" className="gap-1" onClick={handleExport}>
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
          
          <Button variant="outline" size="sm" className="gap-1" onClick={handleRefresh}>
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
          
          <TicketActionDialog 
            action="new" 
            trigger={
              <Button size="sm" className="gap-1">
                <Plus className="w-4 h-4" />
                <span>New Ticket</span>
              </Button>
            }
          />
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default TicketPageHeader;
