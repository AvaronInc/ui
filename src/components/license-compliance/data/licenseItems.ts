
import { LicenseData } from '../types';

export const licenseItems: LicenseData[] = [
  {
    id: '1',
    componentName: 'Wazuh Agent',
    licenseType: 'GPL',
    licenseUrl: 'https://github.com/wazuh/wazuh/blob/master/LICENSE',
    version: 'v4.6.0',
    source: 'wazuh.com',
    usedIn: ['Security Panel'],
    riskLevel: 'Medium',
    fullLicenseText: 'GNU GENERAL PUBLIC LICENSE Version 2, June 1991...',
    usageDetails: {
      containerName: 'wazuh-agent',
      apiCalls: ['GET /agents', 'POST /agents/restart'],
      dependencies: ['OpenSSL', 'zlib']
    }
  },
  {
    id: '2',
    componentName: 'Arkime',
    licenseType: 'Apache 2.0',
    licenseUrl: 'https://github.com/arkime/arkime/blob/master/LICENSE',
    version: 'v4.1.1',
    source: 'arkime.com',
    usedIn: ['Packet Capture', 'Network Monitoring'],
    riskLevel: 'Low',
    fullLicenseText: 'Apache License Version 2.0, January 2004...',
    usageDetails: {
      containerName: 'arkime-capture',
      apiCalls: ['GET /sessions', 'GET /connections'],
      dependencies: ['libpcap', 'Node.js']
    }
  },
  {
    id: '4',
    componentName: 'Weaviate',
    licenseType: 'BSD-3-Clause',
    licenseUrl: 'https://github.com/weaviate/weaviate/blob/master/LICENSE',
    version: 'v1.20.0',
    source: 'weaviate.io',
    usedIn: ['AI/RAG', 'Search'],
    riskLevel: 'Low',
    fullLicenseText: 'BSD 3-Clause License...',
    usageDetails: {
      containerName: 'weaviate-server',
      apiCalls: ['POST /v1/objects', 'GET /v1/schema'],
      dependencies: ['Go', 'Docker']
    }
  },
  {
    id: '5',
    componentName: 'VPP',
    licenseType: 'Apache 2.0',
    licenseUrl: 'https://github.com/FDio/vpp/blob/master/LICENSE',
    version: 'v23.02',
    source: 'fd.io',
    usedIn: ['Firewall', 'SDN', 'SD-WAN'],
    riskLevel: 'Low',
    fullLicenseText: 'Apache License Version 2.0, January 2004...',
    usageDetails: {
      containerName: 'vpp-router',
      apiCalls: ['API Call 1', 'API Call 2'],
      dependencies: ['DPDK', 'libmemif']
    }
  },
  {
    id: '6',
    componentName: 'Suricata',
    licenseType: 'GPL',
    licenseUrl: 'https://github.com/OISF/suricata/blob/master/LICENSE',
    version: 'v6.0.10',
    source: 'suricata.io',
    usedIn: ['IDS/IPS', 'Security'],
    riskLevel: 'Medium',
    fullLicenseText: 'GNU GENERAL PUBLIC LICENSE Version 2...',
    usageDetails: {
      containerName: 'suricata-ids',
      apiCalls: ['REST API Calls'],
      dependencies: ['libpcap', 'libyaml']
    }
  }
];
