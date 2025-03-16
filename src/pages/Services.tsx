
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTitle from '@/components/common/PageTitle';
import ServicesPanel from '@/components/services/ServicesPanel';

const Services = () => {
  return (
    <DashboardLayout>
      <PageTitle 
        title="Services Panel" 
        description="Deploy, manage, and monitor enterprise services"
      />
      <ServicesPanel />
    </DashboardLayout>
  );
};

export default Services;
