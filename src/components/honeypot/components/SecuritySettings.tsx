
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Lock, Shield, Save } from 'lucide-react';

export const SecuritySettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-md font-medium flex items-center gap-2">
          <Lock className="h-4 w-4" />
          Access Control
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="admin-access">Admin Access Level</Label>
              <Select defaultValue="full">
                <SelectTrigger id="admin-access">
                  <SelectValue placeholder="Select access level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="read">Read Only</SelectItem>
                  <SelectItem value="limited">Limited Control</SelectItem>
                  <SelectItem value="full">Full Control</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="operator-access">Operator Access Level</Label>
              <Select defaultValue="limited">
                <SelectTrigger id="operator-access">
                  <SelectValue placeholder="Select access level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="read">Read Only</SelectItem>
                  <SelectItem value="limited">Limited Control</SelectItem>
                  <SelectItem value="full">Full Control</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="mfa" defaultChecked />
            <Label htmlFor="mfa">Require MFA for honeypot management</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="audit" defaultChecked />
            <Label htmlFor="audit">Enable comprehensive audit logging for all management actions</Label>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-md font-medium flex items-center gap-2">
          <Shield className="h-4 w-4" />
          Infrastructure Security
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Encrypted Communications</Label>
                <p className="text-xs text-muted-foreground">Use TLS for all honeypot communications</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Isolated Network</Label>
                <p className="text-xs text-muted-foreground">Separate honeypot traffic from production</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Anti-fingerprinting</Label>
                <p className="text-xs text-muted-foreground">Hide honeypot signatures from attackers</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Automatic Updates</Label>
                <p className="text-xs text-muted-foreground">Keep honeypot software current</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ip-range">Protected IP Ranges (never deploy honeypots)</Label>
            <Input id="ip-range" defaultValue="10.0.1.0/24, 10.0.2.0/24" />
            <p className="text-xs text-muted-foreground">Comma-separated list of CIDR ranges</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="encryption-key">Encryption Key Rotation</Label>
            <Select defaultValue="90">
              <SelectTrigger id="encryption-key">
                <SelectValue placeholder="Select rotation period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="60">60 days</SelectItem>
                <SelectItem value="90">90 days</SelectItem>
                <SelectItem value="180">180 days</SelectItem>
                <SelectItem value="365">1 year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="pt-4 flex justify-end">
        <Button className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save Security Settings
        </Button>
      </div>
    </div>
  );
};
