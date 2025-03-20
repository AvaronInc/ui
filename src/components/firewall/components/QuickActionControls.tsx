
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  Shield,
  Globe,
  Lock,
  Unlock,
  RefreshCw,
  AlertTriangle,
  Eye,
  ShieldAlert,
  UserCheck,
  ShieldCheck
} from 'lucide-react';

interface FirewallRule {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
}

const QuickActionControls: React.FC = () => {
  const { toast } = useToast();
  
  const [rules, setRules] = useState<FirewallRule[]>([
    {
      id: 'intrusion-prevention',
      name: 'Intrusion Prevention',
      description: 'Block malicious traffic and attack patterns',
      icon: <ShieldAlert className="h-5 w-5" />,
      enabled: true
    },
    {
      id: 'geo-blocking',
      name: 'Geo-Blocking',
      description: 'Restrict traffic from high-risk countries',
      icon: <Globe className="h-5 w-5" />,
      enabled: true
    },
    {
      id: 'port-scanning',
      name: 'Port Scan Protection',
      description: 'Detect and block port scanning attempts',
      icon: <Eye className="h-5 w-5" />,
      enabled: true
    },
    {
      id: 'ddos-protection',
      name: 'DDoS Protection',
      description: 'Protect against distributed denial of service attacks',
      icon: <Shield className="h-5 w-5" />,
      enabled: true
    },
    {
      id: 'zero-day',
      name: 'Zero-Day Defense',
      description: 'AI-powered protection against unknown threats',
      icon: <ShieldCheck className="h-5 w-5" />,
      enabled: false
    },
    {
      id: 'auth-protection',
      name: 'Authentication Defense',
      description: 'Prevent brute force and credential stuffing',
      icon: <UserCheck className="h-5 w-5" />,
      enabled: true
    }
  ]);
  
  const toggleRule = (id: string) => {
    setRules(prevRules => 
      prevRules.map(rule => 
        rule.id === id 
          ? { ...rule, enabled: !rule.enabled } 
          : rule
      )
    );
    
    const rule = rules.find(r => r.id === id);
    if (rule) {
      toast({
        title: `${rule.name} ${!rule.enabled ? 'Enabled' : 'Disabled'}`,
        description: `${rule.description} has been ${!rule.enabled ? 'enabled' : 'disabled'}.`
      });
    }
  };
  
  const enableAllRules = () => {
    setRules(prevRules => 
      prevRules.map(rule => ({ ...rule, enabled: true }))
    );
    
    toast({
      title: "All Protection Enabled",
      description: "All firewall rules have been enabled."
    });
  };
  
  const disableAllRules = () => {
    setRules(prevRules => 
      prevRules.map(rule => ({ ...rule, enabled: false }))
    );
    
    toast({
      title: "All Protection Disabled",
      description: "All firewall rules have been disabled.",
      variant: "destructive"
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-4">
        <Button variant="default" size="sm" onClick={enableAllRules}>
          <Lock className="mr-2 h-4 w-4" />
          Enable All
        </Button>
        <Button variant="outline" size="sm" onClick={disableAllRules}>
          <Unlock className="mr-2 h-4 w-4" />
          Disable All
        </Button>
        <Button variant="outline" size="sm" onClick={() => {
          toast({
            title: "Firewall Rules Refreshed",
            description: "All rules have been updated with the latest definitions."
          });
        }}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Update Rules
        </Button>
        <Button variant="destructive" size="sm" onClick={() => {
          toast({
            title: "Emergency Mode Activated",
            description: "Highest security level enabled. Only essential traffic allowed.",
            variant: "destructive"
          });
        }}>
          <AlertTriangle className="mr-2 h-4 w-4" />
          Emergency Mode
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rules.map(rule => (
          <div 
            key={rule.id}
            className={`p-4 border rounded-lg ${rule.enabled ? 'bg-muted/20' : 'bg-background'}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${rule.enabled ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                  {rule.icon}
                </div>
                <div>
                  <h3 className="font-medium">{rule.name}</h3>
                  <p className="text-sm text-muted-foreground">{rule.description}</p>
                </div>
              </div>
              <Switch
                checked={rule.enabled}
                onCheckedChange={() => toggleRule(rule.id)}
                aria-label={`Toggle ${rule.name}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActionControls;
