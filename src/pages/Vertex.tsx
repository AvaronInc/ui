import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getVertexLocations } from '@/data/vertexData';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import VertexMap from '@/components/vertex/VertexMap';
import VertexTable from '@/components/vertex/VertexTable';
import VertexDetailPanel from '@/components/vertex/VertexDetailPanel';
import VertexFilters from '@/components/vertex/VertexFilters';
import { VertexLocation, VertexFilters as VertexFilterTypes } from '@/types/vertex';
import PageTransition from '@/components/transitions/PageTransition';
import { VertexProvider } from '@/components/vertex/VertexContext';
import { Button } from '@/components/ui/button';
import { Play, RefreshCw, Calendar, FileText } from 'lucide-react';
import { toast } from 'sonner';
import AvaronVertexInfoButton from '@/components/vertex/AvaronVertexInfoButton';

const Vertex = () => {
  const [selectedVertexId, setSelectedVertexId] = React.useState<string | null>(null);
  const [filters, setFilters] = React.useState<VertexFilterTypes>({
    search: '',
    status: ['online', 'degraded', 'offline'],
    hardwareType: [],
    region: []
  });

  const { data: vertexLocations = [], isLoading, error } = useQuery({
    queryKey: ['vertexLocations'],
    queryFn: getVertexLocations
  });

  const selectedVertex = vertexLocations.find(vertex => vertex.id === selectedVertexId) || null;

  const filteredLocations = React.useMemo(() => {
    return vertexLocations.filter(location => {
      if (filters.search && !location.name.toLowerCase().includes(filters.search.toLowerCase()) && 
          !location.region.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      if (filters.status.length > 0 && !filters.status.includes(location.status)) {
        return false;
      }
      
      if (filters.hardwareType.length > 0 && !filters.hardwareType.includes(location.hardwareModel)) {
        return false;
      }
      
      if (filters.region.length > 0 && !filters.region.includes(location.region)) {
        return false;
      }
      
      return true;
    });
  }, [vertexLocations, filters]);

  const handleVertexSelect = (vertexId: string) => {
    setSelectedVertexId(vertexId);
  };

  const handleRunHealthCheck = () => {
    toast.info('Network health check initiated for all Vertex locations');
  };

  const handleGenerateReport = () => {
    toast.success('Vertex network report generated successfully');
  };

  return (
    <PageTransition>
      <VertexProvider value={{ selectedVertexId, setSelectedVertexId }}>
        <DashboardLayout>
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Vertex Management</h1>
                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                  <span>Home</span>
                  <span className="mx-2">•</span>
                  <span>Vertex Management</span>
                  {selectedVertex && (
                    <>
                      <span className="mx-2">•</span>
                      <span>{selectedVertex.name}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                <AvaronVertexInfoButton />
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

            <VertexFilters filters={filters} setFilters={setFilters} vertexLocations={vertexLocations} />

            <div className="mt-6 border rounded-lg shadow-sm h-[500px] bg-background">
              <VertexMap 
                locations={filteredLocations} 
                selectedLocation={selectedVertex}
                onSelectLocation={handleVertexSelect}
                isLoading={isLoading}
              />
            </div>

            <div className="mt-6">
              <VertexTable 
                locations={filteredLocations}
                selectedVertexId={selectedVertexId}
                onSelectVertex={handleVertexSelect}
                isLoading={isLoading}
              />
            </div>
          </div>

          {selectedVertex && (
            <VertexDetailPanel 
              vertex={selectedVertex}
              open={!!selectedVertexId}
              onClose={() => setSelectedVertexId(null)}
            />
          )}
        </DashboardLayout>
      </VertexProvider>
    </PageTransition>
  );
};

export default Vertex;
