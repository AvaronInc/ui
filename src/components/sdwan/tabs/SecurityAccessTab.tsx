
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Shield, Lock, UserCheck, Fingerprint, WifiOff, Check, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const SecurityAccessTab = () => {
  const [postQuantumEnabled, setPostQuantumEnabled] = useState(false);
  const [encryptionMode, setEncryptionMode] = useState('hybrid');
  
  const tunnelStatus = [
    { name: "HQ to Branch A", status: "supported", encryption: postQuantumEnabled ? encryptionMode : "standard" },
    { name: "HQ to Branch B", status: "supported", encryption: postQuantumEnabled ? encryptionMode : "standard" },
    { name: "HQ to Data Center", status: "supported", encryption: postQuantumEnabled ? encryptionMode : "standard" },
    { name: "Branch A to Branch B", status: "unsupported", encryption: "standard" },
    { name: "Cloud Gateway", status: "pending-upgrade", encryption: "standard" },
  ];
  
  const handlePostQuantumToggle = (checked: boolean) => {
    setPostQuantumEnabled(checked);
  };
  
  const handleEncryptionModeChange = (value: string) => {
    setEncryptionMode(value);
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            Zero-Trust Network Access (ZTNA)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="enable-ztna">Enable Zero-Trust Access Control</Label>
            <Switch id="enable-ztna" defaultChecked />
          </div>
          
          <div className="space-y-2">
            <Label>Whitelist Trusted Networks & IPs</Label>
            <div className="flex gap-2">
              <Input placeholder="192.168.1.0/24" />
              <Button variant="outline" size="icon">+</Button>
            </div>
            
            <div className="bg-muted rounded-md p-3 max-h-[150px] overflow-y-auto">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">10.0.0.0/8</span>
                  <Button variant="ghost" size="sm">✕</Button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">172.16.0.0/12</span>
                  <Button variant="ghost" size="sm">✕</Button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">192.168.0.0/16</span>
                  <Button variant="ghost" size="sm">✕</Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="geo-restrictions">Geo-Location Based Access Restrictions</Label>
            <Switch id="geo-restrictions" defaultChecked />
          </div>
          
          <div className="space-y-2">
            <Label>Allowed Regions</Label>
            <Select defaultValue="us">
              <SelectTrigger>
                <SelectValue placeholder="Select regions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="eu">European Union</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="au">Australia</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="ai-detection">AI-Based Anomaly Detection</Label>
            <Switch id="ai-detection" defaultChecked />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lock className="mr-2 h-5 w-5" />
            VPN & Remote Access Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="site-to-site">Enable Site-to-Site VPN Encryption</Label>
            <Switch id="site-to-site" defaultChecked />
          </div>
          
          <div className="space-y-2">
            <Label>Encryption Algorithm</Label>
            <Select defaultValue="aes256">
              <SelectTrigger>
                <SelectValue placeholder="Select algorithm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aes256">AES-256-GCM</SelectItem>
                <SelectItem value="chacha20">ChaCha20-Poly1305</SelectItem>
                <SelectItem value="aes128">AES-128-GCM</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <Label htmlFor="remote-access">Remote User Access Configuration</Label>
            <Switch id="remote-access" defaultChecked />
          </div>
          
          <div className="space-y-2">
            <Label>Authentication Method</Label>
            <ToggleGroup type="single" defaultValue="certificate" className="justify-start">
              <ToggleGroupItem value="certificate">Certificate</ToggleGroupItem>
              <ToggleGroupItem value="password">Password</ToggleGroupItem>
              <ToggleGroupItem value="both">Both</ToggleGroupItem>
            </ToggleGroup>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="mfa">Multi-Factor Authentication</Label>
            <Switch id="mfa" defaultChecked />
          </div>
          
          <div className="space-y-2">
            <Label>MFA Method</Label>
            <Select defaultValue="app">
              <SelectTrigger>
                <SelectValue placeholder="Select MFA method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="app">Authenticator App</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="hardware">Hardware Token</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      {/* New Post-Quantum Encryption Card */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Fingerprint className="mr-2 h-5 w-5" />
            Post-Quantum Encryption Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <Label htmlFor="post-quantum" className="text-base font-medium mb-1 block">
                    Enable Post-Quantum Encryption
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Activate Kyber-based quantum-resistant encryption for SD-WAN tunnels
                  </p>
                </div>
                <Switch 
                  id="post-quantum" 
                  checked={postQuantumEnabled}
                  onCheckedChange={handlePostQuantumToggle}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="encryption-mode">Encryption Mode</Label>
                <Select 
                  value={encryptionMode}
                  onValueChange={handleEncryptionModeChange}
                  disabled={!postQuantumEnabled}
                >
                  <SelectTrigger id="encryption-mode">
                    <SelectValue placeholder="Select encryption mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hybrid">Hybrid Mode (Kyber + X25519)</SelectItem>
                    <SelectItem value="kyber-only">Kyber-Only Mode</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  {encryptionMode === 'hybrid' 
                    ? 'Hybrid mode provides both quantum resistance and classical security' 
                    : 'Kyber-only mode uses pure post-quantum cryptography'}
                </p>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="bg-primary/5 p-4 rounded-md border border-primary/10">
                <h4 className="font-medium mb-2 flex items-center">
                  <Fingerprint className="h-4 w-4 mr-1 text-primary" />
                  Why Post-Quantum Encryption?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Quantum computers threaten current encryption standards. 
                  Kyber is a NIST-approved post-quantum algorithm that protects against 
                  future quantum computing attacks while maintaining performance.
                </p>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="font-medium mb-3">Tunnel Encryption Status</h4>
            <div className="bg-muted rounded-md overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/70">
                  <tr>
                    <th className="text-left p-3 font-medium">Tunnel Name</th>
                    <th className="text-left p-3 font-medium">Kyber Support</th>
                    <th className="text-left p-3 font-medium">Current Encryption</th>
                    <th className="text-left p-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tunnelStatus.map((tunnel, index) => (
                    <tr key={index} className={index < tunnelStatus.length - 1 ? "border-b border-border/30" : ""}>
                      <td className="p-3">{tunnel.name}</td>
                      <td className="p-3">
                        {tunnel.status === 'supported' ? (
                          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                            <Check className="h-3 w-3 mr-1" /> Supported
                          </Badge>
                        ) : tunnel.status === 'pending-upgrade' ? (
                          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                            <AlertTriangle className="h-3 w-3 mr-1" /> Pending Upgrade
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-slate-500/10 text-slate-500 border-slate-500/20">
                            <WifiOff className="h-3 w-3 mr-1" /> Not Supported
                          </Badge>
                        )}
                      </td>
                      <td className="p-3">
                        {tunnel.encryption === 'standard' ? (
                          <span>Standard (X25519)</span>
                        ) : tunnel.encryption === 'hybrid' ? (
                          <span className="text-primary font-medium">Hybrid (Kyber + X25519)</span>
                        ) : (
                          <span className="text-purple-500 font-medium">Kyber-Only</span>
                        )}
                      </td>
                      <td className="p-3">
                        {tunnel.status === 'supported' && tunnel.encryption !== 'standard' ? (
                          <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>  
                        ) : tunnel.status === 'supported' ? (
                          <Badge variant="outline">Ready</Badge>
                        ) : tunnel.status === 'pending-upgrade' ? (
                          <Badge variant="outline" className="border-amber-200 text-amber-700">Upgrade Required</Badge>
                        ) : (
                          <Badge variant="outline" className="border-slate-200 text-slate-700">Unavailable</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {!postQuantumEnabled && (
              <p className="text-xs text-muted-foreground mt-2">
                Enable post-quantum encryption to activate Kyber on supported tunnels
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityAccessTab;
