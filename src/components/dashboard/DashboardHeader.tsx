
import React from 'react';
import { cn } from '@/lib/utils';
import { Bell, Search, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardHeaderProps {
  className?: string;
}

export const DashboardHeader = ({ className }: DashboardHeaderProps) => {
  return (
    <header className={cn(
      "sticky top-0 z-30 flex items-center justify-between h-16 px-6 border-b bg-background/80 backdrop-blur-sm",
      className
    )}>
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-medium">IT Dashboard</h1>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Search className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Settings className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground ml-2">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
