
import React from 'react';
import { UserStatus } from '../types';

interface StatusIndicatorProps {
  status: UserStatus;
}

export const StatusIndicator = ({ status }: StatusIndicatorProps) => {
  const statusColors = {
    online: 'bg-green-500',
    away: 'bg-yellow-500',
    dnd: 'bg-red-500',
    offline: 'bg-gray-400'
  };
  
  return (
    <span className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white ${statusColors[status]}`} />
  );
};

export default StatusIndicator;
