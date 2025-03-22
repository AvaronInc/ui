
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PageTitleProps {
  title: string;
  subtitle?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string; // Add className prop
}

export const PageTitle = ({ title, subtitle, description, icon, className }: PageTitleProps) => {
  return (
    <div className={cn("space-y-1", className)}>
      <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
        {icon && <span>{icon}</span>}
        {title}
      </h1>
      {subtitle && (
        <p className="text-muted-foreground">{subtitle}</p>
      )}
      {description && !subtitle && (
        <p className="text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

export default PageTitle;
