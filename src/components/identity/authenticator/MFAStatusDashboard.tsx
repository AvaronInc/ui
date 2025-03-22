
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  UserCheck, 
  Clock, 
  AlertTriangle, 
  Shield, 
  Users, 
  RefreshCw,
  UserX, 
  ServerCrash, 
  Activity 
} from 'lucide-react';
import { MfaAppDeployment } from './AuthenticatorPanel';

interface MFAStatusDashboardProps {
  deployments: MfaAppDeployment[];
  isLoading: boolean;
  onRefresh: () => void;
}

export const MFAStatusDashboard: React.FC<MFAStatusDashboardProps> = ({ 
  deployments,
  isLoading,
  onRefresh
}) => {
  // Calculate status counts
  const totalCount = deployments.length;
  const activeCount = deployments.filter(d => d.status === 'active').length;
  const pendingCount = deployments.filter(d => d.status === 'pending').length;
  const revokedCount = deployments.filter(d => d.status === 'revoked').length;
  
  // Calculate authentication stats (mocked data for now)
  const todayAuths = 14;
  const failedAuths = 2;
  const sessionCount = 8;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center justify-between">
            <span className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-primary" />
              MFA Status
            </span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8" 
              onClick={onRefresh}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <UserCheck className="h-4 w-4 mr-2 text-green-500" />
                <span className="text-sm">Active MFA Users</span>
              </div>
              <span className="font-semibold bg-green-100 text-green-800 rounded px-2 py-1 text-xs">
                {activeCount}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-amber-500" />
                <span className="text-sm">Pending MFA Setup</span>
              </div>
              <span className="font-semibold bg-amber-100 text-amber-800 rounded px-2 py-1 text-xs">
                {pendingCount}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <UserX className="h-4 w-4 mr-2 text-red-500" />
                <span className="text-sm">Revoked MFA Users</span>
              </div>
              <span className="font-semibold bg-red-100 text-red-800 rounded px-2 py-1 text-xs">
                {revokedCount}
              </span>
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-blue-500" />
                <span className="text-sm">Total Deployments</span>
              </div>
              <span className="font-semibold bg-blue-100 text-blue-800 rounded px-2 py-1 text-xs">
                {totalCount}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Activity className="h-5 w-5 mr-2 text-primary" />
            Authentication Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2 text-green-500" />
                <span className="text-sm">Successful Auths Today</span>
              </div>
              <span className="font-semibold bg-green-100 text-green-800 rounded px-2 py-1 text-xs">
                {todayAuths}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
                <span className="text-sm">Failed Auth Attempts</span>
              </div>
              <span className="font-semibold bg-red-100 text-red-800 rounded px-2 py-1 text-xs">
                {failedAuths}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-blue-500" />
                <span className="text-sm">Active MFA Sessions</span>
              </div>
              <span className="font-semibold bg-blue-100 text-blue-800 rounded px-2 py-1 text-xs">
                {sessionCount}
              </span>
            </div>
            
            <div className="flex justify-end pt-2">
              <Button size="sm" variant="outline" className="text-xs h-8">
                View Detailed Logs
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <ServerCrash className="h-5 w-5 mr-2 text-primary" />
            Security Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start">
              <UserX className="h-4 w-4 mr-2 text-red-500" />
              Force MFA Reset for All Users
            </Button>
            
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Clock className="h-4 w-4 mr-2 text-amber-500" />
              Expire All Pending Links
            </Button>
            
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Shield className="h-4 w-4 mr-2 text-green-500" />
              Review Security Policies
            </Button>
            
            <Button variant="destructive" size="sm" className="w-full justify-start mt-3">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Terminate All Sessions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
