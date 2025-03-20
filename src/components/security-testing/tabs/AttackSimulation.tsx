
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Laptop, Network, Server, Shield, AlertTriangle, Settings, Target, Calendar } from 'lucide-react';
import NetworkAttackOptions from '../components/NetworkAttackOptions';
import EndpointAttackOptions from '../components/EndpointAttackOptions';
import MalwareEmulationOptions from '../components/MalwareEmulationOptions';
import PrivilegeEscalationOptions from '../components/PrivilegeEscalationOptions';

const AttackSimulation: React.FC = () => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold mb-1">Attack Simulation & Configuration</h2>
        <p className="text-muted-foreground text-sm">Configure and run controlled attack simulations to test your security controls</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Target className="h-5 w-5 mr-2 text-blue-500" />
              Attack Simulation Types
            </CardTitle>
            <CardDescription>Select the type of attack simulation to configure</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="network" className="space-y-4">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <TabsTrigger value="network" className="flex items-center gap-1">
                  <Network className="h-4 w-4" />
                  <span>Network</span>
                </TabsTrigger>
                <TabsTrigger value="endpoint" className="flex items-center gap-1">
                  <Laptop className="h-4 w-4" />
                  <span>Endpoint</span>
                </TabsTrigger>
                <TabsTrigger value="malware" className="flex items-center gap-1">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Malware</span>
                </TabsTrigger>
                <TabsTrigger value="privilege" className="flex items-center gap-1">
                  <Shield className="h-4 w-4" />
                  <span>Privilege</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="network" className="mt-4">
                <NetworkAttackOptions />
              </TabsContent>
              
              <TabsContent value="endpoint" className="mt-4">
                <EndpointAttackOptions />
              </TabsContent>
              
              <TabsContent value="malware" className="mt-4">
                <MalwareEmulationOptions />
              </TabsContent>
              
              <TabsContent value="privilege" className="mt-4">
                <PrivilegeEscalationOptions />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Test Configuration</CardTitle>
            <CardDescription>Global test settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Test Parameters</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="flex items-center justify-center gap-1">
                    <Server className="h-3.5 w-3.5" />
                    <span>Targets</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center justify-center gap-1">
                    <Settings className="h-3.5 w-3.5" />
                    <span>Intensity</span>
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Schedule</h3>
                <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Set Schedule</span>
                </Button>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Safety Controls</h3>
                <div className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" id="rollback" checked className="rounded text-primary" />
                  <label htmlFor="rollback">Auto-rollback on completion</label>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" id="notify" checked className="rounded text-primary" />
                  <label htmlFor="notify">Notify admins before test</label>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" id="duration" checked className="rounded text-primary" />
                  <label htmlFor="duration">Limit test duration</label>
                </div>
              </div>
              
              <Button className="w-full">
                Save Configuration
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AttackSimulation;
