
import { FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../schema';
import { cn } from '@/lib/utils';

interface AppearanceTabProps {
  form: UseFormReturn<FormValues>;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
}

const AppearanceTab = ({ 
  form, 
  isDarkMode, 
  toggleDarkMode, 
  primaryColor, 
  setPrimaryColor 
}: AppearanceTabProps) => {
  const colors = [
    { name: 'blue', class: 'bg-blue-500' },
    { name: 'green', class: 'bg-green-500' },
    { name: 'purple', class: 'bg-purple-500' },
    { name: 'red', class: 'bg-red-500' },
    { name: 'orange', class: 'bg-orange-500' },
    { name: 'gray', class: 'bg-gray-500' }
  ];

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="dark-mode" className="font-medium">Dark Mode</Label>
          <p className="text-sm text-muted-foreground">
            Enable dark mode across the application.
          </p>
        </div>
        <Switch 
          id="dark-mode"
          checked={isDarkMode}
          onCheckedChange={toggleDarkMode}
        />
      </div>
      
      <div>
        <Label htmlFor="primary-color">Theme Color</Label>
        <div className="grid grid-cols-6 gap-2 mt-1.5">
          {colors.map((color) => (
            <div
              key={color.name}
              className={cn(
                "h-10 rounded-md cursor-pointer border-2",
                color.class,
                primaryColor === color.name ? "border-primary" : "border-transparent"
              )}
              onClick={() => setPrimaryColor(color.name)}
            />
          ))}
        </div>
      </div>
      
      <FormField
        control={form.control}
        name="language"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Language</FormLabel>
            <Select 
              value={field.value} 
              onValueChange={field.onChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en-US">English (US)</SelectItem>
                <SelectItem value="en-GB">English (UK)</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="it">Italian</SelectItem>
                <SelectItem value="pt">Portuguese</SelectItem>
                <SelectItem value="ja">Japanese</SelectItem>
                <SelectItem value="zh">Chinese (Simplified)</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
    </div>
  );
};

export default AppearanceTab;
