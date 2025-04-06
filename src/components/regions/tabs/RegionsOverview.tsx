
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockRegions, mockZones, mockConnections } from '../data/mockData';
import { Globe, Server, Wifi, Activity } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useIsMobile } from '@/hooks/use-mobile';

const RegionsOverview = () => {
  const isMobile = useIsMobile();
  // Calculate some summary metrics
  const totalRegions = mockRegions.length;
  const activeRegions = mockRegions.filter(r => r.status === 'active').length;
  const totalZones = mockZones.length;
  const activeZones = mockZones.filter(z => z.status === 'active').length;
  const healthyConnections = mockConnections.filter(c => c.status === 'active').length;

  const avgCpuUtilization = Math.round(
    mockRegions.reduce((sum, region) => sum + region.metrics.cpuUtilization, 0) / totalRegions
  );
  
  const avgMemoryUtilization = Math.round(
    mockRegions.reduce((sum, region) => sum + region.metrics.memoryUtilization, 0) / totalRegions
  );
  
  const avgNetworkUtilization = Math.round(
    mockRegions.reduce((sum, region) => sum + region.metrics.networkUtilization, 0) / totalRegions
  );
  
  const avgAvailability = parseFloat(
    (mockRegions.reduce((sum, region) => sum + region.metrics.availability, 0) / totalRegions).toFixed(2)
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        <Card>
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="flex items-center text-sm sm:text-lg">
              <Globe className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              Regions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-3xl font-bold">{totalRegions}</div>
            <div className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">
              <span className="text-green-500 font-medium">{activeRegions} Active</span>
              {activeRegions < totalRegions && (
                <span className="text-yellow-500 font-medium ml-1 sm:ml-2">
                  {totalRegions - activeRegions} Degraded
                </span>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="flex items-center text-sm sm:text-lg">
              <Server className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              Zones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-3xl font-bold">{totalZones}</div>
            <div className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">
              <span className="text-green-500 font-medium">{activeZones} Active</span>
              {activeZones < totalZones && (
                <span className="text-yellow-500 font-medium ml-1 sm:ml-2">
                  {totalZones - activeZones} Non-Active
                </span>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="flex items-center text-sm sm:text-lg">
              <Wifi className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              Connections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-3xl font-bold">{mockConnections.length}</div>
            <div className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">
              <span className="text-green-500 font-medium">{healthyConnections} Healthy</span>
              {healthyConnections < mockConnections.length && (
                <span className="text-yellow-500 font-medium ml-1 sm:ml-2">
                  {mockConnections.length - healthyConnections} Issues
                </span>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="flex items-center text-sm sm:text-lg">
              <Activity className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              Availability
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-3xl font-bold">{avgAvailability}%</div>
            <div className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">
              Across all regions
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resource Utilization */}
      <Card>
        <CardHeader className={isMobile ? "pb-2 pt-3 px-3" : undefined}>
          <CardTitle className="text-base sm:text-lg">Resource Utilization</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Average utilization across all regions
          </CardDescription>
        </CardHeader>
        <CardContent className={isMobile ? "px-3 pb-3" : undefined}>
          <div className="space-y-3 sm:space-y-4">
            <div className="space-y-1 sm:space-y-2">
              <div className="flex justify-between text-xs sm:text-sm">
                <span>CPU</span>
                <span>{avgCpuUtilization}%</span>
              </div>
              <Progress value={avgCpuUtilization} className="h-1.5 sm:h-2" />
            </div>
            
            <div className="space-y-1 sm:space-y-2">
              <div className="flex justify-between text-xs sm:text-sm">
                <span>Memory</span>
                <span>{avgMemoryUtilization}%</span>
              </div>
              <Progress value={avgMemoryUtilization} className="h-1.5 sm:h-2" />
            </div>
            
            <div className="space-y-1 sm:space-y-2">
              <div className="flex justify-between text-xs sm:text-sm">
                <span>Network</span>
                <span>{avgNetworkUtilization}%</span>
              </div>
              <Progress value={avgNetworkUtilization} className="h-1.5 sm:h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Regions List */}
      <Card>
        <CardHeader className={isMobile ? "pb-2 pt-3 px-3" : undefined}>
          <CardTitle className="text-base sm:text-lg">Region Status</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Current status of all regions
          </CardDescription>
        </CardHeader>
        <CardContent className={isMobile ? "px-3 pb-3" : undefined}>
          <div className="space-y-1.5 sm:space-y-2">
            {mockRegions.map(region => (
              <div 
                key={region.id} 
                className="flex justify-between items-center p-2 sm:p-3 border rounded-md hover:bg-muted/50 transition-colors"
              >
                <div>
                  <h4 className="font-medium text-sm sm:text-base">{region.name}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">{region.location.address}</p>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    {region.zones.length} zones
                  </div>
                  <Badge className={
                    region.status === 'active' 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : region.status === 'degraded'
                      ? 'bg-yellow-500 hover:bg-yellow-600'
                      : 'bg-red-500 hover:bg-red-600'
                  }>
                    {region.status.charAt(0).toUpperCase() + region.status.slice(1)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegionsOverview;
