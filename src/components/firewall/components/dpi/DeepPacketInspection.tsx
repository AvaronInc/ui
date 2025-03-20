
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { DPIHeader } from './index';
import { SessionStats } from './index';
import { CaptureSessionsCard } from './index';
import { TLSMonitoring } from './index';
import { AIThreatAnalysis } from './index';
import { CaptureSession } from './types';

const DeepPacketInspection = () => {
  const { toast } = useToast();
  const [dpiEnabled, setDpiEnabled] = useState(false);
  const [sessions, setSessions] = useState<CaptureSession[]>([
    {
      id: '1',
      source: '192.168.1.105:53640',
      destination: '93.184.216.34:443',
      protocol: 'HTTPS',
      startTime: '2025-03-20 10:15:22',
      duration: '00:03:45',
      status: 'completed',
      packets: 248,
      bytes: 32580,
      encryption: 'strong',
      threatScore: 0
    },
    {
      id: '2',
      source: '192.168.1.110:49872',
      destination: '8.8.8.8:53',
      protocol: 'DNS',
      startTime: '2025-03-20 10:17:05',
      duration: '00:00:02',
      status: 'completed',
      packets: 4,
      bytes: 512,
      encryption: 'none',
      threatScore: 0
    },
    {
      id: '3',
      source: '192.168.1.120:61234',
      destination: '203.0.113.5:80',
      protocol: 'HTTP',
      startTime: '2025-03-20 10:18:30',
      duration: '00:02:15',
      status: 'completed',
      packets: 156,
      bytes: 24680,
      encryption: 'none',
      threatScore: 35
    },
    {
      id: '4',
      source: '192.168.1.125:52146',
      destination: '198.51.100.23:22',
      protocol: 'SSH',
      startTime: '2025-03-20 10:20:45',
      duration: '00:15:30',
      status: 'active',
      packets: 3456,
      bytes: 458972,
      encryption: 'strong',
      threatScore: 0
    },
    {
      id: '5',
      source: '192.168.1.130:44556',
      destination: '104.18.20.99:443',
      protocol: 'TLS 1.2',
      startTime: '2025-03-20 10:25:18',
      duration: '00:01:48',
      status: 'completed',
      packets: 86,
      bytes: 12450,
      encryption: 'weak',
      threatScore: 65
    }
  ]);

  const handleToggleDPI = () => {
    setDpiEnabled(!dpiEnabled);
    toast({
      title: dpiEnabled ? "DPI Disabled" : "DPI Enabled",
      description: dpiEnabled ? 
        "Deep packet inspection has been disabled." : 
        "Deep packet inspection is now active and monitoring traffic.",
    });
  };

  return (
    <div className="space-y-6">
      <DPIHeader 
        dpiEnabled={dpiEnabled} 
        onToggleDPI={handleToggleDPI} 
      />

      <SessionStats sessions={sessions} />

      <CaptureSessionsCard sessions={sessions} />

      <TLSMonitoring sessions={sessions} />
      
      <AIThreatAnalysis 
        dpiEnabled={dpiEnabled} 
        onToggleDPI={handleToggleDPI} 
      />
    </div>
  );
};

export default DeepPacketInspection;
