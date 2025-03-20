
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

const PrivilegeEscalationOptions: React.FC = () => {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-2">
        Select privilege escalation tests to include in your security assessment. These tests verify that users cannot gain unauthorized privileges.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Checkbox id="sudo" />
            <div className="grid gap-1.5">
              <label htmlFor="sudo" className="font-medium cursor-pointer">Sudo Misconfiguration</label>
              <p className="text-sm text-muted-foreground">
                Tests for sudo configuration weaknesses that could allow privilege escalation.
              </p>
              <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                <Info className="h-3 w-3" />
                <span>Read-only assessment of configurations</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Checkbox id="suid" />
            <div className="grid gap-1.5">
              <label htmlFor="suid" className="font-medium cursor-pointer">SUID/SGID Binary Check</label>
              <p className="text-sm text-muted-foreground">
                Identifies set-user-ID and set-group-ID binaries that could be exploited.
              </p>
              <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                <Info className="h-3 w-3" />
                <span>Filesystem scan only - no execution</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Checkbox id="permissions" />
            <div className="grid gap-1.5">
              <label htmlFor="permissions" className="font-medium cursor-pointer">File Permission Checks</label>
              <p className="text-sm text-muted-foreground">
                Tests for overly permissive file and directory permissions.
              </p>
              <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                <Info className="h-3 w-3" />
                <span>Non-invasive permission checking</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Checkbox id="cronjobs" />
            <div className="grid gap-1.5">
              <label htmlFor="cronjobs" className="font-medium cursor-pointer">Scheduled Task Analysis</label>
              <p className="text-sm text-muted-foreground">
                Checks for insecure cron jobs and scheduled tasks that run with elevated privileges.
              </p>
              <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                <Info className="h-3 w-3" />
                <span>Configuration analysis only</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Checkbox id="kernel" />
            <div className="grid gap-1.5">
              <label htmlFor="kernel" className="font-medium cursor-pointer">Kernel Exploit Check</label>
              <p className="text-sm text-muted-foreground">
                Checks for outdated kernels vulnerable to known privilege escalation exploits.
              </p>
              <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                <Info className="h-3 w-3" />
                <span>Version checking only - no exploit attempts</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Checkbox id="apparmor" />
            <div className="grid gap-1.5">
              <label htmlFor="apparmor" className="font-medium cursor-pointer">AppArmor/SELinux Check</label>
              <p className="text-sm text-muted-foreground">
                Verifies if mandatory access control frameworks are properly configured.
              </p>
              <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                <Info className="h-3 w-3" />
                <span>Configuration audit only</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save Selection</Button>
      </div>
    </div>
  );
};

export default PrivilegeEscalationOptions;
