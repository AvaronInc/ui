
import React from 'react';
import { Button } from '@/components/ui/button';
import { X, User, Network, FileEdit, History } from 'lucide-react';
import { VPNSession } from '@/types/workforce';
import { Separator } from '@/components/ui/separator';
import { formatDistanceToNow } from 'date-fns';

interface VPNSessionDetailPanelProps {
  session: VPNSession | null;
  onClose: () => void;
  isAdmin: boolean;
  onDisconnect: (sessionId: string) => void;
}

const VPNSessionDetailPanel = ({
  session,
  onClose,
  isAdmin,
  onDisconnect
}: VPNSessionDetailPanelProps) => {
  if (!session) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80">
      <div className="fixed inset-y-0 right-0 z-50 h-full w-3/4 max-w-md border-l bg-background p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">{session.userName}</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="mt-4 space-y-4">
          <div>
            <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
              <User className="h-4 w-4" />
              User Details
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">User ID:</div>
              <div>{session.userId}</div>
              <div className="text-muted-foreground">Device:</div>
              <div>{session.deviceName}</div>
              <div className="text-muted-foreground">Location:</div>
              <div>{session.location}</div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
              <Network className="h-4 w-4" />
              Connection Details
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">IP Address:</div>
              <div>{session.ipAddress}</div>
              <div className="text-muted-foreground">Connected:</div>
              <div>{formatDistanceToNow(new Date(session.connectionTime), { addSuffix: true })}</div>
              <div className="text-muted-foreground">Duration:</div>
              <div>{session.connectionDuration}</div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
              <History className="h-4 w-4" />
              Recent Activity
            </h4>
            <div className="text-sm text-muted-foreground">
              <p>Connection established from {session.location}</p>
              <p>Last activity: {formatDistanceToNow(new Date(session.connectionTime), { addSuffix: true })}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            {isAdmin && (
              <>
                <Button variant="outline" className="w-full">
                  <FileEdit className="mr-2 h-4 w-4" />
                  Edit User Identity
                </Button>
                <Button 
                  variant="destructive" 
                  className="w-full"
                  onClick={() => onDisconnect(session.id)}
                >
                  <X className="mr-2 h-4 w-4" />
                  Disconnect Session
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VPNSessionDetailPanel;
