
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Zap, Brain, CheckCircle, History } from 'lucide-react';
import { useContainersData } from '@/components/containers/hooks/useContainersData';

const MetricsCards = () => {
  const { aiOptimizations, autoHealingEvents } = useContainersData();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Auto-Healing</CardTitle>
          <Zap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{autoHealingEvents?.recoveredIncidents || '0'}</div>
          <p className="text-xs text-muted-foreground">
            Incidents auto-recovered
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex items-center space-x-2">
            <Switch id="auto-healing-toggle" defaultChecked />
            <label htmlFor="auto-healing-toggle" className="text-sm">Enabled</label>
          </div>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">AI Optimization</CardTitle>
          <Brain className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{aiOptimizations?.resourcesSaved || '0'}%</div>
          <p className="text-xs text-muted-foreground">
            Resources optimized
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex items-center space-x-2">
            <Switch id="ai-optimization-toggle" defaultChecked />
            <label htmlFor="ai-optimization-toggle" className="text-sm">Enabled</label>
          </div>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Uptime</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{aiOptimizations?.uptimePercentage || '0'}%</div>
          <Progress value={aiOptimizations?.uptimePercentage || 0} className="h-2 mt-2" />
          <p className="text-xs text-muted-foreground mt-2">
            Last 30 days
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Mean Time to Recovery</CardTitle>
          <History className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{aiOptimizations?.meanTimeToRecovery || '0'} sec</div>
          <p className="text-xs text-muted-foreground">
            Average recovery time
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsCards;
