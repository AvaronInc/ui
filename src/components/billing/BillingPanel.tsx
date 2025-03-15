
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CreditCard, FileText, HardDrive, BarChart, MessageCircle } from 'lucide-react';
import BillingOverview from './BillingOverview';
import PaymentMethods from './tabs/PaymentMethods';
import HardwareContracts from './tabs/HardwareContracts';
import Invoices from './tabs/Invoices';
import UsageCostAnalytics from './tabs/UsageCostAnalytics';
import BillingSupport from './tabs/BillingSupport';
import PageTitle from '@/components/common/PageTitle';

const BillingPanel = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const handleTabChange = (value: string) => {
    // Set the active tab without affecting the sidebar state
    setActiveTab(value);
  };

  return (
    <div className="space-y-6">
      <PageTitle 
        title="Billing & Payments" 
        description="Manage your subscriptions, payment methods, and billing information"
        icon={<CreditCard className="h-6 w-6" />}
      />

      <Tabs 
        defaultValue="overview" 
        value={activeTab} 
        onValueChange={handleTabChange} 
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="hardware-contracts">Hardware Contracts</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="usage-analytics">Usage & Cost</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>

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
