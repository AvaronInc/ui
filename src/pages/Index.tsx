
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/context/auth';
import MultiTenantView from '@/components/dashboard/MultiTenantView';
import MainDashboard from '@/components/dashboard/MainDashboard';
import PageTransition from '@/components/transitions/PageTransition';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const { isAdmin } = useAuth();
  const [showMultiTenant, setShowMultiTenant] = useState(false);

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="container-fluid px-0 sm:px-2 md:px-4 lg:container py-2 sm:py-4 md:py-6 space-y-4 sm:space-y-6">
          {showMultiTenant && isAdmin ? (
            <MultiTenantView />
          ) : (
            <MainDashboard />
          )}
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default Index;
