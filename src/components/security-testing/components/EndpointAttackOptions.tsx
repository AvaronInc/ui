
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

const EndpointAttackOptions: React.FC = () => {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-2">
        Select endpoint attack simulations to include in the test suite. These tests validate your endpoint protection measures.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Checkbox id="phishing" />
            <div className="grid gap-1.5">
              <label htmlFor="phishing" className="font-medium cursor-pointer">Phishing Simulation</label>
              <p className="text-sm text-muted-foreground">
                Tests if security awareness measures and email protection can identify phishing attempts.
              </p>
              <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                <Info className="h-3 w-3" />
                <span>Safe simulation with no actual data collection</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Checkbox id="credential" />
            <div className="grid gap-1.5">
              <label htmlFor="credential" className="font-medium cursor-pointer">Credential Harvesting</label>
              <p className="text-sm text-muted-foreground">
                Tests protection against fake login pages and credential theft attempts.
              </p>
              <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                <Info className="h-3 w-3" />
                <span>No actual credentials are collected</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Checkbox id="keylogging" />
            <div className="grid gap-1.5">
              <label htmlFor="keylogging" className="font-medium cursor-pointer">Keylogging Simulation</label>
              <p className="text-sm text-muted-foreground">
                Tests if endpoint protection can detect keylogging attempt behaviors.
              </p>
              <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                <Info className="h-3 w-3" />
                <span>Simulated only - no actual keystroke monitoring</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Checkbox id="usbexec" />
            <div className="grid gap-1.5">
              <label htmlFor="usbexec" className="font-medium cursor-pointer">Removable Media Exec</label>
              <p className="text-sm text-muted-foreground">
                Tests if endpoint protection prevents code execution from removable media.
              </p>
              <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                <Info className="h-3 w-3" />
                <span>Simulated USB device connection only</span>
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

export default EndpointAttackOptions;
