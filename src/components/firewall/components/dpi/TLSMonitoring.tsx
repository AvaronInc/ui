
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lock, Shield } from 'lucide-react';
import { CaptureSession } from './types';

interface TLSMonitoringProps {
  sessions: CaptureSession[];
}

const TLSMonitoring = ({ sessions }: TLSMonitoringProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>TLS/SSL Monitoring</CardTitle>
        <CardDescription>
          Monitor TLS/SSL certificate usage and encryption strength
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-primary" />
                <h4 className="text-sm font-medium">Encryption Overview</h4>
              </div>
              <Button variant="outline" size="sm">View Details</Button>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Strong Encryption (TLS 1.3, 1.2)</span>
                <span className="text-sm font-medium">
                  {sessions.filter(s => s.encryption === 'strong').length} sessions
                </span>
              </div>
              <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-green-500 h-full rounded-full" 
                  style={{ width: `${sessions.filter(s => s.encryption === 'strong').length / sessions.length * 100}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm">Weak Encryption (TLS 1.0, 1.1)</span>
                <span className="text-sm font-medium">
                  {sessions.filter(s => s.encryption === 'weak').length} sessions
                </span>
              </div>
              <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-amber-500 h-full rounded-full" 
                  style={{ width: `${sessions.filter(s => s.encryption === 'weak').length / sessions.length * 100}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm">No Encryption (HTTP, FTP)</span>
                <span className="text-sm font-medium">
                  {sessions.filter(s => s.encryption === 'none').length} sessions
                </span>
              </div>
              <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-red-500 h-full rounded-full" 
                  style={{ width: `${sessions.filter(s => s.encryption === 'none').length / sessions.length * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <h4 className="text-sm font-medium">Protocol Security</h4>
              </div>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Protocol</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Sessions</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>TLS 1.3</TableCell>
                  <TableCell><Badge variant="default" className="bg-green-500">Secure</Badge></TableCell>
                  <TableCell>2</TableCell>
                  <TableCell><Button variant="outline" size="sm">Allow</Button></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>TLS 1.2</TableCell>
                  <TableCell><Badge variant="default" className="bg-green-500">Secure</Badge></TableCell>
                  <TableCell>1</TableCell>
                  <TableCell><Button variant="outline" size="sm">Allow</Button></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>TLS 1.1</TableCell>
                  <TableCell><Badge variant="warning">Weak</Badge></TableCell>
                  <TableCell>1</TableCell>
                  <TableCell><Button variant="outline" size="sm">Block</Button></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>HTTP</TableCell>
                  <TableCell><Badge variant="destructive">Insecure</Badge></TableCell>
                  <TableCell>1</TableCell>
                  <TableCell><Button variant="outline" size="sm">Block</Button></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TLSMonitoring;
