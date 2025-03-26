
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Archive, CloudOff } from 'lucide-react';

const ArchivingTab: React.FC = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium flex items-center">
            <Archive className="h-4 w-4 mr-2 text-green-500" />
            Archiving Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Archiving features will be implemented in a future update. This will include
            offsite backup configuration, cold storage policies, and compliance archiving.
          </p>
          <div className="flex items-center justify-between p-4 border rounded-md">
            <div className="flex items-center">
              <CloudOff className="h-8 w-8 text-muted-foreground mr-3" />
              <div>
                <h3 className="font-medium">Offsite Archiving</h3>
                <p className="text-sm text-muted-foreground">Last archiving job: 2 hours ago</p>
              </div>
            </div>
            <Button variant="outline">Configure</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArchivingTab;
