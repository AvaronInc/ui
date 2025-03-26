
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IntelligencePanel } from '../intelligence';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

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
          <div className="space-y-6">
            <div className="text-center p-8 text-muted-foreground">
              Compliance & Zero-Trust dashboard content will be displayed here.
            </div>
            
            <div className="flex justify-center">
              <Button className="flex items-center gap-2" asChild>
                <a href="https://docs.avaron.com/compliance" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  <span>View Compliance Documentation</span>
                </a>
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComplianceZeroTrust;
