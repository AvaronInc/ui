
import React from 'react';

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
  { value: 'security', label: 'Security event scenarios' },
  { value: 'random', label: 'Randomized traffic and latency' },
];

interface ConfigSummaryProps {
  config: {
    configType: string;
    trafficProfile: string;
    replicateZone: boolean;
    timestamp: string;
  };
}

const ConfigSummary: React.FC<ConfigSummaryProps> = ({ config }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Test Configuration Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">Configuration Type</p>
            <p className="text-sm text-muted-foreground">
              {configurationTypes.find(t => t.value === config.configType)?.label || config.configType}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Traffic Profile</p>
            <p className="text-sm text-muted-foreground">
              {trafficProfiles.find(t => t.value === config.trafficProfile)?.label || config.trafficProfile}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Zone Replication</p>
            <p className="text-sm text-muted-foreground">
              {config.replicateZone ? "Enabled - using current zone data" : "Disabled"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Configured At</p>
            <p className="text-sm text-muted-foreground">
              {new Date(config.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigSummary;
