
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../schema';

interface SystemTabProps {
  form: UseFormReturn<FormValues>;
  maintenanceMode: boolean;
  setMaintenanceMode: (value: boolean) => void;
}

const SystemTab = ({ form, maintenanceMode, setMaintenanceMode }: SystemTabProps) => {
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="maintenance-mode" className="font-medium">Maintenance Mode</Label>
          <p className="text-sm text-muted-foreground">
            When enabled, the system will be inaccessible to regular users.
          </p>
        </div>
        <Switch 
          id="maintenance-mode" 
          checked={maintenanceMode} 
          onCheckedChange={setMaintenanceMode}
        />
      </div>
      
      <FormField
        control={form.control}
        name="systemName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>System Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormDescription>
              This name appears throughout the application interface.
            </FormDescription>
          </FormItem>
        )}
      />
    </div>
  );
};

export default SystemTab;
