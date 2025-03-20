
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { KeyRound, Fingerprint, Database } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { DNSSECEvent } from '../types';

const DNSSECTab: React.FC = () => {
  const { toast } = useToast();
  const [dnssecEnabled, setDnssecEnabled] = useState(true);
  const [enableQuantumSecurity, setEnableQuantumSecurity] = useState(false);

  // Sample DNSSEC events
  const dnssecEvents: DNSSECEvent[] = [
    { id: 1, event: 'Key Rotation', zone: 'company.com', timestamp: '2023-07-10 00:00:00', status: 'Completed' },
    { id: 2, event: 'Signature Refresh', zone: 'internal.company.com', timestamp: '2023-07-15 00:00:00', status: 'Completed' },
    { id: 3, event: 'DNSKEY Published', zone: 'api.company.com', timestamp: '2023-07-01 00:00:00', status: 'Completed' },
  ];

  const handleToggleDNSSEC = () => {
    setDnssecEnabled(!dnssecEnabled);
    toast({
      title: dnssecEnabled ? "DNSSEC Disabled" : "DNSSEC Enabled",
      description: dnssecEnabled ? "Digital signing of DNS records has been disabled." : "Digital signing of DNS records has been enabled.",
    });
  };

  const handleToggleQuantumSecurity = () => {
    setEnableQuantumSecurity(!enableQuantumSecurity);
    toast({
      title: enableQuantumSecurity ? "Quantum Security Disabled" : "Quantum Security Enabled",
      description: enableQuantumSecurity 
        ? "Kyber-based post-quantum cryptography for DNSSEC has been disabled." 
        : "Kyber-based post-quantum cryptography for DNSSEC has been enabled.",
    });
  };

  const handleForceKeyRotation = () => {
    toast({
      title: "DNSSEC Key Rotation Initiated",
      description: "DNSSEC keys are being rotated. This process may take a few minutes to complete.",
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-y-0.5">
              <h3 className="text-lg font-medium">DNSSEC Configuration</h3>
              <p className="text-sm text-muted-foreground">Digitally sign DNS records to prevent DNS spoofing and cache poisoning attacks</p>
            </div>
            <div className="flex items-center space-x-2">
              <span>{dnssecEnabled ? 'Enabled' : 'Disabled'}</span>
              <Switch checked={dnssecEnabled} onCheckedChange={handleToggleDNSSEC} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <KeyRound className="h-4 w-4" />
                  Key Management
                </h4>
                <div className="rounded-md border p-4 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">ZSK Key Length</span>
                      <span className="text-sm font-medium">2048 bits</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">KSK Key Length</span>
                      <span className="text-sm font-medium">4096 bits</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Next Key Rotation</span>
                      <span className="text-sm font-medium">23 days</span>
                    </div>
                  </div>
                  <Button variant="outline" onClick={handleForceKeyRotation} className="w-full">
                    Force Key Rotation
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Fingerprint className="h-4 w-4" />
                  Post-Quantum Security
                </h4>
                <div className="rounded-md border p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm">Kyber-based encryption</p>
                      <p className="text-xs text-muted-foreground">Provides protection against quantum computing attacks</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs">{enableQuantumSecurity ? 'Enabled' : 'Disabled'}</span>
                      <Switch checked={enableQuantumSecurity} onCheckedChange={handleToggleQuantumSecurity} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Recent DNSSEC Events
                </h4>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Event</TableHead>
                        <TableHead>Zone</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dnssecEvents.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell className="font-medium">{event.event}</TableCell>
                          <TableCell>{event.zone}</TableCell>
                          <TableCell>
                            <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                              {event.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Signed Zones Status</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>External Zones</span>
                      <span>12/12 Signed</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Internal Zones</span>
                      <span>8/10 Signed</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DNSSECTab;
