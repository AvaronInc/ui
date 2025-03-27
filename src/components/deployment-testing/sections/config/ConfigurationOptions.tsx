
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

export const configurationTypes = [
  { value: 'network', label: 'Network Configuration' },
  { value: 'firewall', label: 'Firewall Rules' },
  { value: 'sdwan', label: 'Routing/SD-WAN Policies' },
  { value: 'dns', label: 'DNS/IPAM Updates' },
  { value: 'identity', label: 'Identity/Access Policy Change' },
  { value: 'software', label: 'Software Update' },
  { value: 'custom', label: 'Custom Config Upload' },
];

export const trafficProfiles = [
  { value: 'normal', label: 'Normal production traffic' },
  { value: 'burst-25', label: 'Burst load (25% spike)' },
  { value: 'burst-50', label: 'Burst load (50% spike)' },
  { value: 'burst-100', label: 'Burst load (100% spike)' },
  { value: 'security', label: 'Security event scenarios (DDoS, malformed packets)' },
  { value: 'random', label: 'Randomized traffic and latency simulation' },
];

export const zoneOptions = [
  { value: 'global', label: 'Global (All Zones)' },
  { value: 'zone-1', label: 'Zone 1 - HQ' },
  { value: 'zone-2', label: 'Zone 2 - Data Center' },
  { value: 'zone-3', label: 'Zone 3 - Remote Office' },
  { value: 'zone-4', label: 'Zone 4 - Cloud Services' },
  { value: 'zone-5', label: 'Zone 5 - Development' },
];

interface ConfigurationOptionsProps {
  configType: string;
  setConfigType: (value: string) => void;
  selectedZone: string;
  setSelectedZone: (value: string) => void;
  trafficProfile: string;
  setTrafficProfile: (value: string) => void;
  replicateZone: boolean;
  setReplicateZone: (value: boolean) => void;
  saveConfiguration: () => void;
}

const ConfigurationOptions: React.FC<ConfigurationOptionsProps> = ({
  configType,
  setConfigType,
  selectedZone,
  setSelectedZone,
  trafficProfile,
  setTrafficProfile,
  replicateZone,
  setReplicateZone,
  saveConfiguration
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="config-type">Configuration Type</Label>
        <Select 
          value={configType} 
          onValueChange={setConfigType}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select configuration type" />
          </SelectTrigger>
          <SelectContent>
            {configurationTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="target-zone">Target Zone</Label>
        <Select 
          value={selectedZone} 
          onValueChange={setSelectedZone}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select target zone" />
          </SelectTrigger>
          <SelectContent>
            {zoneOptions.map((zone) => (
              <SelectItem key={zone.value} value={zone.value}>
                {zone.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="traffic-profile">Traffic Simulation Profile</Label>
        <Select 
          value={trafficProfile} 
          onValueChange={setTrafficProfile}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select traffic profile" />
          </SelectTrigger>
          <SelectContent>
            {trafficProfiles.map((profile) => (
              <SelectItem key={profile.value} value={profile.value}>
                {profile.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="replicate-zone">Replicate Current Zone Environment</Label>
              <p className="text-sm text-muted-foreground">
                Use real-time topology and traffic patterns from the selected zone
              </p>
            </div>
            <Switch
              id="replicate-zone"
              checked={replicateZone}
              onCheckedChange={setReplicateZone}
            />
          </div>
        </CardContent>
      </Card>
      
      <Button onClick={saveConfiguration} className="w-full">
        Save Configuration
      </Button>
    </div>
  );
};

export default ConfigurationOptions;
