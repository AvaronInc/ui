
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Shield, UserCheck, WifiOff } from 'lucide-react';

const SecurityAccessTab = () => {
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
            <UserCheck className="mr-2 h-5 w-5" />
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
          
          <div className="flex items-center justify-between">
            <Label htmlFor="remote-access">Remote User Access Configuration</Label>
            <Switch id="remote-access" defaultChecked />
          </div>
          
          <div className="space-y-2">
            <Label>Authentication Method</Label>
            <div className="flex space-x-2">
              <Button variant="outline" className="flex-1">Certificate</Button>
              <Button variant="outline" className="flex-1">Password</Button>
              <Button variant="outline" className="flex-1">Both</Button>
            </div>
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
    </div>
  );
};

export default SecurityAccessTab;
