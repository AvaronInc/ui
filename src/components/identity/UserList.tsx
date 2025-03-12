
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { User, UserStatus } from '@/types/identity';
import { formatDistanceToNow } from 'date-fns';

interface UserListProps {
  users: User[];
  onSelectUser: (user: User) => void;
  selectedUserId?: string;
}

const getStatusColor = (status: UserStatus) => {
  switch (status) {
    case 'Active': return 'bg-success text-success-foreground hover:bg-success/80';
    case 'Suspended': return 'bg-warning text-warning-foreground hover:bg-warning/80';
    case 'Revoked': return 'bg-destructive text-destructive-foreground hover:bg-destructive/80';
    default: return '';
  }
};

const UserList: React.FC<UserListProps> = ({ users, onSelectUser, selectedUserId }) => {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">Username</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Last Login</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                No users found
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow 
                key={user.id}
                className={`cursor-pointer hover:bg-muted/50 ${selectedUserId === user.id ? 'bg-muted' : ''}`}
                onClick={() => onSelectUser(user)}
              >
                <TableCell className="font-medium">{user.username}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-normal">
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(user.status)}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {formatDistanceToNow(new Date(user.lastLogin), { addSuffix: true })}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserList;
