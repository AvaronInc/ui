
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

const SDMSPanel = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <div className="overflow-x-auto pb-2">
          <TabsList className="inline-flex min-w-full sm:grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 mb-4 sm:mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="topology">Topology</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="apps">Applications</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="custom">Custom Docs</TabsTrigger>
            <TabsTrigger value="search">Search</TabsTrigger>
            <TabsTrigger value="export">Save/Export</TabsTrigger>
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
  );
};

export default SDMSPanel;
