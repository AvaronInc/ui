import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Download, RefreshCw, Search, Shield, Smartphone, Users, FileText, Lock } from 'lucide-react';
import { GenerateAppDialog, MfaAppOptions } from './GenerateAppDialog';
import { AuthenticatorTable } from './AuthenticatorTable';
import { MFAStatusDashboard } from './MFAStatusDashboard';
import { MFASessionsTable } from './MFASessionsTable';
import { MfaDeploymentStatus } from '@/types/identity';
import { useToast } from '@/hooks/use-toast';

export type MfaAppDeployment = {
  id: string;
  userId: string;
  userName: string;
  email: string;
  deviceType: 'Android' | 'iOS';
  assignedDate: string; 
  lastUsed: string | null;
  downloadLink: string | null;
  linkExpiry: string | null;
  status: MfaDeploymentStatus;
  kyberCertHash: string;
};

export type MFASession = {
  id: string;
  userId: string;
  userName: string;
  deviceId: string;
  deviceModel: string;
  deviceType: 'Android' | 'iOS';
  loginTime: string;
  lastActivity: string;
  ipAddress: string;
  riskScore: number;
  status: 'active' | 'suspicious' | 'locked';
};

const MOCK_SESSIONS: MFASession[] = [
  {
    id: 'session-1',
    userId: 'user-1',
    userName: 'Admin User',
    deviceId: 'device-123',
    deviceModel: 'Samsung Galaxy S22',
    deviceType: 'Android',
    loginTime: new Date(Date.now() - 120 * 60 * 1000).toISOString(), // 2 hours ago
    lastActivity: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
    ipAddress: '192.168.1.45',
    riskScore: 15,
    status: 'active'
  },
  {
    id: 'session-2',
    userId: 'user-2',
    userName: 'John Engineer',
    deviceId: 'device-456',
    deviceModel: 'iPhone 13 Pro',
    deviceType: 'iOS',
    loginTime: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1 hour ago
    lastActivity: new Date(Date.now() - 12 * 60 * 1000).toISOString(), // 12 minutes ago
    ipAddress: '10.0.1.25',
    riskScore: 25,
    status: 'active'
  },
  {
    id: 'session-3',
    userId: 'user-4',
    userName: 'Security Admin',
    deviceId: 'device-789',
    deviceModel: 'Google Pixel 6',
    deviceType: 'Android',
    loginTime: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
    lastActivity: new Date(Date.now() - 2 * 60 * 1000).toISOString(), // 2 minutes ago
    ipAddress: '172.16.254.1',
    riskScore: 5,
    status: 'active'
  },
  {
    id: 'session-4',
    userId: 'user-3',
    userName: 'Jane User',
    deviceId: 'device-321',
    deviceModel: 'iPhone 12',
    deviceType: 'iOS',
    loginTime: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    lastActivity: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 minutes ago
    ipAddress: '198.51.100.42',
    riskScore: 68,
    status: 'suspicious'
  },
];

