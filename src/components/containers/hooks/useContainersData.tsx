import { useState } from 'react';
import { 
  getSampleContainers,
  getSampleLogs,
  getSampleEvents,
  getSampleStats,
  getSampleSecurityScans,
  getSampleAutoHealingEvents,
  getSampleAIOptimizations,
  getSampleImages,
  getSampleRegistries
} from './data';

import { 
  Container, 
  ContainerLog, 
  ContainerEvent, 
  ContainerStats, 
  SecurityScan, 
  AutoHealing, 
  AIOptimization, 
  ContainerImage, 
  Registry 
} from '@/types/containers';

export const useContainersData = () => {
  const [containers, setContainers] = useState<Container[]>(getSampleContainers());
  const [logs, setLogs] = useState<ContainerLog[]>(getSampleLogs());
  const [events, setEvents] = useState<ContainerEvent[]>(getSampleEvents());
  const [stats, setStats] = useState<ContainerStats>(getSampleStats());
  const [securityScans, setSecurityScans] = useState<SecurityScan>(getSampleSecurityScans());
  const [autoHealingEvents, setAutoHealingEvents] = useState<AutoHealing>(getSampleAutoHealingEvents());
  const [aiOptimizations, setAiOptimizations] = useState<AIOptimization>(getSampleAIOptimizations());
  const [images, setImages] = useState<ContainerImage[]>(getSampleImages());
  const [registries, setRegistries] = useState<Registry[]>(getSampleRegistries());
  
  // This would typically involve API calls to fetch real data
  // But for demo purposes we're using the sample data
  
  return {
    containers,
    logs,
    events,
    stats,
    securityScans,
    autoHealingEvents,
    aiOptimizations,
    images,
    registries
  };
};
