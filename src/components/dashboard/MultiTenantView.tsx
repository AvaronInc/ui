
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Server, Settings, ExternalLink, Search, RefreshCw } from 'lucide-react';

// Dummy data for companies
const dummyCompanies = [
  {
    id: '1',
    name: 'Acme Corporation',
    domain: 'acme.com',
    logo_url: undefined
  },
  {
    id: '2',
    name: 'TechSolutions Inc.',
    domain: 'techsolutions.io',
    logo_url: undefined
  },
  {
    id: '3',
    name: 'GlobalEnterprises',
    domain: 'globalenterprises.org',
    logo_url: undefined
  }
];

// Dummy data for systems
const dummySystems = [
  {
    id: '1',
    company_id: '1',
    name: 'Acme Billing System',
    description: 'Enterprise billing and invoicing platform',
    system_url: 'https://billing.acme.com',
    status: 'active'
  },
  {
    id: '2',
    company_id: '1',
    name: 'Acme CRM',
    description: 'Customer relationship management system',
    system_url: 'https://crm.acme.com',
    status: 'maintenance'
  },
  {
    id: '3',
    company_id: '2',
    name: 'TechSolutions ERP',
    description: 'Enterprise resource planning system',
    system_url: 'https://erp.techsolutions.io',
    status: 'active'
  },
  {
    id: '4',
    company_id: '2',
    name: 'TechSolutions Support Portal',
    description: 'Customer support ticketing and knowledge base',
    system_url: 'https://support.techsolutions.io',
    status: 'active'
  },
  {
    id: '5',
    company_id: '3',
    name: 'GlobalEnterprises HR System',
    description: 'Human resources management platform',
    system_url: 'https://hr.globalenterprises.org',
    status: 'degraded'
  }
];

interface Company {
  id: string;
  name: string;
  domain: string;
  logo_url?: string;
}

interface CompanySystem {
  id: string;
  company_id: string;
  name: string;
  description: string;
  system_url: string;
  status: string;
}

const MultiTenantView = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [systems, setSystems] = useState<CompanySystem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

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

  const filteredSystems = systems.filter(system => {
    // Apply company filter
    if (selectedCompany && system.company_id !== selectedCompany) {
      return false;
    }
    
    // Apply status filter
    if (statusFilter !== 'all' && system.status !== statusFilter) {
      return false;
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        system.name.toLowerCase().includes(query) ||
        system.description.toLowerCase().includes(query) ||
        getCompanyName(system.company_id).toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-bold">Multi-Tenant Dashboard</h2>
          <Badge variant="outline">Admin View</Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add System
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="systems" className="space-y-4">
        <TabsList>
          <TabsTrigger value="systems">Systems</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
        </TabsList>
        
        <TabsContent value="systems" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search systems..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {selectedCompany && (
              <Button 
                variant="ghost" 
                onClick={handleClearFilters}
                className="whitespace-nowrap"
              >
                Clear Filters
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              Array(3).fill(0).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="h-24 bg-secondary/20" />
                  <CardContent className="h-36" />
                </Card>
              ))
            ) : filteredSystems.length > 0 ? (
              filteredSystems.map((system) => (
                <Card key={system.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex justify-between items-start">
                      <span>{system.name}</span>
                      <Badge variant={system.status === 'active' ? 'default' : system.status === 'maintenance' ? 'outline' : 'destructive'}>
                        {system.status}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      {getCompanyName(system.company_id)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {system.description || 'No description available'}
                    </p>
                    <div className="flex items-center text-sm">
                      <Server className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-muted-foreground">{system.system_url}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4 flex justify-between">
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Manage
                    </Button>
                    <Button variant="default" size="sm" asChild>
                      <a href={system.system_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex justify-center items-center py-12 text-muted-foreground">
                No systems found matching your criteria
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="companies" className="space-y-4">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search companies..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              Array(3).fill(0).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="h-24 bg-secondary/20" />
                  <CardContent className="h-20" />
                </Card>
              ))
            ) : companies.length > 0 ? (
              companies
                .filter(company => 
                  searchQuery ? company.name.toLowerCase().includes(searchQuery.toLowerCase()) : true
                )
                .map((company) => {
                  const companySystemCount = systems.filter(s => s.company_id === company.id).length;
                  
                  return (
                    <Card key={company.id}>
                      <CardHeader>
                        <CardTitle>{company.name}</CardTitle>
                        <CardDescription>{company.domain || 'No domain'}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            {companySystemCount} System{companySystemCount !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-4">
                        <Button 
                          variant="outline" 
                          onClick={() => handleCompanySelect(company.id)} 
                          className="w-full"
                        >
                          View Systems
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })
            ) : (
              <div className="col-span-full flex justify-center items-center py-12 text-muted-foreground">
                No companies found
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MultiTenantView;
