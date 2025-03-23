
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { HardDrive, Database, Cloud, Info, ShieldCheck } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';

const BackupOptionsSection: React.FC = () => {
  const [backupLocal, setBackupLocal] = useState(true);
  const [backupNestVault, setBackupNestVault] = useState(false);
  const [backupWasabi, setBackupWasabi] = useState(false);
  const [wasabiKey, setWasabiKey] = useState('');
  const [wasabiBucket, setWasabiBucket] = useState('');
  const [encryptBackups, setEncryptBackups] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartBackup = async () => {
    if (!backupLocal && !backupNestVault && !backupWasabi) {
      toast.error("Please select at least one backup destination");
      return;
    }

    if (backupWasabi && (!wasabiKey || !wasabiBucket)) {
      toast.error("Please provide Wasabi credentials");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const destinations = [];
      if (backupLocal) destinations.push('Local Storage');
      if (backupNestVault) destinations.push('NestVault');
      if (backupWasabi) destinations.push('Wasabi Cloud');
      
      toast.success(`Backup started to: ${destinations.join(', ')}`);
    } catch (error) {
      toast.error("Failed to start backup");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        {/* Local System Backup */}
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="h-5 w-5 text-primary" />
              Local System Backup
            </CardTitle>
            <CardDescription>
              Store backup on local system disk
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="backup-local" 
                checked={backupLocal} 
                onCheckedChange={(checked) => setBackupLocal(!!checked)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label 
                  htmlFor="backup-local" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Save configuration locally
                </Label>
                <p className="text-xs text-muted-foreground">
                  Quick access, but not recommended for critical backups
                </p>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-[200px] text-xs">
                      Local backups are stored on the same system. Use only for temporary or convenience purposes.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardContent>
        </Card>

        {/* NestVault Backup */}
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              NestVault Backup
            </CardTitle>
            <CardDescription>
              Secure backup with erasure coding
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="backup-nestvault" 
                checked={backupNestVault} 
                onCheckedChange={(checked) => setBackupNestVault(!!checked)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label 
                  htmlFor="backup-nestvault" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Save to NestVault (MinIO S3)
                </Label>
                <p className="text-xs text-muted-foreground">
                  Encrypted local cluster storage with redundancy
                </p>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-[200px] text-xs">
                      NestVault uses MinIO S3-compatible storage with erasure coding for redundancy. Recommended for regular backups.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardContent>
        </Card>

        {/* Wasabi Cloud Backup */}
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Cloud className="h-5 w-5 text-primary" />
              Wasabi Cloud Backup
            </CardTitle>
            <CardDescription>
              Offsite backup to cloud storage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-2 mb-4">
              <Checkbox 
                id="backup-wasabi" 
                checked={backupWasabi} 
                onCheckedChange={(checked) => setBackupWasabi(!!checked)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label 
                  htmlFor="backup-wasabi" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Save to Wasabi Cloud
                </Label>
                <p className="text-xs text-muted-foreground">
                  Offsite cloud storage for disaster recovery
                </p>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-[200px] text-xs">
                      Wasabi Cloud storage provides offsite backup capability for disaster recovery and compliance requirements.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {backupWasabi && (
              <div className="space-y-3 mt-2 animate-in fade-in-50">
                <div className="space-y-2">
                  <Label htmlFor="wasabi-key" className="text-xs">Wasabi S3 Key</Label>
                  <Input 
                    id="wasabi-key" 
                    placeholder="Enter your Wasabi S3 Key" 
                    value={wasabiKey}
                    onChange={e => setWasabiKey(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wasabi-bucket" className="text-xs">Bucket Name</Label>
                  <Input 
                    id="wasabi-bucket" 
                    placeholder="Enter your Bucket Name" 
                    value={wasabiBucket}
                    onChange={e => setWasabiBucket(e.target.value)}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Encryption Options */}
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Encryption Settings
          </CardTitle>
          <CardDescription>
            Configure backup encryption and signing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="encrypt-backups">Auto-encrypt configuration files</Label>
                <p className="text-xs text-muted-foreground">Uses Kyber post-quantum encryption</p>
              </div>
              <Switch 
                id="encrypt-backups" 
                checked={encryptBackups}
                onCheckedChange={setEncryptBackups}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sign-backups">Digitally sign all backups</Label>
                <p className="text-xs text-muted-foreground">Ensures backup integrity and authenticity</p>
              </div>
              <Switch id="sign-backups" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="version-backups">Enable versioning</Label>
                <p className="text-xs text-muted-foreground">Maintains history of previous configurations</p>
              </div>
              <Switch id="version-backups" defaultChecked />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={handleStartBackup}
            disabled={isLoading}
          >
            {isLoading ? "Starting Backup..." : "Create Backup Now"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BackupOptionsSection;
