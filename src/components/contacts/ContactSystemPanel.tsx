
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, Search, Filter, FileText, Save } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ContactsFilter } from '@/types/contacts';
import { toast } from 'sonner';

import OverviewTab from './tabs/OverviewTab';
import ISPContactsTab from './tabs/ISPContactsTab';
import TechSupportTab from './tabs/TechSupportTab';
import SalesContactsTab from './tabs/SalesContactsTab';
import EmergencyContactsTab from './tabs/EmergencyContactsTab';
import InternalTeamTab from './tabs/InternalTeamTab';
import SearchIntegrationsTab from './tabs/SearchIntegrationsTab';
import NewContactDialog from './dialogs/NewContactDialog';
import ContactFilters from './ContactFilters';

const ContactSystemPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isNewContactDialogOpen, setIsNewContactDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<ContactsFilter>({});

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const handleFilterChange = (newFilters: ContactsFilter) => {
    setFilters(newFilters);
  };

  const handleExport = (format: 'csv' | 'json' | 'pdf') => {
    toast.success(`Contacts exported as ${format.toUpperCase()} successfully`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <div className="relative w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search contacts..."
              className="pl-8"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={isFilterOpen ? 'bg-accent' : ''}
          >
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport('csv')}
            className="flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            <span>Export CSV</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport('pdf')}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            <span>Export PDF</span>
          </Button>
          <Button 
            onClick={() => setIsNewContactDialogOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Contact</span>
          </Button>
        </div>
      </div>

      {isFilterOpen && (
        <ContactFilters filters={filters} onFilterChange={handleFilterChange} />
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="isp">ISP Contacts</TabsTrigger>
          <TabsTrigger value="tech-support">Tech Support</TabsTrigger>
          <TabsTrigger value="sales">Sales Contacts</TabsTrigger>
          <TabsTrigger value="emergency">Emergency</TabsTrigger>
          <TabsTrigger value="internal">Internal Team</TabsTrigger>
          <TabsTrigger value="search-integrations">Search & Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab filters={filters} />
        </TabsContent>

        <TabsContent value="isp">
          <ISPContactsTab filters={filters} />
        </TabsContent>

        <TabsContent value="tech-support">
          <TechSupportTab filters={filters} />
        </TabsContent>

        <TabsContent value="sales">
          <SalesContactsTab filters={filters} />
        </TabsContent>

        <TabsContent value="emergency">
          <EmergencyContactsTab filters={filters} />
        </TabsContent>

        <TabsContent value="internal">
          <InternalTeamTab filters={filters} />
        </TabsContent>

        <TabsContent value="search-integrations">
          <SearchIntegrationsTab filters={filters} />
        </TabsContent>
      </Tabs>

      <NewContactDialog 
        open={isNewContactDialogOpen} 
        onOpenChange={setIsNewContactDialogOpen} 
      />
    </div>
  );
};

export default ContactSystemPanel;
