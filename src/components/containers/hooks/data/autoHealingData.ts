
import { AutoHealing } from '@/types/containers';

// Sample auto-healing data
export const getSampleAutoHealingEvents = (): AutoHealing => ({
  recoveredIncidents: 14,
  events: [
    {
      id: '1',
      containerName: 'api-server',
      timestamp: '2 hours ago',
      description: 'Container restarted after resource exhaustion',
      status: 'success'
    },
    {
      id: '2',
      containerName: 'database',
      timestamp: '5 hours ago',
      description: 'Memory limits automatically increased by 20%',
      status: 'success'
    },
    {
      id: '3',
      containerName: 'web-frontend',
      timestamp: '1 day ago',
      description: 'Container moved to different node after host issues',
      status: 'success'
    },
    {
      id: '4',
      containerName: 'queue-service',
      timestamp: 'Just now',
      description: 'Attempting container recovery after crash',
      status: 'in-progress'
    }
  ]
});
