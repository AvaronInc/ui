
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
import { Smartphone, Android, Apple } from 'lucide-react';
import { MfaAppDeployment } from './AuthenticatorPanel';

interface GenerateAppDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGenerate: (userId: string, deviceType: 'Android' | 'iOS') => void;
  existingDeployments: MfaAppDeployment[];
}

export const GenerateAppDialog: React.FC<GenerateAppDialogProps> = ({
  open,
  onOpenChange,
  onGenerate,
  existingDeployments
}) => {
  const [userId, setUserId] = useState('');
  const [deviceType, setDeviceType] = useState<'Android' | 'iOS'>('Android');
  
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
      onGenerate(userId, deviceType);
    }
  };

  const handleClose = () => {
    setUserId('');
    setDeviceType('Android');
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
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
                    <Android className="mr-2 h-4 w-4" />
                    Android
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="iOS" id="ios" />
                  <Label htmlFor="ios" className="flex items-center">
                    <Apple className="mr-2 h-4 w-4" />
                    iOS
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="bg-muted rounded-md p-3 text-sm">
              <p className="font-medium mb-1">Important Security Information:</p>
              <ul className="list-disc pl-4 space-y-1 text-xs">
                <li>The app will be configured for biometric authentication</li>
                <li>A unique Kyber Certificate will be generated for the user</li>
                <li>The APK will be digitally signed for security validation</li>
                <li>The link will automatically expire after 30 minutes</li>
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
