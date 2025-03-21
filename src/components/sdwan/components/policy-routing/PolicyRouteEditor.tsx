
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { PolicyRoute } from '@/types/sdwan';
import { Save, X } from 'lucide-react';

interface PolicyRouteEditorProps {
  route: PolicyRoute | null;
  isNew: boolean;
  onSave: (route: PolicyRoute) => void;
  onCancel: () => void;
}

const PolicyRouteEditor: React.FC<PolicyRouteEditorProps> = ({ 
  route, 
  isNew, 
  onSave, 
  onCancel 
}) => {
  const [formData, setFormData] = useState<PolicyRoute>({
    id: '',
    name: '',
    sourceIp: '',
    destinationIp: '',
    protocol: 'any',
    portRangeStart: 0,
    portRangeEnd: 0,
    nextHopIp: '',
    interface: '',
    matchType: '5-tuple',
    priority: 1,
    trafficHandled: 0,
    packetCount: 0,
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
    <Card>
      <CardHeader>
        <CardTitle>{isNew ? 'Create New Policy Route' : 'Edit Policy Route'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Policy Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
              placeholder="Enter policy name"
            />
          </div>

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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="portRangeStart">Port Range Start</Label>
                <Input
                  id="portRangeStart"
                  type="number"
                  min="0"
                  max="65535"
                  value={formData.portRangeStart}
                  onChange={(e) => handleChange('portRangeStart', parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="portRangeEnd">Port Range End</Label>
                <Input
                  id="portRangeEnd"
                  type="number"
                  min="0"
                  max="65535"
                  value={formData.portRangeEnd}
                  onChange={(e) => handleChange('portRangeEnd', parseInt(e.target.value))}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="nextHopIp">Next Hop IP</Label>
            <Input
              id="nextHopIp"
              value={formData.nextHopIp}
              onChange={(e) => handleChange('nextHopIp', e.target.value)}
              placeholder="e.g., 192.168.1.1"
            />
          </div>

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
                <SelectItem value="wan1">WAN 1</SelectItem>
                <SelectItem value="wan2">WAN 2</SelectItem>
                <SelectItem value="lan1">LAN 1</SelectItem>
                <SelectItem value="lan2">LAN 2</SelectItem>
                <SelectItem value="vlan10">VLAN 10</SelectItem>
              </SelectContent>
            </Select>
          </div>

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

          <div className="flex items-center space-x-2">
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
        <Button onClick={handleSubmit}>
          <Save className="mr-2 h-4 w-4" />
          Save Policy
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PolicyRouteEditor;
