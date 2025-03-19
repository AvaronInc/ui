
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NetworkOverview from './NetworkOverview';
import NetworkTopology from './NetworkTopology';
import SecurityDocumentation from './SecurityDocumentation';
import ApplicationDocumentation from './ApplicationDocumentation';
import ComplianceReports from './ComplianceReports';
import CustomDocumentation from './CustomDocumentation';
import SDMSSearch from './SDMSSearch';
import SaveExport from './SaveExport';
import { useIsMobile } from '@/hooks/use-mobile';
import { SafeTooltipWrapper } from '@/components/ui/tooltip';

const SDMSPanel = () => {
  const isMobile = useIsMobile();
  
  return (
    <SafeTooltipWrapper>
      <div className="space-y-4 sm:space-y-6">
        <Tabs defaultValue="overview" className="w-full">
          <div className="overflow-x-auto pb-2">
            <TabsList className="inline-flex min-w-full sm:grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 mb-4 sm:mb-6">
              <TabsTrigger value="overview">{isMobile ? 'Overview' : 'Overview'}</TabsTrigger>
              <TabsTrigger value="topology">{isMobile ? 'Topology' : 'Topology'}</TabsTrigger>
              <TabsTrigger value="security">{isMobile ? 'Security' : 'Security'}</TabsTrigger>
              <TabsTrigger value="apps">{isMobile ? 'Apps' : 'Applications'}</TabsTrigger>
              <TabsTrigger value="compliance">{isMobile ? 'Comply' : 'Compliance'}</TabsTrigger>
              <TabsTrigger value="custom">{isMobile ? 'Custom' : 'Custom Docs'}</TabsTrigger>
              <TabsTrigger value="search">{isMobile ? 'Search' : 'Search'}</TabsTrigger>
              <TabsTrigger value="export">{isMobile ? 'Export' : 'Save/Export'}</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="overview" className="mt-0">
            <NetworkOverview />
          </TabsContent>
          
          <TabsContent value="topology" className="mt-0">
            <NetworkTopology />
          </TabsContent>
          
          <TabsContent value="security" className="mt-0">
            <SecurityDocumentation />
          </TabsContent>
          
          <TabsContent value="apps" className="mt-0">
            <ApplicationDocumentation />
          </TabsContent>
          
          <TabsContent value="compliance" className="mt-0">
            <ComplianceReports />
          </TabsContent>
          
          <TabsContent value="custom" className="mt-0">
            <CustomDocumentation />
          </TabsContent>
          
          <TabsContent value="search" className="mt-0">
            <SDMSSearch />
          </TabsContent>
          
          <TabsContent value="export" className="mt-0">
            <SaveExport />
          </TabsContent>
        </Tabs>
      </div>
    </SafeTooltipWrapper>
  );
};

export default SDMSPanel;
