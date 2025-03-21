
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { PolicyRoute } from '@/types/sdwan';
import { Save, X, RefreshCw, Shield, Globe, Lock, Server } from 'lucide-react';
import { PolicyStatsViewer } from './PolicyStatsViewer';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface PolicyRouteEditorProps {
  route: PolicyRoute | null;
  isNew: boolean;
  onSave: (route: PolicyRoute) => void;
  onCancel: () => void;
}

const mockInterfaces = [
  { value: 'wan1', label: 'WAN 1' },
  { value: 'wan2', label: 'WAN 2' },
  { value: 'lan1', label: 'LAN 1' },
  { value: 'lan2', label: 'LAN 2' },
  { value: 'vlan10', label: 'VLAN 10' },
  { value: 'vlan20', label: 'VLAN 20' },
  { value: 'vlan30', label: 'VLAN 30' },
];

const mockRegions = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'eu', label: 'European Union' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'au', label: 'Australia' },
  { value: 'asia', label: 'Asia Pacific' },
  { value: 'latam', label: 'Latin America' },
];

const PolicyRouteEditor: React.FC<PolicyRouteEditorProps> = ({ 
  route, 
  isNew, 
  onSave, 
  onCancel 
}) => {
  const [formData, setFormData] = useState<PolicyRoute>({
    id: '',
    name: '',
    description: '',
    sourceIp: '',
    destinationIp: '',
    protocol: 'any',
    portRangeStart: 0,
    portRangeEnd: 0,
    destinationPortStart: 0,
    destinationPortEnd: 0,
    nextHopIp: '',
    interface: '',
    matchType: '5-tuple',
    priority: 1,
    action: 'forward',
    routeTableId: 0,
    enableLogging: false,
    enableCounters: true,
    trafficHandled: 0,
    packetCount: 0,
    packetRate: 0,
    byteRate: 0,
    errorCount: 0,
    lastUpdated: new Date().toISOString(),
    status: 'inactive',
    encryptionPolicy: 'inherit',
    encryptionFallback: true,
    encryptionPriority: 'medium',
    applicationCategory: 'general',
    geoRestriction: {
      allowedRegions: [],
      blockNonKyberRegions: false
    },
    serviceType: 'https',
    wireguardIntegration: true
  });

  const [currentTab, setCurrentTab] = useState("basic");

  useEffect(() => {
    if (route) {
      setFormData({
        ...route,
        geoRestriction: route.geoRestriction || {
          allowedRegions: [],
          blockNonKyberRegions: false
        }
      });
    } else if (isNew) {
      // Generate a temporary ID for new routes
      setFormData({
        ...formData,
        id: `temp-${Date.now()}`
      });
    }
  }, [route, isNew]);

  const handleChange = (field: keyof PolicyRoute, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGeoRestrictionChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      geoRestriction: {
        ...prev.geoRestriction!,
        [field]: value
      }
    }));
  };

  const handleRegionToggle = (region: string) => {
    setFormData(prev => {
      const currentRegions = prev.geoRestriction?.allowedRegions || [];
      let newRegions;
      
      if (currentRegions.includes(region)) {
        newRegions = currentRegions.filter(r => r !== region);
      } else {
        newRegions = [...currentRegions, region];
      }
      
      return {
        ...prev,
        geoRestriction: {
          ...prev.geoRestriction!,
          allowedRegions: newRegions
        }
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const getEncryptionBadgeColor = (policy?: string) => {
    switch (policy) {
      case 'kyber-only': return 'bg-green-500';
      case 'hybrid': return 'bg-blue-500';
      case 'standard': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const renderEncryptionDescription = () => {
    switch (formData.encryptionPolicy) {
      case 'kyber-only':
        return "All traffic matching this policy will be routed through Kyber-only quantum-resistant tunnels. This provides the highest level of security against quantum computing threats.";
      case 'hybrid':
        return "Traffic will be encrypted with both Kyber and X25519 algorithms for balanced security and performance. Provides quantum resistance with compatibility.";
      case 'standard':
        return "Standard X25519 encryption will be used. Offers good performance but no protection against quantum threats.";
      case 'inherit':
        return "This policy will inherit encryption settings from the global SD-WAN configuration.";
      default:
        return "";
    }
  };

  const renderApplicationCategoryDescription = () => {
    switch (formData.applicationCategory) {
      case 'financial':
        return "Financial and banking services - recommended to use Kyber-only encryption.";
      case 'healthcare':
        return "Healthcare and medical data - strict compliance requirements for data protection.";
      case 'voip':
        return "Voice over IP and video conferencing - sensitive to latency.";
      case 'remote-access':
        return "Remote desktop and VPN services - requires strong encryption.";
      case 'iot':
        return "Internet of Things devices - may have limited processing capabilities.";
      default:
        return "General purpose traffic classification.";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {isNew ? 'Create New Policy Route' : 'Edit Policy Route'}
            {!isNew && <Button variant="outline" size="sm" disabled className="flex items-center gap-1">
              <RefreshCw className="h-4 w-4" />
              <span className="text-xs">
                Last updated: {new Date(formData.lastUpdated).toLocaleTimeString()}
              </span>
            </Button>}
          </CardTitle>
          {!isNew && <CardDescription>
            Manage settings for VPP policy-based routing with encryption rules
          </CardDescription>}
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" value={currentTab} onValueChange={setCurrentTab}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="basic">Basic Settings</TabsTrigger>
              <TabsTrigger value="encryption">Encryption Rules</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Route Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      required
                      placeholder="Enter route name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority (1-100)</Label>
                    <Input
                      id="priority"
                      type="number"
                      min="1"
                      max="100"
                      value={formData.priority}
                      onChange={(e) => handleChange('priority', parseInt(e.target.value))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description || ''}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="Add a description for this policy route"
                    className="h-20"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sourceIp">Source IP/Subnet</Label>
                    <Input
                      id="sourceIp"
                      value={formData.sourceIp}
                      onChange={(e) => handleChange('sourceIp', e.target.value)}
                      placeholder="e.g., 192.168.1.0/24"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="destinationIp">Destination IP/Subnet</Label>
                    <Input
                      id="destinationIp"
                      value={formData.destinationIp}
                      onChange={(e) => handleChange('destinationIp', e.target.value)}
                      placeholder="e.g., 10.0.0.0/16"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="protocol">Protocol</Label>
                  <Select
                    value={formData.protocol}
                    onValueChange={(value) => handleChange('protocol', value)}
                  >
                    <SelectTrigger id="protocol">
                      <SelectValue placeholder="Select protocol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="tcp">TCP</SelectItem>
                      <SelectItem value="udp">UDP</SelectItem>
                      <SelectItem value="icmp">ICMP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {(formData.protocol === 'tcp' || formData.protocol === 'udp') && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="portRangeStart">Source Port Range Start</Label>
                        <Input
                          id="portRangeStart"
                          type="number"
                          min="0"
                          max="65535"
                          value={formData.portRangeStart}
                          onChange={(e) => handleChange('portRangeStart', parseInt(e.target.value))}
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="portRangeEnd">Source Port Range End</Label>
                        <Input
                          id="portRangeEnd"
                          type="number"
                          min="0"
                          max="65535"
                          value={formData.portRangeEnd}
                          onChange={(e) => handleChange('portRangeEnd', parseInt(e.target.value))}
                          placeholder="65535"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="destinationPortStart">Destination Port Range Start</Label>
                        <Input
                          id="destinationPortStart"
                          type="number"
                          min="0"
                          max="65535"
                          value={formData.destinationPortStart || 0}
                          onChange={(e) => handleChange('destinationPortStart', parseInt(e.target.value))}
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="destinationPortEnd">Destination Port Range End</Label>
                        <Input
                          id="destinationPortEnd"
                          type="number"
                          min="0"
                          max="65535"
                          value={formData.destinationPortEnd || 0}
                          onChange={(e) => handleChange('destinationPortEnd', parseInt(e.target.value))}
                          placeholder="65535"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="action">Action</Label>
                  <Select
                    value={formData.action || 'forward'}
                    onValueChange={(value) => handleChange('action', value)}
                  >
                    <SelectTrigger id="action">
                      <SelectValue placeholder="Select action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="forward">Forward</SelectItem>
                      <SelectItem value="drop">Drop</SelectItem>
                      <SelectItem value="mirror">Mirror</SelectItem>
                      <SelectItem value="log">Log Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="interface">Interface</Label>
                    <Select
                      value={formData.interface}
                      onValueChange={(value) => handleChange('interface', value)}
                    >
                      <SelectTrigger id="interface">
                        <SelectValue placeholder="Select interface" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockInterfaces.map(intf => (
                          <SelectItem key={intf.value} value={intf.value}>{intf.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nextHopIp">Next Hop IP</Label>
                    <Input
                      id="nextHopIp"
                      value={formData.nextHopIp}
                      onChange={(e) => handleChange('nextHopIp', e.target.value)}
                      placeholder="e.g., 192.168.1.1"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <Switch
                    id="status"
                    checked={formData.status === 'active'}
                    onCheckedChange={(checked) => 
                      handleChange('status', checked ? 'active' : 'inactive')
                    }
                  />
                  <Label htmlFor="status">
                    {formData.status === 'active' ? 'Active' : 'Inactive'}
                  </Label>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="encryption" className="space-y-6">
              <div className="rounded-lg border p-4 mb-4">
                <div className="flex items-center mb-2">
                  <Shield className="h-5 w-5 mr-2 text-primary" />
                  <h3 className="text-lg font-medium">Encryption Policy</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{renderEncryptionDescription()}</p>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="encryptionPolicy">Encryption Method</Label>
                    <Select
                      value={formData.encryptionPolicy}
                      onValueChange={(value) => handleChange('encryptionPolicy', value)}
                    >
                      <SelectTrigger id="encryptionPolicy">
                        <SelectValue placeholder="Select encryption method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inherit">Inherit from Global Settings</SelectItem>
                        <SelectItem value="kyber-only">Force Kyber-Only (Quantum-Safe)</SelectItem>
                        <SelectItem value="hybrid">Prefer Hybrid (Kyber + X25519)</SelectItem>
                        <SelectItem value="standard">Standard (X25519)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {formData.encryptionPolicy !== 'inherit' && (
                    <>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="encryptionFallback" 
                          checked={formData.encryptionFallback}
                          onCheckedChange={(checked) => 
                            handleChange('encryptionFallback', checked === true)
                          }
                        />
                        <Label htmlFor="encryptionFallback">Allow Fallback to Lower Encryption</Label>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="encryptionPriority">Encryption Priority</Label>
                        <Select
                          value={formData.encryptionPriority}
                          onValueChange={(value) => handleChange('encryptionPriority', value)}
                        >
                          <SelectTrigger id="encryptionPriority">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high">High (Enforce Strictly)</SelectItem>
                            <SelectItem value="medium">Medium (Balance with Performance)</SelectItem>
                            <SelectItem value="low">Low (Optimize for Performance)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              <div className="rounded-lg border p-4 mb-4">
                <div className="flex items-center mb-2">
                  <Server className="h-5 w-5 mr-2 text-primary" />
                  <h3 className="text-lg font-medium">Application Classification</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{renderApplicationCategoryDescription()}</p>
                
                <div className="space-y-2">
                  <Label htmlFor="applicationCategory">Application Category</Label>
                  <Select
                    value={formData.applicationCategory}
                    onValueChange={(value) => handleChange('applicationCategory', value)}
                  >
                    <SelectTrigger id="applicationCategory">
                      <SelectValue placeholder="Select application category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Traffic</SelectItem>
                      <SelectItem value="financial">Financial Transactions</SelectItem>
                      <SelectItem value="healthcare">Healthcare Data</SelectItem>
                      <SelectItem value="voip">VoIP & Video Conferencing</SelectItem>
                      <SelectItem value="remote-access">Remote Access & VPN</SelectItem>
                      <SelectItem value="iot">IoT Devices</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2 mt-4">
                  <Label htmlFor="serviceType">Service Type</Label>
                  <Select
                    value={formData.serviceType}
                    onValueChange={(value) => handleChange('serviceType', value)}
                  >
                    <SelectTrigger id="serviceType">
                      <SelectValue placeholder="Select service type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="https">HTTPS Web Traffic</SelectItem>
                      <SelectItem value="ssh">SSH</SelectItem>
                      <SelectItem value="rdp">Remote Desktop</SelectItem>
                      <SelectItem value="voip">VoIP</SelectItem>
                      <SelectItem value="database">Database Traffic</SelectItem>
                      <SelectItem value="file-transfer">File Transfer</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="rounded-lg border p-4">
                <div className="flex items-center mb-2">
                  <Globe className="h-5 w-5 mr-2 text-primary" />
                  <h3 className="text-lg font-medium">Geolocation Restrictions</h3>
                </div>
                
                <div className="flex items-center space-x-2 mb-4">
                  <Checkbox 
                    id="blockNonKyberRegions" 
                    checked={formData.geoRestriction?.blockNonKyberRegions}
                    onCheckedChange={(checked) => 
                      handleGeoRestrictionChange('blockNonKyberRegions', checked === true)
                    }
                  />
                  <Label htmlFor="blockNonKyberRegions">Block Traffic from Non-Kyber Capable Regions</Label>
                </div>
                
                <div className="space-y-2">
                  <Label>Allowed Regions</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {mockRegions.map(region => (
                      <div key={region.value} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`region-${region.value}`} 
                          checked={formData.geoRestriction?.allowedRegions.includes(region.value)}
                          onCheckedChange={() => handleRegionToggle(region.value)}
                        />
                        <Label htmlFor={`region-${region.value}`}>{region.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="advanced">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="matchType">Match Type</Label>
                    <Select
                      value={formData.matchType}
                      onValueChange={(value) => handleChange('matchType', value)}
                    >
                      <SelectTrigger id="matchType">
                        <SelectValue placeholder="Select match type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5-tuple">5-Tuple</SelectItem>
                        <SelectItem value="l4">Layer 4</SelectItem>
                        <SelectItem value="l3">Layer 3</SelectItem>
                        <SelectItem value="dscp">DSCP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="routeTableId">Route Table ID</Label>
                    <Input
                      id="routeTableId"
                      type="number"
                      min="0"
                      max="255"
                      value={formData.routeTableId || 0}
                      onChange={(e) => handleChange('routeTableId', parseInt(e.target.value))}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="enableLogging" 
                      checked={formData.enableLogging}
                      onCheckedChange={(checked) => 
                        handleChange('enableLogging', checked === true)
                      }
                    />
                    <Label htmlFor="enableLogging">Enable Logging</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="enableCounters" 
                      checked={formData.enableCounters}
                      onCheckedChange={(checked) => 
                        handleChange('enableCounters', checked === true)
                      }
                    />
                    <Label htmlFor="enableCounters">Enable Counters</Label>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 pt-2 pb-4">
                  <Checkbox 
                    id="wireguardIntegration" 
                    checked={formData.wireguardIntegration}
                    onCheckedChange={(checked) => 
                      handleChange('wireguardIntegration', checked === true)
                    }
                  />
                  <div>
                    <Label htmlFor="wireguardIntegration" className="block">Enable VPP WireGuard Integration</Label>
                    <p className="text-sm text-muted-foreground">
                      Integrate this policy with the VPP WireGuard backend for hardware-accelerated encryption
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onCancel}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>

          <div className="flex space-x-2">
            {currentTab !== "basic" && (
              <Button variant="outline" onClick={() => setCurrentTab(currentTab === "encryption" ? "basic" : "encryption")}>
                {currentTab === "advanced" ? "Previous" : "Next"}
              </Button>
            )}
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Policy
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Policy Save</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to save this policy route? This action will apply the route configuration to the VPP engine.
                    {formData.encryptionPolicy === 'kyber-only' && (
                      <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-md">
                        <p className="text-green-700 text-sm font-medium">This policy enforces Kyber-only encryption for maximum quantum resistance.</p>
                      </div>
                    )}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSubmit}>
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardFooter>
      </Card>
      
      {!isNew && (
        <PolicyStatsViewer 
          packetCount={formData.packetCount}
          trafficHandled={formData.trafficHandled}
          packetRate={formData.packetRate}
          byteRate={formData.byteRate}
          errorCount={formData.errorCount}
          lastUpdated={formData.lastUpdated}
        />
      )}
    </div>
  );
};

export default PolicyRouteEditor;
