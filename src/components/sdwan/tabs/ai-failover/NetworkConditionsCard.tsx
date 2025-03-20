
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Activity } from 'lucide-react';
import { NetworkConditionsProps } from './interfaces';

const NetworkConditionsCard = ({ 
  networkConditions, 
  onNetworkConditionChange 
}: NetworkConditionsProps) => {
  const handleSliderChange = (key: string, value: number[]) => {
    onNetworkConditionChange(key as keyof typeof networkConditions, value[0]);
  };

  const handleSwitchToggle = (key: string) => {
    onNetworkConditionChange(
      key as keyof typeof networkConditions, 
      !networkConditions[key as keyof typeof networkConditions]
    );
  };

  const handleCountChange = (value: string) => {
    onNetworkConditionChange('connectionDownThreshold', {
      ...networkConditions.connectionDownThreshold,
      count: parseInt(value, 10) || 0
    });
  };

  const handleTimeWindowChange = (value: string) => {
    onNetworkConditionChange('connectionDownThreshold', {
      ...networkConditions.connectionDownThreshold,
      timeWindow: parseInt(value, 10) || 0
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="mr-2 h-5 w-5" />
          Network Condition Thresholds
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Latency Threshold (ms)</Label>
              <span className="text-sm font-semibold">{networkConditions.latencyThreshold} ms</span>
            </div>
            <Slider 
              min={10} 
              max={200} 
              step={5}
              value={[networkConditions.latencyThreshold]}
              onValueChange={(value) => handleSliderChange('latencyThreshold', value)}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Packet Loss Threshold (%)</Label>
              <span className="text-sm font-semibold">{networkConditions.packetLossThreshold}%</span>
            </div>
            <Slider 
              min={0.1} 
              max={10} 
              step={0.1}
              value={[networkConditions.packetLossThreshold]}
              onValueChange={(value) => handleSliderChange('packetLossThreshold', value)}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Jitter Threshold (ms)</Label>
              <span className="text-sm font-semibold">{networkConditions.jitterThreshold} ms</span>
            </div>
            <Slider 
              min={1} 
              max={50} 
              step={1}
              value={[networkConditions.jitterThreshold]}
              onValueChange={(value) => handleSliderChange('jitterThreshold', value)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Connection Down Count</Label>
              <Input
                type="number"
                min={1}
                max={10}
                value={networkConditions.connectionDownThreshold.count}
                onChange={(e) => handleCountChange(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Time Window (minutes)</Label>
              <Input
                type="number"
                min={1}
                max={30}
                value={networkConditions.connectionDownThreshold.timeWindow}
                onChange={(e) => handleTimeWindowChange(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="bgp-issues">Detect BGP Routing Issues</Label>
              <Switch 
                id="bgp-issues" 
                checked={networkConditions.detectBGPIssues}
                onCheckedChange={() => handleSwitchToggle('detectBGPIssues')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="ddos-response">Enable DDoS Attack Response</Label>
              <Switch 
                id="ddos-response" 
                checked={networkConditions.ddosResponseEnabled}
                onCheckedChange={() => handleSwitchToggle('ddosResponseEnabled')}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkConditionsCard;
