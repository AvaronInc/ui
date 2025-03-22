
import React from 'react';
import { Clock } from 'lucide-react';

type ActivityItemProps = { 
  icon: React.ReactNode;
  title: string;
  timestamp: Date;
  type: string;
};

const ActivityItem: React.FC<ActivityItemProps> = ({ 
  icon, title, timestamp, type 
}) => {
  let typeColor = '';
  
  switch (type) {
    case 'post':
      typeColor = 'text-blue-500';
      break;
    case 'comment':
      typeColor = 'text-purple-500';
      break;
    case 'solution':
      typeColor = 'text-green-500';
      break;
    case 'reaction':
      typeColor = 'text-red-500';
      break;
    default:
      typeColor = 'text-gray-500';
  }
  
  return (
    <div className="flex items-start gap-3 py-2 border-b last:border-0">
      <div className={`mt-1 ${typeColor}`}>{icon}</div>
      <div className="flex-1">
        <div className="font-medium text-sm">{title}</div>
        <div className="text-xs text-muted-foreground flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          {timestamp.toLocaleDateString()} at {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;
