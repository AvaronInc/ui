
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

const Documentation = () => {
  const [selectedService, setSelectedService] = useState<string>(activeServices[0]?.id || '');

  const handleServiceChange = (value: string) => {
    setSelectedService(value);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
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
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex gap-1 items-center">
            <RefreshCw className="h-4 w-4" />
            Update Documentation
          </Button>
          <Button variant="outline" size="sm" className="flex gap-1 items-center">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="topology" className="w-full">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="topology">
            <Network className="mr-2 h-4 w-4" />
            Topology Mapping
          </TabsTrigger>
          <TabsTrigger value="api">
            <Code className="mr-2 h-4 w-4" />
            API Documentation
          </TabsTrigger>
          <TabsTrigger value="configuration">
            <FileText className="mr-2 h-4 w-4" />
            Configuration Docs
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="topology" className="p-0 border-0 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Network className="mr-2 h-5 w-5 text-primary" />
                Service Topology Mapping
              </CardTitle>
              <CardDescription>
                Visualize service dependencies and connections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TopologyMapping 
                service={activeServices.find(s => s.id === selectedService)} 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api" className="p-0 border-0 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Code className="mr-2 h-5 w-5 text-primary" />
                API Documentation
              </CardTitle>
              <CardDescription>
                Endpoint specifications and usage examples
              </CardDescription>
            </CardHeader>
            <CardContent>
              <APIDocumentation 
                service={activeServices.find(s => s.id === selectedService)} 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="configuration" className="p-0 border-0 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <FileText className="mr-2 h-5 w-5 text-primary" />
                Configuration Documentation
              </CardTitle>
              <CardDescription>
                Service configuration settings and specifications
              </CardDescription>
            </CardHeader>
            <CardContent>
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
