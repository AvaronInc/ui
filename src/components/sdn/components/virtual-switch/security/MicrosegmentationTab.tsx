
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Control } from 'react-hook-form';
import { SwitchSecurityValues } from './types';

interface MicrosegmentationTabProps {
  control: Control<SwitchSecurityValues>;
}

const MicrosegmentationTab: React.FC<MicrosegmentationTabProps> = ({ control }) => {
  const securityZones: { id: string, name: string, level: string }[] = [
    { id: 'zone1', name: 'Trusted Zone', level: 'low' },
    { id: 'zone2', name: 'DMZ', level: 'medium' },
    { id: 'zone3', name: 'Restricted Zone', level: 'high' },
    { id: 'zone4', name: 'Quarantine Zone', level: 'critical' },
    { id: 'zone5', name: 'Public Zone', level: 'medium' },
  ];

  const getZoneBadge = (level: string) => {
    switch (level) {
      case 'low':
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Low</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">Medium</Badge>;
      case 'high':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">High</Badge>;
      case 'critical':
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">Critical</Badge>;
      default:
        return <Badge variant="outline">{level}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="microsegmentationEnabled"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                Enable Microsegmentation
              </FormLabel>
              <FormDescription>
                Create isolated security zones within your network using virtual switches
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Security Zones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {securityZones.map(zone => (
              <FormField
                key={zone.id}
                control={control}
                name="securityZones"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3">
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(zone.id)}
                        onCheckedChange={(checked) => {
                          const updatedZones = checked 
                            ? [...field.value, zone.id]
                            : field.value.filter(value => value !== zone.id);
                          field.onChange(updatedZones);
                        }}
                      />
                    </FormControl>
                    <div className="flex justify-between w-full">
                      <FormLabel className="font-normal cursor-pointer">
                        {zone.name}
                      </FormLabel>
                      <div className="flex gap-2">
                        {getZoneBadge(zone.level)}
                      </div>
                    </div>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </CardContent>
      </Card>
      
      <FormField
        control={control}
        name="autoQuarantine"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                Auto-Quarantine Suspicious Traffic
              </FormLabel>
              <FormDescription>
                Automatically isolate suspicious traffic detected by Avaron Vertex AI
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};

export default MicrosegmentationTab;
