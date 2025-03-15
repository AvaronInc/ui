
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ContactsFilter } from '@/types/contacts';
import { getContactsByCategory, filterContacts, mockContacts } from '@/data/contacts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, PhoneCall, Clock } from 'lucide-react';

interface EmergencyContactsTabProps {
  filters: ContactsFilter;
}

const EmergencyContactsTab = ({ filters }: EmergencyContactsTabProps) => {
  const emergencyContacts = filterContacts(
    getContactsByCategory(mockContacts, 'emergency'),
    filters
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Emergency Contacts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Escalation Level</TableHead>
                <TableHead>Responsible Area</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Available Hours</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emergencyContacts.length > 0 ? (
                emergencyContacts.map((contact) => {
                  const emergencyContact = contact as any; // Type as any to avoid type issues
                  return (
                    <TableRow key={contact.id}>
                      <TableCell className="font-medium">{contact.name}</TableCell>
                      <TableCell>
                        <Badge variant={emergencyContact.escalationLevel === 1 ? "destructive" : "outline"}>
                          Level {emergencyContact.escalationLevel}
                        </Badge>
                      </TableCell>
                      <TableCell>{emergencyContact.responsibleArea}</TableCell>
                      <TableCell>{contact.phone || '-'}</TableCell>
                      <TableCell>{contact.email || '-'}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{emergencyContact.availableHours || '24/7'}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <PhoneCall className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <ArrowUpRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    No emergency contacts found
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

export default EmergencyContactsTab;
