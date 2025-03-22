
import { LicenseData } from '../types';

export const licenseItemsMore: LicenseData[] = [
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
  }
];
