
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Home, Users, Shield, ClipboardList, KeyRound, UserCog } from 'lucide-react';
import { User, UserFilter } from '@/types/identity';
import UserList from '@/components/identity/UserList';
import UserFilters from '@/components/identity/UserFilters';
import UserDetailPanel from '@/components/identity/UserDetailPanel';
import NewUserForm from '@/components/identity/NewUserForm';
import { useToast } from '@/hooks/use-toast';
import PageTransition from '@/components/transitions/PageTransition';
import OverviewTab from '@/components/identity/tabs/OverviewTab';
import RbacControlsTab from '@/components/identity/tabs/RbacControlsTab';
import AuthenticationTab from '@/components/identity/tabs/AuthenticationTab';
import AccessLogsTab from '@/components/identity/tabs/AccessLogsTab';
import ApprovalWorkflowsTab from '@/components/identity/tabs/ApprovalWorkflowsTab';

// Sample mock data
const MOCK_USERS: User[] = [
  {
    id: 'user-1',
    username: 'admin123',
    fullName: 'Admin User',
    email: 'admin@example.com',
    role: 'Admin',
    status: 'Active',
    lastLogin: new Date().toISOString(),
    mfaEnabled: true,
    biometricsEnrolled: true,
    kyberCertHash: '4a51cde8f3ce7c290fd77670891583f4',
    activities: [
      {
        action: 'Login from new device',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        ipAddress: '192.168.1.10',
        deviceInfo: 'Chrome/Windows',
      },
      {
        action: 'Password changed',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        ipAddress: '192.168.1.10',
      },
    ],
    createdAt: new Date(Date.now() - 7776000000).toISOString(), // 90 days ago
  },
  {
    id: 'user-2',
    username: 'engineer1',
    fullName: 'John Engineer',
    email: 'john@example.com',
    role: 'Engineer',
    status: 'Active',
    lastLogin: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    mfaEnabled: true,
    biometricsEnrolled: false,
    kyberCertHash: '2b38ade4b5fa9c170fd77e4089158321',
    activities: [
      {
        action: 'Login successful',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        ipAddress: '192.168.1.15',
      },
    ],
    createdAt: new Date(Date.now() - 15552000000).toISOString(), // 180 days ago
  },
  {
    id: 'user-3',
    username: 'regularuser',
    fullName: 'Jane User',
    email: 'jane@example.com',
    role: 'User',
    status: 'Suspended',
    lastLogin: new Date(Date.now() - 604800000).toISOString(), // 7 days ago
    mfaEnabled: false,
    biometricsEnrolled: false,
    activities: [
      {
        action: 'Failed login attempt',
        timestamp: new Date(Date.now() - 604800000).toISOString(),
        ipAddress: '192.168.1.20',
      },
      {
        action: 'Account suspended due to suspicious activity',
        timestamp: new Date(Date.now() - 518400000).toISOString(), // 6 days ago
      },
    ],
    createdAt: new Date(Date.now() - 31104000000).toISOString(), // 360 days ago
  },
  {
    id: 'user-4',
    username: 'securityadmin',
    fullName: 'Security Admin',
    email: 'security@example.com',
    role: 'Admin',
    status: 'Active',
    lastLogin: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    mfaEnabled: true,
    biometricsEnrolled: true,
    kyberCertHash: '3c49ade8f5ea7b170fd33e408915835c',
    activities: [
      {
        action: 'User permissions updated',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        ipAddress: '192.168.1.5',
      },
    ],
    createdAt: new Date(Date.now() - 63072000000).toISOString(), // 2 years ago
  },
  {
    id: 'user-5',
    username: 'revokeduser',
    fullName: 'Revoked User',
    email: 'revoked@example.com',
    role: 'User',
    status: 'Revoked',
    lastLogin: new Date(Date.now() - 2592000000).toISOString(), // 30 days ago
    mfaEnabled: false,
    biometricsEnrolled: false,
    activities: [
      {
        action: 'Account access revoked',
        timestamp: new Date(Date.now() - 2505600000).toISOString(), // 29 days ago
        ipAddress: '192.168.1.100',
      },
    ],
    createdAt: new Date(Date.now() - 15552000000).toISOString(), // 180 days ago
  },
];

const Identity = () => {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);
  const [isNewUserFormOpen, setIsNewUserFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<UserFilter>({
    role: 'all',
    status: 'all',
    searchQuery: '',
  });
  const [activeTab, setActiveTab] = useState('overview');

  const { toast } = useToast();

  const filteredUsers = users.filter((user) => {
    // Apply role filter
    if (filters.role && filters.role !== 'all' && user.role !== filters.role) {
      return false;
    }
    
    // Apply status filter
    if (filters.status && filters.status !== 'all' && user.status !== filters.status) {
      return false;
    }
    
    // Apply search
    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const query = filters.searchQuery.toLowerCase();
      return (
        user.username.toLowerCase().includes(query) ||
        user.fullName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setIsDetailPanelOpen(true);
  };

  const handleCreateUser = (user: User) => {
    setUsers([user, ...users]);
    toast({
      title: 'User Created',
      description: `${user.fullName} has been added to the system.`,
    });
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUsers(users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ));
    setSelectedUser(updatedUser);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: 'Data Refreshed',
        description: 'User data has been updated.',
      });
    }, 1200);
  };

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="container py-6 space-y-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <Home className="h-4 w-4 mr-1" />
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Identity Management</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start border-b pb-0">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="rbac" className="flex items-center gap-2">
                <UserCog className="h-4 w-4" />
                <span>User & RBAC</span>
              </TabsTrigger>
              <TabsTrigger value="authentication" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Authentication</span>
              </TabsTrigger>
              <TabsTrigger value="logs" className="flex items-center gap-2">
                <ClipboardList className="h-4 w-4" />
                <span>Access Logs</span>
              </TabsTrigger>
              <TabsTrigger value="workflows" className="flex items-center gap-2">
                <KeyRound className="h-4 w-4" />
                <span>Approval Workflows</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <OverviewTab 
                users={users}
                onSelectUser={handleSelectUser}
                onRefresh={handleRefresh}
                isLoading={isLoading}
                onOpenNewUserForm={() => setIsNewUserFormOpen(true)}
              />
            </TabsContent>
            
            <TabsContent value="rbac" className="mt-6">
              <RbacControlsTab 
                users={filteredUsers}
                filters={filters}
                onFilterChange={setFilters}
                onSelectUser={handleSelectUser}
                selectedUserId={selectedUser?.id}
                isLoading={isLoading}
                onRefresh={handleRefresh}
                onOpenNewUserForm={() => setIsNewUserFormOpen(true)}
              />
            </TabsContent>
            
            <TabsContent value="authentication" className="mt-6">
              <AuthenticationTab />
            </TabsContent>
            
            <TabsContent value="logs" className="mt-6">
              <AccessLogsTab />
            </TabsContent>
            
            <TabsContent value="workflows" className="mt-6">
              <ApprovalWorkflowsTab />
            </TabsContent>
          </Tabs>
          
          <UserDetailPanel 
            user={selectedUser} 
            open={isDetailPanelOpen} 
            onOpenChange={setIsDetailPanelOpen}
            onUserUpdated={handleUpdateUser}
          />
          
          <NewUserForm 
            open={isNewUserFormOpen} 
            onOpenChange={setIsNewUserFormOpen}
            onUserCreated={handleCreateUser}
          />
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default Identity;
