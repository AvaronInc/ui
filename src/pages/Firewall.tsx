
import { useState } from 'react';
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbSeparator,
  BreadcrumbList,
  BreadcrumbPage
} from '@/components/ui/breadcrumb';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTransition from '@/components/transitions/PageTransition';
import FirewallManagement from '@/components/settings/FirewallManagement';

const Firewall = () => {
  return (
    <DashboardLayout>
      <PageTransition>
        <div className="flex flex-col p-6 h-full">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/security">Security</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Firewall</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="bg-card rounded-lg border shadow-sm">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">Firewall Management</h2>
            </div>
            <div className="p-4">
              <FirewallManagement />
            </div>
          </div>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default Firewall;
