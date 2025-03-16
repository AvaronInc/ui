
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, PenSquare, Trash2, Filter } from 'lucide-react';

interface UserGroup {
  id: string;
  name: string;
  description: string;
  userCount: number;
  departmentBased: boolean;
  customFilter?: string;
}

const UserGroupManagement: React.FC = () => {
  const groups: UserGroup[] = [
    { 
      id: '1', 
      name: 'IT Department', 
      description: 'All IT staff members', 
      userCount: 12, 
      departmentBased: true 
    },
    { 
      id: '2', 
      name: 'Security Team', 
      description: 'Security operations personnel', 
      userCount: 5, 
      departmentBased: true 
    },
    { 
      id: '3', 
      name: 'Network Engineers', 
      description: 'Staff responsible for network infrastructure', 
      userCount: 8, 
      departmentBased: false,
      customFilter: 'role = "Network Engineer"'
    },
    { 
      id: '4', 
      name: 'Emergency Access', 
      description: 'Users with elevated emergency privileges', 
      userCount: 3, 
      departmentBased: false,
      customFilter: 'has_emergency_access = true'
    },
    { 
      id: '5', 
      name: 'Compliance Officers', 
      description: 'Staff responsible for regulatory compliance', 
      userCount: 4, 
      departmentBased: true 
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          <Input placeholder="Search groups..." className="sm:max-w-xs" />
          <Button variant="outline" className="sm:w-auto w-full">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
        <Button className="sm:w-auto w-full">
          <Plus className="h-4 w-4 mr-2" />
          Create Group
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center">
            <Users className="h-5 w-5 mr-2" />
            User Groups
          </CardTitle>
          <CardDescription>
            Manage department-based and dynamic user groups
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Group Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-center">Users</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groups.map(group => (
                <TableRow key={group.id}>
                  <TableCell className="font-medium">{group.name}</TableCell>
                  <TableCell>
                    {group.departmentBased ? (
                      <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                        Department
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                        Dynamic
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="max-w-md">
                    {group.description}
                    {group.customFilter && (
                      <div className="text-xs text-muted-foreground mt-1">
                        Filter: <code className="bg-muted p-0.5 rounded">{group.customFilter}</code>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge>{group.userCount}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <PenSquare className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-md">Department-Based Groups</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Department groups automatically include all users assigned to a specific department. Access permissions are applied uniformly to all members.
            </p>
            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Department Group
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-md">Dynamic Filter Groups</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Dynamic groups use custom filters to automatically include users matching specific criteria. Membership updates in real-time as user attributes change.
            </p>
            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Dynamic Group
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserGroupManagement;
