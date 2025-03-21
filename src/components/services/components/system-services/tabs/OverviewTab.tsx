
import React from 'react';
import { Clock, Cpu, AlertTriangle } from 'lucide-react';
import { SystemService } from '@/types/services';

interface OverviewTabProps {
  service: SystemService;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ service }) => {
  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            Service Details
          </h3>
          <div className="bg-muted/50 p-3 rounded-md space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm text-muted-foreground">UUID</div>
              <div className="text-sm font-medium">{service.uuid}</div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm text-muted-foreground">Uptime</div>
              <div className="text-sm font-medium">{service.uptime}</div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm text-muted-foreground">Last Restart</div>
              <div className="text-sm font-medium">{new Date(service.lastRestart).toLocaleString()}</div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm text-muted-foreground">Service Type</div>
              <div className="text-sm font-medium capitalize">{service.type}</div>
            </div>
            
            {service.containerImage && (
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm text-muted-foreground">Container Image</div>
                <div className="text-sm font-medium">{service.containerImage}</div>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <Cpu className="h-4 w-4 text-muted-foreground" />
            Resource Usage
          </h3>
          <div className="bg-muted/50 p-3 rounded-md space-y-2">
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">CPU Usage</span>
                <span className="text-sm font-medium">{service.cpuUsage}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${
                    service.cpuUsage > 80 ? 'bg-destructive' : 
                    service.cpuUsage > 60 ? 'bg-warning' : 'bg-success'
                  }`} 
                  style={{ width: `${service.cpuUsage}%` }}
                ></div>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Memory Usage</span>
                <span className="text-sm font-medium">{service.memoryUsage}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${
                    service.memoryUsage > 80 ? 'bg-destructive' : 
                    service.memoryUsage > 60 ? 'bg-warning' : 'bg-success'
                  }`} 
                  style={{ width: `${service.memoryUsage}%` }}
                ></div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="text-sm text-muted-foreground">Assigned CPU</div>
              <div className="text-sm font-medium">{service.assignedResources.cpuCores} cores</div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm text-muted-foreground">Assigned Memory</div>
              <div className="text-sm font-medium">{service.assignedResources.ram} MB</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Description</h3>
        <p className="text-sm text-muted-foreground">{service.description}</p>
      </div>
      
      {service.health === 'degraded' || service.health === 'critical' ? (
        <div className="bg-warning/20 border border-warning p-3 rounded-md flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium">Service Attention Required</h4>
            <p className="text-sm text-muted-foreground mt-1">
              This service is not operating optimally and may require maintenance. 
              {service.health === 'critical' && ' Urgent action is recommended to prevent service disruption.'}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default OverviewTab;
