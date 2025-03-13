
import { FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../schema';

interface DateTimeTabProps {
  form: UseFormReturn<FormValues>;
}

const DateTimeTab = ({ form }: DateTimeTabProps) => {
  return (
    <div className="grid gap-4">
      <FormField
        control={form.control}
        name="timeZone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Default Time Zone</FormLabel>
            <Select 
              value={field.value} 
              onValueChange={field.onChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select time zone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UTC">UTC (Coordinated Universal Time)</SelectItem>
                <SelectItem value="EST">EST (Eastern Standard Time)</SelectItem>
                <SelectItem value="CST">CST (Central Standard Time)</SelectItem>
                <SelectItem value="MST">MST (Mountain Standard Time)</SelectItem>
                <SelectItem value="PST">PST (Pacific Standard Time)</SelectItem>
                <SelectItem value="GMT">GMT (Greenwich Mean Time)</SelectItem>
                <SelectItem value="CET">CET (Central European Time)</SelectItem>
                <SelectItem value="IST">IST (Indian Standard Time)</SelectItem>
                <SelectItem value="JST">JST (Japan Standard Time)</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="dateFormat"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Date Format</FormLabel>
            <div className="flex space-x-4 mt-1.5">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="mm-dd-yyyy"
                  checked={field.value === "MM/DD/YYYY"}
                  onChange={() => field.onChange("MM/DD/YYYY")}
                  className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="mm-dd-yyyy" className="text-sm font-normal">
                  MM/DD/YYYY
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="dd-mm-yyyy"
                  checked={field.value === "DD/MM/YYYY"}
                  onChange={() => field.onChange("DD/MM/YYYY")}
                  className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="dd-mm-yyyy" className="text-sm font-normal">
                  DD/MM/YYYY
                </Label>
              </div>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};

export default DateTimeTab;
