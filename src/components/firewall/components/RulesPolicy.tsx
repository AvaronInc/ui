
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FirewallRulesTable from './rules/FirewallRulesTable';
import GeoIPBlocking from './rules/GeoIPBlocking';
import NATConfiguration from './rules/NATConfiguration';
import TrafficShaping from './rules/TrafficShaping';
import DeepPacketInspection from './rules/DeepPacketInspection';

const RulesPolicy = () => {
  const [activeTab, setActiveTab] = useState('firewall-rules');
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="firewall-rules">Firewall Rules</TabsTrigger>
          <TabsTrigger value="geo-ip">Geo-IP Blocking</TabsTrigger>
          <TabsTrigger value="nat">NAT Configuration</TabsTrigger>
          <TabsTrigger value="traffic">Traffic Shaping</TabsTrigger>
          <TabsTrigger value="dpi">Deep Packet Inspection</TabsTrigger>
        </TabsList>
        
        <TabsContent value="firewall-rules">
          <FirewallRulesTable />
        </TabsContent>
        
        <TabsContent value="geo-ip">
          <GeoIPBlocking />
        </TabsContent>
        
        <TabsContent value="nat">
          <NATConfiguration />
        </TabsContent>
        
        <TabsContent value="traffic">
          <TrafficShaping />
        </TabsContent>
        
        <TabsContent value="dpi">
          <DeepPacketInspection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RulesPolicy;
