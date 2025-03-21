
import React from 'react';
import { AIMPanel } from '@/components/aim';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTitle from '@/components/common/PageTitle';

const AIM: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <PageTitle 
          title="Autonomous Infrastructure Manager" 
          subtitle="AI-powered assistant for your network infrastructure" 
        />
        <AIMPanel />
      </div>
    </DashboardLayout>
  );
};

export default AIM;
