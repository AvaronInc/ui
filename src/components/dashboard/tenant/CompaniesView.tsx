
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Company } from './types';

interface CompaniesViewProps {
  companies: Company[];
  systems: any[];
  loading: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleCompanySelect: (companyId: string) => void;
}

const CompaniesView: React.FC<CompaniesViewProps> = ({
  companies,
  systems,
  loading,
  searchQuery,
  setSearchQuery,
  handleCompanySelect
}) => {
  const filteredCompanies = companies.filter(company => 
    searchQuery ? company.name.toLowerCase().includes(searchQuery.toLowerCase()) : true
  );

  return (
    <div className="space-y-4">
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
        ) : filteredCompanies.length > 0 ? (
          filteredCompanies.map((company) => {
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
    </div>
  );
};

export default CompaniesView;
