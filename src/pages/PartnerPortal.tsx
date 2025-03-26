
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTransition from '@/components/transitions/PageTransition';
import PartnerOverview from '@/components/admin/partner-portal/tabs/PartnerOverview';
import DealRegistration from '@/components/admin/partner-portal/tabs/DealRegistration';
import QuotingPricing from '@/components/admin/partner-portal/tabs/QuotingPricing';
import TenantsSupport from '@/components/admin/partner-portal/tabs/TenantsSupport';
import PartnerResources from '@/components/admin/partner-portal/tabs/PartnerResources';
import PartnerCertifications from '@/components/admin/partner-portal/tabs/PartnerCertifications';
import CommissionTracker from '@/components/admin/partner-portal/tabs/CommissionTracker';
import { mockPartnerInfo } from '@/components/admin/partner-portal/mockData';
import { Shield, Users, FileText, Server, BookOpen, Award, DollarSign, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const PartnerPortal = () => {
  const { toast } = useToast();

  const openAIAssistant = () => {
    toast({
      title: "AI Deal Assistant",
      description: "The AI Deal Assistant is being prepared. This feature will be available soon.",
      duration: 5000,
    });
  };

  const getBadgeColorByTier = (tier: string) => {
    switch(tier) {
      case 'Registered':
        return 'bg-blue-600/20 text-blue-500 hover:bg-blue-600/30';
      case 'Certified':
        return 'bg-green-600/20 text-green-500 hover:bg-green-600/30';
      case 'Premier':
        return 'bg-purple-600/20 text-purple-500 hover:bg-purple-600/30';
      case 'White-Label':
        return 'bg-amber-600/20 text-amber-500 hover:bg-amber-600/30';
      default:
        return 'bg-gray-600/20 text-gray-500';
    }
  };

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="container py-6 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">Partner Portal</h1>
              <p className="text-muted-foreground">
                Manage your partnership, clients, and resources
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={openAIAssistant}
              >
                <Bot size={16} />
                <span>AI Deal Assistant</span>
              </Button>
              <Badge className={`text-xs py-1 px-3 ${getBadgeColorByTier(mockPartnerInfo.tier)}`}>
                {mockPartnerInfo.tier} Partner
              </Badge>
            </div>
          </div>

          <div className="bg-card border rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-xl font-semibold">{mockPartnerInfo.name}</h2>
              <p className="text-muted-foreground">
                Channel Manager: {mockPartnerInfo.channelManager.name} • {mockPartnerInfo.channelManager.email}
              </p>
            </div>
            <div className="w-full md:w-80">
              <p className="text-sm text-muted-foreground mb-1">Next Tier Progress: ${mockPartnerInfo.metrics.currentTierProgress.toLocaleString()} / ${mockPartnerInfo.metrics.nextTierThreshold.toLocaleString()}</p>
              <div className="w-full bg-secondary h-2 rounded-full">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${(mockPartnerInfo.metrics.currentTierProgress / mockPartnerInfo.metrics.nextTierThreshold) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <div className="bg-card border rounded-lg p-2">
              <TabsList className="grid grid-cols-2 md:grid-cols-7 gap-2">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <Shield size={16} />
                  <span className="hidden md:inline">Overview</span>
                </TabsTrigger>
                <TabsTrigger value="deals" className="flex items-center gap-2">
                  <FileText size={16} />
                  <span className="hidden md:inline">Deal Registration</span>
                </TabsTrigger>
                <TabsTrigger value="quoting" className="flex items-center gap-2">
                  <DollarSign size={16} />
                  <span className="hidden md:inline">Quoting & Pricing</span>
                </TabsTrigger>
                <TabsTrigger value="tenants" className="flex items-center gap-2">
                  <Server size={16} />
                  <span className="hidden md:inline">Tenants & Support</span>
                </TabsTrigger>
                <TabsTrigger value="resources" className="flex items-center gap-2">
                  <BookOpen size={16} />
                  <span className="hidden md:inline">Partner Resources</span>
                </TabsTrigger>
                <TabsTrigger value="certifications" className="flex items-center gap-2">
                  <Award size={16} />
                  <span className="hidden md:inline">Certifications</span>
                </TabsTrigger>
                <TabsTrigger value="commissions" className="flex items-center gap-2">
                  <Users size={16} />
                  <span className="hidden md:inline">Commission Tracker</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="mt-4">
              <PartnerOverview />
            </TabsContent>
            
            <TabsContent value="deals" className="mt-4">
              <DealRegistration />
            </TabsContent>
            
            <TabsContent value="quoting" className="mt-4">
              <QuotingPricing />
            </TabsContent>
            
            <TabsContent value="tenants" className="mt-4">
              <TenantsSupport />
            </TabsContent>
            
            <TabsContent value="resources" className="mt-4">
              <PartnerResources />
            </TabsContent>
            
            <TabsContent value="certifications" className="mt-4">
              <PartnerCertifications />
            </TabsContent>
            
            <TabsContent value="commissions" className="mt-4">
              <CommissionTracker />
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default PartnerPortal;
