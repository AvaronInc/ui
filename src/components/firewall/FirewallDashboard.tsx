
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import LiveTrafficAnalytics from './components/LiveTrafficAnalytics';
import TopSourcesTable from './components/TopSourcesTable';
import ThreatDetectionPanel from './components/ThreatDetectionPanel';
import PerformanceMetrics from './components/PerformanceMetrics';
import QuickActionControls from './components/QuickActionControls';
import { Shield, Activity, Globe, AlertTriangle, Gauge } from 'lucide-react';

const FirewallDashboard = () => {
  const { toast } = useToast();
  const [securityMode, setSecurityMode] = useState<'normal' | 'strict' | 'custom'>('normal');

  const handleModeChange = (mode: 'normal' | 'strict' | 'custom') => {
    setSecurityMode(mode);
    toast({
      title: "Security Mode Changed",
      description: `Firewall is now in ${mode} mode`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Firewall Dashboard</h2>
          <p className="text-muted-foreground">Real-time firewall monitoring and control</p>
        </div>
        
        <div className="space-x-2 flex">
          <Button 
            variant={securityMode === 'normal' ? 'default' : 'outline'}
            onClick={() => handleModeChange('normal')}
            className="w-24"
          >
            Normal
          </Button>
          <Button 
            variant={securityMode === 'strict' ? 'default' : 'outline'}
            onClick={() => handleModeChange('strict')}
            className="w-24"
          >
            Strict
          </Button>
          <Button 
            variant={securityMode === 'custom' ? 'default' : 'outline'}
            onClick={() => handleModeChange('custom')}
            className="w-24"
          >
            Custom
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-500" />
              Traffic Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LiveTrafficAnalytics />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Gauge className="h-5 w-5 text-green-500" />
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PerformanceMetrics />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Globe className="h-5 w-5 text-indigo-500" />
              Top Sources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="allowed">
              <TabsList className="mb-2">
                <TabsTrigger value="allowed">Allowed</TabsTrigger>
                <TabsTrigger value="blocked">Blocked</TabsTrigger>
              </TabsList>
              <TabsContent value="allowed">
                <TopSourcesTable type="allowed" />
              </TabsContent>
              <TabsContent value="blocked">
                <TopSourcesTable type="blocked" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Active Threats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ThreatDetectionPanel />
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Shield className="h-5 w-5 text-purple-500" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <QuickActionControls />
        </CardContent>
      </Card>
    </div>
  );
};

export default FirewallDashboard;
