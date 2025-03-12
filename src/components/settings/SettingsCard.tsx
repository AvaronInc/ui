
import React from 'react';
import { cn } from '@/lib/utils';

interface SettingsCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const SettingsCard = ({ title, children, className }: SettingsCardProps) => {
  return (
    <div className={cn("bg-card rounded-lg border shadow-sm", className)}>
      <div className="p-4 border-b">
        <h3 className="font-medium">{title}</h3>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default SettingsCard;
