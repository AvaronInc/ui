
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockRegions, mockZones, mockConnections } from '../data/mockData';
import { Globe, Server, Wifi, Activity } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const RegionsOverview = () => {
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
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Globe className="mr-2 h-5 w-5 text-primary" />
              Regions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalRegions}</div>
            <div className="text-sm text-muted-foreground mt-1">
              <span className="text-green-500 font-medium">{activeRegions} Active</span>
              {activeRegions < totalRegions && (
                <span className="text-yellow-500 font-medium ml-2">
                  {totalRegions - activeRegions} Degraded
                </span>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Server className="mr-2 h-5 w-5 text-primary" />
              Zones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalZones}</div>
            <div className="text-sm text-muted-foreground mt-1">
              <span className="text-green-500 font-medium">{activeZones} Active</span>
              {activeZones < totalZones && (
                <span className="text-yellow-500 font-medium ml-2">
                  {totalZones - activeZones} Non-Active
                </span>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Wifi className="mr-2 h-5 w-5 text-primary" />
              Connections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mockConnections.length}</div>
            <div className="text-sm text-muted-foreground mt-1">
              <span className="text-green-500 font-medium">{healthyConnections} Healthy</span>
              {healthyConnections < mockConnections.length && (
                <span className="text-yellow-500 font-medium ml-2">
                  {mockConnections.length - healthyConnections} Issues
                </span>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Activity className="mr-2 h-5 w-5 text-primary" />
              Availability
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{avgAvailability}%</div>
            <div className="text-sm text-muted-foreground mt-1">
              Across all regions
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resource Utilization */}
      <Card>
        <CardHeader>
          <CardTitle>Resource Utilization</CardTitle>
          <CardDescription>
            Average utilization across all regions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>CPU</span>
                <span>{avgCpuUtilization}%</span>
              </div>
              <Progress value={avgCpuUtilization} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Memory</span>
                <span>{avgMemoryUtilization}%</span>
              </div>
              <Progress value={avgMemoryUtilization} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Network</span>
                <span>{avgNetworkUtilization}%</span>
              </div>
              <Progress value={avgNetworkUtilization} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Regions List */}
      <Card>
        <CardHeader>
          <CardTitle>Region Status</CardTitle>
          <CardDescription>
            Current status of all regions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mockRegions.map(region => (
              <div 
                key={region.id} 
                className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/50 transition-colors"
              >
                <div>
                  <h4 className="font-medium">{region.name}</h4>
                  <p className="text-sm text-muted-foreground">{region.location.address}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-sm text-muted-foreground">
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
