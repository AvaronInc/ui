
import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAlerts } from '@/context/AlertsContext';

interface NotificationButtonProps {
  onClick: () => void;
}

export const NotificationButton: React.FC<NotificationButtonProps> = ({ onClick }) => {
  const { unreadCount } = useAlerts();
  
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="relative"
      onClick={onClick}
    >
      <Bell className="h-4 w-4" />
      {unreadCount > 0 && (
        <Badge 
          variant="destructive" 
          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]"
        >
          {unreadCount > 99 ? '99+' : unreadCount}
        </Badge>
      )}
      <span className="sr-only">Notifications</span>
    </Button>
  );
};
