
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { serviceTypeConfigs } from '@/data/servicesData';
import { Database, Globe, Server, Layers, Box } from 'lucide-react';
import ServiceTypeCard from '../components/ServiceTypeCard';
import DeploymentForm from '../forms/DeploymentForm';
import { ServiceType } from '@/types/services';

const ServiceDeployment = () => {
  const [selectedServiceType, setSelectedServiceType] = useState<ServiceType | null>(null);
  
  // Map of service type to icon component
  const serviceIcons = {
    dns: <Globe className="h-10 w-10 text-primary" />,
    web: <Globe className="h-10 w-10 text-primary" />,
    api: <Server className="h-10 w-10 text-primary" />,
    load_balancer: <Layers className="h-10 w-10 text-primary" />,
    database: <Database className="h-10 w-10 text-primary" />,
    custom: <Box className="h-10 w-10 text-primary" />,
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="select" className="w-full">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="select">1. Select Service Type</TabsTrigger>
          <TabsTrigger value="configure" disabled={!selectedServiceType}>2. Configure Deployment</TabsTrigger>
        </TabsList>
        
        <TabsContent value="select" className="p-0 border-0 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Service Selection</CardTitle>
              <CardDescription>
                Choose the type of service you would like to deploy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {serviceTypeConfigs.map((config) => (
                  <ServiceTypeCard
                    key={config.type}
                    title={config.name}
                    description={config.description}
                    icon={serviceIcons[config.type]}
                    technologies={config.technologies}
                    onClick={() => setSelectedServiceType(config.type)}
                    selected={selectedServiceType === config.type}
                  />
                ))}
              </div>
              
              {selectedServiceType && (
                <div className="mt-6 flex justify-end">
                  <Button onClick={() => document.querySelector('[data-value="configure"]')?.click()}>
                    Continue to Configuration
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="configure" className="p-0 border-0 mt-6">
          {selectedServiceType && (
            <DeploymentForm 
              serviceType={selectedServiceType} 
              onBack={() => document.querySelector('[data-value="select"]')?.click()}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ServiceDeployment;
