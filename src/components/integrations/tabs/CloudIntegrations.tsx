
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Cloud, Globe, Lock, Network } from "lucide-react";
import { mockCloudPlatforms } from "@/data/integrations/mockData";

const CloudIntegrations = () => {
  const { toast } = useToast();
  const [activePlatforms, setActivePlatforms] = useState<string[]>([]);

  const handleConnect = (platformId: string) => {
    setActivePlatforms([...activePlatforms, platformId]);
    toast({
      title: "Connection successful",
      description: "Cloud provider connection established successfully",
    });
  };

  const handleDisconnect = (platformId: string) => {
    setActivePlatforms(activePlatforms.filter(id => id !== platformId));
    toast({
      title: "Disconnected",
      description: "Cloud provider disconnected successfully",
      variant: "destructive",
    });
  };

  const handleSaveConfig = (platformId: string) => {
    toast({
      title: "Configuration saved",
      description: "Cloud provider configuration updated successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Cloud Provider Integrations</h2>
        <p className="text-muted-foreground">
          Connect your cloud infrastructure providers with CyberNest
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {mockCloudPlatforms.map((platform) => (
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
                <AccordionItem value="auth-config">
                  <AccordionTrigger className="font-medium">Authentication Configuration</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-6 pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="font-medium flex items-center gap-2 text-lg">
                            <Lock className="h-4 w-4" /> Cloud Credentials
                          </div>
                          
                          <div className="space-y-4">
                            {platform.id === "aws" && (
                              <>
                                <div className="grid gap-2">
                                  <Label htmlFor="aws-access-key">AWS Access Key ID</Label>
                                  <Input id="aws-access-key" placeholder="AKIAIOSFODNN7EXAMPLE" />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="aws-secret-key">AWS Secret Access Key</Label>
                                  <Input id="aws-secret-key" type="password" placeholder="Enter your secret key" />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="aws-region">AWS Region</Label>
                                  <Input id="aws-region" placeholder="us-east-1" />
                                </div>
                              </>
                            )}
                            
                            {platform.id === "azure" && (
                              <>
                                <div className="grid gap-2">
                                  <Label htmlFor="azure-tenant-id">Azure Tenant ID</Label>
                                  <Input id="azure-tenant-id" placeholder="Enter tenant ID" />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="azure-client-id">Azure Client ID</Label>
                                  <Input id="azure-client-id" placeholder="Enter client ID" />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="azure-client-secret">Azure Client Secret</Label>
                                  <Input id="azure-client-secret" type="password" placeholder="Enter client secret" />
                                </div>
                              </>
                            )}
                            
                            {platform.id === "gcp" && (
                              <>
                                <div className="grid gap-2">
                                  <Label htmlFor="gcp-project-id">GCP Project ID</Label>
                                  <Input id="gcp-project-id" placeholder="Enter project ID" />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="gcp-credentials">Service Account JSON</Label>
                                  <textarea 
                                    id="gcp-credentials" 
                                    className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                                    placeholder="Paste your service account JSON key file contents"
                                  />
                                </div>
                              </>
                            )}
                            
                            {platform.id === "oracle" && (
                              <>
                                <div className="grid gap-2">
                                  <Label htmlFor="oracle-tenant">Oracle Cloud Tenant</Label>
                                  <Input id="oracle-tenant" placeholder="Enter tenant OCID" />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="oracle-user">Oracle Cloud User OCID</Label>
                                  <Input id="oracle-user" placeholder="Enter user OCID" />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="oracle-fingerprint">API Key Fingerprint</Label>
                                  <Input id="oracle-fingerprint" placeholder="Enter fingerprint" />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="oracle-key">Private Key</Label>
                                  <textarea 
                                    id="oracle-key" 
                                    className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                                    placeholder="Paste your private key contents"
                                  />
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="font-medium flex items-center gap-2 text-lg">
                            <Cloud className="h-4 w-4" /> Access Configuration
                          </div>
                          
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <Label htmlFor={`${platform.id}-read-only`}>Read-Only Access</Label>
                              <Switch id={`${platform.id}-read-only`} />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <Label htmlFor={`${platform.id}-resource-scope`}>Limit Resource Scope</Label>
                              <Switch id={`${platform.id}-resource-scope`} defaultChecked />
                            </div>
                            
                            <div className="grid gap-2">
                              <Label htmlFor={`${platform.id}-resources`}>Resources to Include</Label>
                              <Input 
                                id={`${platform.id}-resources`}
                                placeholder="vpc,ec2,s3"
                              />
                              <p className="text-xs text-muted-foreground">Comma-separated list of resources</p>
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
                
                <AccordionItem value="network-config">
                  <AccordionTrigger className="font-medium">Network Configuration</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-6 pt-4">
                      <div className="grid gap-4">
                        <div className="font-medium flex items-center gap-2">
                          <Network className="h-4 w-4" /> Cloud Network Settings
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label htmlFor={`${platform.id}-vpn`}>Enable Cloud VPN Connection</Label>
                            <Switch id={`${platform.id}-vpn`} />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <Label htmlFor={`${platform.id}-hybrid`}>Hybrid Network Extension</Label>
                            <Switch id={`${platform.id}-hybrid`} />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <Label htmlFor={`${platform.id}-auto-scale`}>Auto-Scale Security Policies</Label>
                            <Switch id={`${platform.id}-auto-scale`} />
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid gap-4">
                        <div className="font-medium flex items-center gap-2">
                          <Globe className="h-4 w-4" /> Cloud Regions
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor={`${platform.id}-regions`}>Monitored Regions</Label>
                          <Input 
                            id={`${platform.id}-regions`} 
                            placeholder="us-east-1,eu-west-1,ap-southeast-1"
                          />
                          <p className="text-xs text-muted-foreground">Comma-separated list of cloud regions</p>
                        </div>
                      </div>
                      
                      <div className="pt-2 flex justify-end">
                        <Button onClick={() => handleSaveConfig(platform.id)}>
                          Save Network Settings
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

export default CloudIntegrations;
