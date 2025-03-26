
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { activeServices } from '@/data/servicesData';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, RefreshCw, Download, Activity, Clock, Terminal } from 'lucide-react';
import ServiceStatusTable from '../components/ServiceStatusTable';
import ServiceMetricsChart from '../components/ServiceMetricsChart';
import LogViewer from '../components/LogViewer';
import { useIsMobile } from '@/hooks/use-mobile';

interface MonitoringLogsProps {
  initialServiceId?: string | null;
}

const MonitoringLogs: React.FC<MonitoringLogsProps> = ({ initialServiceId = null }) => {
  const [selectedService, setSelectedService] = useState<string>(activeServices[0]?.id || '');
  const [timeRange, setTimeRange] = useState('24h');
  const isMobile = useIsMobile();

  useEffect(() => {
    // Set the selected service if an initialServiceId is provided
    if (initialServiceId) {
      // Check if the initialServiceId exists in our services
      const serviceExists = activeServices.some(service => service.id === initialServiceId);
      if (serviceExists) {
        setSelectedService(initialServiceId);
      }
    }
  }, [initialServiceId]);

  const handleServiceChange = (value: string) => {
    setSelectedService(value);
  };
  
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={selectedService} onValueChange={handleServiceChange}>
            <SelectTrigger className="w-full sm:w-[250px]">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {activeServices.map((service) => (
                <SelectItem key={service.id} value={service.id}>
                  {service.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last hour</SelectItem>
              <SelectItem value="6h">Last 6 hours</SelectItem>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-2 justify-end">
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="status" className="w-full">
        <div className="overflow-x-auto pb-2">
          <TabsList className="inline-flex min-w-full w-full sm:grid sm:grid-cols-3">
            <TabsTrigger value="status">
              <Activity className="mr-1 h-4 w-4" />
              <span>{isMobile ? "Status" : "Status & Health"}</span>
            </TabsTrigger>
            <TabsTrigger value="metrics">
              <Clock className="mr-1 h-4 w-4" />
              <span>{isMobile ? "Metrics" : "Performance"}</span>
            </TabsTrigger>
            <TabsTrigger value="logs">
              <Terminal className="mr-1 h-4 w-4" />
              <span>{isMobile ? "Logs" : "Logs & Diagnostics"}</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="status" className="p-0 border-0 mt-4 sm:mt-6">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl flex items-center">
                <Activity className="mr-2 h-5 w-5 text-primary" />
                Service Health Status
              </CardTitle>
              <CardDescription>
                Real-time status and health checks for all services
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 sm:p-0">
              <div className="overflow-x-auto">
                <ServiceStatusTable services={activeServices} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="metrics" className="p-0 border-0 mt-4 sm:mt-6">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl flex items-center">
                <Clock className="mr-2 h-5 w-5 text-primary" />
                Performance Metrics
              </CardTitle>
              <CardDescription>
                Response time, throughput, and resource utilization metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
              <ServiceMetricsChart 
                service={activeServices.find(s => s.id === selectedService)} 
                timeRange={timeRange}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="logs" className="p-0 border-0 mt-4 sm:mt-6">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl flex items-center">
                <Terminal className="mr-2 h-5 w-5 text-primary" />
                Service Logs
              </CardTitle>
              <CardDescription>
                Detailed logs for debugging and troubleshooting
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
              <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center">
                  <Activity className="mr-2 h-5 w-5 text-amber-500" />
                  <span className="text-sm">Log analysis detected 3 potential issues</span>
                </div>
                <Button variant="outline" size="sm">AI Analysis</Button>
              </div>
              
              <LogViewer 
                serviceId={selectedService} 
                timeRange={timeRange}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MonitoringLogs;
