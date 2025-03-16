
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { activeServices } from '@/data/servicesData';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Zap, Activity, Heart, Cpu } from 'lucide-react';
import PerformanceOptimization from '../components/PerformanceOptimization';
import AutoHealing from '../components/AutoHealing';
import AIRecommendations from '../components/AIRecommendations';
import { useIsMobile } from '@/hooks/use-mobile';

const AIOptimization = () => {
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
        
        <div className="flex gap-2">
          <Button variant="outline" size={isMobile ? "sm" : "default"} className="flex gap-1 items-center">
            <Zap className="h-4 w-4" />
            {isMobile ? "Run AI" : "Run AI Analysis"}
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="performance" className="w-full">
        <div className="overflow-x-auto pb-2">
          <TabsList className="inline-flex min-w-full w-full sm:grid sm:grid-cols-3">
            <TabsTrigger value="performance">
              <Cpu className="mr-1 h-4 w-4" />
              <span>{isMobile ? "Perf" : "Performance"}</span>
            </TabsTrigger>
            <TabsTrigger value="healing">
              <Heart className="mr-1 h-4 w-4" />
              <span>{isMobile ? "Auto-Heal" : "Auto-Healing"}</span>
            </TabsTrigger>
            <TabsTrigger value="recommendations">
              <Zap className="mr-1 h-4 w-4" />
              <span>{isMobile ? "AI Recs" : "AI Recommendations"}</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="performance" className="p-0 border-0 mt-4 sm:mt-6">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl flex items-center">
                <Cpu className="mr-2 h-5 w-5 text-primary" />
                AI-Powered Performance Optimization
              </CardTitle>
              <CardDescription>
                Automatically optimize resource allocation and configurations
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
              <PerformanceOptimization 
                service={activeServices.find(s => s.id === selectedService)} 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="healing" className="p-0 border-0 mt-4 sm:mt-6">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl flex items-center">
                <Heart className="mr-2 h-5 w-5 text-primary" />
                Auto-Healing Mechanisms
              </CardTitle>
              <CardDescription>
                Self-repair configurations for service resilience
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
              <AutoHealing 
                service={activeServices.find(s => s.id === selectedService)} 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recommendations" className="p-0 border-0 mt-4 sm:mt-6">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl flex items-center">
                <Zap className="mr-2 h-5 w-5 text-primary" />
                AI Service Recommendations
              </CardTitle>
              <CardDescription>
                Intelligent suggestions for optimizing your services
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
              <AIRecommendations 
                service={activeServices.find(s => s.id === selectedService)} 
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIOptimization;
