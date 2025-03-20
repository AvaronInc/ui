
import React, { useState, useEffect } from 'react';
import { AlertTriangle, Shield, Cpu } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Threat {
  id: number;
  type: string;
  source: string;
  target: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'mitigated' | 'investigating';
  aiConfidence: number;
}

const initialThreats: Threat[] = [
  {
    id: 1,
    type: 'DDoS Attack',
    source: '185.143.223.16',
    target: 'Web Server',
    timestamp: '2 min ago',
    severity: 'critical',
    status: 'active',
    aiConfidence: 97,
  },
  {
    id: 2,
    type: 'Port Scanning',
    source: '103.74.19.104',
    target: 'Firewall',
    timestamp: '4 min ago',
    severity: 'medium',
    status: 'investigating',
    aiConfidence: 86,
  },
  {
    id: 3,
    type: 'Brute Force',
    source: '91.214.124.143',
    target: 'Auth Service',
    timestamp: '8 min ago',
    severity: 'high',
    status: 'active',
    aiConfidence: 92,
  },
  {
    id: 4,
    type: 'SQL Injection',
    source: '45.227.255.206',
    target: 'API Server',
    timestamp: '12 min ago',
    severity: 'high',
    status: 'investigating',
    aiConfidence: 78,
  },
  {
    id: 5,
    type: 'XSS Attempt',
    source: '221.176.222.98',
    target: 'Web App',
    timestamp: '15 min ago',
    severity: 'medium',
    status: 'mitigated',
    aiConfidence: 83,
  }
];

const ThreatDetectionPanel: React.FC = () => {
  const [threats, setThreats] = useState<Threat[]>(initialThreats);
  const { toast } = useToast();
  
  // Simulate real-time threat updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Sometimes add a new threat
      if (Math.random() > 0.7) {
        const newThreat: Threat = {
          id: Date.now(),
          type: ['Port Scanning', 'Brute Force', 'SQL Injection', 'DDoS Attack', 'XSS Attempt'][Math.floor(Math.random() * 5)],
          source: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          target: ['Web Server', 'Auth Service', 'Database', 'API Server', 'Load Balancer'][Math.floor(Math.random() * 5)],
          timestamp: 'Just now',
          severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as 'low' | 'medium' | 'high' | 'critical',
          status: ['active', 'investigating'][Math.floor(Math.random() * 2)] as 'active' | 'investigating',
          aiConfidence: Math.floor(Math.random() * 30) + 70,
        };
        
        // Add to beginning of array and limit to 5 entries
        setThreats(prev => [newThreat, ...prev].slice(0, 5));
        
        // Show a toast for critical threats
        if (newThreat.severity === 'critical') {
          toast({
            title: "Critical Threat Detected!",
            description: `${newThreat.type} from ${newThreat.source}`,
            variant: "destructive",
          });
        }
      }
      
      // Sometimes update status of existing threats
      if (threats.length > 0 && Math.random() > 0.5) {
        setThreats(prev => {
          const updated = [...prev];
          const idx = Math.floor(Math.random() * updated.length);
          if (updated[idx].status !== 'mitigated') {
            updated[idx] = {
              ...updated[idx],
              status: Math.random() > 0.7 ? 'mitigated' : 'investigating'
            };
          }
          return updated;
        });
      }
    }, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, [threats, toast]);
  
  const handleBlockAll = () => {
    setThreats(prev => 
      prev.map(threat => ({
        ...threat,
        status: 'mitigated'
      }))
    );
    
    toast({
      title: "All Threats Blocked",
      description: "All active threats have been mitigated",
    });
  };
  
  // Get severity badge styling
  const getSeverityBadge = (severity: 'low' | 'medium' | 'high' | 'critical') => {
    const styles = {
      low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      high: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      critical: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    };
    
    return <Badge variant="outline" className={styles[severity]}>{severity}</Badge>;
  };
  
  // Get status badge styling
  const getStatusBadge = (status: 'active' | 'mitigated' | 'investigating') => {
    const styles = {
      active: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      investigating: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
      mitigated: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    };
    
    return <Badge variant="outline" className={styles[status]}>{status}</Badge>;
  };
  
  const activeThreatsCount = threats.filter(t => t.status === 'active').length;
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <span className="font-semibold">{activeThreatsCount} Active Threats</span>
        </div>
        
        <Button 
          onClick={handleBlockAll} 
          variant="destructive" 
          size="sm" 
          disabled={activeThreatsCount === 0}
        >
          <Shield className="mr-2 h-4 w-4" />
          Block All
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Threat Type</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>AI Confidence</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {threats.map(threat => (
              <TableRow key={threat.id}>
                <TableCell className="font-medium">{threat.type}</TableCell>
                <TableCell>{threat.source}</TableCell>
                <TableCell>{threat.target}</TableCell>
                <TableCell>{getSeverityBadge(threat.severity)}</TableCell>
                <TableCell>{getStatusBadge(threat.status)}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Cpu className="h-4 w-4 mr-2 text-blue-500" />
                    {threat.aiConfidence}%
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {threats.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No active threats detected
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ThreatDetectionPanel;
