
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, UserFilter } from '@/types/identity';
import UserList from '@/components/identity/UserList';
import UserFilters from '@/components/identity/UserFilters';
import RoleManagement from '../components/RoleManagement';
import UserGroupManagement from '../components/UserGroupManagement';

interface RbacControlsTabProps {
  users: User[];
  filters: UserFilter;
  onFilterChange: (filters: UserFilter) => void;
  onSelectUser: (user: User) => void;
  selectedUserId?: string;
  isLoading: boolean;
  onRefresh: () => void;
  onOpenNewUserForm: () => void;
}

const RbacControlsTab: React.FC<RbacControlsTabProps> = ({
  users,
  filters,
  onFilterChange,
  onSelectUser,
  selectedUserId,
  isLoading,
  onRefresh,
  onOpenNewUserForm,
}) => {
  const [rbacTab, setRbacTab] = useState('users');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">User Management & RBAC Controls</h2>
      
      <Tabs defaultValue="users" value={rbacTab} onValueChange={setRbacTab} className="w-full">
        <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-3">
          <TabsTrigger value="users">User List</TabsTrigger>
          <TabsTrigger value="roles">Role Management</TabsTrigger>
          <TabsTrigger value="groups">User Groups</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="mt-6 space-y-6">
          <UserFilters 
            filters={filters} 
            onFilterChange={onFilterChange} 
            onOpenNewUserForm={onOpenNewUserForm}
            isLoading={isLoading}
            onRefresh={onRefresh}
          />
          
          <UserList 
            users={users} 
            onSelectUser={onSelectUser}
            selectedUserId={selectedUserId}
          />
        </TabsContent>
        
        <TabsContent value="roles" className="mt-6">
          <RoleManagement />
        </TabsContent>
        
        <TabsContent value="groups" className="mt-6">
          <UserGroupManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RbacControlsTab;
