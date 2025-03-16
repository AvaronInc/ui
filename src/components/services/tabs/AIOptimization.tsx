
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

const AIOptimization = () => {
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
            <Zap className="h-4 w-4" />
            Run AI Analysis
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="performance">
            <Cpu className="mr-2 h-4 w-4" />
            Performance Optimization
          </TabsTrigger>
          <TabsTrigger value="healing">
            <Heart className="mr-2 h-4 w-4" />
            Auto-Healing
          </TabsTrigger>
          <TabsTrigger value="recommendations">
            <Zap className="mr-2 h-4 w-4" />
            AI Recommendations
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="p-0 border-0 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Cpu className="mr-2 h-5 w-5 text-primary" />
                AI-Powered Performance Optimization
              </CardTitle>
              <CardDescription>
                Automatically optimize resource allocation and configurations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PerformanceOptimization 
                service={activeServices.find(s => s.id === selectedService)} 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="healing" className="p-0 border-0 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Heart className="mr-2 h-5 w-5 text-primary" />
                Auto-Healing Mechanisms
              </CardTitle>
              <CardDescription>
                Self-repair configurations for service resilience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AutoHealing 
                service={activeServices.find(s => s.id === selectedService)} 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recommendations" className="p-0 border-0 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Zap className="mr-2 h-5 w-5 text-primary" />
                AI Service Recommendations
              </CardTitle>
              <CardDescription>
                Intelligent suggestions for optimizing your services
              </CardDescription>
            </CardHeader>
            <CardContent>
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
