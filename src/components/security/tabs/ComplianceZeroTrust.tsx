
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IntelligencePanel } from '../intelligence';

const ComplianceZeroTrust = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="intelligence" className="w-full">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="intelligence">Threat Intelligence</TabsTrigger>
          <TabsTrigger value="compliance">Compliance & Zero-Trust</TabsTrigger>
        </TabsList>
        
        <TabsContent value="intelligence" className="mt-6">
          <IntelligencePanel />
        </TabsContent>
        
        <TabsContent value="compliance" className="mt-6">
          <div className="text-center p-8 text-muted-foreground">
            Compliance & Zero-Trust dashboard content will be displayed here.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComplianceZeroTrust;
