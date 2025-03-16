
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, UserCheck, UserX, ShieldOff } from 'lucide-react';

interface UserStatsCardsProps {
  totalUsers: number;
  activeUsers: number;
  suspendedUsers: number;
  revokedUsers: number;
}

const UserStatsCards: React.FC<UserStatsCardsProps> = ({
  totalUsers,
  activeUsers,
  suspendedUsers,
  revokedUsers
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4 flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Users</p>
            <h3 className="text-2xl font-bold mt-1">{totalUsers}</h3>
          </div>
          <div className="bg-primary/10 p-3 rounded-full">
            <Users className="h-5 w-5 text-primary" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Active Users</p>
            <h3 className="text-2xl font-bold mt-1">{activeUsers}</h3>
          </div>
          <div className="bg-green-500/10 p-3 rounded-full">
            <UserCheck className="h-5 w-5 text-green-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Suspended Users</p>
            <h3 className="text-2xl font-bold mt-1">{suspendedUsers}</h3>
          </div>
          <div className="bg-amber-500/10 p-3 rounded-full">
            <UserX className="h-5 w-5 text-amber-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Revoked Access</p>
            <h3 className="text-2xl font-bold mt-1">{revokedUsers}</h3>
          </div>
          <div className="bg-red-500/10 p-3 rounded-full">
            <ShieldOff className="h-5 w-5 text-red-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserStatsCards;
