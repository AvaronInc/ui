
import { LicenseData, LicenseSummary, LicenseBreakdown } from './types';

export const mockLicenseData: LicenseData[] = [
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
  // Netmaker entry removed
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
  },
  {
    id: '7',
    componentName: 'MinIO',
    licenseType: 'AGPL',
    licenseUrl: 'https://github.com/minio/minio/blob/master/LICENSE',
    version: 'v2023.03.20',
    source: 'min.io',
    usedIn: ['Storage', 'Object Storage'],
    riskLevel: 'High',
    fullLicenseText: 'GNU AFFERO GENERAL PUBLIC LICENSE Version 3...',
    usageDetails: {
      containerName: 'minio-server',
      apiCalls: ['S3 API Calls'],
      dependencies: ['Go']
    }
  },
  {
    id: '8',
    componentName: 'Redis',
    licenseType: 'BSD-3-Clause',
    licenseUrl: 'https://github.com/redis/redis/blob/unstable/LICENSE',
    version: 'v7.0.11',
    source: 'redis.io',
    usedIn: ['Caching', 'Message Queue'],
    riskLevel: 'Low',
    fullLicenseText: 'BSD 3-Clause License...',
    usageDetails: {
      containerName: 'redis-cache',
      apiCalls: ['Redis Commands'],
      dependencies: []
    }
  },
  {
    id: '9',
    componentName: 'PostgreSQL',
    licenseType: 'Custom',
    licenseUrl: 'https://www.postgresql.org/about/licence/',
    version: 'v15.3',
    source: 'postgresql.org',
    usedIn: ['Database', 'Storage'],
    riskLevel: 'Low',
    fullLicenseText: 'PostgreSQL License...',
    usageDetails: {
      containerName: 'postgres-db',
      apiCalls: ['SQL Queries'],
      dependencies: []
    }
  },
  // OpenVPN entry removed (id: '10')
  {
    id: '11',
    componentName: 'OpenSearch',
    licenseType: 'Apache 2.0',
    licenseUrl: 'https://github.com/opensearch-project/OpenSearch/blob/main/LICENSE.txt',
    version: 'v2.7.0',
    source: 'opensearch.org',
    usedIn: ['Search', 'Analytics'],
    riskLevel: 'Low',
    fullLicenseText: 'Apache License Version 2.0, January 2004...',
    usageDetails: {
      containerName: 'opensearch',
      apiCalls: ['REST API Calls'],
      dependencies: ['Java', 'Lucene']
    }
  },
  {
    id: '12',
    componentName: 'Nginx',
    licenseType: 'BSD-2-Clause',
    licenseUrl: 'https://nginx.org/LICENSE',
    version: 'v1.22.1',
    source: 'nginx.org',
    usedIn: ['Proxy', 'Web Server'],
    riskLevel: 'Low',
    fullLicenseText: 'BSD 2-Clause License...',
    usageDetails: {
      containerName: 'nginx-proxy',
      apiCalls: ['HTTP Requests'],
      dependencies: ['OpenSSL', 'PCRE']
    }
  },
  {
    id: '13',
    componentName: 'Mixtral',
    licenseType: 'Apache 2.0',
    licenseUrl: 'https://github.com/mistralai/mistral-src/blob/main/LICENSE',
    version: 'v0.1',
    source: 'mistralai.com',
    usedIn: ['AI/ML', 'Natural Language Processing'],
    riskLevel: 'Low',
    fullLicenseText: 'Apache License Version 2.0, January 2004...',
    usageDetails: {
      containerName: 'mixtral-inference',
      apiCalls: ['POST /v1/completions', 'POST /v1/chat/completions'],
      dependencies: ['PyTorch', 'CUDA']
    }
  }
];

// Update the license summary to reflect the changes:
// 1. Removed OpenVPN (one less GPL license)
// 2. Added Mixtral (one more Apache 2.0 license)
export const licenseSummary: LicenseSummary = {
  totalLicenses: 11, // No net change: removed 1, added 1
  totalDependencies: 35, // We're replacing OpenVPN dependencies with Mixtral's
  restrictedLicenses: 2, // Decreased by 1 (removing GPL license from OpenVPN)
  complianceStatus: 'Review Needed'
};

// Update the license breakdown to reflect the changes:
// 1. Removed one GPL license (OpenVPN)
// 2. Added one Apache 2.0 license (Mixtral)
export const licenseBreakdown: LicenseBreakdown[] = [
  { licenseType: 'Apache 2.0', count: 4, color: '#4CAF50' }, // Increased from 3 to 4
  { licenseType: 'GPL', count: 2, color: '#F44336' }, // Decreased from 3 to 2
  { licenseType: 'AGPL', count: 1, color: '#D32F2F' },
  { licenseType: 'BSD-3-Clause', count: 2, color: '#2196F3' },
  { licenseType: 'BSD-2-Clause', count: 1, color: '#03A9F4' },
  { licenseType: 'Custom', count: 1, color: '#9C27B0' }
];
