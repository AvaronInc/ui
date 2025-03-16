
import { ContainerEvent } from '@/types/containers';

// Sample events data
export const getSampleEvents = (): ContainerEvent[] => [
  {
    id: '1',
    type: 'error',
    title: 'Container Crashed',
    description: 'Database container crashed due to memory limits',
    timestamp: '10 minutes ago',
    containerName: 'postgres-db'
  },
  {
    id: '2',
    type: 'warning',
    title: 'Resource Warning',
    description: 'API server approaching CPU limits (85% usage)',
    timestamp: '25 minutes ago',
    containerName: 'api-server'
  },
  {
    id: '3',
    type: 'info',
    title: 'Container Started',
    description: 'Cache service container started successfully',
    timestamp: '45 minutes ago',
    containerName: 'redis-cache'
  }
];
