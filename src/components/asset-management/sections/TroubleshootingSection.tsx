
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from '@/hooks/use-mobile';
import { TroubleshootingGuides, KnowledgeBase, SupportTickets } from './troubleshooting';

const TroubleshootingSection = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg font-medium">Troubleshooting & Support</h3>
      </div>
      
      <Tabs defaultValue="guides">
        <div className="overflow-x-auto">
          <TabsList className="mb-4 inline-flex min-w-max w-full sm:w-auto">
            <TabsTrigger value="guides">{isMobile ? "Guides" : "Troubleshooting Guides"}</TabsTrigger>
            <TabsTrigger value="knowledge">{isMobile ? "KB" : "Knowledge Base"}</TabsTrigger>
            <TabsTrigger value="tickets">{isMobile ? "Tickets" : "Support Tickets"}</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="guides" className="mt-0">
          <TroubleshootingGuides />
        </TabsContent>
        
        <TabsContent value="knowledge" className="mt-0">
          <KnowledgeBase />
        </TabsContent>
        
        <TabsContent value="tickets" className="mt-0">
          <SupportTickets />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TroubleshootingSection;
