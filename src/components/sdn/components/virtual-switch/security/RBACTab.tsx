
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Control } from 'react-hook-form';
import { SwitchSecurityValues } from './types';

interface RBACTabProps {
  control: Control<SwitchSecurityValues>;
}

const RBACTab: React.FC<RBACTabProps> = ({ control }) => {
  const availableRoles: { id: string, name: string }[] = [
    { id: 'Admin', name: 'Administrator' },
    { id: 'Engineer', name: 'Network Engineer' },
    { id: 'Security', name: 'Security Analyst' },
    { id: 'Operator', name: 'Network Operator' },
    { id: 'User', name: 'Standard User' },
  ];

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="rbacEnabled"
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
                Enable Role-Based Access Control
              </FormLabel>
              <FormDescription>
                Control who can create, modify, and delete virtual switches based on their assigned roles
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Role Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {availableRoles.map(role => (
              <FormField
                key={role.id}
                control={control}
                name="allowedRoles"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3">
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(role.id)}
                        onCheckedChange={(checked) => {
                          const updatedRoles = checked 
                            ? [...field.value, role.id]
                            : field.value.filter(value => value !== role.id);
                          field.onChange(updatedRoles);
                        }}
                      />
                    </FormControl>
                    <div className="flex justify-between w-full">
                      <FormLabel className="font-normal cursor-pointer">
                        {role.name}
                      </FormLabel>
                      <div className="flex gap-2">
                        <Badge variant={role.id === 'Admin' || role.id === 'Engineer' ? "default" : "outline"}>
                          {role.id === 'Admin' ? 'Full Access' : 
                            role.id === 'Engineer' ? 'Modify' : 
                            role.id === 'Security' ? 'View & Audit' : 
                            role.id === 'Operator' ? 'Limited' : 'View Only'}
                        </Badge>
                      </div>
                    </div>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RBACTab;