const AuthenticatorPanel = () => {
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('deployments');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [mfaDeployments, setMfaDeployments] = useState<MfaAppDeployment[]>([
    {
      id: 'deploy-1',
      userId: 'user-1',
      userName: 'Admin User',
      email: 'admin@example.com',
      deviceType: 'Android',
      assignedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
      lastUsed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      downloadLink: null,
      linkExpiry: null,
      status: 'active',
      kyberCertHash: '4a51cde8f3ce7c290fd77670891583f4',
    },
    {
      id: 'deploy-2',
      userId: 'user-2',
      userName: 'John Engineer',
      email: 'john@example.com',
      deviceType: 'iOS',
      assignedDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
      lastUsed: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      downloadLink: null,
      linkExpiry: null,
      status: 'active',
      kyberCertHash: '2b38ade4b5fa9c170fd77e4089158321',
    },
    {
      id: 'deploy-3',
      userId: 'user-4',
      userName: 'Security Admin',
      email: 'security@example.com',
      deviceType: 'Android',
      assignedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
      lastUsed: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      downloadLink: null,
      linkExpiry: null,
      status: 'active',
      kyberCertHash: '3c49ade8f5ea7b170fd33e408915835c',
    },
    {
      id: 'deploy-4',
      userId: 'user-3',
      userName: 'Jane User',
      email: 'jane@example.com',
      deviceType: 'iOS',
      assignedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      downloadLink: 'https://secure.avaron.ai/apk/d5e8c2f1',
      linkExpiry: new Date(Date.now() + 25 * 60 * 1000).toISOString(), // expires in 25 minutes
      lastUsed: null,
      status: 'pending',
      kyberCertHash: null,
    },
  ]);

  const [sessions, setSessions] = useState<MFASession[]>(MOCK_SESSIONS);

  const handleGenerateLink = (userId: string, deviceType: 'Android' | 'iOS', options: MfaAppOptions) => {
    setIsLoading(true);
    
    setTimeout(() => {
      const userIndex = mfaDeployments.findIndex(d => d.userId === userId);
      const updatedDeployments = [...mfaDeployments];
      
      const expiryDate = new Date(Date.now() + options.expiryHours * 60 * 60 * 1000);
      
      if (userIndex >= 0) {
        updatedDeployments[userIndex] = {
          ...updatedDeployments[userIndex],
          deviceType,
          downloadLink: `https://secure.avaron.ai/apk/${Math.random().toString(36).substring(2, 10)}`,
          linkExpiry: expiryDate.toISOString(),
          status: 'pending'
        };
      } else {
        toast({
          title: "User not found",
          description: "The selected user does not exist in the system.",
          variant: "destructive"
        });
      }
      
      setMfaDeployments(updatedDeployments);
      setIsLoading(false);
      setIsGenerateDialogOpen(false);
      
      toast({
        title: "Link Generated Successfully",
        description: `MFA app download link has been created and will expire in ${options.expiryHours} hours.`,
      });
    }, 1500);
  };

  const handleRevokeApp = (deploymentId: string) => {
    setIsLoading(true);
    
    setTimeout(() => {
      const updatedDeployments = mfaDeployments.map(d => {
        if (d.id === deploymentId) {
          return {
            ...d,
            status: 'revoked' as MfaDeploymentStatus,
            lastUsed: null
          };
        }
        return d;
      });
      
      setMfaDeployments(updatedDeployments);
      setIsLoading(false);
      
      toast({
        title: "MFA App Revoked",
        description: "The MFA application access has been successfully revoked.",
      });
    }, 1000);
  };

  const handleResetLink = (deploymentId: string) => {
    setIsLoading(true);
    
    setTimeout(() => {
      const deploymentIndex = mfaDeployments.findIndex(d => d.id === deploymentId);
      
      if (deploymentIndex >= 0) {
        const updatedDeployments = [...mfaDeployments];
        updatedDeployments[deploymentIndex] = {
          ...updatedDeployments[deploymentIndex],
          downloadLink: `https://secure.avaron.ai/apk/${Math.random().toString(36).substring(2, 10)}`,
          linkExpiry: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes from now
          status: 'pending'
        };
        
        setMfaDeployments(updatedDeployments);
        
        toast({
          title: "Link Reset Successfully",
          description: "A new download link has been generated and will expire in 30 minutes.",
        });
      }
      
      setIsLoading(false);
    }, 1000);
  };

  const handleTerminateSession = (sessionId: string) => {
    setIsLoading(true);
    
    setTimeout(() => {
      const updatedSessions = sessions.filter(s => s.id !== sessionId);
      setSessions(updatedSessions);
      setIsLoading(false);
      
      toast({
        title: "Session Terminated",
        description: "The user's MFA session has been successfully terminated.",
      });
    }, 1000);
  };

  const handleLockDevice = (sessionId: string, deviceId: string) => {
    setIsLoading(true);
    
    setTimeout(() => {
      const updatedSessions = sessions.map(s => {
        if (s.id === sessionId) {
          return {
            ...s,
            status: 'locked' as const
          };
        }
        return s;
      });
      
      setSessions(updatedSessions);
      setIsLoading(false);
      
      toast({
        title: "Device Locked",
        description: "The device has been locked and will require re-verification.",
      });
    }, 1000);
  };

  const handleForceMFAReset = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const updatedDeployments = mfaDeployments.map(d => {
        if (d.status === 'active') {
          return {
            ...d,
            status: 'revoked' as MfaDeploymentStatus
          };
        }
        return d;
      });
      
      setMfaDeployments(updatedDeployments);
      setIsLoading(false);
      
      toast({
        title: "MFA Force Reset",
        description: "All active MFA apps have been revoked. Users will need to re-enroll.",
        variant: "destructive"
      });
    }, 1500);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Data Refreshed",
        description: "MFA app deployment information has been updated.",
      });
    }, 1000);
  };

  const filteredDeployments = mfaDeployments.filter(
    deployment => 
      deployment.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deployment.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSessions = sessions.filter(
    session => 
      session.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.deviceModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.ipAddress.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center">
                <Shield className="mr-2 h-6 w-6 text-primary" />
                MFA Authenticator Management
              </CardTitle>
              <CardDescription className="mt-2">
                Generate and manage secure APK authentication apps with biometric encryption for enhanced security.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleRefresh}
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button 
                size="sm" 
                onClick={() => setIsGenerateDialogOpen(true)}
              >
                <Smartphone className="h-4 w-4 mr-1" />
                Generate MFA App
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="deployments" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="deployments" className="flex items-center">
                <Smartphone className="h-4 w-4 mr-2" />
                MFA App Deployments
              </TabsTrigger>
              <TabsTrigger value="dashboard" className="flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                Security Dashboard
              </TabsTrigger>
              <TabsTrigger value="sessions" className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Active Sessions
              </TabsTrigger>
              <TabsTrigger value="logs" className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Audit Logs
              </TabsTrigger>
            </TabsList>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center w-full max-w-sm">
                <Search className="h-4 w-4 mr-2 text-muted-foreground" />
                <Input 
                  placeholder={activeTab === 'sessions' ? "Search by user, device or IP..." : "Search by user name or email..."} 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex items-center gap-2">
                {activeTab === 'dashboard' && (
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={handleForceMFAReset}
                    disabled={isLoading}
                  >
                    <Lock className="h-4 w-4 mr-1" />
                    Force MFA Reset
                  </Button>
                )}
                {activeTab === 'deployments' && (
                  <div className="text-sm text-muted-foreground flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Links expire in 30 minutes</span>
                  </div>
                )}
              </div>
            </div>
            
            <TabsContent value="deployments" className="m-0">
              <AuthenticatorTable 
                deployments={filteredDeployments}
                onGenerateLink={() => setIsGenerateDialogOpen(true)}
                onResetLink={handleResetLink}
                onRevokeApp={handleRevokeApp}
                isLoading={isLoading}
              />
            </TabsContent>
            
            <TabsContent value="dashboard" className="m-0">
              <MFAStatusDashboard 
                deployments={mfaDeployments}
                isLoading={isLoading}
                onRefresh={handleRefresh}
              />
            </TabsContent>
            
            <TabsContent value="sessions" className="m-0">
              <MFASessionsTable 
                sessions={filteredSessions}
                isLoading={isLoading}
                onTerminateSession={handleTerminateSession}
                onLockDevice={handleLockDevice}
              />
            </TabsContent>
            
            <TabsContent value="logs" className="m-0">
              <div className="bg-muted/50 rounded-md p-8 flex flex-col items-center justify-center">
                <FileText className="h-10 w-10 text-muted-foreground mb-2" />
                <h3 className="text-lg font-medium">Authentication Audit Logs</h3>
                <p className="text-sm text-muted-foreground mb-4">Detailed logs of all MFA authentication activity</p>
                <Button>View Full Audit Logs</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <GenerateAppDialog 
        open={isGenerateDialogOpen} 
        onOpenChange={setIsGenerateDialogOpen}
        onGenerate={handleGenerateLink}
        existingDeployments={mfaDeployments}
      />
    </div>
  );
};

export default AuthenticatorPanel;
