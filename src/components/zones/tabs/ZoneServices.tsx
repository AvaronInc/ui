
import React, { useState } from 'react';
import { useZoneData } from '../hooks/useZoneData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { AlertTriangle, CheckCircle, RefreshCw, Info, Shield, Database, Server, Clock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';

interface ZoneServicesProps {
  zone: {
    id: string;
  };
}

// Service type definitions
type ServiceStatus = 'running' | 'degraded' | 'restart_required' | 'stopped';

interface ZoneService {
  id: string;
  name: string;
  type: string;
  description: string;
  status: ServiceStatus;
  version: string;
  lastRestart: string;
  healthScore: number;
  enabled: boolean;
}

// Mock service data - would come from an API in a real implementation
const mockZoneServices: ZoneService[] = [
  {
    id: 'sdwan-001',
    name: 'SD-WAN Controller',
    type: 'sdwan',
    description: 'Software-defined wide area network controller',
    status: 'running',
    version: '4.2.1',
    lastRestart: '2023-10-15T08:30:00Z',
    healthScore: 98,
    enabled: true
  },
  {
    id: 'identity-001',
    name: 'Identity Provider',
    type: 'identity',
    description: 'Authentication and identity management service',
    status: 'running',
    version: '3.1.7',
    lastRestart: '2023-10-10T14:15:22Z',
    healthScore: 100,
    enabled: true
  },
  {
    id: 'rmm-001',
    name: 'Remote Monitoring',
    type: 'rmm',
    description: 'Remote monitoring and management service',
    status: 'degraded',
    version: '2.8.3',
    lastRestart: '2023-10-01T09:45:12Z',
    healthScore: 76,
    enabled: true
  },
  {
    id: 'vault-001',
    name: 'Vault Storage (MinIO)',
    type: 'vault',
    description: 'Secure object storage service',
    status: 'restart_required',
    version: '5.0.4',
    lastRestart: '2023-09-28T11:20:45Z',
    healthScore: 65,
    enabled: true
  },
  {
    id: 'ai-001',
    name: 'AI Ticketing',
    type: 'ai',
    description: 'AI-powered ticketing and support system',
    status: 'running',
    version: '1.4.2',
    lastRestart: '2023-10-12T16:05:33Z',
    healthScore: 94,
    enabled: true
  },
  {
    id: 'compliance-001',
    name: 'Compliance Engine',
    type: 'compliance',
    description: 'Regulatory compliance monitoring and reporting',
    status: 'stopped',
    version: '2.2.1',
    lastRestart: '2023-09-22T10:30:15Z',
    healthScore: 0,
    enabled: false
  },
  {
    id: 'mixtral-001',
    name: 'Mixtral LLM',
    type: 'mixtral',
    description: 'Large language model inference engine',
    status: 'running',
    version: '8.7.0',
    lastRestart: '2023-10-14T08:10:45Z',
    healthScore: 92,
    enabled: true
  }
];

