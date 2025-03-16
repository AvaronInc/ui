
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CreditCard, FileText, HardDrive, BarChart, MessageCircle } from 'lucide-react';
import BillingOverview from './BillingOverview';
import PaymentMethods from './tabs/PaymentMethods';
import HardwareContracts from './tabs/HardwareContracts';
import Invoices from './tabs/Invoices';
import UsageCostAnalytics from './tabs/UsageCostAnalytics';
import BillingSupport from './tabs/BillingSupport';
import { useIsMobile } from '@/hooks/use-mobile';
import { ScrollArea } from '@/components/ui/scroll-area';

const BillingPanel = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const isMobile = useIsMobile();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="space-y-6">
      <Tabs 
        defaultValue="overview" 
        value={activeTab} 
        onValueChange={handleTabChange} 
        className="space-y-4"
      >
        <div className="overflow-x-auto pb-2">
          <ScrollArea className="w-full">
            <TabsList className="inline-flex min-w-max">
              <TabsTrigger value="overview">{isMobile ? "Overview" : "Overview"}</TabsTrigger>
              <TabsTrigger value="payment-methods">{isMobile ? "Payment" : "Payment Methods"}</TabsTrigger>
              <TabsTrigger value="hardware-contracts">{isMobile ? "Hardware" : "Hardware Contracts"}</TabsTrigger>
              <TabsTrigger value="invoices">{isMobile ? "Invoices" : "Invoices"}</TabsTrigger>
              <TabsTrigger value="usage-analytics">{isMobile ? "Usage" : "Usage & Cost"}</TabsTrigger>
              <TabsTrigger value="support">{isMobile ? "Support" : "Support"}</TabsTrigger>
            </TabsList>
          </ScrollArea>
        </div>

        <TabsContent value="overview" className="space-y-4">
          <BillingOverview />
        </TabsContent>

        <TabsContent value="payment-methods" className="space-y-4">
          <PaymentMethods />
        </TabsContent>

        <TabsContent value="hardware-contracts" className="space-y-4">
          <HardwareContracts />
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          <Invoices />
        </TabsContent>

        <TabsContent value="usage-analytics" className="space-y-4">
          <UsageCostAnalytics />
        </TabsContent>

        <TabsContent value="support" className="space-y-4">
          <BillingSupport />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BillingPanel;
