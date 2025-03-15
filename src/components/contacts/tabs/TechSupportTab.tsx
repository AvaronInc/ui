
import { useMemo } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TechSupportContact, ContactsFilter, WarrantyStatus } from '@/types/contacts';
import { Star, ArrowUpRight, ExternalLink, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { mockTechSupportContacts, mockWarrantyStatistics } from '@/data/contactsData';

interface TechSupportTabProps {
  filters: ContactsFilter;
}

const TechSupportTab = ({ filters }: TechSupportTabProps) => {
  // Filter tech support contacts based on the provided filters
  const filteredContacts = useMemo(() => {
    // In a real implementation, this would use a proper filtering function
    return mockTechSupportContacts;
  }, [filters]);

  const getWarrantyStatusIcon = (status?: WarrantyStatus) => {
    switch (status) {
      case 'Active':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'Expired':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'Expiring Soon':
        return <Clock className="h-4 w-4 text-amber-500" />;
      default:
        return null;
    }
  };

  const getWarrantyStatusBadge = (status?: WarrantyStatus) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'Expired':
        return <Badge variant="destructive">Expired</Badge>;
      case 'Expiring Soon':
        return <Badge variant="outline" className="border-amber-500 text-amber-500">Expiring Soon</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  const totalDevices = mockWarrantyStatistics.active + mockWarrantyStatistics.expired + mockWarrantyStatistics.expiringSoon;
  
  // Sort contacts to show expiring soon and expired at the top
  const sortedContacts = [...filteredContacts].sort((a, b) => {
    const priorityOrder: Record<string, number> = {
      'Expired': 0,
      'Expiring Soon': 1,
      'Active': 2,
      'undefined': 3
    };
    
    const statusA = a.warrantyStatus || 'undefined';
    const statusB = b.warrantyStatus || 'undefined';
    
    return priorityOrder[statusA] - priorityOrder[statusB];
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Active Warranties</CardTitle>
            <CardDescription>Devices with valid warranty coverage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="text-3xl font-bold">{mockWarrantyStatistics.active}</div>
              <Progress 
                value={(mockWarrantyStatistics.active / totalDevices) * 100} 
                className="h-2 w-full bg-gray-200"
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Expired Warranties</CardTitle>
            <CardDescription>Devices with expired warranty coverage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="text-3xl font-bold text-destructive">{mockWarrantyStatistics.expired}</div>
              <Progress 
                value={(mockWarrantyStatistics.expired / totalDevices) * 100} 
                className="h-2 w-full bg-gray-200"
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Expiring Soon</CardTitle>
            <CardDescription>Warranties expiring in the next 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="text-3xl font-bold text-amber-500">{mockWarrantyStatistics.expiringSoon}</div>
              <Progress 
                value={(mockWarrantyStatistics.expiringSoon / totalDevices) * 100} 
                className="h-2 w-full bg-gray-200"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tech Support & Warranty Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Vendor</TableHead>
                <TableHead>Support Contact</TableHead>
                <TableHead>Support Phone</TableHead>
                <TableHead>Support Email</TableHead>
                <TableHead>Model Details</TableHead>
                <TableHead>Warranty Status</TableHead>
                <TableHead>Support Portal</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedContacts.length > 0 ? (
                sortedContacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {contact.isFavorite && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
                        {contact.vendor}
                      </div>
                    </TableCell>
                    <TableCell>{contact.name}</TableCell>
                    <TableCell>{contact.supportPhone || contact.phone || '-'}</TableCell>
                    <TableCell>{contact.supportEmail || contact.email || '-'}</TableCell>
                    <TableCell>
                      <div className="font-mono text-xs">
                        {contact.modelDetails || '-'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getWarrantyStatusBadge(contact.warrantyStatus)}
                        {contact.warrantyExpirationDate && (
                          <span className="text-xs text-muted-foreground">
                            {contact.warrantyExpirationDate.toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {contact.ticketPortalLink ? (
                        <Button variant="outline" size="sm" className="flex items-center gap-1" asChild>
                          <a href={contact.ticketPortalLink} target="_blank" rel="noopener noreferrer">
                            Portal
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      ) : (
                        <span className="text-xs text-muted-foreground">-</span>
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
                    No tech support contacts found matching your filters
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Serial Numbers & Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedContacts.map((contact) => (
              <div key={contact.id} className="border rounded-md p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium flex items-center gap-2">
                      {contact.vendor} - {contact.modelDetails}
                      {getWarrantyStatusIcon(contact.warrantyStatus)}
                    </h4>
                    
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Support Contact: {contact.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Warranty Status: {contact.warrantyStatus || 'Unknown'}
                        {contact.warrantyExpirationDate && (
                          <span> (Expires: {contact.warrantyExpirationDate.toLocaleDateString()})</span>
                        )}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    {contact.ticketPortalLink && (
                      <Button variant="outline" size="sm" className="mb-2" asChild>
                        <a href={contact.ticketPortalLink} target="_blank" rel="noopener noreferrer">
                          Support Portal
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
                
                {contact.serialNumbers && contact.serialNumbers.length > 0 && (
                  <div className="mt-4 pt-2 border-t">
                    <h5 className="text-sm font-medium mb-2">Serial Numbers:</h5>
                    <div className="flex flex-wrap gap-2">
                      {contact.serialNumbers.map((serial, index) => (
                        <Badge variant="outline" key={index} className="font-mono">
                          {serial}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TechSupportTab;
