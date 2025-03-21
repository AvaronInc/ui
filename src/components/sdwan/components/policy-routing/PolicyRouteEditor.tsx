
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
import { Save, X, RefreshCw } from 'lucide-react';
import { PolicyStatsViewer } from './PolicyStatsViewer';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

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
    status: 'inactive'
  });

  useEffect(() => {
    if (route) {
      setFormData(route);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {isNew ? 'Create New Policy Route' : 'Edit Policy Route'}
            {!isNew && <Button variant="outline" size="sm" disabled className="flex items-center gap-1">
              <RefreshCw className="h-4 w-4" />
              Last updated: {new Date(formData.lastUpdated).toLocaleTimeString()}
            </Button>}
          </CardTitle>
          {!isNew && <CardDescription>
            Manage settings for VPP policy-based routing
          </CardDescription>}
        </CardHeader>
        <CardContent>
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
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onCancel}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>

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
