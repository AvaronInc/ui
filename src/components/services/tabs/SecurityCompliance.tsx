
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { activeServices } from '@/data/servicesData';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Lock, FileText, AlertOctagon, RefreshCw } from 'lucide-react';
import SecurityOverview from '../components/SecurityOverview';
import TLSCertificates from '../components/TLSCertificates';
import ComplianceAudit from '../components/ComplianceAudit';
import { useIsMobile } from '@/hooks/use-mobile';

const SecurityCompliance = () => {
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
            {isMobile ? "Scan" : "Run Security Scan"}
          </Button>
          <Button variant="outline" size={isMobile ? "sm" : "default"} className="flex gap-1 items-center">
            <Shield className="h-4 w-4" />
            {isMobile ? "Patch" : "Auto-Patch"}
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <div className="overflow-x-auto pb-2">
          <TabsList className="inline-flex min-w-full w-full sm:grid sm:grid-cols-3">
            <TabsTrigger value="overview">
              <Shield className="mr-2 h-4 w-4" />
              <span>{isMobile ? "Overview" : "Security Overview"}</span>
            </TabsTrigger>
            <TabsTrigger value="certificates">
              <Lock className="mr-2 h-4 w-4" />
              <span>{isMobile ? "TLS/SSL" : "TLS/SSL Management"}</span>
            </TabsTrigger>
            <TabsTrigger value="compliance">
              <FileText className="mr-2 h-4 w-4" />
              <span>{isMobile ? "Compliance" : "Compliance & Auditing"}</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="overview" className="p-0 border-0 mt-4 sm:mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Shield className="mr-2 h-5 w-5 text-primary" />
                Security Overview
              </CardTitle>
              <CardDescription>
                Security status, threats, and vulnerabilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SecurityOverview 
                service={activeServices.find(s => s.id === selectedService)} 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="certificates" className="p-0 border-0 mt-4 sm:mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Lock className="mr-2 h-5 w-5 text-primary" />
                TLS/SSL Certificates Management
              </CardTitle>
              <CardDescription>
                Manage encryption certificates and configurations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TLSCertificates 
                service={activeServices.find(s => s.id === selectedService)} 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="compliance" className="p-0 border-0 mt-4 sm:mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <FileText className="mr-2 h-5 w-5 text-primary" />
                Compliance & Auditing
              </CardTitle>
              <CardDescription>
                Compliance status, audit logs, and regulatory reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ComplianceAudit 
                service={activeServices.find(s => s.id === selectedService)} 
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityCompliance;
