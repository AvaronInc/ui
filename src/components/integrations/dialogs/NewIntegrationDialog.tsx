
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  mockITSMPlatforms, 
  mockSecurityPlatforms, 
  mockCloudPlatforms, 
  mockMonitoringPlatforms, 
  mockAutomationPlatforms 
} from "@/data/integrations/mockData";

type IntegrationCategory = "itsm" | "security" | "cloud" | "monitoring" | "automation" | "customapi";

interface NewIntegrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultCategory?: IntegrationCategory;
}

const NewIntegrationDialog = ({ 
  open, 
  onOpenChange, 
  defaultCategory = "itsm" 
}: NewIntegrationDialogProps) => {
  const [selectedCategory, setSelectedCategory] = useState<IntegrationCategory>(defaultCategory);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const { toast } = useToast();

  // Reset selected platform when category changes
  useEffect(() => {
    setSelectedPlatform(null);
  }, [selectedCategory]);

  // Update selected category when defaultCategory prop changes or dialog opens
  useEffect(() => {
    if (open) {
      setSelectedCategory(defaultCategory);
    }
  }, [defaultCategory, open]);

  const handleAddIntegration = () => {
    toast({
      title: "Integration process started",
      description: "You will be guided through the setup process for this integration.",
    });
    onOpenChange(false);
  };

  const handleCategoryChange = (value: string) => {
    // Ensure the value is a valid IntegrationCategory before setting state
    setSelectedCategory(value as IntegrationCategory);
  };

  const renderPlatforms = (platforms: any[]) => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {platforms.map((platform) => (
          <div 
            key={platform.id}
            className={`border rounded-md p-4 cursor-pointer transition-all hover:border-primary hover:bg-muted/50 ${
              selectedPlatform === platform.id ? "border-primary bg-muted" : ""
            }`}
            onClick={() => setSelectedPlatform(platform.id)}
          >
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 flex items-center justify-center bg-white rounded-md border shadow-sm">
                <img 
                  src={platform.logoUrl || "/placeholder.svg"} 
                  alt={platform.name} 
                  className="max-w-full max-h-full p-1" 
                />
              </div>
              <div className="font-medium">{platform.name}</div>
              <div className="text-xs text-muted-foreground line-clamp-2">{platform.description}</div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add New Integration</DialogTitle>
          <DialogDescription>
            Connect Avaron Vertex with your IT infrastructure and service platforms
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue={defaultCategory} value={selectedCategory} onValueChange={handleCategoryChange}>
          <TabsList className="grid grid-cols-6 mb-4">
            <TabsTrigger value="itsm">ITSM</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="cloud">Cloud</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
            <TabsTrigger value="customapi">Custom API</TabsTrigger>
          </TabsList>
          
          <TabsContent value="itsm">
            <div>
              <h3 className="text-lg font-medium mb-2">IT Service Management Platforms</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Connect to ITSM platforms for ticket management and asset tracking
              </p>
              {renderPlatforms(mockITSMPlatforms)}
            </div>
          </TabsContent>
          
          <TabsContent value="security">
            <div>
              <h3 className="text-lg font-medium mb-2">Security & SIEM Platforms</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Connect to security solutions for enhanced threat intelligence
              </p>
              {renderPlatforms(mockSecurityPlatforms)}
            </div>
          </TabsContent>
          
          <TabsContent value="cloud">
            <div>
              <h3 className="text-lg font-medium mb-2">Cloud Provider Platforms</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Connect to cloud providers for infrastructure management
              </p>
              {renderPlatforms(mockCloudPlatforms)}
            </div>
          </TabsContent>
          
          <TabsContent value="monitoring">
            <div>
              <h3 className="text-lg font-medium mb-2">Monitoring & Logging Platforms</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Connect to monitoring solutions for unified visibility
              </p>
              {renderPlatforms(mockMonitoringPlatforms)}
            </div>
          </TabsContent>
          
          <TabsContent value="automation">
            <div>
              <h3 className="text-lg font-medium mb-2">Automation & Scripting Platforms</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Connect to automation platforms for streamlined operations
              </p>
              {renderPlatforms(mockAutomationPlatforms)}
            </div>
          </TabsContent>
          
          <TabsContent value="customapi">
            <div>
              <h3 className="text-lg font-medium mb-2">Custom API & Webhook Integration</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Configure custom API endpoints and webhooks for any service
              </p>
              <div className="space-y-4 pt-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="api-name">Integration Name</Label>
                    <Input id="api-name" placeholder="Enter name for this integration" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="api-url">API URL</Label>
                    <Input id="api-url" placeholder="https://api.example.com/v1" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="api-key">API Key or Token</Label>
                    <Input id="api-key" type="password" placeholder="Enter your API key or token" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="webhook-url">Webhook URL (Optional)</Label>
                    <Input id="webhook-url" placeholder="https://your-app.example.com/webhook" />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {selectedPlatform && selectedCategory !== "customapi" && (
          <div className="pt-4 border-t space-y-4">
            <h3 className="text-lg font-medium">Quick Setup</h3>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="api-url">API URL</Label>
                <Input id="api-url" placeholder="https://your-instance.example.com/api" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="api-key">API Key or Token</Label>
                <Input id="api-key" type="password" placeholder="Enter your API key or token" />
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleAddIntegration}
            disabled={!selectedPlatform && selectedCategory !== "customapi"}
          >
            Proceed to Setup
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewIntegrationDialog;
