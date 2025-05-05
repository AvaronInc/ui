
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import NewIntegrationDialog from "../dialogs/NewIntegrationDialog";

const AutomationIntegrations = () => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Automation & Scripting Integrations</h2>
          <p className="text-muted-foreground">
            Connect Avaron Vertex with your automation platforms for streamlined operations
          </p>
        </div>
        <Button onClick={() => setOpenDialog(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Integration
        </Button>
      </div>
      
      <Card className="p-6">
        <div className="text-center py-10">
          <p className="text-muted-foreground">
            Select "Add Integration" from the Overview tab to set up Automation & Scripting integrations.
          </p>
        </div>
      </Card>

      <NewIntegrationDialog 
        open={openDialog} 
        onOpenChange={setOpenDialog}
        defaultCategory="automation" 
      />
    </div>
  );
};

export default AutomationIntegrations;
