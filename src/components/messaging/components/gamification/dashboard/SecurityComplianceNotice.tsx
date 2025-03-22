
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { User, Activity, Shield } from 'lucide-react';

const SecurityComplianceNotice: React.FC = () => {
  return (
    <Card className="bg-muted/50">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-4 text-sm">
          <div className="flex-1">
            <h3 className="font-medium flex items-center gap-1 mb-1">
              <User className="h-4 w-4 text-primary" />
              Role-Based Access
            </h3>
            <p className="text-muted-foreground text-xs">
              All gamification features are fully role-based. Only you and administrators can view your detailed stats.
            </p>
          </div>
          
          <div className="flex-1">
            <h3 className="font-medium flex items-center gap-1 mb-1">
              <Activity className="h-4 w-4 text-primary" />
              Activity Logging
            </h3>
            <p className="text-muted-foreground text-xs">
              All actions are logged for auditing purposes in compliance with company policy.
            </p>
          </div>
          
          <div className="flex-1">
            <h3 className="font-medium flex items-center gap-1 mb-1">
              <Shield className="h-4 w-4 text-primary" />
              Admin Moderation
            </h3>
            <p className="text-muted-foreground text-xs">
              Administrators can moderate, delete, or lock threads as needed for content management.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityComplianceNotice;
