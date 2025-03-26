
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CVESettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CVESettingsDialog: React.FC<CVESettingsDialogProps> = ({
  open,
  onOpenChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>CVE Intelligence Settings</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>CVSS Threshold for Auto-alerts</Label>
            <Slider
              defaultValue={[7]}
              max={10}
              step={0.1}
              className="mt-2"
            />
            <span className="text-sm text-muted-foreground">
              Alerts will be triggered for CVEs with CVSS ≥ 7.0
            </span>
          </div>

          <div className="space-y-2">
            <Label>Alert Cadence</Label>
            <Select defaultValue="realtime">
              <SelectTrigger>
                <SelectValue placeholder="Select alert frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="realtime">Real-time</SelectItem>
                <SelectItem value="hourly">Hourly Digest</SelectItem>
                <SelectItem value="daily">Daily Digest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Patch Scheduling</Label>
            <Select defaultValue="maintenance">
              <SelectTrigger>
                <SelectValue placeholder="Select patch timing" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Immediate</SelectItem>
                <SelectItem value="maintenance">Maintenance Window</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Notifications</Label>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Slack</span>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <span>Microsoft Teams</span>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <span>Email</span>
                <Switch />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CVESettingsDialog;
