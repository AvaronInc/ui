
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Smartphone, Tablet, Laptop, ShieldCheck, Link as LinkIcon } from 'lucide-react';
import { MfaAppDeployment } from './AuthenticatorPanel';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';

interface GenerateAppDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGenerate: (userId: string, deviceType: 'Android' | 'iOS', options: MfaAppOptions) => void;
  existingDeployments: MfaAppDeployment[];
}

export interface MfaAppOptions {
  requireDeviceVerification: boolean;
  restrictToCompanyDevices: boolean;
  enforceStrongBiometrics: boolean;
  expiryHours: number;
}

export const GenerateAppDialog: React.FC<GenerateAppDialogProps> = ({
  open,
  onOpenChange,
  onGenerate,
  existingDeployments
}) => {
  const [userId, setUserId] = useState('');
  const [deviceType, setDeviceType] = useState<'Android' | 'iOS'>('Android');
  const [options, setOptions] = useState<MfaAppOptions>({
    requireDeviceVerification: true,
    restrictToCompanyDevices: false,
    enforceStrongBiometrics: true,
    expiryHours: 0.5, // 30 minutes
  });
  
  // Mock data for users
  const users = [
    { id: 'user-1', name: 'Admin User', email: 'admin@example.com' },
    { id: 'user-2', name: 'John Engineer', email: 'john@example.com' },
    { id: 'user-3', name: 'Jane User', email: 'jane@example.com' },
    { id: 'user-4', name: 'Security Admin', email: 'security@example.com' },
    { id: 'user-5', name: 'Revoked User', email: 'revoked@example.com' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userId && deviceType) {
      onGenerate(userId, deviceType, options);
    }
  };

  const handleClose = () => {
    setUserId('');
    setDeviceType('Android');
    setOptions({
      requireDeviceVerification: true,
      restrictToCompanyDevices: false,
      enforceStrongBiometrics: true,
      expiryHours: 0.5,
    });
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Smartphone className="mr-2 h-5 w-5" />
              Generate MFA Authenticator App
            </DialogTitle>
            <DialogDescription>
              Generate a secure download link for the selected user. The link will expire in 30 minutes.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="user">Select User</Label>
              <Select
                value={userId}
                onValueChange={setUserId}
              >
                <SelectTrigger id="user">
                  <SelectValue placeholder="Select a user" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name} ({user.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label>Device Type</Label>
              <RadioGroup 
                defaultValue="Android" 
                value={deviceType}
                onValueChange={(value) => setDeviceType(value as 'Android' | 'iOS')}
                className="flex"
              >
                <div className="flex items-center space-x-2 mr-4">
                  <RadioGroupItem value="Android" id="android" />
                  <Label htmlFor="android" className="flex items-center">
                    <Smartphone className="mr-2 h-4 w-4" />
                    Android
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="iOS" id="ios" />
                  <Label htmlFor="ios" className="flex items-center">
                    <Tablet className="mr-2 h-4 w-4" />
                    iOS
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="border rounded-md p-3">
              <h4 className="font-medium mb-2 text-sm flex items-center">
                <ShieldCheck className="h-4 w-4 mr-1 text-primary" />
                Security Options
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="device-verification" className="text-sm">Require Device Verification</Label>
                    <p className="text-xs text-muted-foreground">User must prove device ownership</p>
                  </div>
                  <Switch 
                    id="device-verification" 
                    checked={options.requireDeviceVerification}
                    onCheckedChange={(checked) => setOptions({...options, requireDeviceVerification: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="company-devices" className="text-sm">Restrict to Company Devices</Label>
                    <p className="text-xs text-muted-foreground">Only allow install on registered devices</p>
                  </div>
                  <Switch 
                    id="company-devices" 
                    checked={options.restrictToCompanyDevices}
                    onCheckedChange={(checked) => setOptions({...options, restrictToCompanyDevices: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="strong-biometrics" className="text-sm">Enforce Strong Biometrics</Label>
                    <p className="text-xs text-muted-foreground">Require highest level of biometric security</p>
                  </div>
                  <Switch 
                    id="strong-biometrics" 
                    checked={options.enforceStrongBiometrics}
                    onCheckedChange={(checked) => setOptions({...options, enforceStrongBiometrics: checked})}
                  />
                </div>
                
                <div className="pt-2">
                  <Label htmlFor="link-expiry" className="text-sm">Link Expiry Time</Label>
                  <Select
                    value={options.expiryHours.toString()}
                    onValueChange={(value) => setOptions({...options, expiryHours: parseFloat(value)})}
                  >
                    <SelectTrigger id="link-expiry" className="mt-1">
                      <SelectValue placeholder="Select expiry time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.5">30 minutes</SelectItem>
                      <SelectItem value="1">1 hour</SelectItem>
                      <SelectItem value="4">4 hours</SelectItem>
                      <SelectItem value="24">24 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="bg-muted rounded-md p-3 text-sm">
              <p className="font-medium mb-1">Important Security Information:</p>
              <ul className="list-disc pl-4 space-y-1 text-xs">
                <li>The app will be configured for biometric authentication</li>
                <li>A unique Kyber Certificate will be generated for the user</li>
                <li>The APK will be digitally signed for security validation</li>
                <li>The link will automatically expire after the selected time</li>
                {options.restrictToCompanyDevices && (
                  <li className="text-primary">Device binding enforced: Only registered company devices allowed</li>
                )}
              </ul>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!userId || !deviceType}>
              Generate Secure Link
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
