
import { useState, useEffect } from 'react';
import { Shield, Globe, AlertTriangle, Workflow, Users } from 'lucide-react';
import React from 'react';

interface WazuhAlert {
  id: string;
  timestamp: string;
  rule: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  source: {
    ip: string;
    hostname: string;
  };
  mitreTactics: string[];
  aptGroup: string | null;
  actionTaken: 'blocked' | 'quarantined' | 'investigating' | 'none';
}

interface APTGroup {
  id: string;
  name: string;
}

interface MitreTactic {
  id: string;
  name: string;
  icon: React.ReactNode;
}

export const useWazuhData = () => {
  const [aptGroups] = useState<APTGroup[]>([
    { id: 'apt28', name: 'APT28 (Fancy Bear)' },
    { id: 'apt29', name: 'APT29 (Cozy Bear)' },
    { id: 'apt33', name: 'APT33 (Elfin)' },
    { id: 'apt41', name: 'APT41 (Double Dragon)' },
    { id: 'dragonfly', name: 'Dragonfly' }
  ]);
  
  const [mitreTactics] = useState<MitreTactic[]>([
    {
      id: 'TA0001',
      name: 'Initial Access',
      icon: <Shield className="h-4 w-4" />
    },
    {
      id: 'TA0002',
      name: 'Execution',
      icon: <AlertTriangle className="h-4 w-4" />
    },
    {
      id: 'TA0008',
      name: 'Lateral Movement',
      icon: <Workflow className="h-4 w-4" />
    },
    {
      id: 'TA0011',
      name: 'Command and Control',
      icon: <Globe className="h-4 w-4" />
    }
  ]);
  
  const [alerts] = useState<WazuhAlert[]>([
    {
      id: 'alert-1',
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
      rule: 'Possible APT28 Dropper Detection',
      description: 'Detected potential APT28 dropper activity with known file hash indicators and suspicious system calls.',
      severity: 'critical',
      source: {
        ip: '192.168.1.45',
        hostname: 'DESKTOP-HR7'
      },
      mitreTactics: ['TA0002', 'TA0011'],
      aptGroup: 'apt28',
      actionTaken: 'quarantined'
    },
    {
      id: 'alert-2',
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 minutes ago
      rule: 'Suspicious PowerShell Execution with Encoded Command',
      description: 'PowerShell execution with Base64 encoded commands detected, consistent with known APT29 techniques.',
      severity: 'high',
      source: {
        ip: '192.168.2.12',
        hostname: 'FINANCE-PC003'
      },
      mitreTactics: ['TA0002'],
      aptGroup: 'apt29',
      actionTaken: 'investigating'
    },
    {
      id: 'alert-3',
      timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(), // 1.5 hours ago
      rule: 'Multiple Failed Authentication Attempts',
      description: 'Multiple failed authentication attempts from external IP address, possible brute force attack.',
      severity: 'medium',
      source: {
        ip: '203.0.113.45',
        hostname: 'Unknown'
      },
      mitreTactics: ['TA0001'],
      aptGroup: null,
      actionTaken: 'blocked'
    },
    {
      id: 'alert-4',
      timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
      rule: 'Unusual Network Connection to Known C2 Server',
      description: 'Network connection to IP address associated with APT41 command and control infrastructure.',
      severity: 'critical',
      source: {
        ip: '192.168.3.78',
        hostname: 'DEV-SERVER-05'
      },
      mitreTactics: ['TA0011'],
      aptGroup: 'apt41',
      actionTaken: 'blocked'
    },
    {
      id: 'alert-5',
      timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
      rule: 'Suspicious File Creation in System Directory',
      description: 'Creation of executable file in system directory with known APT33 naming patterns.',
      severity: 'high',
      source: {
        ip: '192.168.1.112',
        hostname: 'ADMIN-PC-01'
      },
      mitreTactics: ['TA0002'],
      aptGroup: 'apt33',
      actionTaken: 'quarantined'
    },
    {
      id: 'alert-6',
      timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(), // 4 hours ago
      rule: 'Lateral Movement with WMI/PowerShell',
      description: 'WMI and PowerShell execution for remote process creation, consistent with lateral movement techniques.',
      severity: 'high',
      source: {
        ip: '192.168.2.45',
        hostname: 'IT-ADMIN-03'
      },
      mitreTactics: ['TA0008'],
      aptGroup: 'apt29',
      actionTaken: 'investigating'
    },
    {
      id: 'alert-7',
      timestamp: new Date(Date.now() - 1000 * 60 * 300).toISOString(), // 5 hours ago
      rule: 'Suspicious DNS Query Pattern',
      description: 'Unusual DNS query pattern consistent with domain generation algorithm (DGA) used by APT41.',
      severity: 'medium',
      source: {
        ip: '192.168.4.23',
        hostname: 'LEGAL-PC-02'
      },
      mitreTactics: ['TA0011'],
      aptGroup: 'apt41',
      actionTaken: 'investigating'
    },
    {
      id: 'alert-8',
      timestamp: new Date(Date.now() - 1000 * 60 * 360).toISOString(), // 6 hours ago
      rule: 'Registry Modification for Persistence',
      description: 'Modification of Windows registry for persistence mechanism, similar to methods used by APT28.',
      severity: 'high',
      source: {
        ip: '192.168.1.56',
        hostname: 'EXEC-LAPTOP-01'
      },
      mitreTactics: ['TA0002'],
      aptGroup: 'apt28',
      actionTaken: 'quarantined'
    },
    {
      id: 'alert-9',
      timestamp: new Date(Date.now() - 1000 * 60 * 420).toISOString(), // 7 hours ago
      rule: 'Suspicious LSASS Memory Access',
      description: 'Access to LSASS memory for potential credential harvesting, consistent with known techniques.',
      severity: 'critical',
      source: {
        ip: '192.168.2.78',
        hostname: 'HR-PC-09'
      },
      mitreTactics: ['TA0002', 'TA0008'],
      aptGroup: null,
      actionTaken: 'investigating'
    },
    {
      id: 'alert-10',
      timestamp: new Date(Date.now() - 1000 * 60 * 480).toISOString(), // 8 hours ago
      rule: 'ICS Protocol Anomaly',
      description: 'Anomalous industrial control system (ICS) protocol behavior consistent with Dragonfly group tactics.',
      severity: 'critical',
      source: {
        ip: '192.168.10.5',
        hostname: 'ICS-CONTROL-02'
      },
      mitreTactics: ['TA0001', 'TA0002'],
      aptGroup: 'dragonfly',
      actionTaken: 'blocked'
    }
  ]);
  
  // Simulate fetching data
  useEffect(() => {
    // In a real implementation, we'd fetch data from an API
    // For this sample, we're using static data
    console.log('Fetched Wazuh data');
  }, []);
  
  return { alerts, aptGroups, mitreTactics };
};
