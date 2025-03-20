
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Bell, Mail, MessageSquare, Phone, Save, Plus, Trash2 } from 'lucide-react';

export const NotificationSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-md font-medium flex items-center gap-2">
          <Bell className="h-4 w-4" />
          Alert Settings
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Critical Alerts</Label>
                <p className="text-xs text-muted-foreground">Notify on critical security events</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Warning Alerts</Label>
                <p className="text-xs text-muted-foreground">Notify on warning level events</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Info Alerts</Label>
                <p className="text-xs text-muted-foreground">Notify on informational events</p>
              </div>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>System Status</Label>
                <p className="text-xs text-muted-foreground">Notify on honeypot status changes</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-md font-medium flex items-center gap-2">
          <Mail className="h-4 w-4" />
          Notification Methods
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <Label>Email</Label>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <Label>SMS</Label>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <Label>Phone Call</Label>
              </div>
              <Switch />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Notification Recipients</Label>
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <Plus className="h-3 w-3" />
                Add Recipient
              </Button>
            </div>
            
            <div className="overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Alert Level</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Security Team</TableCell>
                    <TableCell>security@company.com</TableCell>
                    <TableCell>+1 555-123-4567</TableCell>
                    <TableCell>
                      <Badge>All Levels</Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="icon" variant="ghost">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>SOC Manager</TableCell>
                    <TableCell>soc-manager@company.com</TableCell>
                    <TableCell>+1 555-987-6543</TableCell>
                    <TableCell>
                      <Badge>Critical Only</Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="icon" variant="ghost">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Honeypot Admin</TableCell>
                    <TableCell>honeypot-admin@company.com</TableCell>
                    <TableCell>+1 555-456-7890</TableCell>
                    <TableCell>
                      <Badge>Critical + Warning</Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="icon" variant="ghost">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-md font-medium">Alert Throttling</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="throttle-period">Minimum Time Between Alerts</Label>
            <Select defaultValue="5">
              <SelectTrigger id="throttle-period">
                <SelectValue placeholder="Select time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">No throttling</SelectItem>
                <SelectItem value="1">1 minute</SelectItem>
                <SelectItem value="5">5 minutes</SelectItem>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="alert-batch">Group Similar Alerts</Label>
            <Select defaultValue="yes">
              <SelectTrigger id="alert-batch">
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes, group similar alerts</SelectItem>
                <SelectItem value="no">No, send individual alerts</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="pt-4 flex justify-end">
        <Button className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save Notification Settings
        </Button>
      </div>
    </div>
  );
};
