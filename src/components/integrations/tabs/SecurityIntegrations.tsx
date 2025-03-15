
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Shield, AlertTriangle, Settings } from "lucide-react";
import { mockSecurityPlatforms } from "@/data/integrations/mockData";

const SecurityIntegrations = () => {
  const { toast } = useToast();
  const [activePlatforms, setActivePlatforms] = useState<string[]>([]);

  const handleConnect = (platformId: string) => {
    setActivePlatforms([...activePlatforms, platformId]);
    toast({
      title: "Connection successful",
      description: "Security platform connection established successfully",
    });
  };

  const handleDisconnect = (platformId: string) => {
    setActivePlatforms(activePlatforms.filter(id => id !== platformId));
    toast({
      title: "Disconnected",
      description: "Security platform disconnected successfully",
      variant: "destructive",
    });
  };

  const handleSaveConfig = (platformId: string) => {
    toast({
      title: "Configuration saved",
      description: "Security platform configuration updated successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Security & SIEM Integrations</h2>
        <p className="text-muted-foreground">
          Integrate security information and event management platforms with CyberNest
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {mockSecurityPlatforms.map((platform) => (
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
                  <AccordionTrigger className="font-medium">Integration Settings</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-6 pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="font-medium flex items-center gap-2 text-lg">
                            <Settings className="h-4 w-4" /> Connection Settings
                          </div>
                          
                          <div className="space-y-4">
                            <div className="grid gap-2">
                              <Label htmlFor={`${platform.id}-endpoint`}>API Endpoint</Label>
                              <Input 
                                id={`${platform.id}-endpoint`} 
                                placeholder="https://api.security-platform.com" 
                              />
                            </div>
                            
                            <div className="grid gap-2">
                              <Label htmlFor={`${platform.id}-apikey`}>API Key / Token</Label>
                              <Input 
                                id={`${platform.id}-apikey`} 
                                type="password" 
                                placeholder="Enter your API key or token" 
                              />
                            </div>
                            
                            <div className="grid gap-2">
                              <Label htmlFor={`${platform.id}-tenant`}>Tenant ID (if applicable)</Label>
                              <Input 
                                id={`${platform.id}-tenant`} 
                                placeholder="Your tenant or organization ID" 
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="font-medium flex items-center gap-2 text-lg">
                            <Shield className="h-4 w-4" /> Security Settings
                          </div>
                          
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <Label htmlFor={`${platform.id}-log-forwarding`}>Enable Log Forwarding</Label>
                              <Switch id={`${platform.id}-log-forwarding`} />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <Label htmlFor={`${platform.id}-realtime-alerts`}>Real-Time Security Alerts</Label>
                              <Switch id={`${platform.id}-realtime-alerts`} />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <Label htmlFor={`${platform.id}-auto-response`}>Automated Response Actions</Label>
                              <Switch id={`${platform.id}-auto-response`} />
                            </div>
                            
                            <div className="grid gap-2">
                              <Label htmlFor={`${platform.id}-alert-severity`}>Minimum Alert Severity</Label>
                              <Select defaultValue="medium">
                                <SelectTrigger id={`${platform.id}-alert-severity`}>
                                  <SelectValue placeholder="Select severity" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="low">Low</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="high">High</SelectItem>
                                  <SelectItem value="critical">Critical</SelectItem>
                                </SelectContent>
                              </Select>
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
                  <AccordionTrigger className="font-medium">Advanced Threat Response</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-6 pt-4">
                      <div className="grid gap-4">
                        <div className="font-medium flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4" /> Automated Response Actions
                        </div>
                        
                        <div className="grid gap-4">
                          <div className="flex items-center justify-between">
                            <Label htmlFor={`${platform.id}-isolate-device`}>Auto-Isolate Compromised Devices</Label>
                            <Switch id={`${platform.id}-isolate-device`} />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <Label htmlFor={`${platform.id}-block-ip`}>Auto-Block Malicious IPs</Label>
                            <Switch id={`${platform.id}-block-ip`} />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <Label htmlFor={`${platform.id}-notify-admin`}>Notify Administrators</Label>
                            <Switch id={`${platform.id}-notify-admin`} defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <Label htmlFor={`${platform.id}-create-tickets`}>Create Security Incident Tickets</Label>
                            <Switch id={`${platform.id}-create-tickets`} defaultChecked />
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

export default SecurityIntegrations;
