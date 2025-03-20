
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Ban, Shield, Clock, AlertTriangle, CheckCircle, XCircle, ExternalLink } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';

interface AutoQuarantineProps {
  disabled: boolean;
}

const AutoQuarantine = ({ disabled }: AutoQuarantineProps) => {
  const { toast } = useToast();
  const [autoQuarantineEnabled, setAutoQuarantineEnabled] = useState(true);
  const [thresholdScore, setThresholdScore] = useState([70]);
  const [quarantineDuration, setQuarantineDuration] = useState<'1h' | '6h' | '24h' | 'manual'>('6h');

  const handleToggleAutoQuarantine = (checked: boolean) => {
    if (disabled) return;
    setAutoQuarantineEnabled(checked);
    toast({
      title: checked ? "Auto-Quarantine Enabled" : "Auto-Quarantine Disabled",
      description: checked 
        ? "System will automatically block malicious hosts based on reputation scores." 
        : "Manual review required for all suspicious hosts."
    });
  };

  const handleThresholdChange = (value: number[]) => {
    if (disabled) return;
    setThresholdScore(value);
  };

  const handleQuarantineDurationChange = (duration: '1h' | '6h' | '24h' | 'manual') => {
    if (disabled) return;
    setQuarantineDuration(duration);
  };

  const handleReleaseHost = (index: number) => {
    if (disabled) return;
    toast({
      title: "Host Released",
      description: "The quarantined host has been released from isolation."
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Ban className="h-5 w-5 text-red-500" />
                Auto-Quarantine Configuration
              </CardTitle>
              <CardDescription>
                Automatically block malicious hosts based on their threat score
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">
                {autoQuarantineEnabled ? 'Enabled' : 'Disabled'}
              </span>
              <Switch 
                checked={autoQuarantineEnabled} 
                onCheckedChange={handleToggleAutoQuarantine}
                disabled={disabled}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-sm font-medium">Quarantine Threshold</h4>
                <p className="text-xs text-muted-foreground">Hosts with threat scores above this threshold will be quarantined</p>
              </div>
              <div className="text-sm font-medium">{thresholdScore[0]}/100</div>
            </div>
            <Slider
              value={thresholdScore}
              onValueChange={handleThresholdChange}
              disabled={disabled || !autoQuarantineEnabled}
              max={100}
              step={5}
              className={(disabled || !autoQuarantineEnabled) ? "opacity-50" : ""}
            />
          </div>
          
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Quarantine Duration</h4>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={quarantineDuration === '1h' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handleQuarantineDurationChange('1h')}
                disabled={disabled || !autoQuarantineEnabled}
              >
                1 Hour
              </Button>
              <Button 
                variant={quarantineDuration === '6h' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handleQuarantineDurationChange('6h')}
                disabled={disabled || !autoQuarantineEnabled}
              >
                6 Hours
              </Button>
              <Button 
                variant={quarantineDuration === '24h' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handleQuarantineDurationChange('24h')}
                disabled={disabled || !autoQuarantineEnabled}
              >
                24 Hours
              </Button>
              <Button 
                variant={quarantineDuration === 'manual' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handleQuarantineDurationChange('manual')}
                disabled={disabled || !autoQuarantineEnabled}
              >
                Until Manual Release
              </Button>
            </div>
          </div>
          
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">Notification on Quarantine</h4>
                <p className="text-xs text-muted-foreground">Send alert when a host is quarantined</p>
              </div>
              <Switch 
                checked={true} 
                disabled={disabled || !autoQuarantineEnabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">Block All Traffic</h4>
                <p className="text-xs text-muted-foreground">Block all inbound and outbound traffic for quarantined hosts</p>
              </div>
              <Switch 
                checked={true} 
                disabled={disabled || !autoQuarantineEnabled}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className={`${disabled || !autoQuarantineEnabled ? 'opacity-60' : ''}`}>
        <CardHeader>
          <CardTitle className="text-base">
            Currently Quarantined Hosts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {disabled || !autoQuarantineEnabled ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                Enable Auto-Quarantine to view blocked hosts
              </div>
            ) : (
              [...Array(3)].map((_, i) => (
                <div key={i} className="p-3 border rounded-lg flex items-center justify-between">
                  <div>
                    <div className="font-medium">10.0.{i + 1}.45 {i === 0 ? '(Database Server)' : ''}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> Quarantined {i + 1}h ago
                      </span>
                    </div>
                    <div className="text-xs flex items-center gap-1 text-red-600 mt-1">
                      <AlertTriangle className="h-3 w-3" /> 
                      {i === 0 ? 'Ransomware Activity' : i === 1 ? 'Port Scanning' : 'Suspicious Traffic'}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400">
                      Score: {85 - (i * 5)}
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleReleaseHost(i)}
                    >
                      <XCircle className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutoQuarantine;
