
import { useState, useEffect } from 'react';
import { Shield, Code, Database, Globe, Server, Lock, AlertTriangle, User } from 'lucide-react';
import React from 'react';

interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  categories: string[];
  examples?: string[];
  relatedTerms?: string[];
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

export const useGlossaryData = () => {
  const [categories] = useState<Category[]>([
    {
      id: 'general',
      name: 'General Security',
      icon: <Shield className="h-4 w-4" />
    },
    {
      id: 'malware',
      name: 'Malware & Exploits',
      icon: <Code className="h-4 w-4" />
    },
    {
      id: 'network',
      name: 'Network Security',
      icon: <Globe className="h-4 w-4" />
    },
    {
      id: 'data',
      name: 'Data Security',
      icon: <Database className="h-4 w-4" />
    },
    {
      id: 'infra',
      name: 'Infrastructure',
      icon: <Server className="h-4 w-4" />
    },
    {
      id: 'encryption',
      name: 'Encryption',
      icon: <Lock className="h-4 w-4" />
    },
    {
      id: 'threats',
      name: 'Threat Actors',
      icon: <AlertTriangle className="h-4 w-4" />
    },
    {
      id: 'identity',
      name: 'Identity & Access',
      icon: <User className="h-4 w-4" />
    }
  ]);
  
  const [glossaryTerms] = useState<GlossaryTerm[]>([
    {
      id: 'apt',
      term: 'Advanced Persistent Threat (APT)',
      definition: 'A sophisticated, prolonged cyberattack in which an intruder establishes an undetected presence in a network with the goal of stealing sensitive data or causing damage.',
      categories: ['threats', 'general'],
      examples: [
        'APT29 (also known as Cozy Bear) is attributed to Russia\'s foreign intelligence service',
        'APT41 is a Chinese state-sponsored group known for both espionage and financially motivated activities'
      ],
      relatedTerms: ['threat-actor', 'cyber-espionage', 'nation-state']
    },
    {
      id: 'backdoor',
      term: 'Backdoor',
      definition: 'A covert method of bypassing normal authentication in a system, product, or service, providing unauthorized remote access while remaining undetected.',
      categories: ['malware', 'general'],
      examples: [
        'A vulnerability intentionally placed in a system during its development',
        'Malware that establishes persistent remote access to a compromised system'
      ],
      relatedTerms: ['malware', 'trojan', 'rat']
    },
    {
      id: 'c2',
      term: 'Command and Control (C2)',
      definition: 'Infrastructure used by attackers to communicate with compromised systems within a target network. C2 servers issue commands to malware and receive stolen data.',
      categories: ['malware', 'network'],
      examples: [
        'Domain fronting to mask C2 traffic as legitimate web services',
        'Using encrypted communication channels for stealth'
      ],
      relatedTerms: ['apt', 'malware', 'backdoor', 'beacon']
    },
    {
      id: 'cve',
      term: 'Common Vulnerabilities and Exposures (CVE)',
      definition: 'A system that provides a reference method for publicly known information-security vulnerabilities and exposures. Each vulnerability receives a CVE identifier.',
      categories: ['general', 'infra'],
      examples: [
        'CVE-2021-44228: The Log4Shell vulnerability in Apache Log4j',
        'CVE-2023-23397: Microsoft Outlook elevation of privilege vulnerability'
      ],
      relatedTerms: ['cwe', 'vulnerability', 'exploit']
    },
    {
      id: 'cyber-espionage',
      term: 'Cyber Espionage',
      definition: 'The act of using digital means to obtain secrets or confidential information without the permission of the holder of the information, typically for military, political, or economic advantage.',
      categories: ['threats', 'general'],
      examples: [
        'Nation-state actors stealing defense contractor trade secrets',
        'Targeting diplomatic communications to gain geopolitical advantages'
      ],
      relatedTerms: ['apt', 'nation-state', 'intelligence-gathering']
    },
    {
      id: 'ddos',
      term: 'Distributed Denial of Service (DDoS)',
      definition: 'A cyberattack in which multiple compromised systems are used to target a single system, service, or network, overwhelming it with malicious traffic to make it unavailable.',
      categories: ['network', 'threats'],
      examples: [
        'Volumetric attacks that consume bandwidth with massive traffic',
        'Application layer attacks targeting specific web application functions'
      ],
      relatedTerms: ['botnet', 'volumetric-attack', 'amplification']
    },
    {
      id: 'exploit',
      term: 'Exploit',
      definition: 'A piece of software, code, or sequence of commands that takes advantage of a vulnerability to cause unintended behavior in software, hardware, or a system.',
      categories: ['malware', 'general'],
      examples: [
        'Zero-day exploits that target previously unknown vulnerabilities',
        'Exploits packaged in exploit kits for ease of use by attackers'
      ],
      relatedTerms: ['vulnerability', 'zero-day', 'exploit-kit', 'cve']
    },
    {
      id: 'exfiltration',
      term: 'Exfiltration',
      definition: 'The unauthorized transfer of data from a computer or network to a location controlled by a threat actor, typically after a successful breach.',
      categories: ['data', 'general'],
      examples: [
        'Data exfiltration via encrypted DNS tunneling',
        'Using cloud storage services to blend in with normal traffic'
      ],
      relatedTerms: ['data-breach', 'dlp', 'c2']
    },
    {
      id: 'ioc',
      term: 'Indicator of Compromise (IoC)',
      definition: 'Evidence that indicates a system has been compromised by an attack or that it has been infected with malware.',
      categories: ['general', 'malware'],
      examples: [
        'Unusual outbound network traffic to known malicious IP addresses',
        'File hashes that match known malware samples'
      ],
      relatedTerms: ['forensics', 'threat-hunting', 'threat-intelligence']
    },
    {
      id: 'lateral-movement',
      term: 'Lateral Movement',
      definition: 'Techniques that enable an attacker to move through a network by accessing different systems after gaining initial access to a single system.',
      categories: ['general', 'network'],
      examples: [
        'Using stolen credentials to access other systems on the network',
        'Leveraging trust relationships between systems to move to higher-value targets'
      ],
      relatedTerms: ['privilege-escalation', 'credential-theft', 'internal-reconnaissance']
    },
    {
      id: 'malware',
      term: 'Malware',
      definition: 'Malicious software designed to disrupt, damage, or gain unauthorized access to a computer system, including viruses, worms, trojans, ransomware, and spyware.',
      categories: ['malware', 'general'],
      examples: [
        'Ransomware that encrypts files and demands payment',
        'Banking trojans designed to steal financial credentials'
      ],
      relatedTerms: ['ransomware', 'trojan', 'backdoor', 'spyware']
    },
    {
      id: 'mitre-attack',
      term: 'MITRE ATT&CK Framework',
      definition: 'A globally accessible knowledge base of adversary tactics and techniques based on real-world observations, structured by tactics, techniques, and procedures (TTPs).',
      categories: ['general', 'threats'],
      examples: [
        'Using the framework to map observed behaviors to known tactics and techniques',
        'Building detection and prevention strategies based on the framework'
      ],
      relatedTerms: ['ttp', 'threat-intelligence', 'tactics']
    },
    {
      id: 'nation-state',
      term: 'Nation-State Actor',
      definition: 'A threat actor or group that is directly supported, funded, or directed by a national government to conduct cyber operations for espionage, disruption, or other strategic objectives.',
      categories: ['threats'],
      examples: [
        'Military intelligence units conducting cyber espionage',
        'State-sponsored groups targeting critical infrastructure'
      ],
      relatedTerms: ['apt', 'cyber-espionage', 'warfare']
    },
    {
      id: 'zero-day',
      term: 'Zero-Day Vulnerability',
      definition: 'A software security flaw that is unknown to the vendor or developer, and thus has not been patched, giving attackers the opportunity to exploit it before a fix is available.',
      categories: ['malware', 'general'],
      examples: [
        'Vulnerabilities discovered and exploited by attackers before vendors are aware',
        'High-value targets for nation-state actors and sophisticated threat groups'
      ],
      relatedTerms: ['vulnerability', 'exploit', 'patch-management', 'cve']
    },
    {
      id: 'phishing',
      term: 'Phishing',
      definition: 'A social engineering attack in which attackers masquerade as trustworthy entities to trick individuals into revealing sensitive information or deploying malware.',
      categories: ['general', 'threats'],
      examples: [
        'Spear phishing campaigns targeting specific individuals',
        'Business email compromise targeting executives'
      ],
      relatedTerms: ['social-engineering', 'spear-phishing', 'whaling']
    },
    {
      id: 'ransomware',
      term: 'Ransomware',
      definition: 'A type of malware that encrypts files or systems, making them inaccessible until a ransom is paid for the decryption key.',
      categories: ['malware'],
      examples: [
        'Double extortion tactics that steal data before encryption',
        'Ransomware-as-a-Service (RaaS) operations'
      ],
      relatedTerms: ['malware', 'extortion', 'encryption']
    },
    {
      id: 'threat-actor',
      term: 'Threat Actor',
      definition: 'An individual, group, or organization that is responsible for conducting malicious activities against an organization\'s security.',
      categories: ['threats'],
      examples: [
        'Nation-state sponsored groups',
        'Financially motivated cybercriminals',
        'Hacktivists with political motivations'
      ],
      relatedTerms: ['apt', 'nation-state', 'cybercriminal']
    },
    {
      id: 'trojan',
      term: 'Trojan Horse',
      definition: 'Malware that disguises itself as legitimate software but performs malicious actions when executed.',
      categories: ['malware'],
      examples: [
        'Banking trojans designed to steal financial credentials',
        'Remote access trojans (RATs) providing backdoor access'
      ],
      relatedTerms: ['malware', 'backdoor', 'rat']
    },
    {
      id: 'ttp',
      term: 'Tactics, Techniques, and Procedures (TTPs)',
      definition: 'The patterns of behaviors, tools, and methods used by threat actors when conducting cyberattacks.',
      categories: ['general', 'threats'],
      examples: [
        'The specific exploitation methods used by an APT group',
        'The exfiltration channels commonly used by a threat actor'
      ],
      relatedTerms: ['mitre-attack', 'threat-intelligence', 'apt']
    },
    {
      id: 'vulnerability',
      term: 'Vulnerability',
      definition: 'A weakness in a system, application, or process that could be exploited by a threat actor to gain unauthorized access or perform unauthorized actions.',
      categories: ['general', 'infra'],
      examples: [
        'Software bugs that can be exploited to execute code',
        'Misconfigurations that expose sensitive data'
      ],
      relatedTerms: ['cve', 'exploit', 'zero-day', 'patch-management']
    },
    {
      id: 'wiper',
      term: 'Wiper Malware',
      definition: 'Destructive malware designed to destroy data, files, or entire systems by erasing critical system files or overwriting data.',
      categories: ['malware'],
      examples: [
        'NotPetya targeting Ukrainian organizations but spreading globally',
        'Shamoon targeting energy sector organizations'
      ],
      relatedTerms: ['malware', 'destructive-attack', 'data-destruction']
    },
    {
      id: 'watering-hole',
      term: 'Watering Hole Attack',
      definition: 'A targeted attack strategy where attackers compromise websites frequently visited by their intended targets to deliver malware or exploit vulnerabilities.',
      categories: ['threats', 'network'],
      examples: [
        'Compromising industry-specific forums or news sites',
        'Targeting third-party service providers used by the ultimate target'
      ],
      relatedTerms: ['phishing', 'supply-chain', 'targeted-attack']
    },
    {
      id: 'spear-phishing',
      term: 'Spear Phishing',
      definition: 'A targeted form of phishing attack directed at specific individuals or organizations, often using personal information to make the attack more convincing.',
      categories: ['threats'],
      examples: [
        'Emails crafted using information gathered from social media',
        'Messages appearing to come from trusted colleagues or partners'
      ],
      relatedTerms: ['phishing', 'social-engineering', 'whaling']
    },
    {
      id: 'threat-intelligence',
      term: 'Threat Intelligence',
      definition: 'Information about threats and threat actors that helps organizations understand the risks they face and how to defend against them.',
      categories: ['general', 'threats'],
      examples: [
        'Technical indicators like malicious IP addresses or file hashes',
        'Strategic intelligence about threat actor motivations and capabilities'
      ],
      relatedTerms: ['ioc', 'ttp', 'threat-actor']
    }
  ]);
  
  // Simulate fetching data
  useEffect(() => {
    // In a real implementation, we'd fetch data from an API
    // For this sample, we're using static data
    console.log('Fetched glossary data');
  }, []);
  
  return { glossaryTerms, categories };
};
