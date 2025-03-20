
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Lock, Network, Server, Shield, Zap } from 'lucide-react';

const RecommendationsList: React.FC = () => {
  const recommendations = [
    {
      id: 1,
      title: 'Update Firewall Rule Configuration',
      description: 'Current firewall rules allow unrestricted outbound traffic from development servers. Implement egress filtering to restrict outbound connections to only necessary services.',
      category: 'Firewall',
      severity: 'high',
      effort: 'medium',
      icon: Shield
    },
    {
      id: 2,
      title: 'Implement Network Segmentation',
      description: 'The test detected direct communication paths between development and production environments. Implement proper network segmentation to isolate these environments and reduce attack surface.',
      category: 'Network',
      severity: 'high',
      effort: 'high',
      icon: Network
    },
    {
      id: 3,
      title: 'Enable DNS Query Logging',
      description: 'DNS query logging is not enabled on your DNS servers. Enable query logging to detect and investigate suspicious DNS activities that could indicate malware or data exfiltration attempts.',
      category: 'DNS',
      severity: 'medium',
      effort: 'low',
      icon: Server
    },
    {
      id: 4,
      title: 'Update TLS Configuration',
      description: 'Several services are using outdated TLS configurations that support vulnerable ciphers. Update TLS configuration to use only strong cipher suites and disable TLS 1.0/1.1.',
      category: 'Encryption',
      severity: 'high',
      effort: 'medium',
      icon: Lock
    },
    {
      id: 5,
      title: 'Implement IPv6 Security Controls',
      description: 'IPv6 traffic is not properly filtered by security controls. Implement equivalent security measures for IPv6 as those in place for IPv4 to prevent security bypass.',
      category: 'Network',
      severity: 'high',
      effort: 'high',
      icon: Network
    }
  ];

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Low</Badge>;
      default:
        return <Badge>{severity}</Badge>;
    }
  };

  const getEffortBadge = (effort: string) => {
    switch (effort) {
      case 'high':
        return <Badge variant="outline" className="border-red-200 dark:border-red-800">High Effort</Badge>;
      case 'medium':
        return <Badge variant="outline" className="border-yellow-200 dark:border-yellow-800">Medium Effort</Badge>;
      case 'low':
        return <Badge variant="outline" className="border-green-200 dark:border-green-800">Low Effort</Badge>;
      default:
        return <Badge variant="outline">{effort}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {recommendations.map((rec) => (
        <div key={rec.id} className="border rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="bg-muted p-2 rounded-full">
              <rec.icon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-medium text-base">{rec.title}</h3>
                <div className="flex items-center gap-2">
                  {getSeverityBadge(rec.severity)}
                  {getEffortBadge(rec.effort)}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{rec.description}</p>
              <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-between">
                <Badge variant="outline" className="w-fit">{rec.category}</Badge>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="text-xs">Details</Button>
                  <Button size="sm" className="text-xs">Apply Fix</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecommendationsList;
