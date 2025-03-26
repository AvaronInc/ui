
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Zone } from '../../types';
import { ZoneStatusBadge } from '../../ZonesPanel';

// Format date function
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

interface ZoneHeaderProps {
  zone: Zone;
}

const ZoneHeader: React.FC<ZoneHeaderProps> = ({ zone }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-semibold">Zone Overview</CardTitle>
            <CardDescription>{zone.description}</CardDescription>
          </div>
          <ZoneStatusBadge status={zone.status} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Created</span>
              <span>{formatDate(zone.created)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Last Modified</span>
              <span>{formatDate(zone.modified)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Isolation Level</span>
              <Badge variant="outline" className="capitalize">{zone.isolationLevel}</Badge>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Uptime</span>
              <span className="font-medium text-green-500">99.8%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Last 24h</span>
              <span className="font-medium text-green-500">100%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Vault ID Required</span>
              <span>{zone.vaultIdRequired ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ZoneHeader;
