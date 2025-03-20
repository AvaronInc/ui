
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Lock, Shield, Zap, Settings, Plus } from 'lucide-react';

const WireGuardMeshConfig: React.FC = () => {
  const [isNetmakerEnabled, setIsNetmakerEnabled] = useState(true);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* WireGuard Configuration */}
        <Card className="border border-purple-100 dark:border-purple-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-purple-500" />
                <h3 className="text-lg font-medium">WireGuard Configuration</h3>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Active
              </Badge>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="endpoint">Primary Endpoint</Label>
                  <Input id="endpoint" placeholder="wg.example.com:51820" value="wg.cybernest.io:51820" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="listen-port">Listen Port</Label>
                  <Input id="listen-port" placeholder="51820" value="51820" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="public-key">Public Key</Label>
                <div className="flex">
                  <Input 
                    id="public-key" 
                    value="jA1L1egfKbZ/P4pM6jv/W5M/o5czy7VUU9GrA8oo8TU=" 
                    className="font-mono text-xs"
                    readOnly
                  />
                  <Button variant="outline" className="ml-2 shrink-0">
                    Copy
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="keep-alive" checked />
                <Label htmlFor="keep-alive">
                  Enable persistent keepalive (25 seconds)
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="kyber-auth" checked />
                <Label htmlFor="kyber-auth">
                  Enable Kyber-based authentication
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Netmaker Integration */}
        <Card className="border border-blue-100 dark:border-blue-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-medium">Netmaker Integration</h3>
              </div>
              <div className="flex items-center">
                <Label htmlFor="netmaker-toggle" className="mr-2 text-sm">Enabled</Label>
                <Checkbox 
                  id="netmaker-toggle" 
                  checked={isNetmakerEnabled} 
                  onCheckedChange={(value) => setIsNetmakerEnabled(!!value)}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="netmaker-server">Netmaker Server</Label>
                <Input 
                  id="netmaker-server" 
                  placeholder="netmaker.example.com" 
                  value="netmaker.cybernest.io" 
                  disabled={!isNetmakerEnabled}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="network-name">Network Name</Label>
                <Input 
                  id="network-name" 
                  placeholder="cybernest-mesh" 
                  value="cybernest-global-mesh" 
                  disabled={!isNetmakerEnabled}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="connection-mode">Connection Mode</Label>
                <Select defaultValue="full-mesh" disabled={!isNetmakerEnabled}>
                  <SelectTrigger id="connection-mode">
                    <SelectValue placeholder="Select connection mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-mesh">Full Mesh</SelectItem>
                    <SelectItem value="hub-spoke">Hub and Spoke</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="auto-connect" checked disabled={!isNetmakerEnabled} />
                <Label htmlFor="auto-connect">
                  Automatically connect new NEST deployments
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Connected Peers */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-500" />
              <h3 className="text-lg font-medium">Connected Peers</h3>
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Peer
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3 font-medium">Name</th>
                  <th className="text-left py-2 px-3 font-medium">Public Key</th>
                  <th className="text-left py-2 px-3 font-medium">IP Address</th>
                  <th className="text-left py-2 px-3 font-medium">Location</th>
                  <th className="text-left py-2 px-3 font-medium">Status</th>
                  <th className="text-right py-2 px-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-3">Headquarters</td>
                  <td className="py-2 px-3 font-mono text-xs">3Nrb+vHC3ZQ+ij2qXTmVgJZrL9GE6cY5UPk1S3eiHnI=</td>
                  <td className="py-2 px-3">10.10.10.1/24</td>
                  <td className="py-2 px-3">Main Office</td>
                  <td className="py-2 px-3">
                    <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                      Connected
                    </Badge>
                  </td>
                  <td className="py-2 px-3 text-right">
                    <Button variant="ghost" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">Data Center</td>
                  <td className="py-2 px-3 font-mono text-xs">Lx7QJ2PTNWpkcuXLrPAcuK3jHXr5sDYWZCGvQZxiMlo=</td>
                  <td className="py-2 px-3">10.10.10.2/24</td>
                  <td className="py-2 px-3">DC1</td>
                  <td className="py-2 px-3">
                    <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                      Connected
                    </Badge>
                  </td>
                  <td className="py-2 px-3 text-right">
                    <Button variant="ghost" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">Branch Office 1</td>
                  <td className="py-2 px-3 font-mono text-xs">rPVc1+8AEC4v1WZyGWe+K3zY2LNWYDHwJT9YBQYDbnQ=</td>
                  <td className="py-2 px-3">10.10.10.3/24</td>
                  <td className="py-2 px-3">East Coast</td>
                  <td className="py-2 px-3">
                    <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                      Connected
                    </Badge>
                  </td>
                  <td className="py-2 px-3 text-right">
                    <Button variant="ghost" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">Branch Office 2</td>
                  <td className="py-2 px-3 font-mono text-xs">9JkvLmVt5CzWEYRbqxLJU72j3k5FcuW4YPb1K2ZHimk=</td>
                  <td className="py-2 px-3">10.10.10.4/24</td>
                  <td className="py-2 px-3">West Coast</td>
                  <td className="py-2 px-3">
                    <Badge variant="outline" className="border-amber-200 text-amber-700">
                      Reconnecting
                    </Badge>
                  </td>
                  <td className="py-2 px-3 text-right">
                    <Button variant="ghost" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3">Cloud Infrastructure</td>
                  <td className="py-2 px-3 font-mono text-xs">AmK5R1c+uY9IZJeb2LKUyT8hjK6UzJvrF9CY8LGZQnE=</td>
                  <td className="py-2 px-3">10.10.10.5/24</td>
                  <td className="py-2 px-3">AWS East</td>
                  <td className="py-2 px-3">
                    <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                      Connected
                    </Badge>
                  </td>
                  <td className="py-2 px-3 text-right">
                    <Button variant="ghost" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* Advanced Settings */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="h-5 w-5 text-gray-500" />
            <h3 className="text-lg font-medium">Advanced Settings</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mtu">MTU Size</Label>
              <Input id="mtu" placeholder="1420" value="1420" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dns">DNS Servers</Label>
              <Input id="dns" placeholder="1.1.1.1, 8.8.8.8" value="10.10.10.53, 1.1.1.1" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="encryption">Encryption Algorithm</Label>
              <Select defaultValue="chacha20">
                <SelectTrigger id="encryption">
                  <SelectValue placeholder="Select encryption" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chacha20">ChaCha20-Poly1305</SelectItem>
                  <SelectItem value="aes-256">AES-256-GCM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="key-rotation">Key Rotation Interval</Label>
              <Select defaultValue="7d">
                <SelectTrigger id="key-rotation">
                  <SelectValue placeholder="Select interval" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1d">Daily</SelectItem>
                  <SelectItem value="7d">Weekly</SelectItem>
                  <SelectItem value="30d">Monthly</SelectItem>
                  <SelectItem value="manual">Manual Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="allow-routing" checked />
              <Label htmlFor="allow-routing">
                Allow traffic routing between peers
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="log-metrics" checked />
              <Label htmlFor="log-metrics">
                Log connection metrics
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="auto-update" checked />
              <Label htmlFor="auto-update">
                Auto-update configurations
              </Label>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end gap-2">
            <Button variant="outline">Reset to Default</Button>
            <Button>Save Configuration</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WireGuardMeshConfig;
