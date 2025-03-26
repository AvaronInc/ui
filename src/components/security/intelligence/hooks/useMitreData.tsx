
import { useState, useEffect } from 'react';
import { Shield, Network, Laptop, Server, Lock, Database, FileText, User, Terminal, Code, AlertTriangle, Workflow } from 'lucide-react';
import React from 'react';

interface MitreTechnique {
  id: string;
  name: string;
  description: string;
  tactics: string[];
}

interface MitreTactic {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

interface APTMapping {
  aptId: string;
  aptName: string;
  techniqueIds: string[];
}

export const useMitreData = () => {
  const [tactics] = useState<MitreTactic[]>([
    {
      id: 'TA0001',
      name: 'Initial Access',
      description: 'Techniques used to gain initial access to a network',
      icon: <Network className="h-4 w-4" />
    },
    {
      id: 'TA0002',
      name: 'Execution',
      description: 'Techniques that result in execution of adversary-controlled code',
      icon: <Terminal className="h-4 w-4" />
    },
    {
      id: 'TA0003',
      name: 'Persistence',
      description: 'Techniques that maintain access to systems',
      icon: <Lock className="h-4 w-4" />
    },
    {
      id: 'TA0004',
      name: 'Privilege Escalation',
      description: 'Techniques that enable higher-level permissions',
      icon: <User className="h-4 w-4" />
    },
    {
      id: 'TA0005',
      name: 'Defense Evasion',
      description: 'Techniques used to avoid detection',
      icon: <Shield className="h-4 w-4" />
    },
    {
      id: 'TA0006',
      name: 'Credential Access',
      description: 'Techniques for stealing credentials',
      icon: <Key className="h-4 w-4" />
    },
    {
      id: 'TA0007',
      name: 'Discovery',
      description: 'Techniques used to discover information about systems and networks',
      icon: <Search className="h-4 w-4" />
    },
    {
      id: 'TA0008',
      name: 'Lateral Movement',
      description: 'Techniques used to move through an environment',
      icon: <Workflow className="h-4 w-4" />
    },
    {
      id: 'TA0009',
      name: 'Collection',
      description: 'Techniques used to gather information',
      icon: <Database className="h-4 w-4" />
    },
    {
      id: 'TA0010',
      name: 'Exfiltration',
      description: 'Techniques used to steal data from the network',
      icon: <FileText className="h-4 w-4" />
    },
    {
      id: 'TA0011',
      name: 'Command and Control',
      description: 'Techniques that allow attackers to communicate with systems under their control',
      icon: <Server className="h-4 w-4" />
    },
    {
      id: 'TA0040',
      name: 'Impact',
      description: 'Techniques that manipulate, interrupt, or destroy systems and data',
      icon: <AlertTriangle className="h-4 w-4" />
    }
  ]);
  
  const [techniques] = useState<MitreTechnique[]>([
    {
      id: 'T1566',
      name: 'Phishing',
      description: 'Adversaries may send phishing messages to gain access to victim systems.',
      tactics: ['TA0001']
    },
    {
      id: 'T1190',
      name: 'Exploit Public-Facing Application',
      description: 'Adversaries may attempt to exploit vulnerabilities in internet-facing applications.',
      tactics: ['TA0001']
    },
    {
      id: 'T1133',
      name: 'External Remote Services',
      description: 'Adversaries may leverage external remote services as a means of initial access.',
      tactics: ['TA0001']
    },
    {
      id: 'T1059',
      name: 'Command and Scripting Interpreter',
      description: 'Adversaries may abuse command and script interpreters to execute commands, scripts, or binaries.',
      tactics: ['TA0002']
    },
    {
      id: 'T1053',
      name: 'Scheduled Task/Job',
      description: 'Adversaries may abuse task scheduling functionality to facilitate initial or recurring execution of malicious code.',
      tactics: ['TA0002', 'TA0003', 'TA0004']
    },
    {
      id: 'T1547',
      name: 'Boot or Logon Autostart Execution',
      description: 'Adversaries may configure system settings to automatically execute a program during system boot or user logon.',
      tactics: ['TA0003', 'TA0004']
    },
    {
      id: 'T1078',
      name: 'Valid Accounts',
      description: 'Adversaries may obtain and abuse credentials of existing accounts as a means of gaining access.',
      tactics: ['TA0001', 'TA0003', 'TA0004', 'TA0008']
    },
    {
      id: 'T1140',
      name: 'Deobfuscate/Decode Files or Information',
      description: 'Adversaries may use obfuscated files or information to hide artifacts of an intrusion from analysis.',
      tactics: ['TA0005']
    },
    {
      id: 'T1027',
      name: 'Obfuscated Files or Information',
      description: 'Adversaries may attempt to make an executable or file difficult to discover or analyze.',
      tactics: ['TA0005']
    },
    {
      id: 'T1110',
      name: 'Brute Force',
      description: 'Adversaries may use brute force techniques to gain access to accounts when passwords are unknown or when password hashes are obtained.',
      tactics: ['TA0006']
    },
    {
      id: 'T1555',
      name: 'Credentials from Password Stores',
      description: 'Adversaries may search for common password storage locations to obtain user credentials.',
      tactics: ['TA0006']
    },
    {
      id: 'T1087',
      name: 'Account Discovery',
      description: 'Adversaries may attempt to get a listing of accounts on a system or within an environment.',
      tactics: ['TA0007']
    },
    {
      id: 'T1016',
      name: 'System Network Configuration Discovery',
      description: 'Adversaries may look for details about the network configuration and settings of systems they access.',
      tactics: ['TA0007']
    },
    {
      id: 'T1021',
      name: 'Remote Services',
      description: 'Adversaries may use valid accounts to log into a service specifically designed to accept remote connections.',
      tactics: ['TA0008']
    },
    {
      id: 'T1570',
      name: 'Lateral Tool Transfer',
      description: 'Adversaries may transfer tools or other files between systems in a compromised environment.',
      tactics: ['TA0008']
    },
    {
      id: 'T1213',
      name: 'Data from Information Repositories',
      description: 'Adversaries may leverage information repositories to collect valuable information.',
      tactics: ['TA0009']
    },
    {
      id: 'T1056',
      name: 'Input Capture',
      description: 'Adversaries may use various methods to capture user input for obtaining credentials or other sensitive data.',
      tactics: ['TA0009', 'TA0006']
    },
    {
      id: 'T1048',
      name: 'Exfiltration Over Alternative Protocol',
      description: 'Adversaries may use an alternative protocol to avoid typical data transfer detection capabilities.',
      tactics: ['TA0010']
    },
    {
      id: 'T1041',
      name: 'Exfiltration Over C2 Channel',
      description: 'Adversaries may steal data by exfiltrating it over an existing command and control channel.',
      tactics: ['TA0010']
    },
    {
      id: 'T1071',
      name: 'Application Layer Protocol',
      description: 'Adversaries may communicate using application layer protocols to avoid detection/network filtering.',
      tactics: ['TA0011']
    },
    {
      id: 'T1105',
      name: 'Ingress Tool Transfer',
      description: 'Adversaries may transfer tools or other files from an external system into a compromised environment.',
      tactics: ['TA0011']
    },
    {
      id: 'T1485',
      name: 'Data Destruction',
      description: 'Adversaries may destroy data and files on specific systems or in large numbers on a network.',
      tactics: ['TA0040']
    },
    {
      id: 'T1486',
      name: 'Data Encrypted for Impact',
      description: 'Adversaries may encrypt data on target systems or on large numbers of systems in a network.',
      tactics: ['TA0040']
    },
    {
      id: 'T1565',
      name: 'Data Manipulation',
      description: 'Adversaries may insert, delete, or manipulate data to influence outcomes or hide activity.',
      tactics: ['TA0040']
    }
  ]);
  
  const [aptMappings] = useState<APTMapping[]>([
    {
      aptId: 'apt28',
      aptName: 'APT28',
      techniqueIds: ['T1566', 'T1190', 'T1133', 'T1059', 'T1053', 'T1078', 'T1140', 'T1027', 'T1110', 'T1087', 'T1016', 'T1021', 'T1041', 'T1071']
    },
    {
      aptId: 'apt29',
      aptName: 'APT29',
      techniqueIds: ['T1566', 'T1078', 'T1053', 'T1547', 'T1027', 'T1140', 'T1555', 'T1016', 'T1021', 'T1570', 'T1048', 'T1071', 'T1105']
    },
    {
      aptId: 'apt33',
      aptName: 'APT33',
      techniqueIds: ['T1566', 'T1059', 'T1053', 'T1078', 'T1027', 'T1110', 'T1087', 'T1021', 'T1048', 'T1071']
    },
    {
      aptId: 'apt41',
      aptName: 'APT41',
      techniqueIds: ['T1566', 'T1190', 'T1059', 'T1547', 'T1078', 'T1140', 'T1027', 'T1555', 'T1087', 'T1016', 'T1021', 'T1213', 'T1056', 'T1041', 'T1071', 'T1486']
    },
    {
      aptId: 'dragonfly',
      aptName: 'Dragonfly',
      techniqueIds: ['T1566', 'T1190', 'T1133', 'T1078', 'T1027', 'T1110', 'T1087', 'T1016', 'T1021', 'T1071', 'T1565']
    }
  ]);
  
  // Simulate fetching data
  useEffect(() => {
    // In a real implementation, we'd fetch data from an API
    // For this sample, we're using static data
    console.log('Fetched MITRE data');
  }, []);
  
  return { techniques, tactics, aptMappings };
};

// Define the Key and Search icons since they're used but not imported
function Key(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
  );
}

function Search(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
