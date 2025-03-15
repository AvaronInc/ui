
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Link, Lock, Server, Settings } from "lucide-react";
import { mockITSMPlatforms } from "@/data/integrations/mockData";

const ITSMIntegrations = () => {
  const { toast } = useToast();
  const [activePlatform, setActivePlatform] = useState<string | null>(null);

  const handleSaveConfig = (platformId: string) => {
    toast({
      title: "Configuration saved",
      description: `Your changes to the platform configuration have been saved`,
    });
  };

  const handleConnect = (platformId: string) => {
    setActivePlatform(platformId);
    toast({
      title: "Connection successful",
      description: `You have successfully connected to the platform`,
    });
  };

  const handleDisconnect = (platformId: string) => {
    setActivePlatform(null);
    toast({
      title: "Disconnected",
      description: `You have disconnected from the platform`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">IT Service Management (ITSM) Integrations</h2>
        <p className="text-muted-foreground">
          Connect CyberNest with your IT service management platforms for seamless ticket management
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {mockITSMPlatforms.map((platform) => (
          <Card key={platform.id} className="overflow-hidden">
            <CardHeader className="bg-muted/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 flex items-center justify-center bg-white rounded-md border shadow-sm">
                    <img 
                      src={platform.logoUrl || "/placeholder.svg"} 
                      alt={platform.name} 
                      className="max-w-full max-h-full p-1" 
                    />
                  </div>
                  <div>
                    <CardTitle>{platform.name}</CardTitle>
                    <CardDescription>{platform.description}</CardDescription>
                  </div>
                </div>
                <div>
                  {activePlatform === platform.id ? (
                    <Button variant="destructive" onClick={() => handleDisconnect(platform.id)}>
                      Disconnect
                    </Button>
                  ) : (
                    <Button onClick={() => handleConnect(platform.id)}>
                      Connect
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible>
                <AccordionItem value="config">
                  <AccordionTrigger className="font-medium">Configuration Options</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-6 pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="font-medium flex items-center gap-2 text-lg">
                            <Settings className="h-4 w-4" /> Authentication
                          </div>
                          
                          <div className="space-y-4">
                            <div className="grid gap-2">
                              <Label htmlFor={`${platform.id}-apiurl`}>API URL</Label>
                              <Input 
                                id={`${platform.id}-apiurl`} 
                                placeholder="https://your-instance.servicenow.com/api" 
                                defaultValue={platform.config?.apiUrl || ""}
                              />
                            </div>
                            
                            <div className="grid gap-2">
                              <Label htmlFor={`${platform.id}-apikey`}>API Key</Label>
                              <div className="flex gap-2">
                                <Input 
                                  id={`${platform.id}-apikey`} 
                                  type="password" 
                                  placeholder="Enter your API key"
                                  defaultValue={platform.config?.apiKey ? "••••••••••••••••" : ""}
                                />
                                <Button variant="outline" size="icon">
                                  <Lock className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="font-medium flex items-center gap-2 text-lg">
                            <Link className="h-4 w-4" /> Integration Settings
                          </div>
                          
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <Label htmlFor={`${platform.id}-two-way-sync`}>Two-Way Ticket Sync</Label>
                              <Switch 
                                id={`${platform.id}-two-way-sync`} 
                                defaultChecked={platform.config?.twoWaySync || false} 
                              />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <Label htmlFor={`${platform.id}-auto-assets`}>Auto-Sync IT Assets</Label>
                              <Switch 
                                id={`${platform.id}-auto-assets`} 
                                defaultChecked={platform.config?.autoSyncAssets || false} 
                              />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <Label htmlFor={`${platform.id}-auto-tickets`}>Auto-Create Tickets for Alerts</Label>
                              <Switch 
                                id={`${platform.id}-auto-tickets`} 
                                defaultChecked={platform.config?.autoCreateTickets || false} 
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4 flex justify-end">
                        <Button onClick={() => handleSaveConfig(platform.id)}>
                          Save Configuration
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="advanced">
                  <AccordionTrigger className="font-medium">Advanced Settings</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-6 pt-4">
                      <div className="grid gap-4">
                        <div className="font-medium flex items-center gap-2">
                          <Server className="h-4 w-4" /> Sync Settings
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`${platform.id}-sync-interval`}>Sync Interval (minutes)</Label>
                            <Input 
                              id={`${platform.id}-sync-interval`} 
                              type="number"
                              min="5"
                              defaultValue={platform.config?.syncInterval || 15}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`${platform.id}-ticket-categories`}>Default Ticket Categories</Label>
                            <Input 
                              id={`${platform.id}-ticket-categories`} 
                              placeholder="Network,Security,Hardware"
                              defaultValue={platform.config?.ticketCategories || ""}
                            />
                            <p className="text-xs text-muted-foreground">Comma-separated list of categories</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-2 flex justify-end">
                        <Button onClick={() => handleSaveConfig(platform.id)}>
                          Save Advanced Settings
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ITSMIntegrations;
