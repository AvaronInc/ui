
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Clock, Calendar, Archive, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const BackupSchedulingSection: React.FC = () => {
  const [frequency, setFrequency] = useState('daily');
  const [hour, setHour] = useState('00');
  const [minute, setMinute] = useState('00');
  const [dayOfWeek, setDayOfWeek] = useState('1'); // Monday
  const [dayOfMonth, setDayOfMonth] = useState('1');
  const [keepLastN, setKeepLastN] = useState('10');
  const [deleteOlderThan, setDeleteOlderThan] = useState('30');
  const [isActive, setIsActive] = useState(true);
  const [isTesting, setIsTesting] = useState(false);

  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
  const daysOfWeek = [
    { value: '0', label: 'Sunday' },
    { value: '1', label: 'Monday' },
    { value: '2', label: 'Tuesday' },
    { value: '3', label: 'Wednesday' },
    { value: '4', label: 'Thursday' },
    { value: '5', label: 'Friday' },
    { value: '6', label: 'Saturday' },
  ];
  const daysOfMonth = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

  const handleTestBackup = async () => {
    setIsTesting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success("Backup connectivity test successful");
    } catch (error) {
      toast.error("Backup connectivity test failed");
      console.error(error);
    } finally {
      setIsTesting(false);
    }
  };

  const handleSaveSchedule = () => {
    toast.success("Backup schedule saved successfully");
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Backup Frequency */}
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Backup Frequency
            </CardTitle>
            <CardDescription>
              How often should backups run
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="backup-frequency">Backup Frequency</Label>
              <Select 
                value={frequency} 
                onValueChange={setFrequency}
              >
                <SelectTrigger id="backup-frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {frequency !== 'hourly' && (
              <div className="space-y-2">
                <Label>Time of Day (24h format)</Label>
                <div className="flex gap-2">
                  <Select value={hour} onValueChange={setHour}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Hour" />
                    </SelectTrigger>
                    <SelectContent>
                      {hours.map(h => (
                        <SelectItem key={h} value={h}>{h}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span className="flex items-center">:</span>
                  <Select value={minute} onValueChange={setMinute}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Minute" />
                    </SelectTrigger>
                    <SelectContent>
                      {minutes.map(m => (
                        <SelectItem key={m} value={m}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {frequency === 'weekly' && (
              <div className="space-y-2">
                <Label htmlFor="day-of-week">Day of Week</Label>
                <Select value={dayOfWeek} onValueChange={setDayOfWeek}>
                  <SelectTrigger id="day-of-week">
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {daysOfWeek.map(day => (
                      <SelectItem key={day.value} value={day.value}>
                        {day.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {frequency === 'monthly' && (
              <div className="space-y-2">
                <Label htmlFor="day-of-month">Day of Month</Label>
                <Select value={dayOfMonth} onValueChange={setDayOfMonth}>
                  <SelectTrigger id="day-of-month">
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {daysOfMonth.map(day => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="pt-2 flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="schedule-active">Enable scheduled backups</Label>
                <p className="text-xs text-muted-foreground">Turn backup scheduling on or off</p>
              </div>
              <Switch 
                id="schedule-active" 
                checked={isActive}
                onCheckedChange={setIsActive}
              />
            </div>
          </CardContent>
        </Card>

        {/* Retention Policy */}
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Archive className="h-5 w-5 text-primary" />
              Retention Policy
            </CardTitle>
            <CardDescription>
              How long to keep backup files
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="keep-last-n">Keep last X backups</Label>
              <div className="flex gap-2">
                <Input 
                  id="keep-last-n" 
                  type="number" 
                  min="1" 
                  value={keepLastN}
                  onChange={e => setKeepLastN(e.target.value)}
                  className="w-full"
                />
                <span className="flex items-center text-muted-foreground">backups</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Always keep at least this many recent backups
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="delete-older-than">Delete backups older than</Label>
              <div className="flex gap-2">
                <Input 
                  id="delete-older-than" 
                  type="number"
                  min="1" 
                  value={deleteOlderThan}
                  onChange={e => setDeleteOlderThan(e.target.value)}
                  className="w-full"
                />
                <span className="flex items-center text-muted-foreground">days</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Automatically delete backups older than this many days
              </p>
            </div>

            <Button 
              variant="outline" 
              onClick={handleTestBackup}
              className="w-full mt-4"
              disabled={isTesting}
            >
              {isTesting ? "Testing..." : "Test Backup Connectivity"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Schedule Summary */}
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Schedule Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="p-4 bg-muted rounded-md">
              {isActive ? (
                <div className="flex flex-col space-y-2">
                  <p>
                    <span className="font-medium">Frequency:</span> {frequency.charAt(0).toUpperCase() + frequency.slice(1)}
                  </p>
                  {frequency === 'hourly' && <p>Backup will run every hour</p>}
                  {frequency === 'daily' && <p>Backup will run daily at {hour}:{minute}</p>}
                  {frequency === 'weekly' && (
                    <p>Backup will run every {daysOfWeek.find(d => d.value === dayOfWeek)?.label} at {hour}:{minute}</p>
                  )}
                  {frequency === 'monthly' && (
                    <p>Backup will run on day {dayOfMonth} of each month at {hour}:{minute}</p>
                  )}
                  <p>
                    <span className="font-medium">Retention:</span> Keep last {keepLastN} backups and delete backups older than {deleteOlderThan} days
                  </p>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                  <span>Scheduled backups are currently disabled</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveSchedule} className="w-full">
            Save Schedule Configuration
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BackupSchedulingSection;
