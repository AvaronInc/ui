
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { LineChart, Bell, Clock, Settings } from "lucide-react";
import { mockMonitoringPlatforms } from "@/data/integrations/mockData";

const MonitoringIntegrations = () => {
  const { toast } = useToast();
  const [activePlatforms, setActivePlatforms] = useState<string[]>([]);

  const handleConnect = (platformId: string) => {
    setActivePlatforms([...activePlatforms, platformId]);
    toast({
      title: "Connection successful",
      description: "Monitoring platform connection established successfully",
    });
  };

  const handleDisconnect = (platformId: string) => {
    setActivePlatforms(activePlatforms.filter(id => id !== platformId));
    toast({
      title: "Disconnected",
      description: "Monitoring platform disconnected successfully",
      variant: "destructive",
    });
  };

  const handleSaveConfig = (platformId: string) => {
    toast({
      title: "Configuration saved",
      description: "Monitoring platform configuration updated successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Network Monitoring & Logging Integrations</h2>
        <p className="text-muted-foreground">
          Integrate monitoring and logging platforms for comprehensive visibility
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {mockMonitoringPlatforms.map((platform) => (
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
                  {activePlatforms.includes(platform.id) ? (
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
                  <AccordionTrigger className="font-medium">Connection Settings</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-6 pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="font-medium flex items-center gap-2 text-lg">
                            <Settings className="h-4 w-4" /> API Configuration
                          </div>
                          
                          <div className="space-y-4">
                            <div className="grid gap-2">
                              <Label htmlFor={`${platform.id}-api-url`}>API URL</Label>
                              <Input 
                                id={`${platform.id}-api-url`} 
                                placeholder="https://api.monitoring-platform.com" 
                              />
                            </div>
                            
                            <div className="grid gap-2">
                              <Label htmlFor={`${platform.id}-api-key`}>API Key / Token</Label>
                              <Input 
                                id={`${platform.id}-api-key`} 
                                type="password" 
                                placeholder="Enter your API key or token" 
                              />
                            </div>
                            
                            <div className="grid gap-2">
                              <Label htmlFor={`${platform.id}-org-id`}>Organization ID (if applicable)</Label>
                              <Input 
                                id={`${platform.id}-org-id`} 
                                placeholder="Your organization identifier" 
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="font-medium flex items-center gap-2 text-lg">
                            <LineChart className="h-4 w-4" /> Data Integration
                          </div>
                          
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <Label htmlFor={`${platform.id}-log-forwarding`}>Enable Log Forwarding</Label>
                              <Switch id={`${platform.id}-log-forwarding`} />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <Label htmlFor={`${platform.id}-metric-sync`}>Sync Metrics & Performance Data</Label>
                              <Switch id={`${platform.id}-metric-sync`} />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <Label htmlFor={`${platform.id}-thresholds`}>Sync Threshold Settings</Label>
                              <Switch id={`${platform.id}-thresholds`} />
                            </div>
                            
                            <div className="grid gap-2">
                              <Label htmlFor={`${platform.id}-log-level`}>Minimum Log Level</Label>
                              <select 
                                id={`${platform.id}-log-level`} 
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                <option value="debug">Debug</option>
                                <option value="info">Info</option>
                                <option value="warning">Warning</option>
                                <option value="error">Error</option>
                                <option value="critical">Critical</option>
                              </select>
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
                
                <AccordionItem value="alerts">
                  <AccordionTrigger className="font-medium">Alert Configuration</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-6 pt-4">
                      <div className="grid gap-4">
                        <div className="font-medium flex items-center gap-2">
                          <Bell className="h-4 w-4" /> Alert Settings
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label htmlFor={`${platform.id}-bidirectional`}>Two-Way Alert Synchronization</Label>
                            <Switch id={`${platform.id}-bidirectional`} />
                          </div>
                          
                          <div className="grid gap-2">
                            <Label htmlFor={`${platform.id}-alert-threshold`}>Performance Alert Thresholds</Label>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                <Label htmlFor={`${platform.id}-cpu-threshold`} className="text-xs">CPU Utilization (%)</Label>
                                <Input 
                                  id={`${platform.id}-cpu-threshold`} 
                                  type="number"
                                  placeholder="85"
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor={`${platform.id}-memory-threshold`} className="text-xs">Memory Utilization (%)</Label>
                                <Input 
                                  id={`${platform.id}-memory-threshold`} 
                                  type="number"
                                  placeholder="90"
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid gap-2">
                            <Label htmlFor={`${platform.id}-event-types`}>Event Types to Sync</Label>
                            <Input 
                              id={`${platform.id}-event-types`} 
                              placeholder="security,performance,availability"
                            />
                            <p className="text-xs text-muted-foreground">Comma-separated list of event types</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid gap-4">
                        <div className="font-medium flex items-center gap-2">
                          <Clock className="h-4 w-4" /> Data Retention
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor={`${platform.id}-retention`}>Data Retention Period (days)</Label>
                          <Input 
                            id={`${platform.id}-retention`} 
                            type="number"
                            min="1"
                            placeholder="30"
                          />
                        </div>
                      </div>
                      
                      <div className="pt-2 flex justify-end">
                        <Button onClick={() => handleSaveConfig(platform.id)}>
                          Save Alert Settings
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

export default MonitoringIntegrations;
