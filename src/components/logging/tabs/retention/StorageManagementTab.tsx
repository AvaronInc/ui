
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HardDrive, Database } from 'lucide-react';

const StorageManagementTab: React.FC = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium flex items-center">
            <HardDrive className="h-4 w-4 mr-2 text-purple-500" />
            Storage Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Storage management features will be implemented in a future update. This will include storage allocation,
            compression settings, and automated cleanup policies.
          </p>
          <div className="flex items-center justify-between p-4 border rounded-md">
            <div className="flex items-center">
              <Database className="h-8 w-8 text-muted-foreground mr-3" />
              <div>
                <h3 className="font-medium">Total Storage Allocated</h3>
                <p className="text-sm text-muted-foreground">3.5 TB / 5 TB used</p>
              </div>
            </div>
            <Button variant="outline">Configure</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StorageManagementTab;
