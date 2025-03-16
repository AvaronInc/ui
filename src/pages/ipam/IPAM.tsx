
import React, { useState } from 'react';
import { PageTransition } from '@/components/transitions/PageTransition';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { IPAddress } from '@/types/ipam';
import { mockIPAddresses, subnetData } from './mockData';
import IPAMHeader from './IPAMHeader';
import IPAMActions from './IPAMActions';
import IPAMTabs from './IPAMTabs';

const IPAM = () => {
  const [ipAddresses, setIPAddresses] = useState<IPAddress[]>(mockIPAddresses);
  const [selectedIP, setSelectedIP] = useState<IPAddress | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="p-6 space-y-6 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <IPAMHeader />
            <IPAMActions selectedIP={selectedIP} />
          </div>
          
          <IPAMTabs 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            ipAddresses={ipAddresses}
            subnetData={subnetData}
            selectedIP={selectedIP}
            setSelectedIP={setSelectedIP}
          />
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default IPAM;
