
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { mockZoneSummary } from '../mockData';
import { Database, Shield, AlertTriangle, Brain } from 'lucide-react';

const ZoneInsights: React.FC = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Zone Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-secondary/50 p-2 rounded-md">
              <div className="text-sm font-medium">Total Zones</div>
              <div className="text-2xl font-bold">{mockZoneSummary.totalZones}</div>
            </div>
            <div className="bg-secondary/50 p-2 rounded-md">
              <div className="text-sm font-medium">High Trust</div>
              <div className="text-2xl font-bold">{mockZoneSummary.highTrustZones}</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 mr-1 text-amber-500" />
                <span>Zones with Alerts</span>
              </div>
              <span>{mockZoneSummary.zonesWithAlerts}</span>
            </div>
            
            {mockZoneSummary.storageStats && (
              <>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Database className="h-4 w-4 mr-1 text-indigo-500" />
                    <span>Storage Used</span>
                  </div>
                  <span>
                    {mockZoneSummary.storageStats.totalUsed.toFixed(1)} / {mockZoneSummary.storageStats.totalProvisioned} TB
                  </span>
                </div>
                <Progress 
                  value={(mockZoneSummary.storageStats.totalUsed / mockZoneSummary.storageStats.totalProvisioned) * 100} 
                  className="h-1.5"
                />
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div>Most used: {mockZoneSummary.storageStats.mostUsedZone}</div>
                  <div>Low space alerts: {mockZoneSummary.storageStats.lowStorageAlerts}</div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">AI Traffic by Zone</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockZoneSummary.aiTraffic.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span>{item.zoneName}</span>
                <span>{item.trafficPercentage}%</span>
              </div>
              <Progress value={item.trafficPercentage} className="h-1.5" />
            </div>
          ))}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium flex items-center">
            <Brain className="h-4 w-4 mr-2 text-pink-500" />
            Mixtral Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{mockZoneSummary.mixtralSummary}</p>
          
          <p className="text-sm text-muted-foreground mt-3 border-t pt-3">
            <span className="font-medium text-foreground block mb-1">Storage Insights:</span>
            "Marketing Zone's VertexVault usage has increased 40% in 2 weeks. Recommend reviewing access logs."
          </p>
          
          <p className="text-sm text-muted-foreground mt-3">
            "Bucket archive-HR-2022 may qualify for cold storage archival based on last access date."
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ZoneInsights;
