import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Contact, ContactsFilter, ContactCategory } from '@/types/contacts';
import { User, Users, Phone, Mail, Star, Calendar, ArrowUpRight } from 'lucide-react';
import { mockContacts, getRecentContacts, getFavoriteContacts } from '@/data/contacts';

interface CategoryCountItem {
  category: ContactCategory;
  count: number;
  label: string;
  icon: React.ReactNode;
}

interface OverviewTabProps {
  filters: ContactsFilter;
}

const OverviewTab = ({ filters }: OverviewTabProps) => {
  // Filter contacts based on the provided filters
  const filteredContacts = useMemo(() => {
    // In a real implementation, this would use a proper filtering function
    return mockContacts;
  }, [filters]);
  
  const recentContacts = useMemo(() => getRecentContacts(filteredContacts), [filteredContacts]);
  const favoriteContacts = useMemo(() => getFavoriteContacts(filteredContacts), [filteredContacts]);
  
  const categoryCounts: CategoryCountItem[] = [
    { 
      category: 'isp', 
      count: filteredContacts.filter(c => c.category === 'isp').length, 
      label: 'ISP Contacts',
      icon: <User className="h-4 w-4" />
    },
    { 
      category: 'tech-support', 
      count: filteredContacts.filter(c => c.category === 'tech-support').length, 
      label: 'Tech Support',
      icon: <Phone className="h-4 w-4" />
    },
    { 
      category: 'sales', 
      count: filteredContacts.filter(c => c.category === 'sales').length, 
      label: 'Sales Contacts',
      icon: <Mail className="h-4 w-4" />
    },
    { 
      category: 'emergency', 
      count: filteredContacts.filter(c => c.category === 'emergency').length, 
      label: 'Emergency Contacts',
      icon: <Star className="h-4 w-4" />
    },
    { 
      category: 'internal', 
      count: filteredContacts.filter(c => c.category === 'internal').length, 
      label: 'Internal Team',
      icon: <Users className="h-4 w-4" />
    }
  ];
  
  const renderContactRow = (contact: Contact) => (
    <TableRow key={contact.id}>
      <TableCell className="font-medium">
        <div className="flex items-center gap-2">
          {contact.isFavorite && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
          {contact.name}
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="outline">
          {categoryCounts.find(c => c.category === contact.category)?.label || contact.category}
        </Badge>
      </TableCell>
      <TableCell>{contact.phone || '-'}</TableCell>
      <TableCell>{contact.email || '-'}</TableCell>
      <TableCell>
        <Button variant="ghost" size="icon">
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
  
  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
      <Card className="lg:col-span-3">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Contacts Overview</CardTitle>
            <CardDescription>
              Your IT contact management at a glance
            </CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="text-sm text-muted-foreground">Last sync: Today, 11:23 AM</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 grid-cols-2 md:grid-cols-5">
            {categoryCounts.map((item) => (
              <Card key={item.category}>
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <div className="bg-primary/10 p-2 rounded-full mb-2">
                    {item.icon}
                  </div>
                  <div className="text-2xl font-bold mb-1">{item.count}</div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Recently Accessed</CardTitle>
          <CardDescription>
            Your recently viewed contacts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentContacts.length > 0 ? (
                recentContacts.map(renderContactRow)
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No recent contacts found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Favorites</CardTitle>
          <CardDescription>
            Your pinned contacts for quick access
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {favoriteContacts.length > 0 ? (
                favoriteContacts.map(contact => (
                  <TableRow key={contact.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        {contact.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {categoryCounts.find(c => c.category === contact.category)?.label || contact.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-4">
                    No favorites found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewTab;
