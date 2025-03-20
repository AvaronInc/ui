
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, ShieldCheck, RefreshCw, AlarmClock } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import { useToast } from '@/hooks/use-toast';

interface SignatureDetectionProps {
  disabled: boolean;
}

const SignatureDetection = ({ disabled }: SignatureDetectionProps) => {
  const { toast } = useToast();
  const [updating, setUpdating] = useState(false);
  const [threatTypes, setThreatTypes] = useState({
    malware: true,
    exploits: true,
    bruteForce: true,
    webAttacks: true,
    dos: false,
    reconScans: true
  });

  const handleUpdateSignatures = () => {
    if (disabled) return;
    
    setUpdating(true);
    // Simulate updating signatures
    setTimeout(() => {
      setUpdating(false);
      toast({
        title: "Signatures Updated",
        description: "Threat signatures have been updated to latest definitions.",
      });
    }, 2000);
  };

  const toggleThreatType = (type: keyof typeof threatTypes) => {
    if (disabled) return;
    setThreatTypes(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-green-500" />
                Signature-Based Detection
              </CardTitle>
              <CardDescription>
                Block threats based on known attack patterns and signatures
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleUpdateSignatures}
              disabled={disabled || updating}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${updating ? "animate-spin" : ""}`} />
              {updating ? "Updating..." : "Update Signatures"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Signature Database</span>
              <span className="text-sm text-green-500 font-medium flex items-center gap-1">
                <AlarmClock className="h-4 w-4" /> Updated 2 hours ago
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-muted p-3 rounded-md">
                <div className="text-2xl font-bold">24,762</div>
                <div className="text-xs text-muted-foreground">Malware Signatures</div>
              </div>
              <div className="bg-muted p-3 rounded-md">
                <div className="text-2xl font-bold">18,459</div>
                <div className="text-xs text-muted-foreground">Exploit Signatures</div>
              </div>
              <div className="bg-muted p-3 rounded-md">
                <div className="text-2xl font-bold">43,221</div>
                <div className="text-xs text-muted-foreground">Total Signatures</div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-3">Active Threat Categories</h4>
            <div className="flex flex-wrap gap-2">
              <Toggle 
                pressed={threatTypes.malware} 
                onPressedChange={() => toggleThreatType('malware')}
                disabled={disabled}
                aria-label="Toggle malware detection"
                className="data-[state=on]:bg-red-100 data-[state=on]:text-red-700 data-[state=on]:border-red-200 dark:data-[state=on]:bg-red-900/20 dark:data-[state=on]:text-red-400"
              >
                Malware
              </Toggle>
              <Toggle 
                pressed={threatTypes.exploits} 
                onPressedChange={() => toggleThreatType('exploits')}
                disabled={disabled}
                aria-label="Toggle exploits detection"
                className="data-[state=on]:bg-amber-100 data-[state=on]:text-amber-700 data-[state=on]:border-amber-200 dark:data-[state=on]:bg-amber-900/20 dark:data-[state=on]:text-amber-400"
              >
                Exploits
              </Toggle>
              <Toggle 
                pressed={threatTypes.bruteForce} 
                onPressedChange={() => toggleThreatType('bruteForce')}
                disabled={disabled}
                aria-label="Toggle brute force detection"
                className="data-[state=on]:bg-purple-100 data-[state=on]:text-purple-700 data-[state=on]:border-purple-200 dark:data-[state=on]:bg-purple-900/20 dark:data-[state=on]:text-purple-400"
              >
                Brute Force
              </Toggle>
              <Toggle 
                pressed={threatTypes.webAttacks} 
                onPressedChange={() => toggleThreatType('webAttacks')}
                disabled={disabled}
                aria-label="Toggle web attacks detection"
                className="data-[state=on]:bg-blue-100 data-[state=on]:text-blue-700 data-[state=on]:border-blue-200 dark:data-[state=on]:bg-blue-900/20 dark:data-[state=on]:text-blue-400"
              >
                Web Attacks
              </Toggle>
              <Toggle 
                pressed={threatTypes.dos} 
                onPressedChange={() => toggleThreatType('dos')}
                disabled={disabled}
                aria-label="Toggle DoS detection"
                className="data-[state=on]:bg-orange-100 data-[state=on]:text-orange-700 data-[state=on]:border-orange-200 dark:data-[state=on]:bg-orange-900/20 dark:data-[state=on]:text-orange-400"
              >
                DoS/DDoS
              </Toggle>
              <Toggle 
                pressed={threatTypes.reconScans} 
                onPressedChange={() => toggleThreatType('reconScans')}
                disabled={disabled}
                aria-label="Toggle reconnaissance scans detection"
                className="data-[state=on]:bg-green-100 data-[state=on]:text-green-700 data-[state=on]:border-green-200 dark:data-[state=on]:bg-green-900/20 dark:data-[state=on]:text-green-400"
              >
                Recon Scans
              </Toggle>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className={`${disabled ? 'opacity-60' : ''}`}>
        <CardHeader>
          <CardTitle className="text-base">Recent Signature Detections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {disabled ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                Enable IPS/IDS to view signature detections
              </div>
            ) : (
              [...Array(3)].map((_, i) => (
                <div key={i} className="p-3 border rounded-lg flex items-start justify-between">
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      <Badge variant="outline" className="bg-red-100 border-red-200 text-red-700 dark:bg-red-900/20 dark:text-red-400">
                        Malware
                      </Badge>
                      Suspicious PowerShell Execution
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">Detected 20 minutes ago</div>
                    <div className="text-xs text-muted-foreground mt-1">Source: 192.168.1.{45 + i} • Target: Internal Server</div>
                  </div>
                  <Badge variant="outline" className="bg-green-100 border-green-200 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                    Blocked
                  </Badge>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignatureDetection;
