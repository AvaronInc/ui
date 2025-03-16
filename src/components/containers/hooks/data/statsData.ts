
import { ContainerStats } from '@/types/containers';

// Sample stats data
export const getSampleStats = (): ContainerStats => ({
  runningContainers: 4,
  totalContainers: 5,
  cpuUsage: 45,
  memoryUsage: 62,
  networkUsage: 15.7,
  systemHealth: 'Healthy',
  activeAlerts: 2,
  resourceUsage: [
    { name: 'Mon', cpu: 45, memory: 52, network: 18 },
    { name: 'Tue', cpu: 52, memory: 58, network: 17 },
    { name: 'Wed', cpu: 48, memory: 57, network: 19 },
    { name: 'Thu', cpu: 62, memory: 59, network: 21 },
    { name: 'Fri', cpu: 78, memory: 65, network: 24 },
    { name: 'Sat', cpu: 35, memory: 50, network: 12 },
    { name: 'Sun', cpu: 30, memory: 48, network: 10 },
  ]
});
