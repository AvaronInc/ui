
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServicesOverview from './tabs/ServicesOverview';
import ServiceDeployment from './tabs/ServiceDeployment';
import MonitoringLogs from './tabs/MonitoringLogs';
import SecurityCompliance from './tabs/SecurityCompliance';
import AIOptimization from './tabs/AIOptimization';
import Documentation from './tabs/Documentation';
import RCATab from './tabs/RCATab';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/components/ui/use-toast';

interface ServicesPanelProps {
  initialTab?: string | null;
  initialServiceId?: string | null;
}

const ServicesPanel: React.FC<ServicesPanelProps> = ({ 
  initialTab = null, 
  initialServiceId = null 
}) => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(initialServiceId);
  const { toast } = useToast();
  
  useEffect(() => {
    // Set initial tab if provided
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  useEffect(() => {
    // Set selected service if provided
    if (initialServiceId) {
      setSelectedServiceId(initialServiceId);
      // If we have a service ID but not on monitoring tab, switch to monitoring
      if (activeTab !== "monitoring") {
        setActiveTab("monitoring");
        toast({
          title: "Service Selected",
          description: "Switched to monitoring tab to view service details",
          duration: 3000,
        });
      }
    }
  }, [initialServiceId, activeTab, toast]);

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="overflow-x-auto pb-2">
          <TabsList className="inline-flex min-w-full sm:grid sm:grid-cols-3 md:grid-cols-7 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="deployment">{isMobile ? 'Deploy' : 'Deployment'}</TabsTrigger>
            <TabsTrigger value="monitoring">{isMobile ? 'Monitor' : 'Monitoring'}</TabsTrigger>
            <TabsTrigger value="security">{isMobile ? 'Security' : 'Security'}</TabsTrigger>
            <TabsTrigger value="optimization">{isMobile ? 'AI' : 'AI Optimization'}</TabsTrigger>
            <TabsTrigger value="documentation">{isMobile ? 'Docs' : 'Documentation'}</TabsTrigger>
            <TabsTrigger value="rca">{isMobile ? 'RCA' : 'RCA'}</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="p-0 border-0">
          <ServicesOverview />
        </TabsContent>

        <TabsContent value="deployment" className="p-0 border-0">
          <ServiceDeployment />
        </TabsContent>

        <TabsContent value="monitoring" className="p-0 border-0">
          <MonitoringLogs initialServiceId={selectedServiceId} />
        </TabsContent>

        <TabsContent value="security" className="p-0 border-0">
          <SecurityCompliance />
        </TabsContent>

        <TabsContent value="optimization" className="p-0 border-0">
          <AIOptimization />
        </TabsContent>

        <TabsContent value="documentation" className="p-0 border-0">
          <Documentation />
        </TabsContent>

        <TabsContent value="rca" className="p-0 border-0">
          <RCATab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ServicesPanel;
