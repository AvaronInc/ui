
import React from 'react';
import { EndpointDevice, EndpointDetails } from '@/types/workforce';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { 
  EndpointHeader,
  EndpointUserInfo,
  EndpointDeviceInfo,
  EndpointSecurityStatus,
  EndpointSoftwareList,
  EndpointUpdatesList
} from './index';
import { SafeTooltipWrapper } from '@/components/ui/tooltip';

interface EndpointDetailPanelProps {
  device: EndpointDevice | null;
  details: EndpointDetails | null;
  onClose: () => void;
  onPushUpdate: (deviceId: string) => void;
  isAdmin: boolean;
}

const EndpointDetailPanel = ({ 
  device, 
  details, 
  onClose, 
  onPushUpdate,
  isAdmin
}: EndpointDetailPanelProps) => {
  if (!device || !details) return null;
  
  const needsUpdate = details.updatesAvailable;
  
  return (
    <SafeTooltipWrapper>
      <Sheet open={!!device} onOpenChange={onClose}>
        <SheetContent className="w-full md:max-w-4xl overflow-y-auto">
          <EndpointHeader device={device} />
          
          <div className="py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <EndpointUserInfo device={device} />
              <EndpointDeviceInfo device={device} />
            </div>
            
            <EndpointSecurityStatus device={device} details={details} />
            
            <Tabs defaultValue="software">
              <TabsList className="mb-4">
                <TabsTrigger value="software">Installed Software</TabsTrigger>
                <TabsTrigger value="updates">Pending Updates</TabsTrigger>
              </TabsList>
              
              <TabsContent value="software">
                <EndpointSoftwareList software={details.software} />
              </TabsContent>
              
              <TabsContent value="updates">
                <EndpointUpdatesList 
                  software={details.software} 
                  needsUpdate={needsUpdate} 
                />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="mt-4 flex justify-between">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            {isAdmin && needsUpdate && (
              <Button 
                onClick={() => onPushUpdate(device.id)}
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" /> 
                Push Updates
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </SafeTooltipWrapper>
  );
};

export default EndpointDetailPanel;
