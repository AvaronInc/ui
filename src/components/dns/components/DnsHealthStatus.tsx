
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const DnsHealthStatus: React.FC = () => {
  // Mock health data
  const healthData = {
    status: 'healthy', // healthy, warning, critical
    latency: 23, // ms
    failedQueries: 2,
    cacheRatio: 82, // percentage
    misconfigurations: 0,
  };

  const getStatusColor = () => {
    if (healthData.status === 'critical') return 'text-red-500 bg-red-50 dark:bg-red-950/40';
    if (healthData.status === 'warning') return 'text-amber-500 bg-amber-50 dark:bg-amber-950/40';
    return 'text-green-500 bg-green-50 dark:bg-green-950/40';
  };

  const getStatusIcon = () => {
    if (healthData.status === 'critical' || healthData.status === 'warning') {
      return <AlertTriangle className="h-5 w-5" />;
    }
    return <CheckCircle className="h-5 w-5" />;
  };

  return (
    <Card className={`${getStatusColor()} border-none`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-2">
          {getStatusIcon()}
          <div>
            <h3 className="font-medium mb-1">
              DNS Health Status: {healthData.status === 'healthy' ? 'Healthy' : healthData.status === 'warning' ? 'Warning' : 'Critical'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm mt-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Avg Latency: <strong>{healthData.latency}ms</strong></span>
              </div>
              <div>
                <span>Failed Queries: <strong>{healthData.failedQueries}</strong></span>
              </div>
              <div>
                <span>Cache Hit Ratio: <strong>{healthData.cacheRatio}%</strong></span>
              </div>
              <div>
                <span>Misconfigurations: <strong>{healthData.misconfigurations}</strong></span>
              </div>
            </div>
            {healthData.status !== 'healthy' && (
              <p className="text-sm mt-2">
                {healthData.status === 'warning' ? 
                  'Minor issues detected. Consider reviewing the warning messages in the logs.' : 
                  'Critical DNS issues detected. Immediate attention required.'}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DnsHealthStatus;
