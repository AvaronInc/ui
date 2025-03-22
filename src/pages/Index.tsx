
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/context/auth';
import MultiTenantView from '@/components/dashboard/MultiTenantView';
import MainDashboard from '@/components/dashboard/MainDashboard';
import PageTransition from '@/components/transitions/PageTransition';

const Index = () => {
  const { isAdmin } = useAuth();
  const [showMultiTenant, setShowMultiTenant] = useState(false);
  
  return (
    <PageTransition>
      <DashboardLayout>
        <div className="container py-6 space-y-6">
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
