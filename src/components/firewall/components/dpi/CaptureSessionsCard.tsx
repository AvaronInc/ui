
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SessionsTable from './SessionsTable';
import { CaptureSession } from './types';

interface CaptureSessionsCardProps {
  sessions: CaptureSession[];
}

const CaptureSessionsCard = ({ sessions }: CaptureSessionsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Captured Sessions</CardTitle>
        <CardDescription>
          View and analyze detailed network traffic sessions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SessionsTable sessions={sessions} />
      </CardContent>
    </Card>
  );
};

export default CaptureSessionsCard;
