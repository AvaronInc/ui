
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CaptureSession } from './types';

interface SessionStatsProps {
  sessions: CaptureSession[];
}

const SessionStats = ({ sessions }: SessionStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
          <CardDescription>Current packet capture sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{sessions.filter(s => s.status === 'active').length}</div>
          <p className="text-xs text-muted-foreground mt-1">Out of {sessions.length} total sessions</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Packets Analyzed</CardTitle>
          <CardDescription>Total packets inspected</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {sessions.reduce((acc, session) => acc + session.packets, 0).toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {(sessions.reduce((acc, session) => acc + session.bytes, 0) / 1024 / 1024).toFixed(2)} MB of data
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Potential Threats</CardTitle>
          <CardDescription>Sessions with elevated risk scores</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {sessions.filter(s => s.threatScore > 0).length}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {sessions.filter(s => s.threatScore > 50).length} high-priority threats detected
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SessionStats;
