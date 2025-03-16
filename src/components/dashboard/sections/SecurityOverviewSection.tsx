
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertTriangle, Lock, FileCheck } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import ThreatMap from '@/components/security/components/ThreatMap';

const SecurityOverviewSection = () => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-card/50 pb-2">
        <CardTitle className="flex items-center text-lg font-medium">
          <Shield className="h-5 w-5 mr-2 text-blue-500" />
          Security & Compliance
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Security Score</div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold">87</span>
                <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                  A+
                </Badge>
              </div>
              <Progress value={87} className="h-1.5 mt-1" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Active Threats</div>
              <div className="text-2xl font-bold">3</div>
              <div className="flex gap-2 mt-1">
                <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                  Critical: 1
                </Badge>
                <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                  Warning: 2
                </Badge>
              </div>
            </div>
          </div>

          <div className="h-[130px] mb-4">
            <ThreatMap />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded-md bg-red-50 dark:bg-red-900/10">
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                <span className="text-sm">Unusual login activity detected</span>
              </div>
              <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                Critical
              </Badge>
            </div>
            <div className="flex items-center justify-between p-2 rounded-md bg-amber-50 dark:bg-amber-900/10">
              <div className="flex items-center">
                <Lock className="h-4 w-4 text-amber-500 mr-2" />
                <span className="text-sm">Encryption certificate expiring soon</span>
              </div>
              <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                Warning
              </Badge>
            </div>
            <div className="flex items-center justify-between p-2 rounded-md bg-green-50 dark:bg-green-900/10">
              <div className="flex items-center">
                <FileCheck className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">Compliance check passed</span>
              </div>
              <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                Info
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityOverviewSection;
