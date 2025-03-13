
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Plus } from 'lucide-react';
import { UserRole } from '@/types/identity';

type Permission = 'view_dashboard' | 'manage_users' | 'manage_systems' | 'view_reports' | 'edit_settings' | 'access_api' | 'delete_resources';

interface RolePermission {
  id: string;
  name: string;
  permissions: Permission[];
}

const availablePermissions: { value: Permission; label: string }[] = [
  { value: 'view_dashboard', label: 'View Dashboard' },
  { value: 'manage_users', label: 'Manage Users' },
  { value: 'manage_systems', label: 'Manage Systems' },
  { value: 'view_reports', label: 'View Reports' },
  { value: 'edit_settings', label: 'Edit Settings' },
  { value: 'access_api', label: 'Access API' },
  { value: 'delete_resources', label: 'Delete Resources' },
];

const UserAccessSettings = () => {
  const { toast } = useToast();
  const [newRoleName, setNewRoleName] = useState('');
  const [roles, setRoles] = useState<RolePermission[]>([
    { id: '1', name: 'Administrator', permissions: ['view_dashboard', 'manage_users', 'manage_systems', 'view_reports', 'edit_settings', 'access_api', 'delete_resources'] },
    { id: '2', name: 'Analyst', permissions: ['view_dashboard', 'view_reports'] },
    { id: '3', name: 'Support', permissions: ['view_dashboard', 'manage_systems'] }
  ]);
  
  // Authentication & MFA settings
  const [requireMfaForAdmin, setRequireMfaForAdmin] = useState(true);
  const [enableBiometricMfa, setEnableBiometricMfa] = useState(false);
  
  // Account Security settings
  const [passwordComplexity, setPasswordComplexity] = useState('medium');
  const [maxLoginAttempts, setMaxLoginAttempts] = useState(5);
  const [lockoutDuration, setLockoutDuration] = useState(30);
  
  // Guest & Temporary Users settings
  const [enableGuestAccess, setEnableGuestAccess] = useState(false);
  const [guestSessionDuration, setGuestSessionDuration] = useState('24h');

  // Load saved settings from localStorage (if any)
  useEffect(() => {
    const savedSettings = localStorage.getItem('userAccessSettings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setRoles(parsed.roles || roles);
      setRequireMfaForAdmin(parsed.requireMfaForAdmin ?? requireMfaForAdmin);
      setEnableBiometricMfa(parsed.enableBiometricMfa ?? enableBiometricMfa);
      setPasswordComplexity(parsed.passwordComplexity || passwordComplexity);
      setMaxLoginAttempts(parsed.maxLoginAttempts || maxLoginAttempts);
      setLockoutDuration(parsed.lockoutDuration || lockoutDuration);
      setEnableGuestAccess(parsed.enableGuestAccess ?? enableGuestAccess);
      setGuestSessionDuration(parsed.guestSessionDuration || guestSessionDuration);
    }
  }, []);

  const handleAddRole = () => {
    if (newRoleName.trim() === '') return;
    
    const newRole: RolePermission = {
      id: (roles.length + 1).toString(),
      name: newRoleName,
      permissions: []
    };
    
    setRoles([...roles, newRole]);
    setNewRoleName('');
  };
  
  const handlePermissionChange = (roleId: string, permission: Permission, isChecked: boolean) => {
    setRoles(roles.map(role => {
      if (role.id === roleId) {
        return {
          ...role,
          permissions: isChecked 
            ? [...role.permissions, permission]
            : role.permissions.filter(p => p !== permission)
        };
      }
      return role;
    }));
  };

  const handleSave = () => {
    // Save all settings to localStorage
    const settings = {
      roles,
      requireMfaForAdmin,
      enableBiometricMfa,
      passwordComplexity,
      maxLoginAttempts,
      lockoutDuration,
      enableGuestAccess,
      guestSessionDuration
    };
    
    localStorage.setItem('userAccessSettings', JSON.stringify(settings));
    
    toast({
      title: "Settings saved",
      description: "User & Access settings have been updated successfully.",
    });
  };
  
  return (
    <div className="space-y-8">
      <div className="text-sm text-muted-foreground mb-6">
        Configure user roles, permissions, authentication methods, and access controls.
      </div>
      
      {/* Role-Based Access Control (RBAC) Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Role-Based Access Control (RBAC)</h3>
        
        <div className="flex space-x-2">
          <Input 
            placeholder="New role name" 
            value={newRoleName} 
            onChange={(e) => setNewRoleName(e.target.value)}
            className="max-w-sm"
          />
          <Button onClick={handleAddRole} size="sm">
            <Plus className="h-4 w-4 mr-1" /> Add Role
          </Button>
        </div>
        
        <div className="space-y-4 pt-2">
          {roles.map(role => (
            <div key={role.id} className="bg-card rounded-lg border p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-medium">{role.name}</div>
                <Badge variant="outline">{role.permissions.length} permissions</Badge>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-2">Assign permissions:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {availablePermissions.map(permission => (
                    <div key={permission.value} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`${role.id}-${permission.value}`} 
                        checked={role.permissions.includes(permission.value)} 
                        onCheckedChange={(checked) => {
                          handlePermissionChange(role.id, permission.value, checked === true);
                        }}
                      />
                      <Label 
                        htmlFor={`${role.id}-${permission.value}`}
                        className="text-sm font-normal"
                      >
                        {permission.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Authentication & MFA Section */}
      <div className="space-y-4 pt-4">
        <h3 className="text-lg font-medium">Authentication & MFA</h3>
        
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="require-mfa">Require MFA for Admin Logins</Label>
              <p className="text-sm text-muted-foreground">
                Force multi-factor authentication for administrator accounts
              </p>
            </div>
            <Switch 
              id="require-mfa" 
              checked={requireMfaForAdmin}
              onCheckedChange={setRequireMfaForAdmin}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="biometric-mfa">Enable Biometric MFA</Label>
              <p className="text-sm text-muted-foreground">
                Allow fingerprint, facial recognition, or other biometric methods
              </p>
            </div>
            <Switch 
              id="biometric-mfa" 
              checked={enableBiometricMfa}
              onCheckedChange={setEnableBiometricMfa}
            />
          </div>
        </div>
      </div>
      
      {/* Account Security Section */}
      <div className="space-y-4 pt-4">
        <h3 className="text-lg font-medium">Account Security</h3>
        
        <div className="grid gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="password-complexity">Password Complexity Rules</Label>
            <Select 
              value={passwordComplexity} 
              onValueChange={setPasswordComplexity}
            >
              <SelectTrigger id="password-complexity" className="max-w-sm">
                <SelectValue placeholder="Select complexity level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weak">Weak (8+ characters)</SelectItem>
                <SelectItem value="medium">Medium (8+ chars, alphanumeric)</SelectItem>
                <SelectItem value="strong">Strong (12+ chars, mixed case, symbols)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex flex-col gap-2">
            <Label htmlFor="login-attempts">Maximum Failed Login Attempts Before Lockout</Label>
            <Input 
              id="login-attempts" 
              type="number" 
              min={1} 
              max={10} 
              value={maxLoginAttempts} 
              onChange={(e) => setMaxLoginAttempts(parseInt(e.target.value) || 5)}
              className="max-w-sm"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <Label htmlFor="lockout-duration">Lockout Duration (Minutes)</Label>
            <Input 
              id="lockout-duration" 
              type="number" 
              min={5} 
              max={1440} 
              value={lockoutDuration} 
              onChange={(e) => setLockoutDuration(parseInt(e.target.value) || 30)}
              className="max-w-sm"
            />
          </div>
        </div>
      </div>
      
      {/* Guest & Temporary Users Section */}
      <div className="space-y-4 pt-4">
        <h3 className="text-lg font-medium">Guest & Temporary Users</h3>
        
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="guest-access">Enable Guest Access</Label>
              <p className="text-sm text-muted-foreground">
                Allow limited access to the system without full user credentials
              </p>
            </div>
            <Switch 
              id="guest-access" 
              checked={enableGuestAccess}
              onCheckedChange={setEnableGuestAccess}
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <Label htmlFor="guest-session">Set Guest Session Expiration Time</Label>
            <Select 
              value={guestSessionDuration} 
              onValueChange={setGuestSessionDuration}
              disabled={!enableGuestAccess}
            >
              <SelectTrigger id="guest-session" className="max-w-sm">
                <SelectValue placeholder="Select session duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">1 Hour</SelectItem>
                <SelectItem value="24h">24 Hours</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end pt-4 border-t">
        <Button onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default UserAccessSettings;
