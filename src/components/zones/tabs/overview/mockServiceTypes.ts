
import { ServiceType } from '../../types';

export const mockServiceTypes: Record<string, ServiceType> = {
  'identity': {
    id: 'identity',
    name: 'Identity & Access',
    icon: 'shield-check'
  },
  'network': {
    id: 'network',
    name: 'Network',
    icon: 'network'
  },
  'database': {
    id: 'database',
    name: 'Database',
    icon: 'database'
  },
  'storage': {
    id: 'storage',
    name: 'Storage',
    icon: 'hard-drive'
  },
  'ai': {
    id: 'ai',
    name: 'AI & ML',
    icon: 'brain'
  },
  'finance': {
    id: 'finance',
    name: 'Financial',
    icon: 'currency-dollar'
  }
};

// Note: Using the centralized adapter functions from utils/typeAdapters.ts instead
