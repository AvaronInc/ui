
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, Code, Plus, Trash, Webhook } from "lucide-react";

const WEBHOOK_EVENTS = [
  { id: "security-alert", name: "Security Alert" },
  { id: "system-failure", name: "System Failure" },
  { id: "network-down", name: "Network Down" },
  { id: "performance-warning", name: "Performance Warning" },
  { id: "device-added", name: "Device Added" },
  { id: "user-login", name: "User Login" },
  { id: "config-change", name: "Configuration Change" },
  { id: "backup-completed", name: "Backup Completed" }
];

const CustomAPIIntegrations = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("webhooks");
  const [webhooks, setWebhooks] = useState<Array<{id: string, name: string, url: string, events: string[]}>>([
    { 
      id: "webhook-1",
      name: "Security Notifications",
      url: "https://example.com/webhooks/security",
      events: ["security-alert", "system-failure"]
    }
  ]);
  const [newWebhookName, setNewWebhookName] = useState("");
  const [newWebhookUrl, setNewWebhookUrl] = useState("");
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [zapierWebhookUrl, setZapierWebhookUrl] = useState("");
  const [zapierLoading, setZapierLoading] = useState(false);

  const handleAddWebhook = () => {
    if (!newWebhookName || !newWebhookUrl || selectedEvents.length === 0) {
      toast({
        title: "Missing information",
        description: "Please provide a name, URL, and select at least one event",
        variant: "destructive",
      });
      return;
    }

    const newWebhook = {
      id: `webhook-${Date.now()}`,
      name: newWebhookName,
      url: newWebhookUrl,
      events: selectedEvents
    };

    setWebhooks([...webhooks, newWebhook]);
    setNewWebhookName("");
    setNewWebhookUrl("");
    setSelectedEvents([]);

    toast({
      title: "Webhook added",
      description: "Your webhook has been configured successfully",
    });
  };

  const handleRemoveWebhook = (webhookId: string) => {
    setWebhooks(webhooks.filter(webhook => webhook.id !== webhookId));
    toast({
      title: "Webhook removed",
      description: "The webhook has been removed successfully",
    });
  };

  const toggleEvent = (eventId: string) => {
    if (selectedEvents.includes(eventId)) {
      setSelectedEvents(selectedEvents.filter(id => id !== eventId));
    } else {
      setSelectedEvents([...selectedEvents, eventId]);
    }
  };

  const handleTestZapier = () => {
    if (!zapierWebhookUrl) {
      toast({
        title: "Missing Zapier webhook URL",
        description: "Please provide a Zapier webhook URL",
        variant: "destructive",
      });
      return;
    }

    setZapierLoading(true);

    // Simulate webhook test
    setTimeout(() => {
      setZapierLoading(false);
      toast({
        title: "Webhook test successful",
        description: "Test data was sent to your Zapier webhook",
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Custom API & Webhook Integrations</h2>
        <p className="text-muted-foreground">
          Configure custom API integrations and webhooks for event-driven automation
        </p>
      </div>

      <Tabs defaultValue="webhooks" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="zapier">Zapier Integration</TabsTrigger>
          <TabsTrigger value="custom-api">Custom API</TabsTrigger>
        </TabsList>
        
        <TabsContent value="webhooks" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Configured Webhooks</CardTitle>
              <CardDescription>
                Manage your existing webhook configurations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {webhooks.length > 0 ? (
                <div className="space-y-4">
                  {webhooks.map((webhook) => (
                    <Card key={webhook.id} className="shadow-sm">
                      <CardHeader className="py-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base">{webhook.name}</CardTitle>
                            <CardDescription className="text-xs truncate max-w-md">
                              {webhook.url}
                            </CardDescription>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleRemoveWebhook(webhook.id)}
                          >
                            <Trash className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="py-2">
                        <div className="text-sm">
                          <div className="font-medium mb-1">Triggered by events:</div>
                          <div className="flex flex-wrap gap-2">
                            {webhook.events.map((eventId) => {
                              const event = WEBHOOK_EVENTS.find(e => e.id === eventId);
                              return event ? (
                                <span key={eventId} className="inline-block bg-muted text-muted-foreground rounded-full px-2 py-1 text-xs">
                                  {event.name}
                                </span>
                              ) : null;
                            })}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="py-2 flex justify-end gap-2">
                        <Button variant="ghost" size="sm">Test</Button>
                        <Button variant="outline" size="sm">Edit</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Webhook className="mx-auto h-12 w-12 opacity-30 mb-2" />
                  <p>No webhooks configured yet</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Add New Webhook</CardTitle>
              <CardDescription>
                Configure a new webhook endpoint to receive events from CyberNest
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="webhook-name">Webhook Name</Label>
                  <Input 
                    id="webhook-name" 
                    placeholder="E.g., Security Notifications" 
                    value={newWebhookName}
                    onChange={(e) => setNewWebhookName(e.target.value)}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input 
                    id="webhook-url" 
                    placeholder="https://your-service.com/webhook" 
                    value={newWebhookUrl}
                    onChange={(e) => setNewWebhookUrl(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label className="mb-2 block">Trigger Events</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {WEBHOOK_EVENTS.map((event) => (
                      <div key={event.id} className="flex items-center space-x-2">
                        <Switch 
                          id={`event-${event.id}`}
                          checked={selectedEvents.includes(event.id)}
                          onCheckedChange={() => toggleEvent(event.id)}
                        />
                        <Label htmlFor={`event-${event.id}`} className="text-sm">
                          {event.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-xs text-muted-foreground flex items-center">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Ensure your endpoint can handle POST requests
              </div>
              <Button onClick={handleAddWebhook}>
                <Plus className="h-4 w-4 mr-2" />
                Add Webhook
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="zapier" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Zapier Integration</CardTitle>
              <CardDescription>
                Connect CyberNest to thousands of apps via Zapier
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center p-6 border-2 border-dashed rounded-lg">
                <div className="text-center">
                  <img 
                    src="/placeholder.svg" 
                    alt="Zapier logo" 
                    className="h-16 mx-auto mb-4" 
                  />
                  <h3 className="font-medium mb-2">Connect with Zapier</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Automate workflows between CyberNest and 3,000+ apps
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => window.open('https://zapier.com/apps', '_blank')}
                  >
                    Browse Zapier Apps
                  </Button>
                </div>
              </div>
              
              <div className="grid gap-4 pt-4">
                <div className="grid gap-2">
                  <Label htmlFor="zapier-webhook">Zapier Webhook URL</Label>
                  <Input 
                    id="zapier-webhook" 
                    placeholder="Paste your Zapier webhook URL here" 
                    value={zapierWebhookUrl}
                    onChange={(e) => setZapierWebhookUrl(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Create a webhook trigger in Zapier, then paste the provided webhook URL here
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                onClick={handleTestZapier}
                disabled={zapierLoading}
              >
                {zapierLoading ? "Sending..." : "Test Zapier Connection"}
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Zapier Setup Guide</CardTitle>
              <CardDescription>
                Follow these steps to set up your Zapier integration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Log in to your Zapier account and create a new Zap</li>
                <li>Select "Webhook by Zapier" as your trigger app</li>
                <li>Choose "Catch Hook" as the trigger event</li>
                <li>Copy the webhook URL provided by Zapier</li>
                <li>Paste the URL in the field above and click "Test Zapier Connection"</li>
                <li>In Zapier, proceed to set up the action for your Zap</li>
                <li>Publish your Zap to activate the integration</li>
              </ol>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="custom-api" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Custom API Integration</CardTitle>
              <CardDescription>
                Create custom API integrations for specialized services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center p-8 border-2 border-dashed rounded-lg">
                <div className="text-center">
                  <Code className="h-16 w-16 mx-auto mb-4 opacity-30" />
                  <h3 className="font-medium mb-2">Custom API Configuration</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Configure API integrations for services not covered by our standard connectors
                  </p>
                  <Button>Get Started</Button>
                </div>
              </div>
              
              <div className="bg-muted rounded-md p-3 text-sm">
                <p className="font-medium mb-2">Available Features:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Custom REST API integrations</li>
                  <li>GraphQL support</li>
                  <li>OAuth 2.0 authentication</li>
                  <li>Custom headers and parameters</li>
                  <li>Response transformation</li>
                  <li>Scheduled API calls</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <div className="text-sm text-muted-foreground">
                Need help with custom integrations? Contact our support team
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomAPIIntegrations;
