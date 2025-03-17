
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { ShieldCheck, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { EndpointDevice, EndpointDetails } from '@/types/workforce';

interface EndpointSecurityStatusProps {
  device: EndpointDevice;
  details: EndpointDetails;
}

const EndpointSecurityStatus = ({ device, details }: EndpointSecurityStatusProps) => {
  const getComplianceIcon = (status: string) => {
    if (status.includes('Compliant')) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    } else if (status.includes('Critical')) {
      return <XCircle className="h-4 w-4 text-red-500" />;
    } else {
      return <AlertTriangle className="h-4 w-4 text-amber-500" />;
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          Security Status
        </h3>
        <div className="flex items-center">
          {getComplianceIcon(details.complianceStatus)}
          <span className="text-sm ml-1">{details.complianceStatus}</span>
        </div>
      </div>
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span>Security Score</span>
            <span className={device.status === 'up_to_date' ? 'text-green-500' : device.status === 'needs_patch' ? 'text-amber-500' : 'text-red-500'}>
              {device.status === 'up_to_date' ? '92%' : device.status === 'needs_patch' ? '78%' : '45%'}
            </span>
          </div>
          <Progress value={device.status === 'up_to_date' ? 92 : device.status === 'needs_patch' ? 78 : 45} className="h-2" />
        </div>
        
        <div className="text-xs text-muted-foreground">
          <div className="flex justify-between mb-1">
            <span>Patch Status</span>
            <span>{details.securityPatchStatus}</span>
          </div>
          <div className="flex justify-between">
            <span>Last Security Scan</span>
            <span>{details.lastScan}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndpointSecurityStatus;
