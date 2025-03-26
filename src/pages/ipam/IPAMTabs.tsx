
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IPAddress } from '@/types/ipam';
import IPAMOverview from '@/components/ipam/IPAMOverview';
import IPAddressAllocation from '@/components/ipam/IPAddressAllocation';
import SubnetManagement from '@/components/ipam/SubnetManagement';
import ConflictDetection from '@/components/ipam/ConflictDetection';
import RCATab from './tabs/RCATab';
import { toast } from 'sonner';

interface IPAMTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  ipAddresses: IPAddress[];
  subnetData: any;
  selectedIP: IPAddress | null;
  setSelectedIP: (ip: IPAddress | null) => void;
}

const IPAMTabs: React.FC<IPAMTabsProps> = ({
  activeTab,
  setActiveTab,
  ipAddresses,
  subnetData,
  selectedIP,
  setSelectedIP
}) => {
  return (
    <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-5 mb-8">
        <TabsTrigger value="overview">
          Overview Dashboard
        </TabsTrigger>
        <TabsTrigger value="allocation">
          IP Allocation & Search
        </TabsTrigger>
        <TabsTrigger value="subnets">
          Subnet & VLAN Management
        </TabsTrigger>
        <TabsTrigger value="conflicts">
          Conflict Detection
        </TabsTrigger>
        <TabsTrigger value="rca">
          Root Cause Analysis
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="mt-0">
        <IPAMOverview ipAddresses={ipAddresses} subnetData={subnetData} />
      </TabsContent>
      
      <TabsContent value="allocation" className="mt-0">
        <IPAddressAllocation 
          ipAddresses={ipAddresses} 
          onIPSelect={setSelectedIP}
          selectedIP={selectedIP}
        />
      </TabsContent>
      
      <TabsContent value="subnets" className="mt-0">
        <SubnetManagement subnetData={subnetData} />
      </TabsContent>
      
      <TabsContent value="conflicts" className="mt-0">
        <ConflictDetection 
          ipAddresses={ipAddresses.filter(ip => ip.status === 'conflict')} 
          onResolveConflict={(ip) => {
            toast.success(`Conflict resolution for ${ip.address} initiated`);
          }}
        />
      </TabsContent>
      
      <TabsContent value="rca" className="mt-0">
        <RCATab />
      </TabsContent>
    </Tabs>
  );
};

export default IPAMTabs;
