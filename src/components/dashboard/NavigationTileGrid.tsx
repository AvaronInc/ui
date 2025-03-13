
import React from 'react';
import NavigationTile from './NavigationTile';
import { Building, Server, ShieldCheck, Users } from 'lucide-react';

const NavigationTileGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <NavigationTile
        title="Security Operations"
        description="Monitor and manage security events"
        href="/security"
        icon={ShieldCheck}
      />
      <NavigationTile
        title="Remote Monitoring"
        description="View and manage monitored devices"
        href="/rmm"
        icon={Server}
      />
      <NavigationTile
        title="Workforce Management"
        description="Manage employee devices & access"
        href="/workforce"
        icon={Users}
      />
      <NavigationTile
        title="Storage Management"
        description="Manage files and storage buckets"
        href="/storage"
        icon={Building}
      />
    </div>
  );
};

export default NavigationTileGrid;
