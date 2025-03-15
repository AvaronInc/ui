
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Activity } from 'lucide-react';

const NetworkConditionsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="mr-2 h-5 w-5" />
          Network Conditions for Failover Decisions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="latency">Latency Degradation (ms)</Label>
            <Input id="latency" type="number" defaultValue="100" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="packet-loss">Packet Loss (%)</Label>
            <Input id="packet-loss" type="number" defaultValue="5" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="jitter">Jitter (ms)</Label>
            <Input id="jitter" type="number" defaultValue="30" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="failures">Connection Failures (in 5 min)</Label>
            <Input id="failures" type="number" defaultValue="3" />
          </div>
        </div>
        
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="bgp-detection">ISP-Level Routing Issues (BGP detection)</Label>
            <Switch id="bgp-detection" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="ddos-response">DDoS Attack Response (AI mitigation)</Label>
            <Switch id="ddos-response" defaultChecked />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkConditionsCard;
