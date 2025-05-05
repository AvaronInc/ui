
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { UserCheck, Users, Shield, Lock, FileText, Fingerprint, AlertOctagon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ZeroTrustNetworkingPanel: React.FC = () => {
  const { toast } = useToast();
  const [zeroTrustEnabled, setZeroTrustEnabled] = useState(true);
  const [quorumLevel, setQuorumLevel] = useState(2);
  const [mfaRequired, setMfaRequired] = useState(true);
  
  const toggleZeroTrust = () => {
    setZeroTrustEnabled(!zeroTrustEnabled);
    toast({
      title: zeroTrustEnabled ? "Zero Trust Networking Disabled" : "Zero Trust Networking Enabled",
      description: zeroTrustEnabled 
        ? "Traditional network access controls are now in effect." 
        : "Zero Trust Networking is now enforcing identity verification for all access.",
    });
  };
  
  const toggleMfa = () => {
    setMfaRequired(!mfaRequired);
    toast({
      title: mfaRequired ? "MFA Requirement Disabled" : "MFA Requirement Enabled",
      description: mfaRequired 
        ? "Multi-factor authentication is now optional." 
        : "Multi-factor authentication is now required for all access.",
    });
  };
  
  const accessAttempts = [
    {
      id: 1,
      username: "robert.smith",
      accessPoint: "HR Database",
      timestamp: "2023-07-15 15:42:18",
      verificationStatus: "verified",
      grantedAccess: true
    },
    {
      id: 2,
      username: "jane.doe",
      accessPoint: "Financial Records",
      timestamp: "2023-07-15 14:15:32",
      verificationStatus: "verified",
      grantedAccess: true
    },
    {
      id: 3,
      username: "guest.user",
      accessPoint: "Customer Database",
      timestamp: "2023-07-15 13:22:47",
      verificationStatus: "failed",
      grantedAccess: false
    },
    {
      id: 4,
      username: "john.tech",
      accessPoint: "Network Config",
      timestamp: "2023-07-15 11:05:33",
      verificationStatus: "verified",
      grantedAccess: true
    }
  ];
  
  const getVerificationBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Verified</Badge>;
      case 'failed':
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const getAccessBadge = (granted: boolean) => {
    return granted 
      ? <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Granted</Badge>
      : <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">Denied</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Zero Trust Settings Card */}
        <Card className="md:col-span-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-primary" />
              Zero Trust Networking (ZTN) Enforcement
            </CardTitle>
            <CardDescription>
              Requires identity verification before allowing access to network segments
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Zero Trust Enforcement</h4>
                <p className="text-sm text-muted-foreground">Enforce identity verification for all network access</p>
              </div>
              <Switch checked={zeroTrustEnabled} onCheckedChange={toggleZeroTrust} />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Vertex Quorum Required</h4>
                  <p className="text-sm text-muted-foreground">Number of Vertex nodes required for authentication</p>
                </div>
                <span className="font-medium">{quorumLevel} nodes</span>
              </div>
              <Slider 
                disabled={!zeroTrustEnabled}
                value={[quorumLevel]} 
                min={1}
                max={5}
                step={1}
                onValueChange={(value) => setQuorumLevel(value[0])}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Multi-Factor Authentication</h4>
                <p className="text-sm text-muted-foreground">
                  Require MFA for network segment access
                </p>
              </div>
              <Switch 
                checked={mfaRequired} 
                onCheckedChange={toggleMfa}
                disabled={!zeroTrustEnabled}
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
              <div className="border rounded-md p-4 flex items-start space-x-3">
                <div className="mt-0.5">
                  <Shield className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-medium">Segment-Based Access Control</h4>
                  <p className="text-sm text-muted-foreground">Configure access rules per network segment</p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-sm mt-1"
                    disabled={!zeroTrustEnabled}
                  >
                    Configure Segments
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-md p-4 flex items-start space-x-3">
                <div className="mt-0.5">
                  <Fingerprint className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <h4 className="font-medium">Identity Providers</h4>
                  <p className="text-sm text-muted-foreground">Manage trusted identity providers</p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-sm mt-1"
                    disabled={!zeroTrustEnabled}
                  >
                    Manage Providers
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <Button variant="outline" disabled={!zeroTrustEnabled}>
                Test Configuration
              </Button>
              <Button disabled={!zeroTrustEnabled}>
                Apply Settings
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Status Card */}
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Access Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-3">
                <div className="text-sm font-medium mb-1">Total Attempts</div>
                <div className="text-2xl font-bold">286</div>
                <div className="text-xs text-muted-foreground mt-1">Last 24 hours</div>
              </div>
              
              <div className="border rounded-lg p-3">
                <div className="text-sm font-medium mb-1">Verified</div>
                <div className="text-2xl font-bold">254</div>
                <div className="text-xs text-muted-foreground mt-1">89% success rate</div>
              </div>
              
              <div className="border rounded-lg p-3">
                <div className="text-sm font-medium mb-1">Access Denied</div>
                <div className="text-2xl font-bold">32</div>
                <div className="text-xs text-muted-foreground mt-1">11% denial rate</div>
              </div>
              
              <div className="border rounded-lg p-3">
                <div className="text-sm font-medium mb-1">Current Status</div>
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-green-500" />
                  <span className="text-xl font-bold">Secure</span>
                </div>
              </div>
            </div>
            
            <Button variant="outline" className="w-full">
              View Access Logs
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Access Attempts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Access Attempts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Access Point</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Verification</TableHead>
                <TableHead>Access</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accessAttempts.map(attempt => (
                <TableRow key={attempt.id}>
                  <TableCell>{attempt.username}</TableCell>
                  <TableCell>{attempt.accessPoint}</TableCell>
                  <TableCell>{attempt.timestamp}</TableCell>
                  <TableCell>{getVerificationBadge(attempt.verificationStatus)}</TableCell>
                  <TableCell>{getAccessBadge(attempt.grantedAccess)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ZeroTrustNetworkingPanel;
