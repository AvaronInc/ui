
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HeartPulse } from 'lucide-react';
import NetworkHealth from './system-health/NetworkHealth';
import SecurityPosture from './system-health/SecurityPosture';
import SystemPerformance from './system-health/SystemPerformance';
import { healthData } from './system-health/healthData';

const SystemHealthSummary: React.FC = () => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <HeartPulse className="h-5 w-5 text-primary" />
          <span>System Health Summary</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <NetworkHealth data={healthData.networkStatus} />
        <SecurityPosture data={healthData.securityPosture} />
        <SystemPerformance data={healthData.systemPerformance} />
      </CardContent>
    </Card>
  );
};

export default SystemHealthSummary;
