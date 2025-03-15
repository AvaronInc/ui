
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, RefreshCw, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import NewIntegrationDialog from "../dialogs/NewIntegrationDialog";
import { mockActiveIntegrations } from "@/data/integrations/mockData";

const IntegrationsOverview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();

  const handleRefresh = () => {
    setRefreshing(true);
    
    // Simulate refreshing integrations
    setTimeout(() => {
      setRefreshing(false);
      toast({
        title: "Integrations refreshed",
        description: "All integration statuses have been updated",
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Integrations Overview</h2>
          <p className="text-muted-foreground">
            Connect CyberNest with your IT infrastructure and services
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh Status
          </Button>
          <Button onClick={() => setOpenDialog(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Integration
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Integrations</CardTitle>
          <CardDescription>
            Status overview of your connected services and platforms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockActiveIntegrations.map((integration) => (
              <Card key={integration.id} className="border shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{integration.name}</CardTitle>
                    <StatusBadge status={integration.status} />
                  </div>
                  <CardDescription>{integration.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-muted-foreground">Category:</div>
                      <div>{integration.category}</div>
                      <div className="text-muted-foreground">Last Synced:</div>
                      <div>{integration.lastSynced}</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end pt-2">
                  <Button variant="ghost" size="sm" className="text-xs">
                    Configure
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Sync Logs</CardTitle>
          <CardDescription>
            View recent integration activity and error logs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockActiveIntegrations
              .filter(i => i.recentEvents && i.recentEvents.length > 0)
              .flatMap(i => i.recentEvents?.map(event => ({...event, integration: i.name})) || [])
              .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
              .slice(0, 5)
              .map((event, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-md">
                  {event.type === 'error' ? (
                    <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="font-medium">{event.integration}</p>
                      <span className="text-xs text-muted-foreground">{event.timestamp}</span>
                    </div>
                    <p className={`text-sm ${event.type === 'error' ? 'text-destructive' : ''}`}>
                      {event.message}
                    </p>
                  </div>
                </div>
              ))}
              
            {!mockActiveIntegrations.some(i => i.recentEvents && i.recentEvents.length > 0) && (
              <div className="text-center py-8 text-muted-foreground">
                No recent sync logs found
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <NewIntegrationDialog open={openDialog} onOpenChange={setOpenDialog} />
    </div>
  );
};

// Helper component for status badges
const StatusBadge = ({ status }: { status: 'active' | 'inactive' | 'error' | 'warning' }) => {
  switch (status) {
    case 'active':
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
          <CheckCircle className="h-3 w-3 mr-1" /> Connected
        </Badge>
      );
    case 'error':
      return (
        <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200">
          <XCircle className="h-3 w-3 mr-1" /> Error
        </Badge>
      );
    case 'warning':
      return (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200">
          <AlertTriangle className="h-3 w-3 mr-1" /> Warning
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200">
          Inactive
        </Badge>
      );
  }
};

export default IntegrationsOverview;
