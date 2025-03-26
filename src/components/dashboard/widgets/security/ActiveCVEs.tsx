
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, ArrowUpRight, Server, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const cveItems = [
  { 
    id: 'CVE-2023-4438', 
    services: ['nginx/1.18.0'],
    description: 'HTTP/2 request smuggling vulnerability affecting Nginx',
    severity: 'critical',
    cvss: 9.8
  },
  { 
    id: 'CVE-2023-3676', 
    services: ['SSH', 'OpenSSL/1.1.1'],
    description: 'TLS certificate verification bypass in OpenSSL',
    severity: 'high',
    cvss: 7.6
  },
  { 
    id: 'CVE-2023-22518', 
    services: ['Confluence Server'],
    description: 'Authentication bypass vulnerability in Atlassian Confluence',
    severity: 'high',
    cvss: 8.2
  },
  { 
    id: 'CVE-2023-1436', 
    services: ['PostgreSQL/15.2'],
    description: 'Out-of-bounds memory access in PostgreSQL',
    severity: 'medium',
    cvss: 6.3
  },
  { 
    id: 'CVE-2023-2868', 
    services: ['Redis/7.0.11'],
    description: 'Denial of service vulnerability in Redis',
    severity: 'medium',
    cvss: 5.9
  },
];

const getSeverityBadge = (severity: string) => {
  switch(severity) {
    case 'critical':
      return <Badge variant="destructive" className="text-xs py-0">Critical</Badge>;
    case 'high':
      return <Badge className="bg-orange-500 hover:bg-orange-600 text-xs py-0">High</Badge>;
    case 'medium':
      return <Badge className="bg-amber-500 hover:bg-amber-600 text-xs py-0">Medium</Badge>;
    case 'low':
      return <Badge className="bg-green-500 hover:bg-green-600 text-xs py-0">Low</Badge>;
    default:
      return null;
  }
};

const ActiveCVEs = () => {
  return (
    <div className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium flex items-center justify-between">
          <span>Active CVEs Detected</span>
          <Button variant="outline" size="sm" className="h-7 text-xs">
            Scan Now
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 p-1">
        <div className="space-y-2">
          {cveItems.map(cve => (
            <div key={cve.id} className="p-2 border rounded-md">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{cve.id}</span>
                  {getSeverityBadge(cve.severity)}
                </div>
                <span className="text-xs px-1.5 py-0.5 bg-muted rounded font-mono">
                  {cve.cvss}
                </span>
              </div>
              
              <p className="text-xs text-muted-foreground line-clamp-1 mb-1">{cve.description}</p>
              
              <div className="flex flex-wrap gap-1 mt-1">
                {cve.services.map((service, i) => (
                  <Badge key={i} variant="outline" className="text-[10px] font-mono">
                    <Server className="h-2.5 w-2.5 mr-1" />
                    {service}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </div>
  );
};

export default ActiveCVEs;
