
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Clock, Download, RefreshCw, Search, Shield, Smartphone } from 'lucide-react';
import { GenerateAppDialog } from './GenerateAppDialog';
import { AuthenticatorTable } from './AuthenticatorTable';
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

const AuthenticatorPanel = () => {
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock data for MFA app deployments
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

  const handleGenerateLink = (userId: string, deviceType: 'Android' | 'iOS') => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const userIndex = mfaDeployments.findIndex(d => d.userId === userId);
      const updatedDeployments = [...mfaDeployments];
      
      if (userIndex >= 0) {
        // Update existing deployment
        updatedDeployments[userIndex] = {
          ...updatedDeployments[userIndex],
          deviceType,
          downloadLink: `https://secure.avaron.ai/apk/${Math.random().toString(36).substring(2, 10)}`,
          linkExpiry: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes from now
          status: 'pending'
        };
      } else {
        // User doesn't have a deployment yet, we'd need to add them
        // This would typically come from the user list, but we're just mocking
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
        description: "MFA app download link has been created and will expire in 30 minutes.",
      });
    }, 1500);
  };

  const handleRevokeApp = (deploymentId: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const updatedDeployments = mfaDeployments.filter(d => d.id !== deploymentId);
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
    
    // Simulate API call delay
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

  const handleRefresh = () => {
    setIsLoading(true);
    
    // Simulate refresh delay
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Data Refreshed",
        description: "MFA app deployment information has been updated.",
      });
    }, 1000);
  };

  // Filter deployments based on search query
  const filteredDeployments = mfaDeployments.filter(
    deployment => 
      deployment.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deployment.email.toLowerCase().includes(searchQuery.toLowerCase())
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
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center w-full max-w-sm">
              <Search className="h-4 w-4 mr-2 text-muted-foreground" />
              <Input 
                placeholder="Search by user name or email..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm text-muted-foreground flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>Links expire in 30 minutes</span>
              </div>
            </div>
          </div>
          
          <AuthenticatorTable 
            deployments={filteredDeployments}
            onGenerateLink={() => setIsGenerateDialogOpen(true)}
            onResetLink={handleResetLink}
            onRevokeApp={handleRevokeApp}
            isLoading={isLoading}
          />
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
