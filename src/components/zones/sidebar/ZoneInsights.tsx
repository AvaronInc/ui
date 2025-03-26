
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Shield, AlertCircle } from 'lucide-react';
import { mockZoneSummary } from '../mockData';

const ZoneInsights: React.FC = () => {
  const { totalZones, highTrustZones, zonesWithAlerts, aiTraffic, mixtralSummary } = mockZoneSummary;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Real-Time Zone Insights</CardTitle>
          <CardDescription>
            Summary and alerts across all zones
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card-secondary p-3 rounded-lg border">
              <div className="text-3xl font-bold text-center">{totalZones}</div>
              <div className="text-xs text-center text-muted-foreground">Total Zones</div>
            </div>
            <div className="bg-card-secondary p-3 rounded-lg border">
              <div className="text-3xl font-bold text-center flex items-center justify-center">
                {highTrustZones} <Shield className="h-4 w-4 ml-1 text-green-500" />
              </div>
              <div className="text-xs text-center text-muted-foreground">High-Trust Zones</div>
            </div>
          </div>
          
          {zonesWithAlerts > 0 && (
            <div className="bg-red-500/10 border border-red-200 dark:border-red-900 rounded-md p-3">
              <div className="flex items-center text-red-600 dark:text-red-400">
                <AlertCircle className="h-4 w-4 mr-2" />
                <span className="font-medium">{zonesWithAlerts} Zones with Alerts</span>
              </div>
            </div>
          )}
          
          <div>
            <h4 className="text-sm font-medium mb-2">Services Active by Zone Type</h4>
            <div className="space-y-1.5">
              <div className="flex items-center">
                <span className="text-xs w-32 truncate">Development</span>
                <div className="flex-grow h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: '78%' }} />
                </div>
                <span className="text-xs ml-2">78%</span>
              </div>
              <div className="flex items-center">
                <span className="text-xs w-32 truncate">Production</span>
                <div className="flex-grow h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: '92%' }} />
                </div>
                <span className="text-xs ml-2">92%</span>
              </div>
              <div className="flex items-center">
                <span className="text-xs w-32 truncate">Testing</span>
                <div className="flex-grow h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500" style={{ width: '45%' }} />
                </div>
                <span className="text-xs ml-2">45%</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Zones with Most AI Traffic</h4>
            <div className="space-y-1.5">
              {aiTraffic.map((zone, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-xs w-32 truncate">{zone.zoneName}</span>
                  <div className="flex-grow h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-500" 
                      style={{ width: `${zone.trafficPercentage}%` }} 
                    />
                  </div>
                  <span className="text-xs ml-2">{zone.trafficPercentage}%</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-amber-500/10 border border-amber-200 dark:border-amber-900 rounded-md p-3">
            <div className="text-sm font-medium mb-1 text-amber-700 dark:text-amber-400">Mixtral Summary</div>
            <p className="text-xs text-amber-600 dark:text-amber-300">{mixtralSummary}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ZoneInsights;
