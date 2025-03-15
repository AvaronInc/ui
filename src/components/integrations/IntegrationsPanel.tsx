
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IntegrationsOverview from "./tabs/IntegrationsOverview";
import ITSMIntegrations from "./tabs/ITSMIntegrations";
import SecurityIntegrations from "./tabs/SecurityIntegrations";
import CloudIntegrations from "./tabs/CloudIntegrations";
import MonitoringIntegrations from "./tabs/MonitoringIntegrations";
import CustomAPIIntegrations from "./tabs/CustomAPIIntegrations";
import AutomationIntegrations from "./tabs/AutomationIntegrations";
import { useToast } from "@/hooks/use-toast";

const IntegrationsPanel = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="space-y-4">
      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="grid grid-cols-7 md:grid-cols-7 lg:grid-cols-7 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="itsm">ITSM</TabsTrigger>
          <TabsTrigger value="security">Security & SIEM</TabsTrigger>
          <TabsTrigger value="cloud">Cloud Providers</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="customapi">Custom API</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="p-0 border-0">
          <IntegrationsOverview />
        </TabsContent>

        <TabsContent value="itsm" className="p-0 border-0">
          <ITSMIntegrations />
        </TabsContent>

        <TabsContent value="security" className="p-0 border-0">
          <SecurityIntegrations />
        </TabsContent>

        <TabsContent value="cloud" className="p-0 border-0">
          <CloudIntegrations />
        </TabsContent>

        <TabsContent value="monitoring" className="p-0 border-0">
          <MonitoringIntegrations />
        </TabsContent>

        <TabsContent value="customapi" className="p-0 border-0">
          <CustomAPIIntegrations />
        </TabsContent>

        <TabsContent value="automation" className="p-0 border-0">
          <AutomationIntegrations />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntegrationsPanel;
