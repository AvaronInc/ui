
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw, Users, UserX, ShieldOff, Clock } from 'lucide-react';
import { User } from '@/types/identity';
import ActiveSessionsTable from '../components/ActiveSessionsTable';
import UserStatsCards from '../components/UserStatsCards';

interface OverviewTabProps {
  users: User[];
  onSelectUser: (user: User) => void;
  onRefresh: () => void;
  isLoading: boolean;
  onOpenNewUserForm: () => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({
  users,
  onSelectUser,
  onRefresh,
  isLoading,
  onOpenNewUserForm,
}) => {
  // Calculate user statistics
  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.status === 'Active').length;
  const suspendedUsers = users.filter(user => user.status === 'Suspended').length;
  const revokedUsers = users.filter(user => user.status === 'Revoked').length;
  
  // Mock active sessions data
  const activeSessions = users
    .filter(user => user.status === 'Active')
    .slice(0, 5)
    .map(user => ({
      userId: user.id,
      username: user.username,
      fullName: user.fullName,
      ipAddress: '192.168.1.' + Math.floor(Math.random() * 255),
      deviceInfo: Math.random() > 0.5 ? 'Windows 11 / Chrome' : 'MacOS / Safari',
      loginTime: new Date(Date.now() - Math.floor(Math.random() * 3600000)).toISOString(),
      location: Math.random() > 0.5 ? 'San Francisco, CA' : 'New York, NY',
      riskScore: Math.floor(Math.random() * 100)
    }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">User Overview</h2>
        <div className="space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRefresh} 
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button 
            size="sm" 
            onClick={onOpenNewUserForm}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>
      
      <UserStatsCards
        totalUsers={totalUsers}
        activeUsers={activeUsers}
        suspendedUsers={suspendedUsers}
        revokedUsers={revokedUsers}
      />
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-primary" />
            Real-Time Session Monitoring
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ActiveSessionsTable sessions={activeSessions} />
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-primary/5 hover:bg-primary/10 cursor-pointer transition-colors">
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Plus className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Create New User</h3>
              <p className="text-sm text-muted-foreground">Add a new user to the system</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-amber-500/5 hover:bg-amber-500/10 cursor-pointer transition-colors">
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="bg-amber-500/10 p-3 rounded-full">
              <UserX className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <h3 className="font-medium">Suspended Users</h3>
              <p className="text-sm text-muted-foreground">View and manage suspended accounts</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-red-500/5 hover:bg-red-500/10 cursor-pointer transition-colors">
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="bg-red-500/10 p-3 rounded-full">
              <ShieldOff className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <h3 className="font-medium">Revoked Access</h3>
              <p className="text-sm text-muted-foreground">Manage users with revoked access</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewTab;
