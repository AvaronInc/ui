
import React from 'react';
import { Card } from "@/components/ui/card";

const CloudIntegrations = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Cloud Provider Integrations</h2>
        <p className="text-muted-foreground">
          Connect CyberNest with your cloud platforms for infrastructure management
        </p>
      </div>
      
      <Card className="p-6">
        <div className="text-center py-10">
          <p className="text-muted-foreground">
            Select "Add Integration" from the Overview tab to set up Cloud Provider integrations.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default CloudIntegrations;
