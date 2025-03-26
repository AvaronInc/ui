
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Archive,
  DownloadCloud,
  FileLock2,
  UserCheck,
  ShieldCheck,
  FileText,
  FileCheck,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface ComplianceProfile {
  id: string;
  name: string;
  standard: string;
  retention: string;
  encryption: string;
  immutable: boolean;
  immutablePeriod?: string;
  vaultApproval: boolean;
  exportFrequency?: string;
}

interface ExportRule {
  id: string;
  name: string;
  logType: string;
  frequency: string;
  format: string[];
  includeHash: boolean;
  lastExport: string;
  status: 'success' | 'failed' | 'pending';
}

const sampleProfiles: ComplianceProfile[] = [
  {
    id: '1',
    name: 'HIPAA Compliance',
    standard: 'HIPAA',
    retention: '6 years',
    encryption: 'AES-256',
    immutable: true,
    immutablePeriod: '6 years',
    vaultApproval: true,
    exportFrequency: 'Monthly'
  },
  {
    id: '2',
    name: 'PCI DSS',
    standard: 'PCI DSS',
    retention: '1 year',
    encryption: 'AES-256',
    immutable: true,
    immutablePeriod: '1 year',
    vaultApproval: true,
    exportFrequency: 'Quarterly'
  },
  {
    id: '3',
    name: 'GDPR Standard',
    standard: 'GDPR',
    retention: '5 years',
    encryption: 'AES-256',
    immutable: true,
    immutablePeriod: '2 years',
    vaultApproval: true,
    exportFrequency: 'Annually'
  },
  {
    id: '4',
    name: 'FedRAMP High',
    standard: 'FedRAMP',
    retention: '7 years',
    encryption: 'AES-256',
    immutable: true,
    immutablePeriod: '7 years',
    vaultApproval: true,
    exportFrequency: 'Monthly'
  }
];

const sampleExportRules: ExportRule[] = [
  {
    id: '1',
    name: 'Monthly Security Logs',
    logType: 'Wazuh',
    frequency: 'Monthly (1st)',
    format: ['PDF', 'CSV'],
    includeHash: true,
    lastExport: '2023-11-01',
    status: 'success'
  },
  {
    id: '2',
    name: 'Weekly Firewall Audit',
    logType: 'Firewall',
    frequency: 'Weekly (Sunday)',
    format: ['CSV', 'JSON'],
    includeHash: true,
    lastExport: '2023-11-26',
    status: 'success'
  },
  {
    id: '3',
    name: 'Daily Arkime Traffic',
    logType: 'Arkime',
    frequency: 'Daily',
    format: ['PCAP', 'CSV'],
    includeHash: true,
    lastExport: '2023-11-28',
    status: 'failed'
  }
];

