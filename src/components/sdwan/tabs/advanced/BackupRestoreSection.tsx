
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Settings2 } from 'lucide-react';

const BackupRestoreSection = () => {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Settings2 className="mr-2 h-5 w-5" />
          Configuration Backup & Restore
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Scheduled Backups</Label>
              <Select defaultValue="daily">
                <SelectTrigger>
                  <SelectValue placeholder="Select backup frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="manual">Manual Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Backup Retention</Label>
              <Select defaultValue="30">
                <SelectTrigger>
                  <SelectValue placeholder="Select retention period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 Days</SelectItem>
                  <SelectItem value="30">30 Days</SelectItem>
                  <SelectItem value="90">90 Days</SelectItem>
                  <SelectItem value="365">1 Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Backup Location</Label>
              <Select defaultValue="local">
                <SelectTrigger>
                  <SelectValue placeholder="Select backup location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="local">Local Storage</SelectItem>
                  <SelectItem value="s3">AWS S3</SelectItem>
                  <SelectItem value="azure">Azure Blob Storage</SelectItem>
                  <SelectItem value="gcp">Google Cloud Storage</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button className="w-full">
              Create Manual Backup Now
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Available Backups</Label>
              <div className="bg-muted rounded-md p-3 h-[207px] overflow-y-auto">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm font-medium">Backup_20230828_0600</div>
                      <div className="text-xs text-muted-foreground">2023-08-28 06:00:00</div>
                    </div>
                    <Button variant="outline" size="sm">Restore</Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm font-medium">Backup_20230827_0600</div>
                      <div className="text-xs text-muted-foreground">2023-08-27 06:00:00</div>
                    </div>
                    <Button variant="outline" size="sm">Restore</Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm font-medium">Backup_20230826_0600</div>
                      <div className="text-xs text-muted-foreground">2023-08-26 06:00:00</div>
                    </div>
                    <Button variant="outline" size="sm">Restore</Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm font-medium">Backup_20230825_0600</div>
                      <div className="text-xs text-muted-foreground">2023-08-25 06:00:00</div>
                    </div>
                    <Button variant="outline" size="sm">Restore</Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-3">
              <Button variant="outline" className="w-full">
                Import Configuration File
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BackupRestoreSection;
