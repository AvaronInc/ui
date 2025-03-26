
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, Zap, BookOpenText, AlertCircle, Globe, Filter } from 'lucide-react';
import APTGroupDirectory from './APTGroupDirectory';
import AttackTechniquesMapping from './AttackTechniquesMapping';
import ExploitRepository from './ExploitRepository';
import TerminologyGlossary from './TerminologyGlossary';
import WazuhIntegration from './WazuhIntegration';
import { useIsMobile } from '@/hooks/use-mobile';
import { TooltipProvider } from '@/components/ui/tooltip';

const IntelligencePanel = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("apt-groups");
  
  return (
    <TooltipProvider>
      <div className="space-y-4 sm:space-y-6">
        <Card className="border-primary/10">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Shield className="h-5 w-5 text-primary" />
              Threat Intelligence Center
            </CardTitle>
            <CardDescription>
              Comprehensive analysis of APT groups, exploits, and threat indicators with Wazuh integration
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="apt-groups" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="border-b px-4">
                <TabsList className="w-full justify-start overflow-x-auto scrollbar-hide pb-0">
                  <TabsTrigger value="apt-groups" className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" />
                    <span>{isMobile ? "APTs" : "APT Groups"}</span>
                  </TabsTrigger>
                  <TabsTrigger value="attack-techniques" className="flex items-center gap-1.5">
                    <Globe className="h-4 w-4" />
                    <span>{isMobile ? "TTPs" : "Attack Techniques"}</span>
                  </TabsTrigger>
                  <TabsTrigger value="exploits" className="flex items-center gap-1.5">
                    <Zap className="h-4 w-4" />
                    <span>{isMobile ? "Exploits" : "Exploit Repository"}</span>
                  </TabsTrigger>
                  <TabsTrigger value="glossary" className="flex items-center gap-1.5">
                    <BookOpenText className="h-4 w-4" />
                    <span>{isMobile ? "Terms" : "Terminology"}</span>
                  </TabsTrigger>
                  <TabsTrigger value="wazuh-integration" className="flex items-center gap-1.5">
                    <AlertCircle className="h-4 w-4" />
                    <span>{isMobile ? "Alerts" : "Wazuh Alerts"}</span>
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="apt-groups" className="p-4 mt-0 focus-visible:outline-none focus-visible:ring-0">
                <APTGroupDirectory />
              </TabsContent>
              
              <TabsContent value="attack-techniques" className="p-4 mt-0 focus-visible:outline-none focus-visible:ring-0">
                <AttackTechniquesMapping />
              </TabsContent>
              
              <TabsContent value="exploits" className="p-4 mt-0 focus-visible:outline-none focus-visible:ring-0">
                <ExploitRepository />
              </TabsContent>
              
              <TabsContent value="glossary" className="p-4 mt-0 focus-visible:outline-none focus-visible:ring-0">
                <TerminologyGlossary />
              </TabsContent>
              
              <TabsContent value="wazuh-integration" className="p-4 mt-0 focus-visible:outline-none focus-visible:ring-0">
                <WazuhIntegration />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default IntelligencePanel;
