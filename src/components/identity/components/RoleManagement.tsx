
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Check, Plus, Trash2, UserCog, KeyRound, Database } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
}

const permissions = [
  { value: 'view_dashboard', label: 'View Dashboard', category: 'Dashboard' },
  { value: 'edit_settings', label: 'Edit Settings', category: 'System' },
  { value: 'add_users', label: 'Add Users', category: 'Users' },
  { value: 'delete_users', label: 'Delete Users', category: 'Users' },
  { value: 'modify_users', label: 'Modify Users', category: 'Users' },
  { value: 'view_logs', label: 'View Logs', category: 'Security' },
  { value: 'manage_systems', label: 'Manage Systems', category: 'System' },
  { value: 'view_reports', label: 'View Reports', category: 'Reports' },
  { value: 'manage_nests', label: 'Manage Nests', category: 'NEST' },
  { value: 'manage_sdwan', label: 'Manage SD-WAN', category: 'SD-WAN' },
  { value: 'manage_containers', label: 'Manage Containers', category: 'Containers' },
  { value: 'access_apis', label: 'Access APIs', category: 'Development' },
  { value: 'manage_backups', label: 'Manage Backups', category: 'System' },
];

const RoleManagement: React.FC = () => {
  const { toast } = useToast();
  const [newRoleName, setNewRoleName] = useState('');
  const [roles, setRoles] = useState<Role[]>([
    {
      id: '1',
      name: 'Administrator',
      description: 'Full access to all system functionality',
      permissions: permissions.map(p => p.value),
      userCount: 3
    },
    {
      id: '2',
      name: 'Security Analyst',
      description: 'Can view security logs and reports',
      permissions: ['view_dashboard', 'view_logs', 'view_reports'],
      userCount: 5
    },
    {
      id: '3',
      name: 'Network Engineer',
      description: 'Can manage network devices and configurations',
      permissions: ['view_dashboard', 'manage_nests', 'manage_sdwan', 'view_reports'],
      userCount: 8
    },
    {
      id: '4',
      name: 'Support Staff',
      description: 'Limited access for customer support',
      permissions: ['view_dashboard', 'view_reports'],
      userCount: 12
    }
  ]);
  
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  
  const handleAddRole = () => {
    if (newRoleName.trim() === '') return;
    
    const newRole: Role = {
      id: (roles.length + 1).toString(),
      name: newRoleName,
      description: '',
      permissions: [],
      userCount: 0
    };
    
    setRoles([...roles, newRole]);
    setNewRoleName('');
    toast({
      title: 'Role Created',
      description: `Role "${newRoleName}" has been created.`,
    });
  };
  
  const togglePermission = (roleId: string, permission: string) => {
    setRoles(roles.map(role => {
      if (role.id === roleId) {
        const hasPermission = role.permissions.includes(permission);
        return {
          ...role,
          permissions: hasPermission 
            ? role.permissions.filter(p => p !== permission)
            : [...role.permissions, permission]
        };
      }
      return role;
    }));
  };
  
  const getPermissionsByCategory = () => {
    const categories: {[key: string]: typeof permissions} = {};
    
    permissions.forEach(permission => {
      if (!categories[permission.category]) {
        categories[permission.category] = [];
      }
      categories[permission.category].push(permission);
    });
    
    return categories;
  };
  
  const permissionCategories = getPermissionsByCategory();
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Input 
            placeholder="New role name" 
            value={newRoleName} 
            onChange={(e) => setNewRoleName(e.target.value)}
          />
        </div>
        <Button onClick={handleAddRole} className="whitespace-nowrap">
          <Plus className="h-4 w-4 mr-2" /> Add Role
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 space-y-4">
          {roles.map(role => (
            <Card 
              key={role.id} 
              className={`cursor-pointer transition-all ${selectedRole?.id === role.id ? 'border-primary' : ''}`}
              onClick={() => setSelectedRole(role)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{role.name}</h3>
                      <Badge variant="outline">{role.userCount} users</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{role.description || 'No description'}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-3">
                  {role.permissions.length > 0 ? (
                    <>
                      {role.permissions.slice(0, 3).map(perm => {
                        const permObj = permissions.find(p => p.value === perm);
                        return (
                          <Badge key={perm} variant="secondary" className="text-xs">
                            {permObj?.label || perm}
                          </Badge>
                        );
                      })}
                      {role.permissions.length > 3 && (
                        <Badge variant="outline" className="text-xs">+{role.permissions.length - 3} more</Badge>
                      )}
                    </>
                  ) : (
                    <span className="text-xs text-muted-foreground">No permissions assigned</span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="lg:col-span-2">
          {selectedRole ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Role: {selectedRole.name}</span>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Role
                  </Button>
                </CardTitle>
                <CardDescription>Configure permissions for this role</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Input 
                    placeholder="Role description" 
                    value={selectedRole.description} 
                    onChange={(e) => {
                      setRoles(roles.map(role => 
                        role.id === selectedRole.id 
                          ? { ...role, description: e.target.value } 
                          : role
                      ));
                      setSelectedRole({ ...selectedRole, description: e.target.value });
                    }}
                  />
                  
                  {Object.entries(permissionCategories).map(([category, perms]) => (
                    <div key={category} className="space-y-2">
                      <h4 className="text-sm font-semibold flex items-center">
                        {category === 'Dashboard' && <UserCog className="h-4 w-4 mr-2" />}
                        {category === 'Security' && <KeyRound className="h-4 w-4 mr-2" />}
                        {category === 'System' && <Database className="h-4 w-4 mr-2" />}
                        {category}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {perms.map(permission => (
                          <div 
                            key={permission.value}
                            className={`flex items-center p-2 rounded cursor-pointer transition-colors
                              ${selectedRole.permissions.includes(permission.value) 
                                ? 'bg-primary/10 text-primary' 
                                : 'hover:bg-muted'}`}
                            onClick={() => togglePermission(selectedRole.id, permission.value)}
                          >
                            {selectedRole.permissions.includes(permission.value) && (
                              <Check className="h-4 w-4 mr-2 text-primary" />
                            )}
                            <span className={selectedRole.permissions.includes(permission.value) ? 'ml-6' : 'ml-6'}>
                              {permission.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 flex flex-col items-center justify-center text-center">
                <UserCog className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Select a Role</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Select a role from the list to view and edit its permissions
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoleManagement;
