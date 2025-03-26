
import React, { useState } from 'react';
import { Zone, ZoneUser, ZoneAuditEvent } from '../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format, formatDistanceToNow } from 'date-fns';
import { Check, Clock, FileDigit, Fingerprint, Key, Lock, RefreshCw, Shield, ShieldAlert, User, UserCheck, UserX } from 'lucide-react';
import { mockZoneUsers, mockZoneAuditEvents } from '../mockData';

interface ZoneVaultIDProps {
  zone: Zone;
}

const ZoneVaultID: React.FC<ZoneVaultIDProps> = ({ zone }) => {
  const { toast } = useToast();
  const [users, setUsers] = useState<ZoneUser[]>(mockZoneUsers[zone.id] || []);
  const [auditEvents, setAuditEvents] = useState<ZoneAuditEvent[]>(mockZoneAuditEvents[zone.id] || []);
  const [requireVaultID, setRequireVaultID] = useState<boolean>(zone.vaultIDSettings?.requireVaultID || false);
  const [enforceBiometricMFA, setEnforceBiometricMFA] = useState<boolean>(zone.vaultIDSettings?.enforceBiometricMFA || false);
  const [selectedUser, setSelectedUser] = useState<ZoneUser | null>(null);
  const [issueCertificateOpen, setIssueCertificateOpen] = useState(false);
  const [editRoleOpen, setEditRoleOpen] = useState(false);
  const [newRole, setNewRole] = useState<ZoneUser['role']>('User');
  
  const handleRequireVaultIDChange = (checked: boolean) => {
    setRequireVaultID(checked);
    toast({
      title: checked ? "VaultID Required" : "VaultID Optional",
      description: checked 
        ? "All users must now use VaultID for zone access" 
        : "VaultID requirement has been disabled",
      duration: 3000,
    });
    
    // Add audit event
    const newEvent: ZoneAuditEvent = {
      id: `event-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userId: 'user-1', // Assuming current user
      userEmail: 'alex.mercer@avaron.com',
      action: checked ? 'VaultID Requirement Enabled' : 'VaultID Requirement Disabled',
      details: checked 
        ? 'Enabled VaultID requirement for zone access' 
        : 'Disabled VaultID requirement for zone access',
      ipAddress: '192.168.1.45'
    };
    
    setAuditEvents([newEvent, ...auditEvents]);
  };
  
  const handleEnforceBiometricMFAChange = (checked: boolean) => {
    setEnforceBiometricMFA(checked);
    toast({
      title: checked ? "Biometric MFA Enforced" : "Biometric MFA Optional",
      description: checked 
        ? "All users must now use biometric MFA for zone access" 
        : "Biometric MFA requirement has been disabled",
      duration: 3000,
    });
    
    // Add audit event
    const newEvent: ZoneAuditEvent = {
      id: `event-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userId: 'user-1', // Assuming current user
      userEmail: 'alex.mercer@avaron.com',
      action: checked ? 'Enforced Biometric MFA' : 'Disabled Biometric MFA',
      details: checked 
        ? 'Enabled biometric MFA requirement for all zone users' 
        : 'Disabled biometric MFA requirement for zone users',
      ipAddress: '192.168.1.45'
    };
    
    setAuditEvents([newEvent, ...auditEvents]);
  };
  
  const handleIssueCertificate = () => {
    if (!selectedUser) return;
    
    const now = new Date();
    const expiry = new Date();
    expiry.setFullYear(expiry.getFullYear() + 1);
    
    const updatedUsers = users.map(user => {
      if (user.id === selectedUser.id) {
        return {
          ...user,
          certificateIssued: now.toISOString(),
          certificateExpiry: expiry.toISOString()
        };
      }
      return user;
    });
    
    setUsers(updatedUsers);
    setIssueCertificateOpen(false);
    
    toast({
      title: "Certificate Issued",
      description: `KyberSafe™ certificate issued to ${selectedUser.fullName}`,
      duration: 3000,
    });
    
    // Add audit event
    const newEvent: ZoneAuditEvent = {
      id: `event-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userId: 'user-1', // Assuming current user
      userEmail: 'alex.mercer@avaron.com',
      action: 'Certificate Issued',
      details: `Issued new KyberSafe™ certificate to ${selectedUser.fullName}`,
      ipAddress: '192.168.1.45'
    };
    
    setAuditEvents([newEvent, ...auditEvents]);
  };
  
  const handleRevokeCertificate = (user: ZoneUser) => {
    const updatedUsers = users.map(u => {
      if (u.id === user.id) {
        return {
          ...u,
          certificateIssued: null,
          certificateExpiry: null
        };
      }
      return u;
    });
    
    setUsers(updatedUsers);
    
    toast({
      title: "Certificate Revoked",
      description: `KyberSafe™ certificate revoked from ${user.fullName}`,
      duration: 3000,
    });
    
    // Add audit event
    const newEvent: ZoneAuditEvent = {
      id: `event-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userId: 'user-1', // Assuming current user
      userEmail: 'alex.mercer@avaron.com',
      action: 'Certificate Revoked',
      details: `Revoked KyberSafe™ certificate from ${user.fullName}`,
      ipAddress: '192.168.1.45'
    };
    
    setAuditEvents([newEvent, ...auditEvents]);
  };
  
  const handleChangeRole = () => {
    if (!selectedUser || !newRole) return;
    
    const updatedUsers = users.map(user => {
      if (user.id === selectedUser.id) {
        return {
          ...user,
          role: newRole
        };
      }
      return user;
    });
    
    setUsers(updatedUsers);
    setEditRoleOpen(false);
    
    toast({
      title: "Role Updated",
      description: `${selectedUser.fullName}'s role changed to ${newRole}`,
      duration: 3000,
    });
    
    // Add audit event
    const newEvent: ZoneAuditEvent = {
      id: `event-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userId: 'user-1', // Assuming current user
      userEmail: 'alex.mercer@avaron.com',
      action: 'User Role Changed',
      details: `Changed user "${selectedUser.fullName}" role to ${newRole}`,
      ipAddress: '192.168.1.45'
    };
    
    setAuditEvents([newEvent, ...auditEvents]);
  };
  
  const handleToggleUserStatus = (user: ZoneUser) => {
    const newStatus = user.status === 'active' ? 'suspended' : 'active';
    
    const updatedUsers = users.map(u => {
      if (u.id === user.id) {
        return {
          ...u,
          status: newStatus
        };
      }
      return u;
    });
    
    setUsers(updatedUsers);
    
    toast({
      title: newStatus === 'active' ? "User Activated" : "User Suspended",
      description: `${user.fullName} has been ${newStatus === 'active' ? 'activated' : 'suspended'}`,
      duration: 3000,
    });
    
    // Add audit event
    const newEvent: ZoneAuditEvent = {
      id: `event-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userId: 'user-1', // Assuming current user
      userEmail: 'alex.mercer@avaron.com',
      action: newStatus === 'active' ? 'User Activated' : 'User Suspended',
      details: `${newStatus === 'active' ? 'Activated' : 'Suspended'} user "${user.fullName}"`,
      ipAddress: '192.168.1.45'
    };
    
    setAuditEvents([newEvent, ...auditEvents]);
  };
  
  const handleTriggerRevalidation = () => {
    toast({
      title: "Identity Revalidation Triggered",
      description: "All users will be required to revalidate their identity",
      duration: 3000,
    });
    
    // Add audit event
    const newEvent: ZoneAuditEvent = {
      id: `event-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userId: 'user-1', // Assuming current user
      userEmail: 'alex.mercer@avaron.com',
      action: 'Identity Revalidation',
      details: 'Triggered identity revalidation for all zone users',
      ipAddress: '192.168.1.45'
    };
    
    setAuditEvents([newEvent, ...auditEvents]);
  };
  
  const getMFAStatusBadge = (status: ZoneUser['mfaStatus']) => {
    switch (status) {
      case 'enforced':
        return <Badge className="bg-green-600">Enforced</Badge>;
      case 'enabled':
        return <Badge variant="outline" className="text-green-600 border-green-600">Enabled</Badge>;
      case 'disabled':
        return <Badge variant="outline" className="text-red-600 border-red-600">Disabled</Badge>;
      default:
        return null;
    }
  };
  
  const getUserStatusBadge = (status: ZoneUser['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-600">Active</Badge>;
      case 'suspended':
        return <Badge className="bg-red-600">Suspended</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-600">Pending</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="col-span-1 lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    VaultID Identity & Access Management
                  </CardTitle>
                  <CardDescription>
                    Manage user identity, access controls, and security credentials for this zone
                  </CardDescription>
                </div>
                <Button onClick={handleTriggerRevalidation} className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Trigger Revalidation
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center justify-between p-4 border rounded-lg bg-card">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Lock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Require VaultID for Access</h3>
                      <p className="text-sm text-muted-foreground">
                        Users must authenticate with VaultID to access this zone
                      </p>
                    </div>
                  </div>
                  <Switch checked={requireVaultID} onCheckedChange={handleRequireVaultIDChange} />
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg bg-card">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Fingerprint className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Enforce Biometric MFA</h3>
                      <p className="text-sm text-muted-foreground">
                        Require biometric verification for all users
                      </p>
                    </div>
                  </div>
                  <Switch checked={enforceBiometricMFA} onCheckedChange={handleEnforceBiometricMFAChange} />
                </div>
              </div>
              
              <Tabs defaultValue="users" className="w-full">
                <TabsList className="grid grid-cols-2 w-[400px]">
                  <TabsTrigger value="users" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Zone Users
                  </TabsTrigger>
                  <TabsTrigger value="audit" className="flex items-center gap-2">
                    <FileDigit className="h-4 w-4" />
                    Audit Log
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="users" className="mt-4">
                  <div className="border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Last Login</TableHead>
                          <TableHead>MFA Status</TableHead>
                          <TableHead>Biometric</TableHead>
                          <TableHead>Certificate</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                              No users assigned to this zone
                            </TableCell>
                          </TableRow>
                        ) : (
                          users.map(user => (
                            <TableRow key={user.id}>
                              <TableCell>
                                <div className="font-medium">{user.fullName}</div>
                                <div className="text-sm text-muted-foreground">{user.email}</div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">{user.role}</Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1 text-sm">
                                  <Clock className="h-3 w-3 text-muted-foreground" />
                                  {formatDistanceToNow(new Date(user.lastLogin), { addSuffix: true })}
                                </div>
                              </TableCell>
                              <TableCell>{getMFAStatusBadge(user.mfaStatus)}</TableCell>
                              <TableCell>
                                {user.biometricEnrolled ? (
                                  <div className="flex items-center gap-1 text-green-600">
                                    <Check className="h-4 w-4" />
                                    <span>Enrolled</span>
                                  </div>
                                ) : (
                                  <span className="text-muted-foreground">Not enrolled</span>
                                )}
                              </TableCell>
                              <TableCell>
                                {user.certificateIssued ? (
                                  <div className="text-sm">
                                    <div className="text-green-600 flex items-center gap-1">
                                      <Check className="h-3 w-3" />
                                      <span>Issued</span>
                                    </div>
                                    <div className="text-muted-foreground">
                                      Expires: {format(new Date(user.certificateExpiry!), 'MMM d, yyyy')}
                                    </div>
                                  </div>
                                ) : (
                                  <span className="text-muted-foreground">Not issued</span>
                                )}
                              </TableCell>
                              <TableCell>{getUserStatusBadge(user.status)}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Dialog open={editRoleOpen && selectedUser?.id === user.id} onOpenChange={(open) => {
                                    setEditRoleOpen(open);
                                    if (open) setSelectedUser(user);
                                    if (open) setNewRole(user.role);
                                  }}>
                                    <DialogTrigger asChild>
                                      <Button variant="outline" size="sm">
                                        <UserCheck className="h-3 w-3 mr-1" />
                                        Role
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>Modify User Role</DialogTitle>
                                        <DialogDescription>
                                          Update role and permissions for {selectedUser?.fullName}
                                        </DialogDescription>
                                      </DialogHeader>
                                      <div className="py-4">
                                        <Label htmlFor="role">Select new role:</Label>
                                        <Select
                                          value={newRole}
                                          onValueChange={(value: ZoneUser['role']) => setNewRole(value)}
                                        >
                                          <SelectTrigger id="role" className="mt-1">
                                            <SelectValue placeholder="Select role" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="Owner">Owner</SelectItem>
                                            <SelectItem value="Admin">Admin</SelectItem>
                                            <SelectItem value="Engineer">Engineer</SelectItem>
                                            <SelectItem value="User">User</SelectItem>
                                            <SelectItem value="Auditor">Auditor</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <DialogFooter>
                                        <Button variant="outline" onClick={() => setEditRoleOpen(false)}>Cancel</Button>
                                        <Button onClick={handleChangeRole}>Update Role</Button>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>
                                  
                                  {user.certificateIssued ? (
                                    <Button 
                                      variant="outline" 
                                      size="sm" 
                                      className="text-red-600 border-red-600 hover:bg-red-50"
                                      onClick={() => handleRevokeCertificate(user)}
                                    >
                                      <Key className="h-3 w-3 mr-1" />
                                      Revoke
                                    </Button>
                                  ) : (
                                    <Dialog open={issueCertificateOpen && selectedUser?.id === user.id} onOpenChange={(open) => {
                                      setIssueCertificateOpen(open);
                                      if (open) setSelectedUser(user);
                                    }}>
                                      <DialogTrigger asChild>
                                        <Button variant="outline" size="sm">
                                          <Key className="h-3 w-3 mr-1" />
                                          Issue
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent>
                                        <DialogHeader>
                                          <DialogTitle>Issue KyberSafe™ Certificate</DialogTitle>
                                          <DialogDescription>
                                            Issue a secure certificate for {user.fullName}
                                          </DialogDescription>
                                        </DialogHeader>
                                        <div className="py-4">
                                          <div className="space-y-4">
                                            <div>
                                              <Label>Certificate Type</Label>
                                              <Select defaultValue="standard">
                                                <SelectTrigger>
                                                  <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                  <SelectItem value="standard">Standard (1 year)</SelectItem>
                                                  <SelectItem value="extended">Extended (2 years)</SelectItem>
                                                  <SelectItem value="quantum">Quantum-Resistant (1 year)</SelectItem>
                                                </SelectContent>
                                              </Select>
                                            </div>
                                            <div>
                                              <Label>Identity Verification Method</Label>
                                              <Select defaultValue="multi">
                                                <SelectTrigger>
                                                  <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                  <SelectItem value="multi">Multi-factor (Recommended)</SelectItem>
                                                  <SelectItem value="biometric">Biometric Only</SelectItem>
                                                  <SelectItem value="hardware">Hardware Token Only</SelectItem>
                                                </SelectContent>
                                              </Select>
                                            </div>
                                          </div>
                                        </div>
                                        <DialogFooter>
                                          <Button variant="outline" onClick={() => setIssueCertificateOpen(false)}>Cancel</Button>
                                          <Button onClick={handleIssueCertificate}>Issue Certificate</Button>
                                        </DialogFooter>
                                      </DialogContent>
                                    </Dialog>
                                  )}
                                  
                                  <Button 
                                    variant={user.status === 'active' ? 'destructive' : 'outline'} 
                                    size="sm"
                                    onClick={() => handleToggleUserStatus(user)}
                                  >
                                    {user.status === 'active' ? (
                                      <>
                                        <UserX className="h-3 w-3 mr-1" />
                                        Suspend
                                      </>
                                    ) : (
                                      <>
                                        <UserCheck className="h-3 w-3 mr-1" />
                                        Activate
                                      </>
                                    )}
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                
                <TabsContent value="audit" className="mt-4">
                  <div className="border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Timestamp</TableHead>
                          <TableHead>User</TableHead>
                          <TableHead>Action</TableHead>
                          <TableHead>Details</TableHead>
                          <TableHead>IP Address</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {auditEvents.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                              No audit events found
                            </TableCell>
                          </TableRow>
                        ) : (
                          auditEvents.map(event => (
                            <TableRow key={event.id}>
                              <TableCell>
                                <div className="text-sm text-muted-foreground">
                                  {format(new Date(event.timestamp), 'MMM d, yyyy')}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {format(new Date(event.timestamp), 'h:mm a')}
                                </div>
                              </TableCell>
                              <TableCell>{event.userEmail}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="font-semibold">
                                  {event.action}
                                </Badge>
                              </TableCell>
                              <TableCell>{event.details}</TableCell>
                              <TableCell className="text-sm text-muted-foreground">{event.ipAddress}</TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div className="col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-primary" />
                Security Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg bg-card space-y-4">
                <h3 className="font-semibold">VaultID Configuration</h3>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">VaultID Required:</span>
                    <Badge variant={requireVaultID ? "default" : "outline"} className={requireVaultID ? "bg-green-600" : ""}>
                      {requireVaultID ? "Yes" : "No"}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Biometric MFA:</span>
                    <Badge variant={enforceBiometricMFA ? "default" : "outline"} className={enforceBiometricMFA ? "bg-green-600" : ""}>
                      {enforceBiometricMFA ? "Enforced" : "Optional"}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Revalidation Period:</span>
                    <span className="text-sm font-medium">{zone.vaultIDSettings?.revalidationPeriod || 30} days</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Last Config Update:</span>
                    <span className="text-sm text-muted-foreground">
                      {zone.vaultIDSettings?.lastConfigUpdate 
                        ? format(new Date(zone.vaultIDSettings.lastConfigUpdate), 'MMM d, yyyy')
                        : 'Never'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg bg-card space-y-4">
                <h3 className="font-semibold">User Summary</h3>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Users:</span>
                    <span className="font-medium">{users.length}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">With Certificates:</span>
                    <span className="font-medium">
                      {users.filter(u => u.certificateIssued).length} / {users.length}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">With Biometrics:</span>
                    <span className="font-medium">
                      {users.filter(u => u.biometricEnrolled).length} / {users.length}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">MFA Enabled:</span>
                    <span className="font-medium">
                      {users.filter(u => u.mfaStatus !== 'disabled').length} / {users.length}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800 space-y-2">
                <h3 className="font-semibold flex items-center gap-2 text-yellow-800 dark:text-yellow-400">
                  <ShieldAlert className="h-4 w-4" />
                  Security Recommendations
                </h3>
                <ul className="space-y-2 text-sm text-yellow-800 dark:text-yellow-400">
                  {!enforceBiometricMFA && (
                    <li className="flex items-start gap-2">
                      <div className="mt-0.5">•</div>
                      <div>Enable biometric MFA for all users</div>
                    </li>
                  )}
                  {users.some(u => u.mfaStatus === 'disabled') && (
                    <li className="flex items-start gap-2">
                      <div className="mt-0.5">•</div>
                      <div>Enforce MFA for all users</div>
                    </li>
                  )}
                  {users.some(u => !u.certificateIssued) && (
                    <li className="flex items-start gap-2">
                      <div className="mt-0.5">•</div>
                      <div>Issue certificates to all users</div>
                    </li>
                  )}
                  {!requireVaultID && (
                    <li className="flex items-start gap-2">
                      <div className="mt-0.5">•</div>
                      <div>Require VaultID for zone access</div>
                    </li>
                  )}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ZoneVaultID;
