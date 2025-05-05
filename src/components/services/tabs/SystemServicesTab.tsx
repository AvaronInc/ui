
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw, Search, Filter } from 'lucide-react';
import { SystemService, SystemServiceType, SystemServiceStatus, SystemServiceHealth } from '@/types/services';
import SystemServicesTable from '../components/system-services/SystemServicesTable';
import SystemServiceDetail from '../components/system-services/SystemServiceDetail';

// Refresh interval options in seconds
const REFRESH_INTERVALS = [
  { value: '0', label: 'Off' },
  { value: '5', label: '5s' },
  { value: '15', label: '15s' },
  { value: '30', label: '30s' }
];

const SystemServicesTab = () => {
  const [services, setServices] = useState<SystemService[]>([]);
  const [selectedService, setSelectedService] = useState<SystemService | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<SystemServiceType | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<SystemServiceStatus | 'all'>('all');
  const [healthFilter, setHealthFilter] = useState<SystemServiceHealth | 'all'>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [groupByType, setGroupByType] = useState<boolean>(false);
  const [refreshInterval, setRefreshInterval] = useState<string>('0');
  const [refreshTimerId, setRefreshTimerId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetch("/api/services")
      .then(r => { if (r.ok) { return r.json() } else { throw r.statusText } })
      .catch(r => (console.log(r), ([])))
      .then(setServices)
  }, []);
  
  // Handle selecting a service
  const handleSelectService = (service: SystemService) => {
    setSelectedService(service);
  };

  // Filter and sort services based on current filters
  const filteredServices = services.filter(service => {
    // Apply search query
    if (searchQuery && !service.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !service.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Apply type filter
    if (typeFilter !== 'all' && service.type !== typeFilter) {
      return false;
    }
    
    // Apply status filter
    if (statusFilter !== 'all' && service.status !== statusFilter) {
      return false;
    }
    
    // Apply health filter
    if (healthFilter !== 'all' && service.health !== healthFilter) {
      return false;
    }
    
    return true;
  }).sort((a, b) => {
    // Apply sorting
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'cpu':
        return b.cpuUsage - a.cpuUsage;
      case 'memory':
        return b.memoryUsage - a.memoryUsage;
      case 'lastRestart':
        return new Date(b.lastRestart).getTime() - new Date(a.lastRestart).getTime();
      default:
        return 0;
    }
  });

  // Group services by type if grouping is enabled
  const getGroupedServices = () => {
    if (!groupByType) return { 'all': filteredServices };
    
    return filteredServices.reduce((acc, service) => {
      const type = service.type;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(service);
      return acc;
    }, {} as Record<string, SystemService[]>);
  };

  // Set up auto-refresh functionality
  useEffect(() => {
    // Clear any existing timer
    if (refreshTimerId) {
      clearInterval(refreshTimerId);
      setRefreshTimerId(null);
    }
    
    // Set up new timer if refresh is enabled
    if (refreshInterval !== '0') {
      const intervalSeconds = parseInt(refreshInterval, 10);
      const timer = setInterval(() => {
        // In a real application, this would fetch fresh data
        // For the mock, we'll just update random usage values
        setServices(prevServices => 
          prevServices.map(service => ({
            ...service,
            cpuUsage: Math.floor(Math.random() * 90) + 1,
            memoryUsage: Math.floor(Math.random() * 90) + 1,
          }))
        );
      }, intervalSeconds * 1000);
      
      setRefreshTimerId(timer);
    }
    
    // Clean up timer on component unmount
    return () => {
      if (refreshTimerId) {
        clearInterval(refreshTimerId);
      }
    };
  }, [refreshInterval]);

  // Handle manual refresh
  const handleManualRefresh = () => {
    // In a real application, this would fetch fresh data
    // For the mock, we'll just update random usage values
    setServices(prevServices => 
      prevServices.map(service => ({
        ...service,
        cpuUsage: Math.floor(Math.random() * 90) + 1,
        memoryUsage: Math.floor(Math.random() * 90) + 1,
      }))
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Left Column - Service List */}
      <div className="lg:col-span-1 space-y-4">
        <Card>
          <CardContent className="p-4 space-y-4">
            {/* Search and filters */}
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search services..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={handleManualRefresh}
                title="Refresh"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Additional Filters */}
            <div className="grid grid-cols-2 gap-2">
              <Select
                value={typeFilter}
                onValueChange={(value) => setTypeFilter(value as SystemServiceType | 'all')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="vpp">VPP</SelectItem>
                  <SelectItem value="container">Container</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              
              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value as SystemServiceStatus | 'all')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="running">Running</SelectItem>
                  <SelectItem value="stopped">Stopped</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
              
              <Select
                value={healthFilter}
                onValueChange={(value) => setHealthFilter(value as SystemServiceHealth | 'all')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by health" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Health States</SelectItem>
                  <SelectItem value="ok">OK</SelectItem>
                  <SelectItem value="degraded">Degraded</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
              
              <Select
                value={sortBy}
                onValueChange={setSortBy}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="cpu">CPU Usage</SelectItem>
                  <SelectItem value="memory">Memory Usage</SelectItem>
                  <SelectItem value="lastRestart">Last Restart</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Button
                  variant={groupByType ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setGroupByType(!groupByType)}
                  className="flex items-center gap-1"
                >
                  <Filter className="h-3.5 w-3.5" />
                  Group by Type
                </Button>
              </div>
              
              <Select
                value={refreshInterval}
                onValueChange={setRefreshInterval}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Refresh" />
                </SelectTrigger>
                <SelectContent>
                  {REFRESH_INTERVALS.map((interval) => (
                    <SelectItem key={interval.value} value={interval.value}>
                      {interval.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Services Table */}
            <SystemServicesTable
              services={filteredServices}
              groupedServices={getGroupedServices()}
              grouped={groupByType}
              onSelectService={handleSelectService}
              selectedServiceId={selectedService?.id}
            />
          </CardContent>
        </Card>
      </div>
      
      {/* Right Column - Service Details */}
      <div className="lg:col-span-1">
        {selectedService ? (
          <SystemServiceDetail 
            service={selectedService} 
            onRefresh={handleManualRefresh}
          />
        ) : (
          <Card className="h-full flex items-center justify-center">
            <CardContent className="p-6 text-center text-muted-foreground">
              <p>Select a system service to view its details</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SystemServicesTab;
