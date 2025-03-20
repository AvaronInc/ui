
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

const NetworkAttackOptions: React.FC = () => {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-2">
        Select network attack simulations to include in the test suite. These tests will validate the security of your network infrastructure against common attack vectors.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Checkbox id="arp" />
            <div className="grid gap-1.5">
              <label htmlFor="arp" className="font-medium cursor-pointer">ARP Spoofing</label>
              <p className="text-sm text-muted-foreground">
                Tests if your network can detect and prevent ARP poisoning attacks that redirect traffic.
              </p>
              <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                <Info className="h-3 w-3" />
                <span>Safe simulation with no data interception</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Checkbox id="dns" />
            <div className="grid gap-1.5">
              <label htmlFor="dns" className="font-medium cursor-pointer">DNS Poisoning</label>
              <p className="text-sm text-muted-foreground">
                Evaluates DNS security controls by attempting controlled DNS cache poisoning.
              </p>
              <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                <Info className="h-3 w-3" />
                <span>Limited to test domains only</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Checkbox id="mitm" />
            <div className="grid gap-1.5">
              <label htmlFor="mitm" className="font-medium cursor-pointer">Man-in-the-Middle (MITM)</label>
              <p className="text-sm text-muted-foreground">
                Tests if encrypted connections can be intercepted through certificate validation issues.
              </p>
              <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                <Info className="h-3 w-3" />
                <span>Only targets test endpoints</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Checkbox id="bgp" />
            <div className="grid gap-1.5">
              <label htmlFor="bgp" className="font-medium cursor-pointer">BGP Hijacking</label>
              <p className="text-sm text-muted-foreground">
                Validates BGP security controls and route authentication mechanisms.
              </p>
              <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                <Info className="h-3 w-3" />
                <span>Simulated in isolated environment</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Checkbox id="ddos" />
            <div className="grid gap-1.5">
              <label htmlFor="ddos" className="font-medium cursor-pointer">DDoS Simulation</label>
              <p className="text-sm text-muted-foreground">
                Tests DDoS mitigation capabilities with controlled traffic generation.
              </p>
              <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                <Info className="h-3 w-3" />
                <span>Low-impact, gradual traffic increase</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Checkbox id="zero" />
            <div className="grid gap-1.5">
              <label htmlFor="zero" className="font-medium cursor-pointer">Zero Trust Validation</label>
              <p className="text-sm text-muted-foreground">
                Assesses if zero trust principles are properly implemented in your network.
              </p>
              <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                <Info className="h-3 w-3" />
                <span>Attempts lateral movement between segments</span>
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

export default NetworkAttackOptions;
