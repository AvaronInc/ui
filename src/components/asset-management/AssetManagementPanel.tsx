
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AssetOverviewSection from './sections/AssetOverviewSection';
import AssetTrackingSection from './sections/AssetTrackingSection';
import DataCenterSection from './sections/DataCenterSection';
import WarrantySection from './sections/WarrantySection';
import LifecycleSection from './sections/LifecycleSection';
import TroubleshootingSection from './sections/TroubleshootingSection';
import SearchExportSection from './sections/SearchExportSection';

const AssetManagementPanel = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-7 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tracking">Asset Tracking</TabsTrigger>
          <TabsTrigger value="datacenter">Data Centers</TabsTrigger>
          <TabsTrigger value="warranty">Warranty & Licensing</TabsTrigger>
          <TabsTrigger value="lifecycle">Lifecycle</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
          <TabsTrigger value="search">Search & Export</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-0">
          <AssetOverviewSection />
        </TabsContent>
        
        <TabsContent value="tracking" className="mt-0">
          <AssetTrackingSection />
        </TabsContent>
        
        <TabsContent value="datacenter" className="mt-0">
          <DataCenterSection />
        </TabsContent>
        
        <TabsContent value="warranty" className="mt-0">
          <WarrantySection />
        </TabsContent>
        
        <TabsContent value="lifecycle" className="mt-0">
          <LifecycleSection />
        </TabsContent>
        
        <TabsContent value="support" className="mt-0">
          <TroubleshootingSection />
        </TabsContent>
        
        <TabsContent value="search" className="mt-0">
          <SearchExportSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AssetManagementPanel;