const ArchivalSettingsTab: React.FC = () => {
  const [profiles, setProfiles] = useState<ComplianceProfile[]>(sampleProfiles);
  const [exportRules, setExportRules] = useState<ExportRule[]>(sampleExportRules);
  const [immutableMode, setImmutableMode] = useState(true);
  const [vaultApproval, setVaultApproval] = useState(true);
  const [checksumVerification, setChecksumVerification] = useState(true);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);

  const handleManualExport = () => {
    setIsExportDialogOpen(true);
  };

  const handleAddProfile = () => {
    toast.success('Compliance profile dialog would open here');
  };

  const handleAddExportRule = () => {
    toast.success('Export rule dialog would open here');
  };

  return (
    <div className="space-y-6">
      {/* Compliance Archive Profiles */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" />
              Compliance Archive Profiles
            </CardTitle>
            <Button size="sm" variant="outline" onClick={handleAddProfile} className="flex items-center gap-1">
              <Archive className="h-4 w-4 mr-1" />
              Add Profile
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Profile Name</TableHead>
                <TableHead>Standard</TableHead>
                <TableHead>Retention</TableHead>
                <TableHead>Encryption</TableHead>
                <TableHead>Immutable</TableHead>
                <TableHead>VaultID Approval</TableHead>
                <TableHead>Auto-Export</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profiles.map((profile) => (
                <TableRow key={profile.id}>
                  <TableCell className="font-medium">{profile.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{profile.standard}</Badge>
                  </TableCell>
                  <TableCell>{profile.retention}</TableCell>
                  <TableCell>{profile.encryption}</TableCell>
                  <TableCell>{profile.immutable ? 
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                      {profile.immutablePeriod}
                    </Badge> : 'No'}
                  </TableCell>
                  <TableCell>{profile.vaultApproval ? 
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                      Required
                    </Badge> : 'No'}
                  </TableCell>
                  <TableCell>{profile.exportFrequency || 'Manual'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* VaultID Approval Settings */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            VaultID Approval Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Require VaultID for Archive Deletion</h4>
              <p className="text-sm text-muted-foreground">
                Adds additional security for deleting archived logs
              </p>
            </div>
            <Switch 
              checked={vaultApproval} 
              onCheckedChange={setVaultApproval} 
            />
          </div>
          
          {vaultApproval && (
            <div className="bg-muted p-4 rounded-md space-y-3">
              <div>
                <Label className="text-sm font-medium">Required Approvers</Label>
                <RadioGroup defaultValue="quorum" className="mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="single" id="single" />
                    <Label htmlFor="single">Single approver (Security Officer)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dual" id="dual" />
                    <Label htmlFor="dual">Dual approval (Security + Compliance)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="quorum" id="quorum" />
                    <Label htmlFor="quorum">Quorum (3 of 5 authorized approvers)</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Button variant="outline" size="sm">
                  Configure Approvers
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center gap-2">
              <DownloadCloud className="h-5 w-5" />
              Export Options
            </CardTitle>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={handleManualExport}>
                Manual Export
              </Button>
              <Button size="sm" variant="outline" onClick={handleAddExportRule}>
                Add Auto-Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rule Name</TableHead>
                <TableHead>Log Type</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Format</TableHead>
                <TableHead>Last Export</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exportRules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell className="font-medium">{rule.name}</TableCell>
                  <TableCell>{rule.logType}</TableCell>
                  <TableCell>{rule.frequency}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {rule.format.map((format) => (
                        <Badge key={format} variant="outline" className="text-xs">
                          {format}
                        </Badge>
                      ))}
                      {rule.includeHash && (
                        <Badge variant="outline" className="text-xs bg-amber-500/10 text-amber-500 border-amber-500/20">
                          +Hash
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{rule.lastExport}</TableCell>
                  <TableCell>
                    {rule.status === 'success' && (
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                        Success
                      </Badge>
                    )}
                    {rule.status === 'failed' && (
                      <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Failed
                      </Badge>
                    )}
                    {rule.status === 'pending' && (
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                        Pending
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Checksum Verification */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <FileCheck className="h-5 w-5" />
            Checksum Verification (Blake3)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Enable Checksum Verification</h4>
              <p className="text-sm text-muted-foreground">
                Verifies archive integrity with Blake3 hash algorithm
              </p>
            </div>
            <Switch 
              checked={checksumVerification} 
              onCheckedChange={setChecksumVerification} 
            />
          </div>
          
          {checksumVerification && (
            <div className="bg-muted p-4 rounded-md space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Auto-ticket on verification failure</span>
                <Switch defaultChecked={true} />
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Include checksums in exports</span>
                <Switch defaultChecked={true} />
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Verify integrity upon access</span>
                <Switch defaultChecked={true} />
              </div>
            </div>
          )}
          
          <div className="pt-2">
            <Button variant="outline">
              Run Verification Now
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Immutable Mode Settings */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <FileLock2 className="h-5 w-5" />
            Immutable Mode Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Enable Immutable Mode</h4>
              <p className="text-sm text-muted-foreground">
                Prevents modification or deletion of logs for compliance
              </p>
            </div>
            <Switch 
              checked={immutableMode} 
              onCheckedChange={setImmutableMode} 
            />
          </div>
          
          {immutableMode && (
            <div className="bg-muted p-4 rounded-md space-y-3">
              <div>
                <Label className="text-sm font-medium">Default Immutable Period</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input type="number" placeholder="1" className="w-20" defaultValue="1" />
                  <Select defaultValue="years">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="days">Days</SelectItem>
                      <SelectItem value="months">Months</SelectItem>
                      <SelectItem value="years">Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  Individual compliance profiles can override this setting
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Manual Export Dialog */}
      <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Manual Export</DialogTitle>
            <DialogDescription>
              Export logs for a specific time period and log type
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="logType">Log Type</Label>
              <Select defaultValue="wazuh">
                <SelectTrigger>
                  <SelectValue placeholder="Select log type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wazuh">Wazuh</SelectItem>
                  <SelectItem value="arkime">Arkime</SelectItem>
                  <SelectItem value="syslog">Syslog</SelectItem>
                  <SelectItem value="firewall">Firewall</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <Input id="startDate" type="date" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <Input id="endDate" type="date" />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Export Format</Label>
              <div className="flex flex-wrap gap-2 pt-1">
                <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">PDF</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">CSV</Badge>
                <Badge variant="outline" className="cursor-pointer bg-primary/10">JSON</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">PCAP</Badge>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 pt-2">
              <Switch id="includeHash" defaultChecked />
              <Label htmlFor="includeHash">Include checksum (Blake3)</Label>
            </div>
            
            <div className="flex items-center space-x-2 pt-1">
              <Switch id="encryption" defaultChecked />
              <Label htmlFor="encryption">Apply encryption</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsExportDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              toast.success('Export initiated');
              setIsExportDialogOpen(false);
            }}>
              Export Logs
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ArchivalSettingsTab;
