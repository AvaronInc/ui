
import { useMemo } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SalesContact, ContactsFilter } from '@/types/contacts';
import { 
  Star, 
  ArrowUpRight, 
  Mail, 
  Phone, 
  MessageSquare, 
  Calendar, 
  Clock,
  AlertCircle
} from 'lucide-react';
import { mockSalesContacts } from '@/data/contactsData';

interface SalesContactsTabProps {
  filters: ContactsFilter;
}

const SalesContactsTab = ({ filters }: SalesContactsTabProps) => {
  // Filter sales contacts based on the provided filters
  const filteredContacts = useMemo(() => {
    // In a real implementation, this would use a proper filtering function
    return mockSalesContacts;
  }, [filters]);

  const isRenewalSoon = (date?: Date) => {
    if (!date) return false;
    const today = new Date();
    const daysUntilRenewal = Math.floor((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilRenewal <= 30 && daysUntilRenewal > 0;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Sales & Vendor Points of Contact</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Company</TableHead>
                <TableHead>Representative</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Preferred Order Channels</TableHead>
                <TableHead>Contracts</TableHead>
                <TableHead>Renewal Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {contact.isFavorite && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
                        {contact.company}
                      </div>
                    </TableCell>
                    <TableCell>{contact.representativeName || contact.name}</TableCell>
                    <TableCell>{contact.phone || '-'}</TableCell>
                    <TableCell>{contact.email || '-'}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {contact.preferredOrderChannels.map((channel, index) => (
                          <Badge key={index} variant="outline">{channel}</Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {contact.currentContracts && contact.currentContracts.length > 0 ? (
                          contact.currentContracts.map((contract, index) => (
                            <div key={index} className="text-xs truncate max-w-56">
                              {contract}
                            </div>
                          ))
                        ) : (
                          <span className="text-muted-foreground">No active contracts</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {contact.contractRenewalDate ? (
                        <div className="flex items-center gap-2">
                          {contact.contractRenewalDate.toLocaleDateString()}
                          {isRenewalSoon(contact.contractRenewalDate) && (
                            <Clock className="h-4 w-4 text-amber-500" />
                          )}
                        </div>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6">
                    No sales contacts found matching your filters
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Contact Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredContacts.map((contact) => (
                <div key={contact.id} className="p-4 border rounded-md">
                  <h3 className="font-medium">{contact.company}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {contact.representativeName || contact.name}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center gap-2 justify-start"
                      asChild
                    >
                      <a href={`mailto:${contact.email}`}>
                        <Mail className="h-4 w-4" />
                        <span>Email</span>
                      </a>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center gap-2 justify-start"
                      asChild
                    >
                      <a href={`tel:${contact.phone}`}>
                        <Phone className="h-4 w-4" />
                        <span>Call</span>
                      </a>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center gap-2 justify-start"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Message</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center gap-2 justify-start"
                    >
                      <Calendar className="h-4 w-4" />
                      <span>Schedule</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contract Renewals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredContacts
                .filter(c => c.contractRenewalDate)
                .sort((a, b) => {
                  // Sort by renewal date (ascending)
                  if (!a.contractRenewalDate || !b.contractRenewalDate) return 0;
                  return a.contractRenewalDate.getTime() - b.contractRenewalDate.getTime();
                })
                .map((contact) => (
                  <div key={contact.id} className="flex items-start justify-between border-b pb-3">
                    <div>
                      <h4 className="font-medium flex items-center gap-2">
                        {contact.company}
                        {isRenewalSoon(contact.contractRenewalDate) && (
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                        )}
                      </h4>
                      
                      <div className="text-sm text-muted-foreground">
                        {contact.currentContracts && contact.currentContracts.length > 0 ? (
                          <ul className="list-disc list-inside">
                            {contact.currentContracts.map((contract, index) => (
                              <li key={index} className="truncate max-w-56">{contract}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>No contracts</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <Badge variant={isRenewalSoon(contact.contractRenewalDate) ? "outline" : "secondary"}>
                        {contact.contractRenewalDate?.toLocaleDateString()}
                      </Badge>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex ml-auto mt-2 items-center gap-1"
                      >
                        <span className="text-xs">Set Reminder</span>
                        <Clock className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {!filteredContacts.some(c => c.contractRenewalDate) && (
                  <div className="text-center py-4 text-muted-foreground">
                    No contract renewals scheduled
                  </div>
                )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalesContactsTab;
