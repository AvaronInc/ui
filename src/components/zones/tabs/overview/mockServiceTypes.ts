
import { ServiceType } from '../../types';
import { getServiceTypeFromString, isServiceType } from './typeAdapters';

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

// Enhanced version with type checking
export function getServiceTypeFromString(typeString: string | ServiceType): ServiceType {
  if (isServiceType(typeString)) {
    return typeString;
  }
  
  return mockServiceTypes[typeString] || {
    id: typeString,
    name: typeString.charAt(0).toUpperCase() + typeString.slice(1),
    icon: 'circle'
  };
}
