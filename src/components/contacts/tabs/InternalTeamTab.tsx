
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ContactsFilter } from '@/types/contacts';
import { getContactsByCategory, filterContacts, mockContacts } from '@/data/contacts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, MessageSquare, Users } from 'lucide-react';

interface InternalTeamTabProps {
  filters: ContactsFilter;
}

const InternalTeamTab = ({ filters }: InternalTeamTabProps) => {
  const internalContacts = filterContacts(
    getContactsByCategory(mockContacts, 'internal'),
    filters
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Internal IT Team Directory</CardTitle>
          <Badge className="ml-2" variant="outline">
            <Users className="mr-1 h-3 w-3" />
            {internalContacts.length} Team Members
          </Badge>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Preferred Communication</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Reports To</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {internalContacts.length > 0 ? (
                internalContacts.map((contact) => {
                  const internalContact = contact as any; // Type as any to avoid type issues
                  return (
                    <TableRow key={contact.id}>
                      <TableCell className="font-medium">{contact.name}</TableCell>
                      <TableCell>{internalContact.role}</TableCell>
                      <TableCell>{internalContact.department}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {internalContact.preferredCommunication}
                        </Badge>
                      </TableCell>
                      <TableCell>{contact.phone || '-'}</TableCell>
                      <TableCell>{contact.email || '-'}</TableCell>
                      <TableCell>{internalContact.directReportTo || '-'}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <MessageSquare className="h-4 w-4" />
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
                  <TableCell colSpan={8} className="text-center py-4">
                    No internal team members found
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

export default InternalTeamTab;
