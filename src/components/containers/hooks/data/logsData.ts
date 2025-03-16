
import { ContainerLog } from '@/types/containers';

// Sample logs data
export const getSampleLogs = (): ContainerLog[] => [
  {
    id: '1',
    container: 'api-server',
    timestamp: '2023-07-18 14:30:22',
    level: 'info',
    message: 'Server started on port 8080'
  },
  {
    id: '2',
    container: 'api-server',
    timestamp: '2023-07-18 14:32:15',
    level: 'warning',
    message: 'High memory usage detected (85%)'
  },
  {
    id: '3',
    container: 'database',
    timestamp: '2023-07-18 14:35:08',
    level: 'error',
    message: 'Failed to execute query: timeout after 30s'
  },
  {
    id: '4',
    container: 'web-frontend',
    timestamp: '2023-07-18 14:36:12',
    level: 'info',
    message: 'User authentication successful: user_id=1234'
  },
  {
    id: '5',
    container: 'redis-cache',
    timestamp: '2023-07-18 14:38:45',
    level: 'info',
    message: 'Cache hit ratio: 78.5%'
  },
  {
    id: '6',
    container: 'api-server',
    timestamp: '2023-07-18 14:40:01',
    level: 'debug',
    message: 'Processing request: GET /api/users?limit=100'
  },
  {
    id: '7',
    container: 'database',
    timestamp: '2023-07-18 14:42:33',
    level: 'warning',
    message: 'Slow query detected: execution time 2.5s'
  }
];
