
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Clock, Wifi, Globe, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const blockedIPs = [
  { 
    id: 1, 
    ip: '185.143.xx.xx', 
    score: 92, 
    country: 'RU',
    type: 'Brute Force',
    lastSeen: '3 min ago',
    severity: 'critical'
  },
  { 
    id: 2, 
    ip: '104.225.xx.xx', 
    score: 87, 
    country: 'CN',
    type: 'C2 Activity',
    lastSeen: '15 min ago',
    severity: 'high'
  },
  { 
    id: 3, 
    ip: '91.134.xx.xx', 
    score: 78, 
    country: 'UA',
    type: 'Port Scanning',
    lastSeen: '42 min ago', 
    severity: 'high'
  },
  { 
    id: 4, 
    ip: '45.227.xx.xx', 
    score: 75, 
    country: 'BR',
    type: 'API Abuse',
    lastSeen: '1h ago',
    severity: 'medium'
  },
  { 
    id: 5, 
    ip: '202.136.xx.xx', 
    score: 68, 
    country: 'IN',
    type: 'Malware Host',
    lastSeen: '3h ago',
    severity: 'medium'
  },
];

const getSeverityColor = (severity: string) => {
  switch(severity) {
    case 'critical': return 'text-red-500';
    case 'high': return 'text-orange-500';
    case 'medium': return 'text-amber-500';
    case 'low': return 'text-green-500';
    default: return '';
  }
};

const TopBlockedIPs = () => {
  return (
    <div className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium flex items-center justify-between">
          <div className="flex items-center">
            <span>Top Blocked IPs</span>
            <Badge variant="outline" className="ml-2">24h</Badge>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 p-2">
        <div className="space-y-2">
          {blockedIPs.map(ip => (
            <div key={ip.id} className="flex items-center justify-between py-1.5 px-2 rounded-md hover:bg-muted/50">
              <div className="flex items-center">
                <Wifi className={`h-4 w-4 mr-2 ${getSeverityColor(ip.severity)}`} />
                <div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium">{ip.ip}</span>
                    <Badge variant="outline" className="ml-2 text-[10px] px-1 py-0">{ip.country}</Badge>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground mt-0.5">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    {ip.type}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center text-xs">
                  <span className={`font-medium ${getSeverityColor(ip.severity)}`}>
                    {ip.score}
                  </span>
                  <span className="text-muted-foreground ml-1">score</span>
                </div>
                <div className="text-xs text-muted-foreground flex items-center mt-0.5">
                  <Clock className="h-3 w-3 mr-1" />
                  {ip.lastSeen}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </div>
  );
};

export default TopBlockedIPs;
