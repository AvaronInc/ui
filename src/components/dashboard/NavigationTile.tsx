
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavigationTileProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  color?: string;
  className?: string;
}

export const NavigationTile = ({ 
  title, 
  description, 
  icon: Icon, 
  href,
  color = "bg-primary/10 text-primary",
  className 
}: NavigationTileProps) => {
  return (
    <Link to={href}>
      <Card className={cn(
        "glass-card h-full overflow-hidden animated-card", 
        className
      )}>
        <CardContent className="p-6">
          <div className="flex flex-col items-start gap-4">
            <div className={cn(
              "p-2.5 rounded-lg",
              color
            )}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-medium">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default NavigationTile;
