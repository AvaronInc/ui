
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Terminal, Code, ShieldAlert, Settings } from "lucide-react";
import { mockAutomationPlatforms } from "@/data/integrations/mockData";

const AutomationIntegrations = () => {
  const { toast } = useToast();
  const [activePlatforms, setActivePlatforms] = useState<string[]>([]);

  const handleConnect = (platformId: string) => {
    setActivePlatforms([...activePlatforms, platformId]);
    toast({
      title: "Connection successful",
      description: "Automation platform connection established successfully",
    });
  };

  const handleDisconnect = (platformId: string) => {
    setActivePlatforms(activePlatforms.filter(id => id !== platformId));
    toast({
      title: "Disconnected",
      description: "Automation platform disconnected successfully",
      variant: "destructive",
    });
  };

  const handleSaveConfig = (platformId: string) => {
    toast({
      title: "Configuration saved",
      description: "Automation platform configuration updated successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Automation & Scripting Integrations</h2>
        <p className="text-muted-foreground">
          Connect automation platforms to execute scripts triggered by CyberNest events
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {mockAutomationPlatforms.map((platform) => (
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
                  <AccordionTrigger className="font-medium">Authentication & Connection</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-6 pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="font-medium flex items-center gap-2 text-lg">
                            <Settings className="h-4 w-4" /> Connection Settings
                          </div>
                          
                          <div className="space-y-4">
                            {platform.id === "ansible" && (
                              <>
                                <div className="grid gap-2">
                                  <Label htmlFor="ansible-control-node">Control Node URL</Label>
                                  <Input id="ansible-control-node" placeholder="https://ansible.example.com" />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="ansible-api-key">API Key</Label>
                                  <Input id="ansible-api-key" type="password" placeholder="Enter your API key" />
                                </div>
                              </>
                            )}
                            
                            {platform.id === "terraform" && (
                              <>
                                <div className="grid gap-2">
                                  <Label htmlFor="terraform-api-url">Terraform Cloud API URL</Label>
                                  <Input id="terraform-api-url" placeholder="https://app.terraform.io/api/v2" />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="terraform-token">API Token</Label>
                                  <Input id="terraform-token" type="password" placeholder="Enter your API token" />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="terraform-org">Organization</Label>
                                  <Input id="terraform-org" placeholder="Your organization name" />
                                </div>
                              </>
                            )}
                            
                            {platform.id === "powershell" && (
                              <>
                                <div className="grid gap-2">
                                  <Label htmlFor="powershell-endpoint">Remote PowerShell Endpoint</Label>
                                  <Input id="powershell-endpoint" placeholder="https://powershell.example.com" />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="powershell-username">Username</Label>
                                  <Input id="powershell-username" placeholder="Administrator" />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="powershell-password">Password</Label>
                                  <Input id="powershell-password" type="password" placeholder="Enter your password" />
                                </div>
                              </>
                            )}
                            
                            {platform.id === "python" && (
                              <>
                                <div className="grid gap-2">
                                  <Label htmlFor="python-server">Python API Server</Label>
                                  <Input id="python-server" placeholder="https://python-api.example.com" />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="python-auth-token">Authentication Token</Label>
                                  <Input id="python-auth-token" type="password" placeholder="Enter your auth token" />
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="font-medium flex items-center gap-2 text-lg">
                            <Terminal className="h-4 w-4" /> Execution Settings
                          </div>
                          
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <Label htmlFor={`${platform.id}-event-trigger`}>Enable Event-Triggered Execution</Label>
                              <Switch id={`${platform.id}-event-trigger`} />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <Label htmlFor={`${platform.id}-scheduled`}>Enable Scheduled Execution</Label>
                              <Switch id={`${platform.id}-scheduled`} />
                            </div>
                            
                            <div className="grid gap-2">
                              <Label htmlFor={`${platform.id}-script-path`}>Default Script Path</Label>
                              <Input 
                                id={`${platform.id}-script-path`}
                                placeholder="/scripts/cybernest/"
                              />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <Label htmlFor={`${platform.id}-error-reporting`}>Enable Error Reporting</Label>
                              <Switch id={`${platform.id}-error-reporting`} defaultChecked />
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
                
                <AccordionItem value="security">
                  <AccordionTrigger className="font-medium">Security & Permissions</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-6 pt-4">
                      <div className="grid gap-4">
                        <div className="font-medium flex items-center gap-2">
                          <ShieldAlert className="h-4 w-4" /> Script Execution Permissions
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label htmlFor={`${platform.id}-approved-only`}>Only Run on Approved Devices</Label>
                            <Switch id={`${platform.id}-approved-only`} defaultChecked />
                          </div>
                          
                          <div className="grid gap-2">
                            <Label htmlFor={`${platform.id}-approved-networks`}>Approved Networks (CIDR)</Label>
                            <Input 
                              id={`${platform.id}-approved-networks`} 
                              placeholder="10.0.0.0/8,192.168.1.0/24"
                            />
                            <p className="text-xs text-muted-foreground">Comma-separated list of CIDR notation</p>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <Label htmlFor={`${platform.id}-review-scripts`}>Require Manual Review for New Scripts</Label>
                            <Switch id={`${platform.id}-review-scripts`} defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <Label htmlFor={`${platform.id}-restrict-commands`}>Restrict Dangerous Commands</Label>
                            <Switch id={`${platform.id}-restrict-commands`} defaultChecked />
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid gap-4">
                        <div className="font-medium flex items-center gap-2">
                          <Code className="h-4 w-4" /> Script Triggers
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor={`${platform.id}-trigger-events`}>Events that Trigger Scripts</Label>
                          <Input 
                            id={`${platform.id}-trigger-events`} 
                            placeholder="security-alert,system-failure,network-down"
                          />
                          <p className="text-xs text-muted-foreground">Comma-separated list of events</p>
                        </div>
                      </div>
                      
                      <div className="pt-2 flex justify-end">
                        <Button onClick={() => handleSaveConfig(platform.id)}>
                          Save Security Settings
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

export default AutomationIntegrations;