const ZoneServices: React.FC<ZoneServicesProps> = ({ zone: initialZone }) => {
  const { zone, isLoading, error } = useZoneData(initialZone.id);
  const [activeView, setActiveView] = useState<'all' | 'running' | 'issues'>('all');
  const [services, setServices] = useState<ZoneService[]>(mockZoneServices);
  const { toast } = useToast();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !zone) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error || 'Failed to load zone services. Please try again.'}
        </AlertDescription>
      </Alert>
    );
  }

  // Filter services based on the active view
  const filteredServices = services.filter(service => {
    if (activeView === 'all') return true;
    if (activeView === 'running') return service.status === 'running' && service.enabled;
    if (activeView === 'issues') return service.status === 'degraded' || service.status === 'restart_required';
    return true;
  });

  // Get service icon based on type
  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'sdwan':
        return <Server className="h-5 w-5" />;
      case 'identity':
        return <Shield className="h-5 w-5" />;
      case 'rmm':
        return <RefreshCw className="h-5 w-5" />;
      case 'vault':
        return <Database className="h-5 w-5" />;
      case 'ai':
      case 'mixtral':
        return <Info className="h-5 w-5" />;
      case 'compliance':
        return <Clock className="h-5 w-5" />;
      default:
        return <Server className="h-5 w-5" />;
    }
  };

  // Get status badge based on service status
  const getStatusBadge = (status: ServiceStatus, enabled: boolean) => {
    if (!enabled) {
      return <Badge variant="outline" className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300">Disabled</Badge>;
    }

    switch (status) {
      case 'running':
        return <Badge variant="outline" className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800">Running</Badge>;
      case 'degraded':
        return <Badge variant="outline" className="bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800">Degraded</Badge>;
      case 'restart_required':
        return <Badge variant="outline" className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800">Restart Required</Badge>;
      case 'stopped':
        return <Badge variant="outline" className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300">Stopped</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Format date for last restart
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Get health status icon based on health score
  const getHealthIcon = (score: number) => {
    if (score >= 90) return <CheckCircle className="h-5 w-5 text-green-500" />;
    if (score >= 70) return <AlertTriangle className="h-5 w-5 text-amber-500" />;
    return <AlertTriangle className="h-5 w-5 text-red-500" />;
  };

  // Handle service toggle
  const handleServiceToggle = (serviceId: string, currentState: boolean) => {
    setServices(prev => 
      prev.map(service => 
        service.id === serviceId 
          ? { 
              ...service, 
              enabled: !currentState,
              status: !currentState ? 'running' : 'stopped',
              healthScore: !currentState ? 85 : 0
            } 
          : service
      )
    );

    toast({
      title: `Service ${currentState ? 'disabled' : 'enabled'}`,
      description: `The service has been ${currentState ? 'disabled' : 'enabled'} successfully.`,
      duration: 3000,
    });
  };

  // Handle service restart
  const handleServiceRestart = (serviceId: string) => {
    setServices(prev => 
      prev.map(service => 
        service.id === serviceId 
          ? { 
              ...service, 
              status: 'running', 
              lastRestart: new Date().toISOString(),
              healthScore: Math.floor(Math.random() * 20) + 80  // Random score between 80-100
            } 
          : service
      )
    );

    toast({
      title: "Service restarted",
      description: "The service has been restarted successfully.",
      duration: 3000,
    });
  };

  // Handle card click to navigate to service monitoring
  const handleCardClick = (service: ZoneService) => {
    navigate(`/services?tab=monitoring&service=${service.id}`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-semibold">Zone Services</CardTitle>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setActiveView('all')}
                className={activeView === 'all' ? "bg-primary text-primary-foreground" : ""}
              >
                All Services
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setActiveView('running')}
                className={activeView === 'running' ? "bg-primary text-primary-foreground" : ""}
              >
                Running
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setActiveView('issues')}
                className={activeView === 'issues' ? "bg-primary text-primary-foreground" : ""}
              >
                Issues
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredServices.length === 0 ? (
              <div className="col-span-2 text-center p-4 bg-slate-50 dark:bg-slate-900 rounded-md">
                <p className="text-muted-foreground">No services match the current filter</p>
              </div>
            ) : (
              filteredServices.map(service => (
                <Card 
                  key={service.id} 
                  className="overflow-hidden dark:bg-slate-900 dark:border-slate-800 cursor-pointer hover:shadow-md transition-all duration-200"
                  onClick={() => handleCardClick(service)}
                >
                  <CardContent className="p-0">
                    <div className="flex items-start p-4 border-b dark:border-slate-800">
                      <div className="flex-shrink-0 p-2 mr-3 bg-slate-100 dark:bg-slate-800 rounded-md">
                        {getServiceIcon(service.type)}
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{service.name}</h3>
                            <p className="text-sm text-muted-foreground">{service.description}</p>
                          </div>
                          <div className="flex flex-col items-end">
                            {getStatusBadge(service.status, service.enabled)}
                            <span className="text-xs mt-1 text-muted-foreground">v{service.version}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">Health:</span>
                          <div className="flex items-center">
                            {getHealthIcon(service.healthScore)}
                            <span className="ml-1 text-sm">
                              {service.enabled ? `${service.healthScore}%` : 'N/A'}
                            </span>
                          </div>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Last restart: </span>
                          <span>{formatDate(service.lastRestart)}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">Enabled:</span>
                          <Switch 
                            checked={service.enabled} 
                            onCheckedChange={(checked) => {
                              // Stop event propagation to prevent navigation when toggling
                              event.stopPropagation();
                              handleServiceToggle(service.id, service.enabled);
                            }}
                          />
                        </div>
                        <div className="space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={(event) => {
                              // Stop event propagation to prevent navigation when clicking restart
                              event.stopPropagation();
                              handleServiceRestart(service.id);
                            }}
                            disabled={!service.enabled}
                          >
                            <RefreshCw className="mr-1 h-4 w-4" />
                            Restart
                          </Button>
                          <Button 
                            size="sm"
                            onClick={(event) => {
                              // Stop event propagation to prevent navigation when clicking update
                              event.stopPropagation();
                            }}
                          >
                            Update
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ZoneServices;
