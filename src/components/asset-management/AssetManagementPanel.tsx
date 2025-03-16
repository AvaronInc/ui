
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AssetOverviewSection from './sections/AssetOverviewSection';
import AssetTrackingSection from './sections/AssetTrackingSection';
import DataCenterSection from './sections/DataCenterSection';
import WarrantySection from './sections/WarrantySection';
import LifecycleSection from './sections/LifecycleSection';
import TroubleshootingSection from './sections/TroubleshootingSection';
import SearchExportSection from './sections/SearchExportSection';
import { useIsMobile } from '@/hooks/use-mobile';

const AssetManagementPanel = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <div className="overflow-x-auto pb-2">
          <TabsList className="inline-flex min-w-full sm:grid sm:grid-cols-3 md:grid-cols-7 mb-4">
            <TabsTrigger value="overview">{isMobile ? 'Overview' : 'Overview'}</TabsTrigger>
            <TabsTrigger value="tracking">{isMobile ? 'Assets' : 'Asset Tracking'}</TabsTrigger>
            <TabsTrigger value="datacenter">{isMobile ? 'DC' : 'Data Centers'}</TabsTrigger>
            <TabsTrigger value="warranty">{isMobile ? 'Warranty' : 'Warranty & Licensing'}</TabsTrigger>
            <TabsTrigger value="lifecycle">{isMobile ? 'Lifecycle' : 'Lifecycle'}</TabsTrigger>
            <TabsTrigger value="support">{isMobile ? 'Support' : 'Support'}</TabsTrigger>
            <TabsTrigger value="search">{isMobile ? 'Search' : 'Search & Export'}</TabsTrigger>
          </TabsList>
        </div>
        
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
