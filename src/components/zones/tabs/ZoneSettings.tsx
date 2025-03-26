import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { HardDrive, Timer, Shield, Network, Database } from 'lucide-react';

const ZoneSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium flex items-center">
            <Timer className="h-4 w-4 mr-2 text-amber-500" />
            Default Retention Policies
          </CardTitle>
          <CardDescription>
            Configure default data retention periods for all zones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="log-retention">System Logs</Label>
                <Select defaultValue="90">
                  <SelectTrigger id="log-retention">
                    <SelectValue placeholder="Select retention period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="60">60 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="180">180 days</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="audit-retention">Audit Trails</Label>
                <Select defaultValue="180">
                  <SelectTrigger id="audit-retention">
                    <SelectValue placeholder="Select retention period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="180">180 days</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                    <SelectItem value="730">2 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ai-retention">AI Transaction Data</Label>
                <Select defaultValue="60">
                  <SelectTrigger id="ai-retention">
                    <SelectValue placeholder="Select retention period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="60">60 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="180">180 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="backup-retention">Backups</Label>
                <Select defaultValue="30">
                  <SelectTrigger id="backup-retention">
                    <SelectValue placeholder="Select retention period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="14">14 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="60">60 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button className="w-full sm:w-auto">Apply Default Policy to All Zones</Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium flex items-center">
            <Shield className="h-4 w-4 mr-2 text-green-500" />
            Compliance & Security
          </CardTitle>
          <CardDescription>
            Configure compliance requirements and security controls for zones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="hipaa-compliance">HIPAA Compliance Features</Label>
                  <Switch id="hipaa-compliance" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Enforce controls required for healthcare data protection
                </p>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="pci-compliance">PCI-DSS Compliance Features</Label>
                  <Switch id="pci-compliance" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Enable payment card industry security standards
                </p>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="gdpr-compliance">GDPR Compliance Features</Label>
                  <Switch id="gdpr-compliance" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Enable European data protection controls
                </p>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="sox-compliance">SOX Compliance Features</Label>
                  <Switch id="sox-compliance" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Sarbanes-Oxley financial controls and reporting
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium flex items-center">
            <Network className="h-4 w-4 mr-2 text-blue-500" />
            Inter-Zone Communication
          </CardTitle>
          <CardDescription>
            Configure how zones can communicate with each other
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="default-policy">Default Inter-Zone Policy</Label>
                <Select defaultValue="conditional">
                  <SelectTrigger id="default-policy">
                    <SelectValue placeholder="Select default policy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="allow">Allow All</SelectItem>
                    <SelectItem value="block">Block All</SelectItem>
                    <SelectItem value="conditional">Allow with Conditions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="id-federation">Identity Federation</Label>
                <Select defaultValue="selective">
                  <SelectTrigger id="id-federation">
                    <SelectValue placeholder="Identity federation setting" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Enable for All Zones</SelectItem>
                    <SelectItem value="selective">Selective Federation</SelectItem>
                    <SelectItem value="none">Disable Federation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="pt-2">
              <Label htmlFor="trusted-zones" className="mb-2 block">VaultID Trust Group</Label>
              <div className="flex gap-2">
                <Input id="trusted-zones" placeholder="Enter zone name to add to trust group" />
                <Button variant="outline">Add</Button>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                <div className="bg-secondary px-2 py-1 rounded-md text-xs flex items-center">
                  Finance Zone <Button variant="ghost" size="sm" className="h-4 w-4 p-0 ml-1">×</Button>
                </div>
                <div className="bg-secondary px-2 py-1 rounded-md text-xs flex items-center">
                  HR Zone <Button variant="ghost" size="sm" className="h-4 w-4 p-0 ml-1">×</Button>
                </div>
                <div className="bg-secondary px-2 py-1 rounded-md text-xs flex items-center">
                  Executive Zone <Button variant="ghost" size="sm" className="h-4 w-4 p-0 ml-1">×</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium flex items-center">
            <Database className="h-4 w-4 mr-2 text-indigo-500" />
            NestVault Storage Configuration
          </CardTitle>
          <CardDescription>
            Configure storage segregation and policies for this zone
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="storage-type">Storage Type</Label>
                <Select defaultValue="segmented">
                  <SelectTrigger id="storage-type">
                    <SelectValue placeholder="Select storage type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="segmented">Segmented (Zone Isolated)</SelectItem>
                    <SelectItem value="shared">Shared (Cross-Zone)</SelectItem>
                    <SelectItem value="hybrid">Hybrid (Role-Based Access)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="storage-quota">Storage Quota</Label>
                <div className="flex items-center">
                  <Input id="storage-quota" type="number" defaultValue="500" className="mr-2" />
                  <span className="text-sm text-muted-foreground">GB</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="storage-encryption">Enable End-to-End Encryption</Label>
                <p className="text-sm text-muted-foreground">Enforce encryption for all zone storage</p>
              </div>
              <Switch id="storage-encryption" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="storage-versioning">Enable File Versioning</Label>
                <p className="text-sm text-muted-foreground">Keep version history of files</p>
              </div>
              <Switch id="storage-versioning" defaultChecked />
            </div>
            
            <div className="space-y-2 pt-2">
              <Label htmlFor="retention-period">Data Retention Period</Label>
              <Select defaultValue="365">
                <SelectTrigger id="retention-period">
                  <SelectValue placeholder="Select retention period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="180">180 days</SelectItem>
                  <SelectItem value="365">1 year</SelectItem>
                  <SelectItem value="forever">Indefinite</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ZoneSettings;
