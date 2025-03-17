
import React from 'react';
import { useTickets } from '@/context/TicketContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, DownloadCloud, Clock, LineChart } from 'lucide-react';
import NewTicketForm from '@/components/tickets/NewTicketForm';

const TicketPageHeader = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Support Tickets</h1>
        <p className="text-muted-foreground">
          View and manage support tickets for your organization
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <TicketActionDialog />
        
        <Button variant="outline" size="sm" className="gap-1">
          <DownloadCloud className="h-4 w-4" />
          <span>Export</span>
        </Button>
      </div>
    </div>
  );
};

const TicketActionDialog = () => {
  const { handleSubmitTicket } = useTickets();
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1">
          <PlusCircle className="h-4 w-4" />
          <span>New Ticket</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Create New Ticket</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="manual" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manual" className="flex items-center gap-2">
              <Clock className="h-4 w-4" /> Manual Creation
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" /> AI Suggested
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="manual" className="pt-4">
            <NewTicketForm 
              onSubmit={(data) => {
                handleSubmitTicket(data);
                setOpen(false);
              }}
            />
          </TabsContent>
          
          <TabsContent value="analytics" className="pt-4">
            <div className="space-y-4">
              <div className="border rounded-md p-4 bg-muted/50">
                <h3 className="font-medium mb-2">AI Detected Issues</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Based on system monitoring, these potential issues were detected:
                </p>
                
                <div className="space-y-2">
                  <div className="border rounded p-3 bg-background cursor-pointer hover:bg-muted transition-colors">
                    <h4 className="font-medium text-sm">Database Performance Degradation</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Multiple users experiencing slow query response times
                    </p>
                  </div>
                  
                  <div className="border rounded p-3 bg-background cursor-pointer hover:bg-muted transition-colors">
                    <h4 className="font-medium text-sm">Network Connectivity Issues</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Remote users reporting intermittent VPN disconnections
                    </p>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Select an issue above to create a ticket with AI-populated details, or create a manual ticket.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default TicketPageHeader;
