
import { Registry } from '@/types/containers';

// Sample registries data
export const getSampleRegistries = (): Registry[] => [
  {
    id: '1',
    name: 'Docker Hub',
    url: 'https://hub.docker.com',
    status: 'connected',
    imageCount: 42,
    lastSync: '2 hours ago'
  },
  {
    id: '2',
    name: 'Private Registry',
    url: 'https://registry.cybernest.internal',
    status: 'connected',
    imageCount: 18,
    lastSync: '1 day ago'
  },
  {
    id: '3',
    name: 'AWS ECR',
    url: 'https://aws-account.dkr.ecr.us-west-2.amazonaws.com',
    status: 'error',
    imageCount: 12,
    lastSync: '3 days ago'
  }
];
