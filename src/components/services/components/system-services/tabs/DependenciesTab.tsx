
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { SystemService } from '@/types/services';

interface DependenciesTabProps {
  service: SystemService;
}

const DependenciesTab: React.FC<DependenciesTabProps> = ({ service }) => {
  return (
    <div className="p-4 space-y-4">
      <h3 className="text-sm font-medium">Service Dependencies</h3>
      {service.dependencies.length > 0 ? (
        <div className="bg-muted/50 p-3 rounded-md">
          <ul className="space-y-2">
            {service.dependencies.map((dep, index) => (
              <li key={index} className="flex items-center justify-between">
                <span className="text-sm">{dep}</span>
                <Badge variant="outline">Required</Badge>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">This service has no dependencies</p>
      )}
      
      <h3 className="text-sm font-medium">Dependent Services</h3>
      <p className="text-sm text-muted-foreground">
        Information about services that depend on this service would be displayed here.
      </p>
    </div>
  );
};

export default DependenciesTab;
