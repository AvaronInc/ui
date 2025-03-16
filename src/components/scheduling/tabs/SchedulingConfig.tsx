
import React, { useState } from 'react';
import { useScheduling } from '@/hooks/use-scheduling';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Save, 
  Globe, 
  Clock, 
  Bell, 
  Users, 
  AlertTriangle, 
  Check, 
  Lock 
} from 'lucide-react';
import { toast } from 'sonner';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SchedulingSettings } from '@/types/scheduling';

interface SchedulingConfigProps {
  schedulingData: ReturnType<typeof useScheduling>;
}

const SchedulingConfig: React.FC<SchedulingConfigProps> = ({ schedulingData }) => {
  const { settings, updateSettings } = schedulingData;
  const [formSettings, setFormSettings] = useState<SchedulingSettings>(settings);
  const [isModified, setIsModified] = useState(false);
  
  const handleInputChange = (field: keyof SchedulingSettings, value: any) => {
    setFormSettings(prev => ({
      ...prev,
      [field]: value
    }));
    setIsModified(true);
  };
  
  const handleReminderChange = (time: number, isChecked: boolean) => {
    setFormSettings(prev => ({
      ...prev,
      reminderTimes: isChecked 
        ? [...prev.reminderTimes, time].sort((a, b) => a - b)
        : prev.reminderTimes.filter(t => t !== time)
    }));
    setIsModified(true);
  };
  
  const handleSaveSettings = () => {
    updateSettings(formSettings);
    setIsModified(false);
    toast.success('Scheduling settings updated successfully');
  };
  
  const handleResetSettings = () => {
    setFormSettings(settings);
    setIsModified(false);
    toast.info('Settings reset to current values');
  };
  
  return (
    <div className="p-6 h-full overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Scheduling Configuration</h2>
          <p className="text-muted-foreground">
            Manage global scheduling settings and preferences
          </p>
        </div>
        <div className="flex space-x-2">
          {isModified && (
            <Button variant="outline" onClick={handleResetSettings}>
              Reset
            </Button>
          )}
          <Button onClick={handleSaveSettings} disabled={!isModified}>
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* General Settings */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium flex items-center">
                <Settings className="mr-2 h-5 w-5 text-blue-500" />
                General Settings
              </CardTitle>
              <CardDescription>
                Configure basic scheduling system settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Scheduling System</Label>
                  <p className="text-sm text-muted-foreground">
                    Turn the scheduling feature on or off
                  </p>
                </div>
                <Switch 
                  checked={formSettings.enabled} 
                  onCheckedChange={(checked) => handleInputChange('enabled', checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Allow External Scheduling</Label>
                  <p className="text-sm text-muted-foreground">
                    Let people outside your organization schedule meetings
                  </p>
                </div>
                <Switch 
                  checked={formSettings.allowExternalScheduling} 
                  onCheckedChange={(checked) => handleInputChange('allowExternalScheduling', checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Require Approval</Label>
                  <p className="text-sm text-muted-foreground">
                    Require manual approval for scheduled events
                  </p>
                </div>
                <Switch 
                  checked={formSettings.requireApproval} 
                  onCheckedChange={(checked) => handleInputChange('requireApproval', checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-Detect Availability</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically detect team members' availability based on their calendars
                  </p>
                </div>
                <Switch 
                  checked={formSettings.autoDetectAvailability} 
                  onCheckedChange={(checked) => handleInputChange('autoDetectAvailability', checked)}
                />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="customDomain">Custom Domain</Label>
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                  <Input 
                    id="customDomain" 
                    placeholder="e.g., meet.company.com" 
                    value={formSettings.customDomain || ''} 
                    onChange={(e) => handleInputChange('customDomain', e.target.value)} 
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Custom domain to use for all scheduling links
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Meeting Settings */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium flex items-center">
                <Clock className="mr-2 h-5 w-5 text-purple-500" />
                Meeting Settings
              </CardTitle>
              <CardDescription>
                Configure default meeting durations and buffer times
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="defaultMeetingDuration">Default Meeting Duration (minutes)</Label>
                <Select 
                  value={formSettings.defaultMeetingDuration.toString()} 
                  onValueChange={(value) => handleInputChange('defaultMeetingDuration', parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="90">90 minutes</SelectItem>
                    <SelectItem value="120">120 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="defaultBufferTime">Default Buffer Time (minutes)</Label>
                <Select 
                  value={formSettings.defaultBufferTime.toString()} 
                  onValueChange={(value) => handleInputChange('defaultBufferTime', parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select buffer time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">No buffer</SelectItem>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="10">10 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Time between meetings to allow for preparation or travel
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Notification Settings */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium flex items-center">
                <Bell className="mr-2 h-5 w-5 text-amber-500" />
                Notification Settings
              </CardTitle>
              <CardDescription>
                Configure reminders and notifications for scheduled events
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-Send Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically send reminders for upcoming events
                  </p>
                </div>
                <Switch 
                  checked={formSettings.autoSendReminders} 
                  onCheckedChange={(checked) => handleInputChange('autoSendReminders', checked)}
                />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label>Reminder Times</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  When to send reminders before events
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {[15, 30, 60, 120, 24 * 60, 48 * 60].map(time => (
                    <Badge 
                      key={time} 
                      variant={formSettings.reminderTimes.includes(time) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleReminderChange(time, !formSettings.reminderTimes.includes(time))}
                    >
                      {time < 60 ? `${time} minutes` : `${time / 60} hours`}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          {/* Status */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Scheduling System</span>
                  {formSettings.enabled ? (
                    <Badge className="bg-green-500">
                      <Check className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="outline">Disabled</Badge>
                  )}
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">External Access</span>
                  {formSettings.allowExternalScheduling ? (
                    <Badge>
                      <Globe className="h-3 w-3 mr-1" />
                      Enabled
                    </Badge>
                  ) : (
                    <Badge variant="secondary">
                      <Lock className="h-3 w-3 mr-1" />
                      Restricted
                    </Badge>
                  )}
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Approval Workflow</span>
                  {formSettings.requireApproval ? (
                    <Badge variant="secondary">Required</Badge>
                  ) : (
                    <Badge variant="outline">Not Required</Badge>
                  )}
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Reminders</span>
                  {formSettings.autoSendReminders ? (
                    <Badge className="bg-blue-500">
                      <Bell className="h-3 w-3 mr-1" />
                      Automatic
                    </Badge>
                  ) : (
                    <Badge variant="outline">Manual</Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Access Control */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium flex items-center">
                <Users className="mr-2 h-5 w-5 text-indigo-500" />
                Access Control
              </CardTitle>
              <CardDescription>
                Manage who can use the scheduling system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-md">
                <h4 className="font-medium mb-2">Role-Based Permissions</h4>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <span className="text-sm">Administrators</span>
                    <Badge>Full Access</Badge>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-sm">IT Managers</span>
                    <Badge>Full Access</Badge>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-sm">IT Staff</span>
                    <Badge variant="secondary">Read & Create</Badge>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-sm">Standard Users</span>
                    <Badge variant="outline">View Only</Badge>
                  </li>
                </ul>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Configure detailed permissions in the <a href="#" className="text-blue-500 hover:underline">User Management</a> section.
              </p>
            </CardContent>
          </Card>
          
          {/* Important Notices */}
          <Card className="border-amber-200 dark:border-amber-900">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium flex items-center text-amber-600 dark:text-amber-400">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Important Notices
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900 rounded-md">
                <h4 className="font-medium text-amber-800 dark:text-amber-300">
                  Downtime Scheduled
                </h4>
                <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                  The scheduling system will be unavailable for maintenance on Sunday, July 10th from 2:00 AM to 4:00 AM ET.
                </p>
              </div>
              
              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900 rounded-md">
                <h4 className="font-medium text-blue-800 dark:text-blue-300">
                  Integration Notice
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                  Calendar synchronization with Exchange is currently experiencing delays of up to 15 minutes.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SchedulingConfig;
