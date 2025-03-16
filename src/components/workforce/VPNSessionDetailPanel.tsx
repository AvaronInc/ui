
import React from 'react';
import { VPNSession } from '@/types/workforce';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { XCircle, User, Monitor, Network, MapPin, Clock, Shield, Power } from 'lucide-react';

interface VPNSessionDetailPanelProps {
  session: VPNSession | null;
  onClose: () => void;
  onDisconnect: (sessionId: string) => void;
  isAdmin: boolean;
}

const VPNSessionDetailPanel = ({ 
  session, 
  onClose, 
  onDisconnect,
  isAdmin
}: VPNSessionDetailPanelProps) => {
  if (!session) return null;
  
  return (
    <Sheet open={!!session} onOpenChange={onClose}>
      <SheetContent className="max-w-md">
        <SheetHeader>
          <SheetTitle className="flex justify-between items-center">
            <span>VPN Session Details</span>
            <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
              Active
            </Badge>
          </SheetTitle>
          <SheetDescription>
            Information about the current VPN connection
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-4 space-y-4">
          <div className="flex items-start gap-3 pb-3 border-b">
            <User className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium">{session.userName}</p>
              <p className="text-xs text-muted-foreground">User ID: {session.userId}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 pb-3 border-b">
            <Monitor className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium">{session.deviceName}</p>
              <p className="text-xs text-muted-foreground">Connected Device</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 pb-3 border-b">
            <Network className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium">{session.ipAddress}</p>
              <p className="text-xs text-muted-foreground">IP Address</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 pb-3 border-b">
            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium">{session.location}</p>
              <p className="text-xs text-muted-foreground">Connection Location</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 pb-3 border-b">
            <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium">{formatDistanceToNow(new Date(session.connectionTime), { addSuffix: true })}</p>
              <p className="text-xs text-muted-foreground">Connected for: {session.connectionDuration}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium">Connection Security</p>
              <p className="text-xs text-muted-foreground">Encrypted with AES-256</p>
              <p className="text-xs text-muted-foreground">2FA Verified</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {isAdmin && (
            <Button 
              variant="destructive" 
              onClick={() => onDisconnect(session.id)}
              className="flex items-center gap-2"
            >
              <Power className="h-4 w-4" /> 
              Disconnect Session
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default VPNSessionDetailPanel;
