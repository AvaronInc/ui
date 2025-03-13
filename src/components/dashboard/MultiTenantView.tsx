
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import TenantHeader from './tenant/TenantHeader';
import SystemsView from './tenant/SystemsView';
import CompaniesView from './tenant/CompaniesView';
import { Company, CompanySystem, dummyCompanies, dummySystems } from './tenant/types';

const MultiTenantView = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [systems, setSystems] = useState<CompanySystem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API call with dummy data
    setLoading(true);
    // Simulate a network request
    const timer = setTimeout(() => {
      setCompanies(dummyCompanies);
      setSystems(dummySystems);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const getCompanyName = (companyId: string) => {
    const company = companies.find(c => c.id === companyId);
    return company ? company.name : 'Unknown Company';
  };

  const handleRefresh = () => {
    setLoading(true);
    // Simulate a refresh
    setTimeout(() => {
      setCompanies(dummyCompanies);
      setSystems(dummySystems);
      setLoading(false);
      toast({
        title: 'Refreshed',
        description: 'Data has been refreshed',
      });
    }, 1000);
  };

  const handleCompanySelect = (companyId: string) => {
    setSelectedCompany(companyId);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setSelectedCompany(null);
  };

  return (
    <div className="space-y-6">
      <TenantHeader handleRefresh={handleRefresh} />
      
      <Tabs defaultValue="systems" className="space-y-4">
        <TabsList>
          <TabsTrigger value="systems">Systems</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
        </TabsList>
        
        <TabsContent value="systems" className="space-y-4">
          <SystemsView 
            systems={systems}
            loading={loading}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            selectedCompany={selectedCompany}
            getCompanyName={getCompanyName}
            handleClearFilters={handleClearFilters}
          />
        </TabsContent>
        
        <TabsContent value="companies" className="space-y-4">
          <CompaniesView 
            companies={companies}
            systems={systems}
            loading={loading}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleCompanySelect={handleCompanySelect}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MultiTenantView;
