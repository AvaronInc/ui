
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HeartPulse, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NetworkHealth from './system-health/NetworkHealth';
import SecurityPosture from './system-health/SecurityPosture';
import SystemPerformance from './system-health/SystemPerformance';
import { useHealthData } from './system-health/useHealthData';

const SystemHealthSummary: React.FC = () => {
  const { networkHealth, securityPosture, systemPerformance, refreshData, isLoading } = useHealthData();

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center gap-2">
            <HeartPulse className="h-5 w-5 text-primary" />
            <span>System Health Summary</span>
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={refreshData}
            disabled={isLoading}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="sr-only">Refresh health data</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <NetworkHealth 
          data={networkHealth.data} 
          isLoading={networkHealth.isLoading} 
          error={networkHealth.error} 
        />
        <SecurityPosture 
          data={securityPosture.data} 
          isLoading={securityPosture.isLoading} 
          error={securityPosture.error} 
        />
        <SystemPerformance 
          data={systemPerformance.data} 
          isLoading={systemPerformance.isLoading} 
          error={systemPerformance.error} 
        />
      </CardContent>
    </Card>
  );
};

export default SystemHealthSummary;
