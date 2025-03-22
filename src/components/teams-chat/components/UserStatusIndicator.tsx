
import { Circle } from 'lucide-react';
import { UserStatus } from '../types';
import { cn } from '@/lib/utils';

interface UserStatusIndicatorProps {
  status: UserStatus;
  className?: string;
}

const UserStatusIndicator = ({ status, className }: UserStatusIndicatorProps) => {
  let color = '';
  
  switch (status) {
    case 'online':
      color = 'text-green-500';
      break;
    case 'away':
      color = 'text-yellow-500';
      break;
    case 'dnd':
      color = 'text-red-500';
      break;
    case 'offline':
    default:
      color = 'text-gray-400';
      break;
  }
  
  return <Circle className={cn(color, 'fill-current', className)} />;
};

export default UserStatusIndicator;
