
import React from 'react';
import { Card } from "@/components/ui/card";

const CustomAPIIntegrations = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Custom API & Webhook Integrations</h2>
        <p className="text-muted-foreground">
          Connect CyberNest with custom APIs and set up webhooks for any service
        </p>
      </div>
      
      <Card className="p-6">
        <div className="text-center py-10">
          <p className="text-muted-foreground">
            Select "Add Integration" from the Overview tab to set up Custom API integrations.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default CustomAPIIntegrations;
