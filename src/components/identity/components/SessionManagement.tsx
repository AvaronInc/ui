
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Clock, LogOut, Search, Globe, AlertTriangle, Activity, Smartphone } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Session {
  id: string;
  userId: string;
  username: string;
  fullName: string;
  ipAddress: string;
  deviceInfo: string;
  location: string;
  loginTime: string;
  lastActivity: string;
  riskScore: number;
}

const SessionManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [securitySettings, setSecuritySettings] = useState({
    maxSessions: true,
    geofencing: true,
    deviceRestrictions: false,
    forceReauthentication: true
  });
  
  // Mock sessions data
  const sessions: Session[] = [
    {
      id: 'session-1',
      userId: 'user-1',
      username: 'admin123',
      fullName: 'Admin User',
      ipAddress: '192.168.1.10',
      deviceInfo: 'Windows 11 / Chrome',
      location: 'San Francisco, CA',
      loginTime: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      lastActivity: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
      riskScore: 15
    },
    {
      id: 'session-2',
      userId: 'user-2',
      username: 'engineer1',
      fullName: 'John Engineer',
      ipAddress: '192.168.1.15',
      deviceInfo: 'MacOS / Safari',
      location: 'Chicago, IL',
      loginTime: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
      lastActivity: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
      riskScore: 42
    },
    {
      id: 'session-3',
      userId: 'user-4',
      username: 'securityadmin',
      fullName: 'Security Admin',
      ipAddress: '10.0.0.5',
      deviceInfo: 'Ubuntu / Firefox',
      location: 'New York, NY',
      loginTime: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
      lastActivity: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
      riskScore: 28
    },
    {
      id: 'session-4',
      userId: 'user-8',
      username: 'analyst1',
      fullName: 'Sarah Analyst',
      ipAddress: '192.168.2.25',
      deviceInfo: 'iOS / Mobile Safari',
      location: 'Unknown Location',
      loginTime: new Date(Date.now() - 14400000).toISOString(), // 4 hours ago
      lastActivity: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
      riskScore: 78
    }
  ];
  
  const filteredSessions = sessions.filter(session => 
    session.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.ipAddress.includes(searchQuery) ||
    session.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getRiskBadge = (score: number) => {
    if (score < 30) {
      return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Low</Badge>;
    } else if (score < 70) {
      return <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">Medium</Badge>;
    } else {
      return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">High</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search sessions..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="destructive">
          <LogOut className="h-4 w-4 mr-2" />
          Terminate All Sessions
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <Activity className="h-5 w-5 mr-2 text-primary" />
            Active User Sessions
          </h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Login Time</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Risk</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSessions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center h-24 text-muted-foreground">
                    No sessions found
                  </TableCell>
                </TableRow>
              ) : (
                filteredSessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell className="font-medium">{session.fullName}</TableCell>
                    <TableCell>{session.ipAddress}</TableCell>
                    <TableCell className="flex items-center">
                      <Globe className="h-4 w-4 mr-1 text-muted-foreground" />
                      {session.location}
                    </TableCell>
                    <TableCell className="flex items-center">
                      <Smartphone className="h-4 w-4 mr-1 text-muted-foreground" />
                      {session.deviceInfo}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                        {formatDistanceToNow(new Date(session.loginTime), { addSuffix: true })}
                      </div>
                    </TableCell>
                    <TableCell>
                      {formatDistanceToNow(new Date(session.lastActivity), { addSuffix: true })}
                    </TableCell>
                    <TableCell>
                      {getRiskBadge(session.riskScore)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="destructive" size="sm">
                        <LogOut className="h-4 w-4 mr-1" />
                        Terminate
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-primary" />
            Session Security Settings
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="max-sessions" className="text-base">Limit Concurrent Sessions</Label>
                  <p className="text-sm text-muted-foreground">Restrict users to a maximum of 3 active sessions</p>
                </div>
                <Switch 
                  id="max-sessions" 
                  checked={securitySettings.maxSessions}
                  onCheckedChange={(checked) => setSecuritySettings({...securitySettings, maxSessions: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="geofencing" className="text-base">Location-Based Restrictions</Label>
                  <p className="text-sm text-muted-foreground">Restrict login attempts to approved locations</p>
                </div>
                <Switch 
                  id="geofencing" 
                  checked={securitySettings.geofencing}
                  onCheckedChange={(checked) => setSecuritySettings({...securitySettings, geofencing: checked})}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="device-restrictions" className="text-base">Device Restrictions</Label>
                  <p className="text-sm text-muted-foreground">Require approved devices for access</p>
                </div>
                <Switch 
                  id="device-restrictions" 
                  checked={securitySettings.deviceRestrictions}
                  onCheckedChange={(checked) => setSecuritySettings({...securitySettings, deviceRestrictions: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="reauthentication" className="text-base">Force Re-authentication</Label>
                  <p className="text-sm text-muted-foreground">Re-authenticate after 12 hours of inactivity</p>
                </div>
                <Switch 
                  id="reauthentication" 
                  checked={securitySettings.forceReauthentication}
                  onCheckedChange={(checked) => setSecuritySettings({...securitySettings, forceReauthentication: checked})}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SessionManagement;
