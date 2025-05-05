
import { ContainerImage } from '@/types/containers';

// Sample images data
export const getSampleImages = (): ContainerImage[] => [
  {
    id: '1',
    name: 'avaron-vertex/api-server',
    tag: 'latest',
    size: '120MB',
    registry: 'Docker Hub',
    created: '2 days ago',
    vulnerabilities: 0
  },
  {
    id: '2',
    name: 'avaron-vertex/web-frontend',
    tag: 'latest',
    size: '85MB',
    registry: 'Docker Hub',
    created: '3 days ago',
    vulnerabilities: 2
  },
  {
    id: '3',
    name: 'postgres',
    tag: '12',
    size: '314MB',
    registry: 'Docker Hub',
    created: '1 week ago',
    vulnerabilities: 0
  },
  {
    id: '4',
    name: 'redis',
    tag: '6',
    size: '105MB',
    registry: 'Docker Hub',
    created: '2 weeks ago',
    vulnerabilities: 1
  },
  {
    id: '5',
    name: 'avaron-vertex/monitoring',
    tag: 'v1.2',
    size: '92MB',
    registry: 'Private Registry',
    created: '4 days ago',
    vulnerabilities: 0
  }
];
