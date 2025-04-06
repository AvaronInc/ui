
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import RegionsOverview from './tabs/RegionsOverview';
import RegionManagement from './tabs/RegionManagement';
import ZoneManagement from './tabs/ZoneManagement';
import SDWANConnectivity from './tabs/SDWANConnectivity';
import NetworkPolicies from './tabs/NetworkPolicies';
import AutomationBuilder from './tabs/AutomationBuilder';

const RegionsPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container py-6">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Regions & Zones Management</h1>
        </div>

        <Card>
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-6 mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="region-management">Region Management</TabsTrigger>
                <TabsTrigger value="zone-management">Zone Management</TabsTrigger>
                <TabsTrigger value="sdwan">SD-WAN Connectivity</TabsTrigger>
                <TabsTrigger value="policies">Network Policies</TabsTrigger>
                <TabsTrigger value="automation">Automation Builder</TabsTrigger>
              </TabsList>

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
