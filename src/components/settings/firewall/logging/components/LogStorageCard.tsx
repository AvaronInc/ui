
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { HardDrive, Clock, Server, Shield } from 'lucide-react';

const LogStorageCard: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Log Storage</h3>
            <div className="flex items-center">
              <HardDrive className="h-5 w-5 mr-2 text-blue-600" />
              <span className="text-lg font-medium">2.4 TB / 5 TB</span>
            </div>
            <Progress value={48} className="h-2" />
            <p className="text-sm text-muted-foreground">
              48% utilized
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Retention Period</h3>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-600" />
              <span className="text-lg font-medium">365 Days</span>
            </div>
            <p className="text-sm text-muted-foreground">
              All security logs kept for 1 year
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">SIEM Integration</h3>
            <div className="flex items-center">
              <Server className="h-5 w-5 mr-2 text-green-600" />
              <span className="text-lg font-medium">Active</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Connected to ELK Stack
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Overall Compliance</h3>
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-green-600" />
              <span className="text-lg font-medium">96%</span>
            </div>
            <div className="flex space-x-2">
              <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                PCI-DSS
              </Badge>
              <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                GDPR
              </Badge>
              <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                SOC 2
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LogStorageCard;
