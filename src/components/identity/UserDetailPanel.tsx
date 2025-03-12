
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetDescription,
  SheetFooter
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, UserStatus, UserRole } from '@/types/identity';
import { 
  Clock, 
  KeyRound, 
  ShieldAlert, 
  UserCog, 
  Fingerprint, 
  AlertTriangle,
  Check,
  X,
  Shield
} from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface UserDetailPanelProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUserUpdated: (user: User) => void;
}

const UserDetailPanel: React.FC<UserDetailPanelProps> = ({ 
  user, 
  open, 
  onOpenChange,
  onUserUpdated
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleChange = (newRole: UserRole) => {
    if (!user) return;
    
    setIsLoading(true);
    
    // Simulating API call
    setTimeout(() => {
      const updatedUser = { 
        ...user, 
        role: newRole,
        activities: [
          {
            action: `Role changed to ${newRole}`,
            timestamp: new Date().toISOString(),
            ipAddress: '192.168.1.1',
          },
          ...user.activities
        ]
      };
      
      onUserUpdated(updatedUser);
      setIsLoading(false);
      toast.success(`User role updated to ${newRole}`);
    }, 800);
  };

  const handleStatusChange = (newStatus: UserStatus) => {
    if (!user) return;
    
    setIsLoading(true);
    
    // Simulating API call
    setTimeout(() => {
      const updatedUser = { 
        ...user, 
        status: newStatus,
        activities: [
          {
            action: `Status changed to ${newStatus}`,
            timestamp: new Date().toISOString(),
            ipAddress: '192.168.1.1',
          },
          ...user.activities
        ]
      };
      
      onUserUpdated(updatedUser);
      setIsLoading(false);
      toast.success(`User status updated to ${newStatus}`);
    }, 800);
  };

  const handleMfaToggle = () => {
    if (!user) return;
    
    setIsLoading(true);
    
    // Simulating API call
    setTimeout(() => {
      const newMfaStatus = !user.mfaEnabled;
      const updatedUser = { 
        ...user, 
        mfaEnabled: newMfaStatus,
        activities: [
          {
            action: `MFA ${newMfaStatus ? 'enabled' : 'disabled'}`,
            timestamp: new Date().toISOString(),
            ipAddress: '192.168.1.1',
          },
          ...user.activities
        ]
      };
      
      onUserUpdated(updatedUser);
      setIsLoading(false);
      toast.success(`MFA ${newMfaStatus ? 'enabled' : 'disabled'} for user`);
    }, 800);
  };

  const handleResetPassword = () => {
    if (!user) return;
    
    setIsLoading(true);
    
    // Simulating API call
    setTimeout(() => {
      const updatedUser = { 
        ...user,
        activities: [
          {
            action: "Password reset initiated",
            timestamp: new Date().toISOString(),
            ipAddress: '192.168.1.1',
          },
          ...user.activities
        ]
      };
      
      onUserUpdated(updatedUser);
      setIsLoading(false);
      toast.success("Password reset email sent to user");
    }, 800);
  };

  const handleRevokeKyberCert = () => {
    if (!user) return;
    
    setIsLoading(true);
    
    // Simulating API call
    setTimeout(() => {
      const updatedUser = { 
        ...user,
        kyberCertHash: undefined,
        activities: [
          {
            action: "Kyber certificate revoked",
            timestamp: new Date().toISOString(),
            ipAddress: '192.168.1.1',
          },
          ...user.activities
        ]
      };
      
      onUserUpdated(updatedUser);
      setIsLoading(false);
      toast.success("Kyber certificate successfully revoked");
    }, 800);
  };

  if (!user) return null;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const getStatusColor = (status: UserStatus) => {
    switch (status) {
      case 'Active': return 'bg-success text-success-foreground';
      case 'Suspended': return 'bg-warning text-warning-foreground';
      case 'Revoked': return 'bg-destructive text-destructive-foreground';
      default: return '';
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader className="pb-4">
          <SheetTitle>User Details</SheetTitle>
          <SheetDescription>
            View and manage user information and access
          </SheetDescription>
        </SheetHeader>
        
        <div className="space-y-5 py-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg">
                {getInitials(user.fullName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-medium">{user.fullName}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <div className="flex items-center mt-1 space-x-2">
                <Badge variant="outline">{user.role}</Badge>
                <Badge className={getStatusColor(user.status)}>
                  {user.status}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />
          
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Account Information</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">Username</div>
              <div>{user.username}</div>
              
              <div className="text-muted-foreground">Created On</div>
              <div>{format(new Date(user.createdAt), 'PPP')}</div>
              
              <div className="text-muted-foreground">Last Login</div>
              <div>{format(new Date(user.lastLogin), 'PPP p')}</div>
              
              <div className="text-muted-foreground">MFA Status</div>
              <div className="flex items-center">
                {user.mfaEnabled ? (
                  <>
                    <Check className="h-4 w-4 text-success mr-1" />
                    <span>Enabled</span>
                  </>
                ) : (
                  <>
                    <X className="h-4 w-4 text-destructive mr-1" />
                    <span>Disabled</span>
                  </>
                )}
              </div>
              
              <div className="text-muted-foreground">Biometrics</div>
              <div className="flex items-center">
                {user.biometricsEnrolled ? (
                  <>
                    <Check className="h-4 w-4 text-success mr-1" />
                    <span>Enrolled</span>
                  </>
                ) : (
                  <>
                    <X className="h-4 w-4 text-destructive mr-1" />
                    <span>Not Enrolled</span>
                  </>
                )}
              </div>
              
              <div className="text-muted-foreground">Kyber Certificate</div>
              <div className="flex items-center">
                {user.kyberCertHash ? (
                  <>
                    <Shield className="h-4 w-4 text-success mr-1" />
                    <span className="truncate" title={user.kyberCertHash}>
                      {user.kyberCertHash.substring(0, 8)}...
                    </span>
                  </>
                ) : (
                  <>
                    <X className="h-4 w-4 text-destructive mr-1" />
                    <span>Not Provisioned</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <Separator />
          
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Access Control & Security</h4>
            <div className="grid grid-cols-1 gap-2">
              <h5 className="text-sm font-medium">Role Management</h5>
              <div className="flex flex-wrap gap-2">
                <Button 
                  size="sm" 
                  variant={user.role === 'User' ? 'default' : 'outline'}
                  disabled={user.role === 'User' || isLoading}
                  onClick={() => handleRoleChange('User')}
                >
                  User
                </Button>
                <Button 
                  size="sm" 
                  variant={user.role === 'Engineer' ? 'default' : 'outline'}
                  disabled={user.role === 'Engineer' || isLoading}
                  onClick={() => handleRoleChange('Engineer')}
                >
                  Engineer
                </Button>
                <Button 
                  size="sm" 
                  variant={user.role === 'Admin' ? 'default' : 'outline'}
                  disabled={user.role === 'Admin' || isLoading}
                  onClick={() => handleRoleChange('Admin')}
                >
                  Admin
                </Button>
              </div>
              
              <h5 className="text-sm font-medium mt-2">Account Status</h5>
              <div className="flex flex-wrap gap-2">
                <Button 
                  size="sm" 
                  variant={user.status === 'Active' ? 'default' : 'outline'}
                  disabled={user.status === 'Active' || isLoading}
                  onClick={() => handleStatusChange('Active')}
                >
                  Activate
                </Button>
                <Button 
                  size="sm" 
                  variant={user.status === 'Suspended' ? 'default' : 'outline'}
                  className="bg-warning text-warning-foreground hover:bg-warning/90"
                  disabled={user.status === 'Suspended' || isLoading}
                  onClick={() => handleStatusChange('Suspended')}
                >
                  Suspend
                </Button>
                <Button 
                  size="sm" 
                  variant={user.status === 'Revoked' ? 'default' : 'outline'}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  disabled={user.status === 'Revoked' || isLoading}
                  onClick={() => handleStatusChange('Revoked')}
                >
                  Revoke
                </Button>
              </div>
              
              <h5 className="text-sm font-medium mt-2">Security Actions</h5>
              <div className="flex flex-col gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="justify-start"
                  disabled={isLoading}
                  onClick={handleResetPassword}
                >
                  <KeyRound className="h-4 w-4 mr-2" />
                  Reset Password
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="justify-start"
                  disabled={isLoading || !user.kyberCertHash}
                  onClick={handleRevokeKyberCert}
                >
                  <ShieldAlert className="h-4 w-4 mr-2" />
                  Revoke Kyber Certificate
                </Button>
                
                <Button 
                  variant={user.mfaEnabled ? "outline" : "default"}
                  size="sm"
                  className="justify-start"
                  disabled={isLoading}
                  onClick={handleMfaToggle}
                >
                  <UserCog className="h-4 w-4 mr-2" />
                  {user.mfaEnabled ? "Disable MFA" : "Enable MFA"}
                </Button>
              </div>
            </div>
          </div>

          <Separator />
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Recent Activity</h4>
              <Button variant="ghost" size="sm" className="h-8 text-xs">
                View All
              </Button>
            </div>
            <div className="space-y-2 max-h-48 overflow-auto">
              {user.activities.slice(0, 5).map((activity, index) => (
                <div key={index} className="text-sm border rounded-md p-2">
                  <div className="font-medium">{activity.action}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {format(new Date(activity.timestamp), 'Pp')}
                    {activity.ipAddress && (
                      <span className="ml-2">{activity.ipAddress}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <SheetFooter className="pt-2">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default UserDetailPanel;
