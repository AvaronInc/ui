
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Ticket } from 'lucide-react';

// Format date function
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

interface SupportTicketsProps {}

const SupportTickets: React.FC<SupportTicketsProps> = () => {
  // Sample mock data for support tickets
  const mockTickets = [
    { id: 101, title: 'Increase storage allocation', status: 'open', priority: 'medium', created: '2023-06-14T08:20:00Z' },
    { id: 98, title: 'Add new admin account', status: 'closed', priority: 'low', created: '2023-06-10T14:15:00Z' }
  ];
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Support Tickets</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockTickets.map((ticket) => (
            <div key={ticket.id} className="flex items-center gap-3 py-1 border-b last:border-0">
              <div className="bg-secondary h-8 w-8 rounded-full flex items-center justify-center">
                <Ticket className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <div className="font-medium text-sm">{ticket.title}</div>
                  <Badge variant={ticket.status === 'open' ? 'default' : 'secondary'} className="text-xs">
                    {ticket.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <div className="text-xs text-muted-foreground">Priority: {ticket.priority}</div>
                  <div className="text-xs text-muted-foreground">{formatDate(ticket.created)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SupportTickets;
