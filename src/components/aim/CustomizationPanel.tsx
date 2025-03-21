
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings, Network, FileText, CalendarClock, Lock, List } from 'lucide-react';

const AccessControls = [
  {
    id: 'network-data',
    label: 'Network Data',
    icon: Network,
    description: 'Access to network topology, performance metrics, and device status'
  },
  {
    id: 'ticketing',
    label: 'Ticketing System',
    icon: FileText,
    description: 'View and manage support tickets, issues, and task assignments'
  },
  {
    id: 'scheduling',
    label: 'Scheduling',
    icon: CalendarClock,
    description: 'Access to maintenance windows, calendar events, and team schedules'
  },
  {
    id: 'compliance',
    label: 'Compliance Data',
    icon: Lock,
    description: 'Information about security policies, license compliance, and audits'
  },
  {
    id: 'logs',
    label: 'System Logs',
    icon: List,
    description: 'Access to system logs, audit trails, and event histories'
  }
];

const CustomizationPanel: React.FC = () => {
  const [accessControls, setAccessControls] = useState<Record<string, boolean>>({
    'network-data': true,
    'ticketing': true,
    'scheduling': true,
    'compliance': true,
    'logs': true
  });

  const handleToggleAccess = (id: string) => {
    setAccessControls(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Settings className="h-5 w-5 text-primary" />
          <span>Customization Panel</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Control which systems AIM can access for information retrieval and management.
          </p>

          <div className="space-y-4">
            {AccessControls.map((control) => (
              <div key={control.id} className="flex items-start space-x-3">
                <div className="pt-0.5">
                  <control.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={control.id} className="font-medium cursor-pointer">
                      {control.label}
                    </Label>
                    <Switch
                      id={control.id}
                      checked={accessControls[control.id]}
                      onCheckedChange={() => handleToggleAccess(control.id)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{control.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomizationPanel;
