
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Link, Terminal, ArrowRight, Server, Database, Ticket } from 'lucide-react';
import { ContactsFilter } from '@/types/contacts';

interface SearchIntegrationsTabProps {
  filters: ContactsFilter;
}

const SearchIntegrationsTab = ({ filters }: SearchIntegrationsTabProps) => {
  return (
    <div className="space-y-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Advanced Search</CardTitle>
          <CardDescription>
            Search across all contact sources and integrated systems
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by name, company, product, or any other attribute..."
                  className="pl-8"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="local">Local Contacts</SelectItem>
                  <SelectItem value="ldap">LDAP Directory</SelectItem>
                  <SelectItem value="tickets">Ticket System</SelectItem>
                  <SelectItem value="crm">CRM System</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <Button variant="outline" className="justify-start">
                <Server className="mr-2 h-4 w-4" />
                LDAP Directory
              </Button>
              <Button variant="outline" className="justify-start">
                <Ticket className="mr-2 h-4 w-4" />
                Ticketing System
              </Button>
              <Button variant="outline" className="justify-start">
                <Database className="mr-2 h-4 w-4" />
                CRM Integration
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>External API Integrations</CardTitle>
            <CardDescription>
              Connect to external contact sources and systems
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border p-4 rounded-md">
                <div className="flex items-center gap-3">
                  <Terminal className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">Ticketing System API</h4>
                    <p className="text-sm text-muted-foreground">Import contacts from ticketing system</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Link className="mr-2 h-4 w-4" />
                  Connect
                </Button>
              </div>
              
              <div className="flex items-center justify-between border p-4 rounded-md">
                <div className="flex items-center gap-3">
                  <Database className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">CRM Integration</h4>
                    <p className="text-sm text-muted-foreground">Sync with customer relationship manager</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Link className="mr-2 h-4 w-4" />
                  Connect
                </Button>
              </div>
              
              <div className="flex items-center justify-between border p-4 rounded-md">
                <div className="flex items-center gap-3">
                  <Server className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">LDAP Directory</h4>
                    <p className="text-sm text-muted-foreground">Import contacts from company directory</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Link className="mr-2 h-4 w-4" />
                  Connect
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Automation Actions</CardTitle>
            <CardDescription>
              Configure automated actions for contact management
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border p-4 rounded-md">
                <h4 className="font-medium mb-2">Create Ticket from Contact</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Automatically create support tickets and associate them with contacts
                </p>
                <Button size="sm" className="w-full">
                  Configure <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              <div className="border p-4 rounded-md">
                <h4 className="font-medium mb-2">Schedule Contract Reminders</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Set up automated reminders for contract renewals
                </p>
                <Button size="sm" className="w-full">
                  Configure <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              <div className="border p-4 rounded-md">
                <h4 className="font-medium mb-2">Email Notification Rules</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Configure email notifications for contact updates
                </p>
                <Button size="sm" className="w-full">
                  Configure <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SearchIntegrationsTab;
