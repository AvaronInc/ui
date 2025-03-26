
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zone } from '../../types';

interface ZoneServicesProps {
  zone: Zone;
}

const ZoneServices: React.FC<ZoneServicesProps> = ({ zone }) => {
  // Convert service types to more readable format
  const formatServiceName = (service: string) => {
    const serviceMap: {[key: string]: string} = {
      'sdwan': 'SD-WAN',
      'identity': 'Identity',
      'vault': 'Vault',
      'ai': 'AI Core',
      'rmm': 'RMM',
      'mixtral': 'Mixtral',
      'nestvault': 'NestVault'
    };
    return serviceMap[service] || service;
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Enabled Services</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {zone.services.map((service) => (
            <Badge key={service} variant="secondary" className="justify-center py-1.5">
              {formatServiceName(service)}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ZoneServices;
