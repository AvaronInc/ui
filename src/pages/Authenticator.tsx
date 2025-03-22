
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Home, Shield, ClipboardList, Smartphone } from 'lucide-react';
import PageTransition from '@/components/transitions/PageTransition';
import AuthenticatorPanel from '@/components/identity/authenticator/AuthenticatorPanel';
import AuthenticatorAuditLogs from '@/components/identity/authenticator/AuthenticatorAuditLogs';

const Authenticator = () => {
  const [activeTab, setActiveTab] = useState('mfa-management');

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="container py-6 space-y-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <Home className="h-4 w-4 mr-1" />
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/identity">
                  Identity Management
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Authenticator Management</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Tabs defaultValue="mfa-management" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start border-b pb-0">
              <TabsTrigger value="mfa-management" className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                <span>MFA App Management</span>
              </TabsTrigger>
              <TabsTrigger value="audit-logs" className="flex items-center gap-2">
                <ClipboardList className="h-4 w-4" />
                <span>Audit Logs</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="mfa-management" className="mt-6">
              <AuthenticatorPanel />
            </TabsContent>
            
            <TabsContent value="audit-logs" className="mt-6">
              <AuthenticatorAuditLogs />
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default Authenticator;
