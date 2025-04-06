
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import RegionsOverview from './tabs/RegionsOverview';
import RegionManagement from './tabs/RegionManagement';
import ZoneManagement from './tabs/ZoneManagement';
import SDWANConnectivity from './tabs/SDWANConnectivity';
import NetworkPolicies from './tabs/NetworkPolicies';
import AutomationBuilder from './tabs/AutomationBuilder';
import { useIsMobile } from '@/hooks/use-mobile';

const RegionsPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const isMobile = useIsMobile();

  return (
    <div className="container py-4 sm:py-6">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold">
            {isMobile ? "Regions & Zones" : "Regions & Zones Management"}
          </h1>
        </div>

        <Card>
          <CardContent className="p-3 sm:p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="overflow-x-auto pb-2 -mx-3 px-3">
                <TabsList className={`${isMobile ? 'grid-cols-3' : 'grid-cols-6'} mb-4 min-w-max`}>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="region-management">
                    {isMobile ? "Regions" : "Region Management"}
                  </TabsTrigger>
                  <TabsTrigger value="zone-management">
                    {isMobile ? "Zones" : "Zone Management"}
                  </TabsTrigger>
                  <TabsTrigger value="sdwan">
                    {isMobile ? "SD-WAN" : "SD-WAN Connectivity"}
                  </TabsTrigger>
                  <TabsTrigger value="policies">
                    {isMobile ? "Policies" : "Network Policies"}
                  </TabsTrigger>
                  <TabsTrigger value="automation">
                    {isMobile ? "Automate" : "Automation Builder"}
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="overview" className="p-0 border-0">
                <RegionsOverview />
              </TabsContent>
              
              <TabsContent value="region-management" className="p-0 border-0">
                <RegionManagement />
              </TabsContent>
              
              <TabsContent value="zone-management" className="p-0 border-0">
                <ZoneManagement />
              </TabsContent>
              
              <TabsContent value="sdwan" className="p-0 border-0">
                <SDWANConnectivity />
              </TabsContent>
              
              <TabsContent value="policies" className="p-0 border-0">
                <NetworkPolicies />
              </TabsContent>
              
              <TabsContent value="automation" className="p-0 border-0">
                <AutomationBuilder />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegionsPanel;
