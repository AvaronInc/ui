
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getNestLocations } from '@/data/nestData';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import NestMap from '@/components/nest/NestMap';
import NestTable from '@/components/nest/NestTable';
import NestDetailPanel from '@/components/nest/NestDetailPanel';
import NestFilters from '@/components/nest/NestFilters';
import { NestLocation, NestFilters as NestFilterTypes } from '@/types/nest';
import PageTransition from '@/components/transitions/PageTransition';
import { NestProvider } from '@/components/nest/NestContext';
import { Button } from '@/components/ui/button';
import { Play, RefreshCw, Calendar, FileText } from 'lucide-react';
import { toast } from 'sonner';

const Nest = () => {
  const [selectedNestId, setSelectedNestId] = React.useState<string | null>(null);
  const [filters, setFilters] = React.useState<NestFilterTypes>({
    search: '',
    status: ['online', 'degraded', 'offline'],
    hardwareType: [],
    region: []
  });

  const { data: nestLocations = [], isLoading, error } = useQuery({
    queryKey: ['nestLocations'],
    queryFn: getNestLocations
  });

  const selectedNest = nestLocations.find(nest => nest.id === selectedNestId) || null;

  const filteredLocations = React.useMemo(() => {
    return nestLocations.filter(location => {
      // Filter by search term
      if (filters.search && !location.name.toLowerCase().includes(filters.search.toLowerCase()) && 
          !location.region.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      // Filter by status
      if (filters.status.length > 0 && !filters.status.includes(location.status)) {
        return false;
      }
      
      // Filter by hardware type
      if (filters.hardwareType.length > 0 && !filters.hardwareType.includes(location.hardwareModel)) {
        return false;
      }
      
      // Filter by region
      if (filters.region.length > 0 && !filters.region.includes(location.region)) {
        return false;
      }
      
      return true;
    });
  }, [nestLocations, filters]);

  const handleNestSelect = (nestId: string) => {
    setSelectedNestId(nestId);
  };

  const handleRunHealthCheck = () => {
    toast.info('Network health check initiated for all N.E.S.T. locations');
  };

  const handleGenerateReport = () => {
    toast.success('N.E.S.T. network report generated successfully');
  };

  return (
    <PageTransition>
      <NestProvider value={{ selectedNestId, setSelectedNestId }}>
        <DashboardLayout>
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">N.E.S.T. Management</h1>
                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                  <span>Home</span>
                  <span className="mx-2">•</span>
                  <span>N.E.S.T. Management</span>
                  {selectedNest && (
                    <>
                      <span className="mx-2">•</span>
                      <span>{selectedNest.name}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex gap-2 mt-4 md:mt-0">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRunHealthCheck}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Run Health Check
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Maintenance
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleGenerateReport}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </div>

            <NestFilters filters={filters} setFilters={setFilters} nestLocations={nestLocations} />

            <div className="mt-6 border rounded-lg shadow-sm h-[500px] bg-background">
              <NestMap 
                locations={filteredLocations} 
                selectedLocation={selectedNest}
                onSelectLocation={handleNestSelect}
                isLoading={isLoading}
              />
            </div>

            <div className="mt-6">
              <NestTable 
                locations={filteredLocations}
                selectedNestId={selectedNestId}
                onSelectNest={handleNestSelect}
                isLoading={isLoading}
              />
            </div>
          </div>

          {selectedNest && (
            <NestDetailPanel 
              nest={selectedNest}
              open={!!selectedNestId}
              onClose={() => setSelectedNestId(null)}
            />
          )}
        </DashboardLayout>
      </NestProvider>
    </PageTransition>
  );
};

export default Nest;
