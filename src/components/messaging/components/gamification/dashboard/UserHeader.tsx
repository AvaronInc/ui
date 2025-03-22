
import React from 'react';
import { User } from 'lucide-react';

const UserHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Contribution Dashboard</h1>
        <p className="text-muted-foreground">
          Track your activity and impact on the community
        </p>
      </div>
      <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full">
        <User className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium">John Doe</span>
        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
          Security Engineer
        </span>
      </div>
    </div>
  );
};

export default UserHeader;
