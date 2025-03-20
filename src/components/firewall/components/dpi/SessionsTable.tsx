
import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, FileDown, BrainCircuit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { CaptureSession } from './types';

interface SessionsTableProps {
  sessions: CaptureSession[];
}

const SessionsTable = ({ sessions }: SessionsTableProps) => {
  const { toast } = useToast();

  const exportPCAP = (sessionId: string) => {
    toast({
      title: "PCAP Export Started",
      description: `Exporting session ${sessionId} as PCAP file.`
    });
  };

  const viewSessionDetails = (sessionId: string) => {
    toast({
      title: "Session Details",
      description: `Viewing detailed analysis for session ${sessionId}.`
    });
  };

  const analyzeThreat = (sessionId: string) => {
    toast({
      title: "AI Analysis Initiated",
      description: `Running AI threat analysis on session ${sessionId}.`
    });
  };

  const getThreatBadge = (score: number) => {
    if (score === 0) return <Badge variant="outline">None</Badge>;
    if (score < 30) return <Badge variant="default">Low</Badge>;
    if (score < 70) return <Badge variant="warning">Medium</Badge>;
    return <Badge variant="destructive">High</Badge>;
  };

  const getEncryptionBadge = (encryption: string) => {
    switch (encryption) {
      case 'strong': 
        return <Badge variant="default" className="bg-green-500">Strong</Badge>;
      case 'weak': 
        return <Badge variant="warning">Weak</Badge>;
      case 'none': 
        return <Badge variant="destructive">None</Badge>;
      default: 
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Source</TableHead>
          <TableHead>Destination</TableHead>
          <TableHead>Protocol</TableHead>
          <TableHead>Start Time</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Encryption</TableHead>
          <TableHead>Threat Score</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sessions.map((session) => (
          <TableRow key={session.id}>
            <TableCell className="font-mono text-xs">{session.source}</TableCell>
            <TableCell className="font-mono text-xs">{session.destination}</TableCell>
            <TableCell>{session.protocol}</TableCell>
            <TableCell>{session.startTime}</TableCell>
            <TableCell>{session.duration}</TableCell>
            <TableCell>
              <Badge variant={session.status === 'active' ? 'default' : 'outline'}>
                {session.status === 'active' ? 'Active' : 'Completed'}
              </Badge>
            </TableCell>
            <TableCell>
              {getEncryptionBadge(session.encryption)}
            </TableCell>
            <TableCell>
              {getThreatBadge(session.threatScore)}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => viewSessionDetails(session.id)}
                  title="View Details"
                >
                  <Search className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => exportPCAP(session.id)}
                  title="Export PCAP"
                >
                  <FileDown className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => analyzeThreat(session.id)}
                  title="AI Threat Analysis"
                >
                  <BrainCircuit className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SessionsTable;
