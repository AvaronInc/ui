
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { activeServices } from '@/data/servicesData';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Network, Download, Code, RefreshCw } from 'lucide-react';
import TopologyMapping from '../components/TopologyMapping';
import APIDocumentation from '../components/APIDocumentation';
import ConfigurationDocs from '../components/ConfigurationDocs';
import { useIsMobile } from '@/hooks/use-mobile';

const Documentation = () => {
  const [selectedService, setSelectedService] = useState<string>(activeServices[0]?.id || '');
  const isMobile = useIsMobile();

  const handleServiceChange = (value: string) => {
    setSelectedService(value);
  };
  
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <Select value={selectedService} onValueChange={handleServiceChange}>
          <SelectTrigger className="w-full md:w-[250px]">
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
        
        <div className="flex gap-2 flex-wrap justify-end">
          <Button variant="outline" size={isMobile ? "sm" : "default"} className="flex gap-1 items-center">
            <RefreshCw className="h-4 w-4" />
            {isMobile ? "Update" : "Update Docs"}
          </Button>
          <Button variant="outline" size={isMobile ? "sm" : "default"} className="flex gap-1 items-center">
            <Download className="h-4 w-4" />
            {isMobile ? "Export" : "Export"}
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="topology" className="w-full">
        <div className="overflow-x-auto pb-2">
          <TabsList className="inline-flex min-w-full w-full sm:grid sm:grid-cols-3">
            <TabsTrigger value="topology">
              <Network className="mr-1 h-4 w-4" />
              <span>{isMobile ? "Topology" : "Topology Map"}</span>
            </TabsTrigger>
            <TabsTrigger value="api">
              <Code className="mr-1 h-4 w-4" />
              <span>{isMobile ? "API" : "API Docs"}</span>
            </TabsTrigger>
            <TabsTrigger value="configuration">
              <FileText className="mr-1 h-4 w-4" />
              <span>{isMobile ? "Config" : "Configuration"}</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="topology" className="p-0 border-0 mt-4 sm:mt-6">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl flex items-center">
                <Network className="mr-2 h-5 w-5 text-primary" />
                Service Topology Mapping
              </CardTitle>
              <CardDescription>
                Visualize service dependencies and connections
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
              <TopologyMapping 
                service={activeServices.find(s => s.id === selectedService)} 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api" className="p-0 border-0 mt-4 sm:mt-6">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl flex items-center">
                <Code className="mr-2 h-5 w-5 text-primary" />
                API Documentation
              </CardTitle>
              <CardDescription>
                Endpoint specifications and usage examples
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
              <APIDocumentation 
                service={activeServices.find(s => s.id === selectedService)} 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="configuration" className="p-0 border-0 mt-4 sm:mt-6">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl flex items-center">
                <FileText className="mr-2 h-5 w-5 text-primary" />
                Configuration Documentation
              </CardTitle>
              <CardDescription>
                Service configuration settings and specifications
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
              <ConfigurationDocs 
                service={activeServices.find(s => s.id === selectedService)} 
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Documentation;
