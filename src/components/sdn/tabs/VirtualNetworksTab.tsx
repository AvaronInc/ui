
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Network, ActivitySquare, Share2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import VirtualNetworksTable from '../components/VirtualNetworksTable';
import RoutingPoliciesTable from '../components/RoutingPoliciesTable';
import WireGuardMeshConfig from '../components/WireGuardMeshConfig';

const VirtualNetworksTab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState('networks');

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Virtual Networks & Routing</h2>
        <Button>Create New Network</Button>
      </div>
      
      <Tabs defaultValue="networks" value={activeSubTab} onValueChange={setActiveSubTab}>
        <TabsList>
          <TabsTrigger value="networks" className="flex items-center gap-2">
            <Network className="h-4 w-4" />
            <span>Virtual Networks</span>
          </TabsTrigger>
          <TabsTrigger value="routing" className="flex items-center gap-2">
            <ActivitySquare className="h-4 w-4" />
            <span>Routing Policies</span>
          </TabsTrigger>
          <TabsTrigger value="wireguard" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            <span>WireGuard Mesh</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="networks" className="space-y-4">
          <Card className="p-6">
            <VirtualNetworksTable />
          </Card>
        </TabsContent>
        
        <TabsContent value="routing" className="space-y-4">
          <Card className="p-6">
            <RoutingPoliciesTable />
          </Card>
        </TabsContent>
        
        <TabsContent value="wireguard" className="space-y-4">
          <WireGuardMeshConfig />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VirtualNetworksTab;
