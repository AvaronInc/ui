
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Fingerprint, KeyRound, Layers } from 'lucide-react';
import MfaSettings from '../components/MfaSettings';
import CertificateManagement from '../components/CertificateManagement';
import SessionManagement from '../components/SessionManagement';

const AuthenticationTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Authentication & Security Settings</h2>
      
      <Card className="bg-muted/40">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
            <Shield className="h-12 w-12 text-primary flex-shrink-0" />
            <div>
              <h3 className="text-lg font-medium">Zero-Trust Security Framework</h3>
              <p className="text-sm text-muted-foreground">
                Your identity management system is configured with Zero-Trust principles. This means every access 
                request is fully verified before granting access, regardless of where the connection originates from.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="mfa" className="w-full">
        <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-3">
          <TabsTrigger value="mfa" className="flex items-center gap-2">
            <Layers className="h-4 w-4" />
            <span>Multi-Factor Auth</span>
          </TabsTrigger>
          <TabsTrigger value="certificates" className="flex items-center gap-2">
            <KeyRound className="h-4 w-4" />
            <span>Certificates</span>
          </TabsTrigger>
          <TabsTrigger value="sessions" className="flex items-center gap-2">
            <Fingerprint className="h-4 w-4" />
            <span>Sessions</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="mfa" className="mt-6">
          <MfaSettings />
        </TabsContent>
        
        <TabsContent value="certificates" className="mt-6">
          <CertificateManagement />
        </TabsContent>
        
        <TabsContent value="sessions" className="mt-6">
          <SessionManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthenticationTab;
