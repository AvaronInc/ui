
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, UserPlus, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const approvals = [
  { id: 1, name: 'James Wilson', department: 'Engineering', time: '3h ago', urgency: 'high' },
  { id: 2, name: 'Tanya Rodriguez', department: 'Marketing', time: '1d ago', urgency: 'medium' },
  { id: 3, name: 'David Lee', department: 'Finance', time: '2d ago', urgency: 'low' },
];

const PendingIdentityApprovals = () => {
  return (
    <div className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium flex items-center justify-between">
          <div className="flex items-center">
            <span>Pending Identity Approvals</span>
            <Badge className="ml-2 text-xs">{approvals.length}</Badge>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1">
        <div className="space-y-3">
          {approvals.map(approval => (
            <div key={approval.id} className="p-2 rounded-lg border bg-background/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{approval.name}</p>
                  <div className="flex text-xs text-muted-foreground">
                    <span>{approval.department}</span>
                    <span className="mx-1">•</span>
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1 inline" />
                      {approval.time}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" className="h-7 text-xs">
                    <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                    Approve
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Button variant="ghost" size="sm" className="text-xs w-full mt-4">
          <UserPlus className="h-3.5 w-3.5 mr-1" />
          View All Approval Requests
        </Button>
      </CardContent>
    </div>
  );
};

export default PendingIdentityApprovals;
