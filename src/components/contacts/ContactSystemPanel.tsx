
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, Search, Filter, FileText, Save } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ContactsFilter } from '@/types/contacts';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();

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
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
        <div className="flex gap-2 sm:gap-4 items-center">
          <div className="relative w-full sm:w-80">
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

        <div className="flex mt-2 sm:mt-0 gap-2 justify-end">
          {!isMobile && (
            <>
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
            </>
          )}
          <Button 
            onClick={() => setIsNewContactDialogOpen(true)}
            className="flex items-center gap-2"
            size={isMobile ? "sm" : "default"}
          >
            <Plus className="h-4 w-4" />
            <span>{isMobile ? "Add" : "Add Contact"}</span>
          </Button>
        </div>
      </div>

      {isFilterOpen && (
        <ContactFilters filters={filters} onFilterChange={handleFilterChange} />
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="overflow-x-auto pb-2">
          <TabsList className="inline-flex min-w-max w-full sm:grid sm:grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="isp">{isMobile ? "ISP" : "ISP Contacts"}</TabsTrigger>
            <TabsTrigger value="tech-support">{isMobile ? "Tech" : "Tech Support"}</TabsTrigger>
            <TabsTrigger value="sales">{isMobile ? "Sales" : "Sales Contacts"}</TabsTrigger>
            <TabsTrigger value="emergency">{isMobile ? "Emergency" : "Emergency"}</TabsTrigger>
            <TabsTrigger value="internal">{isMobile ? "Team" : "Internal Team"}</TabsTrigger>
            <TabsTrigger value="search-integrations">{isMobile ? "Search" : "Search & Integrations"}</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="mt-4 px-1 sm:px-0">
          <OverviewTab filters={filters} />
        </TabsContent>

        <TabsContent value="isp" className="mt-4 px-1 sm:px-0">
          <ISPContactsTab filters={filters} />
        </TabsContent>

        <TabsContent value="tech-support" className="mt-4 px-1 sm:px-0">
          <TechSupportTab filters={filters} />
        </TabsContent>

        <TabsContent value="sales" className="mt-4 px-1 sm:px-0">
          <SalesContactsTab filters={filters} />
        </TabsContent>

        <TabsContent value="emergency" className="mt-4 px-1 sm:px-0">
          <EmergencyContactsTab filters={filters} />
        </TabsContent>

        <TabsContent value="internal" className="mt-4 px-1 sm:px-0">
          <InternalTeamTab filters={filters} />
        </TabsContent>

        <TabsContent value="search-integrations" className="mt-4 px-1 sm:px-0">
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
