
import { AIOptimization } from '@/types/containers';

// Sample AI optimizations data
export const getSampleAIOptimizations = (): AIOptimization => ({
  resourcesSaved: 28,
  uptimePercentage: 99.8,
  meanTimeToRecovery: 45,
  recommendations: [
    {
      id: '1',
      container: 'api-server',
      currentResource: 'CPU: 2 cores',
      recommendedResource: 'CPU: 1 core',
      potentialSavings: '50% CPU reduction'
    },
    {
      id: '2',
      container: 'database',
      currentResource: 'Memory: 4GB',
      recommendedResource: 'Memory: 2GB',
      potentialSavings: '50% memory reduction'
    }
  ]
});
