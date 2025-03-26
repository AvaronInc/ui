
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Check, AlertTriangle, CloudSync } from 'lucide-react';

const RetentionSummary: React.FC = () => {
  return (
    <Card className="sticky top-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Storage & Retention Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Log Volume Summary */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Total Log Volume</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Wazuh</span>
              <span className="font-medium">345.2 GB</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Arkime</span>
              <span className="font-medium">1.2 TB</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Syslog</span>
              <span className="font-medium">89.7 GB</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Firewall</span>
              <span className="font-medium">157.3 GB</span>
            </div>
          </div>
        </div>

        <div className="border-t pt-3">
          <h4 className="text-sm font-medium mb-2">Retention Summary</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Wazuh</span>
              <span className="font-medium">90 days</span>
            </div>
            <div className="flex justify-between">
              <span>Arkime</span>
              <span className="font-medium">30 days</span>
            </div>
            <div className="flex justify-between">
              <span>Syslog</span>
              <span className="font-medium">180 days</span>
            </div>
            <div className="flex justify-between">
              <span>Firewall</span>
              <span className="font-medium">60 days</span>
            </div>
          </div>
        </div>

        <div className="border-t pt-3">
          <h4 className="text-sm font-medium mb-3">Storage Usage</h4>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Local Storage</span>
                <span className="font-medium">78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Cloud Storage</span>
                <span className="font-medium">23%</span>
              </div>
              <Progress value={23} className="h-2" />
            </div>
          </div>
        </div>

        <div className="border-t pt-3">
          <h4 className="text-sm font-medium mb-2">Sync Status</h4>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CloudSync className="h-4 w-4 text-green-500" />
              <span className="text-sm">Last sync: 23 minutes ago</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-sm">Hash verification: Passed</span>
            </div>
            
            <div>
              <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20 flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                <span>Arkime rotation in 2 days</span>
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RetentionSummary;
