
import React from 'react';
import { Card } from '@/components/ui/card';
import { ArrowRight, Shield, AlertTriangle, FileText, UserX, Laptop, Database, Network, Lock } from 'lucide-react';

const ForensicTimeline: React.FC = () => {
  const timelineEvents = [
    {
      id: 1,
      time: '09:15:32',
      event: 'Initial Connection Attempt',
      description: 'Unusual connection pattern from external IP',
      icon: Network,
      severity: 'low'
    },
    {
      id: 2,
      time: '09:16:07',
      event: 'Authentication Bypass Attempt',
      description: 'Multiple failed login attempts with SQL injection pattern',
      icon: Lock,
      severity: 'medium'
    },
    {
      id: 3,
      time: '09:18:45',
      event: 'Privileged Account Accessed',
      description: 'Admin account login from unusual geolocation',
      icon: UserX,
      severity: 'high'
    },
    {
      id: 4,
      time: '09:22:18',
      event: 'Configuration File Modified',
      description: 'Critical security configuration changed on web server',
      icon: FileText,
      severity: 'critical'
    },
    {
      id: 5,
      time: '09:25:33',
      event: 'Data Exfiltration Detected',
      description: 'Unusual outbound traffic to unknown IP address',
      icon: Database,
      severity: 'critical'
    },
    {
      id: 6,
      time: '09:30:05',
      event: 'Backdoor Installed',
      description: 'Persistent access mechanism detected on server',
      icon: Laptop,
      severity: 'critical'
    },
    {
      id: 7,
      time: '09:32:41',
      event: 'Incident Detected by SIEM',
      description: 'Automated alert triggered for intrusion',
      icon: AlertTriangle,
      severity: 'high'
    },
    {
      id: 8,
      time: '09:35:12',
      event: 'Automatic Containment',
      description: 'Affected server isolated from network',
      icon: Shield,
      severity: 'medium'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800/50';
      case 'high': return 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800/50';
      case 'medium': return 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/50';
      case 'low': return 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800/50';
      default: return 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
    }
  };

  return (
    <div className="relative overflow-auto max-h-full">
      <div className="absolute top-0 bottom-0 left-[140px] w-[2px] bg-border z-0" />
      
      {timelineEvents.map((event, index) => (
        <div key={event.id} className="flex items-start mb-4 relative z-10">
          <div className="w-[120px] text-xs text-muted-foreground font-mono mt-2 mr-6">
            {event.time}
          </div>
          
          <div className={`flex items-center justify-center rounded-full w-6 h-6 -ml-3 mr-3 ${getSeverityColor(event.severity)}`}>
            <event.icon className="h-3 w-3" />
          </div>
          
          <Card className={`flex-1 p-3 border ${getSeverityColor(event.severity)}`}>
            <div className="font-medium">{event.event}</div>
            <div className="text-sm mt-1">{event.description}</div>
          </Card>
          
          {index < timelineEvents.length - 1 && (
            <div className="absolute left-[142px] top-7 text-muted-foreground">
              <ArrowRight className="h-4 w-4 rotate-90" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ForensicTimeline;
