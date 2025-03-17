
import React from 'react';
import VPNSessionsTable from '@/components/workforce/VPNSessionsTable';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { VPNSession } from '@/types/workforce';
import { Button } from '@/components/ui/button';
import { Shield, RefreshCw, AlertTriangle } from 'lucide-react';

interface VPNTabContentProps {
  sessions: VPNSession[];
  onDisconnect: (sessionId: string) => void;
  isAdmin: boolean;
}

const VPNTabContent = ({ sessions, onDisconnect, isAdmin }: VPNTabContentProps) => {
  // Group sessions by location
  const sessionsByLocation = sessions.reduce((acc, session) => {
    const location = session.location || 'Unknown';
    if (!acc[location]) {
      acc[location] = [];
    }
    acc[location].push(session);
    return acc;
  }, {} as Record<string, VPNSession[]>);

  // Get count of locations
  const locationCount = Object.keys(sessionsByLocation).length;

  // Calculate potential security risks
  // For demo purposes, mark any sessions from unusual locations
  const unusualLocations = ['Remote Site B', 'External Network'];
  const securityRisks = sessions.filter(session => 
    unusualLocations.includes(session.location || '')
  ).length;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Sessions</p>
              <h3 className="text-2xl font-bold">{sessions.length}</h3>
            </div>
            <Shield className="h-8 w-8 text-primary opacity-75" />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Locations</p>
              <h3 className="text-2xl font-bold">{locationCount}</h3>
            </div>
            <RefreshCw className="h-8 w-8 text-primary opacity-75" />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Security Alerts</p>
              <h3 className="text-2xl font-bold">{securityRisks}</h3>
            </div>
            <AlertTriangle className="h-8 w-8 text-warning opacity-75" />
          </CardContent>
        </Card>
      </div>
      
      {securityRisks > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-md mb-4 flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 flex-shrink-0" />
          <div>
            <p className="font-medium text-sm">Potential security risks detected</p>
            <p className="text-xs mt-1">
              {securityRisks} VPN session(s) from unusual locations. Review and verify authenticity.
            </p>
          </div>
          <Button variant="outline" size="sm" className="ml-auto">Review</Button>
        </div>
      )}
      
      <VPNSessionsTable 
        sessions={sessions}
        onDisconnect={onDisconnect}
        isAdmin={isAdmin}
      />
    </div>
  );
};

export default VPNTabContent;
