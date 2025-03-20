
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { ChartBar } from 'lucide-react';
import SwitchPerformanceMetrics from '../SwitchPerformanceMetrics';

interface PerformanceMetricsSectionProps {
  selectedSwitch: string | null;
}

const PerformanceMetricsSection: React.FC<PerformanceMetricsSectionProps> = ({ 
  selectedSwitch 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ChartBar className="mr-2 h-5 w-5 text-primary" />
          Performance Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <SwitchPerformanceMetrics selectedSwitch={selectedSwitch} />
      </CardContent>
    </Card>
  );
};

export default PerformanceMetricsSection;
