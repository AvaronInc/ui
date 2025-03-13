
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Server, Settings, ExternalLink, RefreshCw } from 'lucide-react';
import { CompanySystem } from './types';

interface SystemsViewProps {
  systems: CompanySystem[];
  loading: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  selectedCompany: string | null;
  getCompanyName: (companyId: string) => string;
  handleClearFilters: () => void;
}

const SystemsView: React.FC<SystemsViewProps> = ({
  systems,
  loading,
  searchQuery,
  setSearchQuery,
  statusFilter,
  selectedCompany,
  getCompanyName,
  handleClearFilters
}) => {
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
    <div className="space-y-4">
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
    </div>
  );
};

export default SystemsView;
