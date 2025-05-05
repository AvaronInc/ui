
import { Container } from '@/types/containers';

// Sample container data
export const getSampleContainers = (): Container[] => [
  {
    id: '1',
    name: 'api-server',
    image: 'avaron-vertex/api-server:latest',
    status: 'running',
    uptime: '10d 4h',
    cpu: 12,
    memory: 512,
    ports: '8080:80'
  },
  {
    id: '2',
    name: 'web-frontend',
    image: 'avaron-vertex/web:latest',
    status: 'running',
    uptime: '5d 7h',
    cpu: 8,
    memory: 256,
    ports: '3000:3000'
  },
  {
    id: '3',
    name: 'database',
    image: 'postgres:12',
    status: 'running',
    uptime: '15d 2h',
    cpu: 20,
    memory: 1024,
    ports: '5432:5432'
  },
  {
    id: '4',
    name: 'redis-cache',
    image: 'redis:6',
    status: 'running',
    uptime: '15d 2h',
    cpu: 5,
    memory: 128,
    ports: '6379:6379'
  },
  {
    id: '5',
    name: 'elasticsearch',
    image: 'elastic/elasticsearch:7.10.0',
    status: 'stopped',
    uptime: '0',
    cpu: 0,
    memory: 0,
    ports: '9200:9200'
  }
];
