
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Fingerprint, Key, EyeOff, User, UserPlus, UserCheck } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface IdentityAccessControlProps {
  disabled?: boolean;
}

const IdentityAccessControl = ({ disabled }: IdentityAccessControlProps) => {
  const [mfaRequired, setMfaRequired] = useState(true);
  const [bioAuthEnabled, setBioAuthEnabled] = useState(true);
  const [contextualAccessEnabled, setContextualAccessEnabled] = useState(true);
  const [deviceTrustEnabled, setDeviceTrustEnabled] = useState(true);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Fingerprint className="h-5 w-5 text-primary" />
            Strict Identity-Based Access Control
          </CardTitle>
          <CardDescription>
            Configure how users are verified before being granted access to resources
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="mfa-toggle" className="font-medium">Multi-Factor Authentication Required</Label>
                  <p className="text-sm text-muted-foreground">Require MFA for all access requests</p>
                </div>
                <Switch 
                  id="mfa-toggle" 
                  checked={mfaRequired} 
                  onCheckedChange={setMfaRequired}
                  disabled={disabled}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="bio-toggle" className="font-medium">Biometric Authentication</Label>
                  <p className="text-sm text-muted-foreground">Use fingerprint or facial recognition when available</p>
                </div>
                <Switch 
                  id="bio-toggle" 
                  checked={bioAuthEnabled} 
                  onCheckedChange={setBioAuthEnabled}
                  disabled={disabled}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="contextual-toggle" className="font-medium">Contextual Access Evaluation</Label>
                  <p className="text-sm text-muted-foreground">Analyze time, location, and device information</p>
                </div>
                <Switch 
                  id="contextual-toggle" 
                  checked={contextualAccessEnabled} 
                  onCheckedChange={setContextualAccessEnabled}
                  disabled={disabled}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="device-toggle" className="font-medium">Device Trust Verification</Label>
                  <p className="text-sm text-muted-foreground">Verify device security posture before granting access</p>
                </div>
                <Switch 
                  id="device-toggle" 
                  checked={deviceTrustEnabled} 
                  onCheckedChange={setDeviceTrustEnabled}
                  disabled={disabled}
                />
              </div>
            </div>
            
            <Card className="border-dashed">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Verification Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between pb-1 border-b">
                    <span className="font-medium text-sm">Critical Systems</span>
                    <div className="flex gap-1">
                      <Badge variant="outline" className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">MFA</Badge>
                      <Badge variant="outline" className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">Bio</Badge>
                      <Badge variant="outline" className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">Device</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pb-1 border-b">
                    <span className="font-medium text-sm">Financial Systems</span>
                    <div className="flex gap-1">
                      <Badge variant="outline" className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">MFA</Badge>
                      <Badge variant="outline" className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">Bio</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pb-1 border-b">
                    <span className="font-medium text-sm">User Data</span>
                    <div className="flex gap-1">
                      <Badge variant="outline" className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">MFA</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">Standard Access</span>
                    <div className="flex gap-1">
                      <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">Password</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="pt-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-sm font-medium">Identity Providers Integration</h4>
              <Button size="sm" variant="outline" disabled={disabled}>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Provider
              </Button>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Provider</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>MFA Support</TableHead>
                  <TableHead>User Count</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <UserCheck className="h-4 w-4 mr-2 text-blue-500" />
                      Azure AD
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Connected</Badge>
                  </TableCell>
                  <TableCell>Yes (TOTP, SMS)</TableCell>
                  <TableCell>248</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" disabled={disabled}>Configure</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-amber-500" />
                      Okta
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Connected</Badge>
                  </TableCell>
                  <TableCell>Yes (TOTP, Push)</TableCell>
                  <TableCell>186</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" disabled={disabled}>Configure</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Key className="h-4 w-4 mr-2 text-green-500" />
                      Local LDAP
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Connected</Badge>
                  </TableCell>
                  <TableCell>Limited (TOTP only)</TableCell>
                  <TableCell>65</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" disabled={disabled}>Configure</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IdentityAccessControl;
