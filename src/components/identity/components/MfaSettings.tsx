
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { InfoIcon, Smartphone, Key, FingerPrint, UserCheck } from 'lucide-react';

const MfaSettings: React.FC = () => {
  const [requireMfa, setRequireMfa] = useState({
    admin: true,
    engineer: true,
    user: false
  });
  
  const [allowedMethods, setAllowedMethods] = useState({
    app: true,
    sms: true,
    email: true,
    hardware: true,
    biometric: true
  });
  
  const roleSettings = [
    { 
      role: 'Admin', 
      required: requireMfa.admin,
      setRequired: (value: boolean) => setRequireMfa({ ...requireMfa, admin: value }),
      description: 'Administrative users with full system access'
    },
    { 
      role: 'Engineer', 
      required: requireMfa.engineer,
      setRequired: (value: boolean) => setRequireMfa({ ...requireMfa, engineer: value }),
      description: 'Technical staff with elevated permissions'
    },
    { 
      role: 'User', 
      required: requireMfa.user,
      setRequired: (value: boolean) => setRequireMfa({ ...requireMfa, user: value }),
      description: 'Standard users with basic permissions'
    }
  ];
  
  const mfaMethods = [
    {
      name: 'Authenticator App',
      key: 'app',
      enabled: allowedMethods.app,
      setEnabled: (value: boolean) => setAllowedMethods({ ...allowedMethods, app: value }),
      icon: <Smartphone className="h-4 w-4 mr-2" />,
      description: 'Time-based one-time passwords (TOTP)'
    },
    {
      name: 'SMS Verification',
      key: 'sms',
      enabled: allowedMethods.sms,
      setEnabled: (value: boolean) => setAllowedMethods({ ...allowedMethods, sms: value }),
      icon: <Smartphone className="h-4 w-4 mr-2" />,
      description: 'One-time codes sent via text message'
    },
    {
      name: 'Email Verification',
      key: 'email',
      enabled: allowedMethods.email,
      setEnabled: (value: boolean) => setAllowedMethods({ ...allowedMethods, email: value }),
      icon: <InfoIcon className="h-4 w-4 mr-2" />,
      description: 'One-time codes sent via email'
    },
    {
      name: 'Hardware Token',
      key: 'hardware',
      enabled: allowedMethods.hardware,
      setEnabled: (value: boolean) => setAllowedMethods({ ...allowedMethods, hardware: value }),
      icon: <Key className="h-4 w-4 mr-2" />,
      description: 'FIDO2/WebAuthn hardware security keys'
    },
    {
      name: 'Biometric Authentication',
      key: 'biometric',
      enabled: allowedMethods.biometric,
      setEnabled: (value: boolean) => setAllowedMethods({ ...allowedMethods, biometric: value }),
      icon: <FingerPrint className="h-4 w-4 mr-2" />,
      description: 'Fingerprint, Face ID, or other biometric methods'
    }
  ];
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <UserCheck className="h-5 w-5 mr-2 text-primary" />
            Role-Based MFA Requirements
          </h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Require MFA</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roleSettings.map((setting) => (
                <TableRow key={setting.role}>
                  <TableCell className="font-medium">
                    <Badge variant="outline">{setting.role}</Badge>
                  </TableCell>
                  <TableCell>{setting.description}</TableCell>
                  <TableCell className="text-right">
                    <Switch 
                      checked={setting.required} 
                      onCheckedChange={setting.setRequired} 
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <Key className="h-5 w-5 mr-2 text-primary" />
            Allowed Authentication Methods
          </h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Method</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Enabled</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mfaMethods.map((method) => (
                <TableRow key={method.key}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      {method.icon}
                      {method.name}
                    </div>
                  </TableCell>
                  <TableCell>{method.description}</TableCell>
                  <TableCell className="text-right">
                    <Switch 
                      checked={method.enabled} 
                      onCheckedChange={method.setEnabled} 
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button>Save MFA Settings</Button>
      </div>
    </div>
  );
};

export default MfaSettings;
