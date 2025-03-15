
import React from 'react';
import { Card } from "@/components/ui/card";

const AutomationIntegrations = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Automation & Scripting Integrations</h2>
        <p className="text-muted-foreground">
          Connect CyberNest with your automation platforms for streamlined operations
        </p>
      </div>
      
      <Card className="p-6">
        <div className="text-center py-10">
          <p className="text-muted-foreground">
            Select "Add Integration" from the Overview tab to set up Automation & Scripting integrations.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AutomationIntegrations;
