
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
import { ISPContact, ContactsFilter } from '@/types/contacts';
import { Star, ArrowUpRight, AlertCircle } from 'lucide-react';
import { mockIspContacts } from '@/data/contactsData';

interface ISPContactsTabProps {
  filters: ContactsFilter;
}

const ISPContactsTab = ({ filters }: ISPContactsTabProps) => {
  // Filter ISP contacts based on the provided filters
  const filteredContacts = useMemo(() => {
    // In a real implementation, this would use a proper filtering function
    return mockIspContacts;
  }, [filters]);

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'Up':
        return <Badge className="bg-green-500">Up</Badge>;
      case 'Down':
        return <Badge variant="destructive">Down</Badge>;
      case 'Degraded':
        return <Badge variant="outline" className="border-orange-500 text-orange-500">Degraded</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const isExpiringSoon = (date?: Date) => {
    if (!date) return false;
    const today = new Date();
    const daysUntilExpiration = Math.floor((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiration <= 30 && daysUntilExpiration > 0;
  };
  
  const isExpired = (date?: Date) => {
    if (!date) return false;
    return date < new Date();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Internet Service Providers (ISPs)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">ISP Name</TableHead>
                <TableHead>Primary Contact</TableHead>
                <TableHead>Support Phone</TableHead>
                <TableHead>Emergency Phone</TableHead>
                <TableHead>Service Type</TableHead>
                <TableHead>Circuit ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Contract Expiration</TableHead>
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
                        {contact.name}
                      </div>
                    </TableCell>
                    <TableCell>{contact.primaryContactPerson || '-'}</TableCell>
                    <TableCell>{contact.supportPhone || '-'}</TableCell>
                    <TableCell>{contact.emergencyPhone || '-'}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{contact.serviceType}</Badge>
                    </TableCell>
                    <TableCell>{contact.circuitId || '-'}</TableCell>
                    <TableCell>{getStatusBadge(contact.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {contact.contractExpirationDate ? (
                          <>
                            {contact.contractExpirationDate.toLocaleDateString()}
                            
                            {isExpired(contact.contractExpirationDate) && (
                              <AlertCircle className="h-4 w-4 text-destructive" />
                            )}
                            
                            {isExpiringSoon(contact.contractExpirationDate) && !isExpired(contact.contractExpirationDate) && (
                              <AlertCircle className="h-4 w-4 text-amber-500" />
                            )}
                          </>
                        ) : (
                          '-'
                        )}
                      </div>
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
                  <TableCell colSpan={9} className="text-center py-6">
                    No ISP contacts found matching your filters
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>ISP Connection Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredContacts.map((contact) => (
                <div key={contact.id} className="flex items-center justify-between border-b pb-3">
                  <div>
                    <h4 className="font-medium">{contact.name}</h4>
                    <p className="text-sm text-muted-foreground">{contact.serviceType} - {contact.circuitId}</p>
                  </div>
                  <div className="space-x-2">
                    {getStatusBadge(contact.status)}
                    <Badge variant="outline">{contact.latency}ms</Badge>
                    <Badge variant="outline">{contact.bandwidth}Mbps</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Business Hours & SLA Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredContacts.map((contact) => (
                <div key={contact.id} className="flex items-center justify-between border-b pb-3">
                  <div>
                    <h4 className="font-medium">{contact.name}</h4>
                    <p className="text-sm text-muted-foreground">Business Hours: {contact.businessHours || 'Not specified'}</p>
                  </div>
                  <div>
                    {contact.slaAgreementLink ? (
                      <Button variant="outline" size="sm" className="flex items-center gap-2" asChild>
                        <a href={contact.slaAgreementLink} target="_blank" rel="noopener noreferrer">
                          View SLA
                          <ArrowUpRight className="h-3 w-3" />
                        </a>
                      </Button>
                    ) : (
                      <Badge variant="outline">No SLA</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ISPContactsTab;
