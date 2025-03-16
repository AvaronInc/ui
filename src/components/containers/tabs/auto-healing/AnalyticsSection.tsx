
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Zap } from 'lucide-react';
import { useContainersData } from '@/components/containers/hooks/useContainersData';
import { AIRecommendationChart } from '../../charts/AIRecommendationChart';

const AnalyticsSection = () => {
  const { autoHealingEvents } = useContainersData();
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>AI Recommendations</CardTitle>
          <CardDescription>
            Resource optimization suggestions from our AI engine
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <AIRecommendationChart />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Auto-Healing Events</CardTitle>
          <CardDescription>
            Recent automated recovery actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-[250px] overflow-auto">
            {autoHealingEvents?.events?.map((event, i) => (
              <div key={i} className="flex items-start space-x-3 border-b pb-3">
                <div className={`p-2 rounded-full ${
                  event.status === 'success' ? 'bg-green-100 dark:bg-green-900/30' : 
                  event.status === 'in-progress' ? 'bg-blue-100 dark:bg-blue-900/30' : 
                  'bg-red-100 dark:bg-red-900/30'
                }`}>
                  {event.status === 'success' ? (
                    <CheckCircle className={`h-4 w-4 ${
                      event.status === 'success' ? 'text-green-600 dark:text-green-400' : 
                      event.status === 'in-progress' ? 'text-blue-600 dark:text-blue-400' : 
                      'text-red-600 dark:text-red-400'
                    }`} />
                  ) : event.status === 'in-progress' ? (
                    <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{event.description}</p>
                  <div className="flex justify-between mt-1">
                    <p className="text-xs text-muted-foreground">{event.containerName}</p>
                    <p className="text-xs text-muted-foreground">{event.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsSection;
