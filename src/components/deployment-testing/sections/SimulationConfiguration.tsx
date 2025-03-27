
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Editor from '@monaco-editor/react';
import { useToast } from '@/components/ui/use-toast';

const configurationTypes = [
  { value: 'network', label: 'Network Configuration' },
  { value: 'firewall', label: 'Firewall Rules' },
  { value: 'sdwan', label: 'Routing/SD-WAN Policies' },
  { value: 'dns', label: 'DNS/IPAM Updates' },
  { value: 'identity', label: 'Identity/Access Policy Change' },
  { value: 'software', label: 'Software Update' },
  { value: 'custom', label: 'Custom Config Upload' },
];

const trafficProfiles = [
  { value: 'normal', label: 'Normal production traffic' },
  { value: 'burst-25', label: 'Burst load (25% spike)' },
  { value: 'burst-50', label: 'Burst load (50% spike)' },
  { value: 'burst-100', label: 'Burst load (100% spike)' },
  { value: 'security', label: 'Security event scenarios (DDoS, malformed packets)' },
  { value: 'random', label: 'Randomized traffic and latency simulation' },
];

const getDefaultConfigCode = (type: string) => {
  switch (type) {
    case 'network':
      return '{\n  "vlan": {\n    "id": 103,\n    "name": "Internal-Servers",\n    "subnet": "10.1.3.0/24",\n    "gateway": "10.1.3.1"\n  }\n}';
    case 'firewall':
      return '{\n  "rule": {\n    "name": "Allow Web Traffic",\n    "action": "allow",\n    "source": "any",\n    "destination": "10.1.3.0/24",\n    "port": 443,\n    "protocol": "tcp"\n  }\n}';
    case 'sdwan':
      return '{\n  "policy": {\n    "name": "Voice Traffic Priority",\n    "match": { "application": "voip" },\n    "action": { "priority": "high", "path": "mpls" }\n  }\n}';
    case 'dns':
      return '{\n  "record": {\n    "name": "api.internal",\n    "type": "A",\n    "value": "10.1.3.25",\n    "ttl": 300\n  }\n}';
    case 'identity':
      return '{\n  "group": {\n    "name": "Developer Access",\n    "permissions": ["code-repos", "ci-systems"],\n    "members": ["user1", "user2"]\n  }\n}';
    case 'software':
      return '{\n  "package": {\n    "name": "Security Gateway",\n    "version": "4.2.1",\n    "targets": ["firewall-*"],\n    "canary": true\n  }\n}';
    case 'custom':
      return '# Enter your custom configuration here\n# Supports YAML, JSON, or other formats';
    default:
      return '{\n  // Enter your configuration here\n}';
  }
};

const SimulationConfiguration = () => {
  const [configType, setConfigType] = useState('network');
  const [editorContent, setEditorContent] = useState(getDefaultConfigCode('network'));
  const [replicateZone, setReplicateZone] = useState(true);
  const [trafficProfile, setTrafficProfile] = useState('normal');
  const { toast } = useToast();

  const handleConfigTypeChange = (value: string) => {
    setConfigType(value);
    setEditorContent(getDefaultConfigCode(value));
  };

  const saveConfiguration = () => {
    // In a real app, this would save to context or API
    toast({
      title: "Configuration Saved",
      description: "Test configuration has been saved and is ready to run",
    });

    // Store in localStorage for demo purposes
    localStorage.setItem('deployment-test-config', JSON.stringify({
      configType,
      configContent: editorContent,
      replicateZone,
      trafficProfile,
      timestamp: new Date().toISOString()
    }));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Simulation Configuration</h2>
        <p className="text-sm text-muted-foreground">
          Configure your deployment test scenario by selecting the type of change and defining the configuration parameters.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="config-type">Configuration Type</Label>
            <Select 
              value={configType} 
              onValueChange={handleConfigTypeChange}
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
        
        <div className="space-y-2">
          <Label htmlFor="config-editor">Configuration Editor</Label>
          <div className="border rounded-md h-[350px] overflow-hidden">
            <Editor
              height="350px"
              defaultLanguage="json"
              value={editorContent}
              onChange={(value) => setEditorContent(value || '')}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: 'on',
                folding: true,
                lineNumbers: 'on',
                automaticLayout: true,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationConfiguration;
