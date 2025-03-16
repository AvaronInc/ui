
import React from 'react';
import { format } from 'date-fns';
import { X, BellOff, Check, CheckCheck, Info, AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';
import { useAlerts, Alert } from '@/context/AlertsContext';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetFooter
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert as AlertComponent, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NotificationsPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ 
  open, 
  onOpenChange 
}) => {
  const { alerts, markAsRead, markAllAsRead, clearAlert, unreadCount } = useAlerts();

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'info':
        return <Info className="h-4 w-4" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      case 'error':
        return <AlertCircle className="h-4 w-4" />;
      case 'success':
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  // This function is updated to return only valid variant types for the Alert component
  const getAlertVariant = (type: Alert['type']): "default" | "destructive" => {
    switch (type) {
      case 'info':
        return 'default';
      case 'warning':
        return 'default'; // Changed from 'warning' to 'default'
      case 'error':
        return 'destructive';
      case 'success':
        return 'default';
      default:
        return 'default';
    }
  };

  const handleMarkAsRead = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    markAsRead(id);
  };

  const handleClearAlert = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    clearAlert(id);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md" side="right">
        <SheetHeader className="px-1">
          <SheetTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              Notifications
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {unreadCount} unread
                </Badge>
              )}
            </div>
            {alerts.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
                className="flex gap-1 items-center"
              >
                <CheckCheck className="h-4 w-4" />
                <span className="hidden sm:inline">Mark all as read</span>
                <span className="inline sm:hidden">Read all</span>
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 px-1">
          {alerts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
              <BellOff className="h-10 w-10 mb-2 opacity-50" />
              <p>No notifications</p>
            </div>
          ) : (
            <ScrollArea className="h-[calc(100vh-10rem)] pr-4">
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <AlertComponent 
                    key={alert.id} 
                    variant={getAlertVariant(alert.type)}
                    className={`relative ${!alert.read ? 'border-l-4' : 'opacity-80'} ${
                      alert.type === 'warning' ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/10' : ''
                    }`}
                  >
                    {getAlertIcon(alert.type)}

                    <div className="w-full">
                      <AlertTitle className="flex items-center justify-between">
                        <span>{alert.title}</span>
                        <div className="flex items-center gap-1">
                          {!alert.read && (
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-7 w-7"
                              onClick={(e) => handleMarkAsRead(alert.id, e)}
                            >
                              <Check className="h-4 w-4" />
                              <span className="sr-only">Mark as read</span>
                            </Button>
                          )}
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7"
                            onClick={(e) => handleClearAlert(alert.id, e)}
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Dismiss</span>
                          </Button>
                        </div>
                      </AlertTitle>
                      <AlertDescription className="mt-1">
                        <div className="mb-1">{alert.message}</div>
                        <div className="text-xs text-muted-foreground">
                          {format(new Date(alert.timestamp), 'MMM dd, yyyy - HH:mm')}
                        </div>
                      </AlertDescription>
                    </div>
                  </AlertComponent>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>

        <SheetFooter className="mt-auto pt-2">
          <Button 
            className="w-full"
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationsPanel;
