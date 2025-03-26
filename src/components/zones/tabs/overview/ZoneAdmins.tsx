
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zone } from '../../types';

interface ZoneAdminsProps {
  zone: Zone;
}

const ZoneAdmins: React.FC<ZoneAdminsProps> = ({ zone }) => {
  // Sample mock data for administrators
  const mockAdmins = ['Sarah Johnson', 'Alex Chen'];
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Zone Administrators</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockAdmins.map((admin, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="bg-primary/10 h-8 w-8 rounded-full flex items-center justify-center text-primary font-medium">
                {admin.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="font-medium text-sm">{admin}</div>
                <div className="text-xs text-muted-foreground">Primary Admin</div>
              </div>
            </div>
          ))}
          <div className="text-sm text-muted-foreground mt-2">
            Admin scopes: {zone.adminScopes.join(', ')}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ZoneAdmins;
