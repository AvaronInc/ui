
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Shield, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const users = [
  { id: 1, name: 'Alex Johnson', issue: 'No biometric MFA', avatar: '/placeholder.svg' },
  { id: 2, name: 'Sarah Chen', issue: 'Expired certificate', avatar: '/placeholder.svg' },
  { id: 3, name: 'Mike Peterson', issue: 'No biometric MFA', avatar: '/placeholder.svg' },
];

const UnverifiedUsers = () => {
  return (
    <div className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium flex items-center justify-between">
          <div className="flex items-center">
            <span>Unverified Users</span>
            <Badge variant="destructive" className="ml-2 text-xs">{users.length}</Badge>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1">
        <div className="space-y-3">
          {users.map(user => (
            <div key={user.id} className="flex items-center justify-between p-2 rounded-lg border bg-background/50">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <AlertCircle className="h-3 w-3 mr-1 text-amber-500" />
                    {user.issue}
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="h-7 text-xs">
                <Shield className="h-3.5 w-3.5 mr-1" />
                Verify
              </Button>
            </div>
          ))}
        </div>
        
        <Button variant="ghost" size="sm" className="text-xs w-full mt-4">
          View All Users
        </Button>
      </CardContent>
    </div>
  );
};

export default UnverifiedUsers;
