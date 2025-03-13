
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface PageTitleProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export const PageTitle = ({ title, description, icon }: PageTitleProps) => {
  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
        {icon && <span>{icon}</span>}
        {title}
      </h1>
      {description && (
        <p className="text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

export default PageTitle;
