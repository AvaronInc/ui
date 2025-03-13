
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  FormItem,
  FormLabel,
  FormDescription,
} from '@/components/ui/form';
import SettingsCard from '@/components/settings/SettingsCard';
import { adminUsers } from '../schema';
import { UseFormReturn } from 'react-hook-form';
import { AISettingsValues } from '../schema';

interface AdminCallRosterProps {
  form: UseFormReturn<AISettingsValues>;
  adminOrder: string[];
  moveAdminUp: (id: string) => void;
  moveAdminDown: (id: string) => void;
  handleAdminSelect: (selectedAdmins: string[]) => void;
}

const AdminCallRoster: React.FC<AdminCallRosterProps> = ({ 
  form, 
  adminOrder, 
  moveAdminUp, 
  moveAdminDown, 
  handleAdminSelect 
}) => {
  const selectedAdmins = form.watch('adminCallRoster');

  return (
    <SettingsCard title="Admin Call Roster">
      <div className="space-y-4">
        <FormItem>
          <FormLabel>Add Admins to Call List</FormLabel>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {selectedAdmins.length > 0 
                  ? `${selectedAdmins.length} admin${selectedAdmins.length > 1 ? 's' : ''} selected` 
                  : 'Select administrators'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {adminUsers.map(admin => (
                <DropdownMenuCheckboxItem
                  key={admin.id}
                  checked={selectedAdmins.includes(admin.id)}
                  onCheckedChange={(checked) => {
                    const updated = checked 
                      ? [...selectedAdmins, admin.id]
                      : selectedAdmins.filter(id => id !== admin.id);
                    handleAdminSelect(updated);
                  }}
                >
                  {admin.name}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <FormDescription>
            Select administrators who should receive AI voice calls
          </FormDescription>
        </FormItem>
        
        {adminOrder.length > 0 && (
          <div>
            <FormLabel>Set Call Priority Order</FormLabel>
            <div className="mt-2 border rounded-md">
              <ul className="divide-y">
                {adminOrder.map((adminId, index) => {
                  const admin = adminUsers.find(a => a.id === adminId);
                  return admin ? (
                    <li key={admin.id} className="p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{index + 1}.</span>
                        <span>{admin.name}</span>
                      </div>
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => moveAdminUp(admin.id)}
                          disabled={index === 0}
                        >
                          ↑
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => moveAdminDown(admin.id)}
                          disabled={index === adminOrder.length - 1}
                        >
                          ↓
                        </Button>
                      </div>
                    </li>
                  ) : null;
                })}
              </ul>
            </div>
            <FormDescription className="mt-2">
              Drag and drop to change call priority order
            </FormDescription>
          </div>
        )}
      </div>
    </SettingsCard>
  );
};

export default AdminCallRoster;
