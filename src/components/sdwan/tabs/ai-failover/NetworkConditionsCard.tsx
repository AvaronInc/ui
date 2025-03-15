
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Activity } from 'lucide-react';
import { NetworkConditionsProps } from './interfaces';

const NetworkConditionsCard = ({ 
  networkConditions, 
  onNetworkConditionChange 
}: NetworkConditionsProps) => {
  const handleInputChange = (key: keyof typeof networkConditions, value: number) => {
    onNetworkConditionChange(key, value);
  };

  const handleSwitchChange = (key: keyof typeof networkConditions, checked: boolean) => {
    onNetworkConditionChange(key, checked);
  };

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
            <Input 
              id="latency" 
              type="number" 
              value={networkConditions.latencyThreshold} 
              onChange={(e) => handleInputChange('latencyThreshold', Number(e.target.value))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="packet-loss">Packet Loss (%)</Label>
            <Input 
              id="packet-loss" 
              type="number" 
              value={networkConditions.packetLossThreshold} 
              onChange={(e) => handleInputChange('packetLossThreshold', Number(e.target.value))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="jitter">Jitter (ms)</Label>
            <Input 
              id="jitter" 
              type="number" 
              value={networkConditions.jitterThreshold} 
              onChange={(e) => handleInputChange('jitterThreshold', Number(e.target.value))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="failures">Connection Failures (in 5 min)</Label>
            <Input 
              id="failures" 
              type="number" 
              value={networkConditions.connectionDownThreshold.count} 
              onChange={(e) => onNetworkConditionChange('connectionDownThreshold', {
                ...networkConditions.connectionDownThreshold,
                count: Number(e.target.value)
              })}
            />
          </div>
        </div>
        
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="bgp-detection">ISP-Level Routing Issues (BGP detection)</Label>
            <Switch 
              id="bgp-detection" 
              checked={networkConditions.detectBGPIssues}
              onCheckedChange={(checked) => handleSwitchChange('detectBGPIssues', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="ddos-response">DDoS Attack Response (AI mitigation)</Label>
            <Switch 
              id="ddos-response" 
              checked={networkConditions.ddosResponseEnabled}
              onCheckedChange={(checked) => handleSwitchChange('ddosResponseEnabled', checked)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkConditionsCard;
