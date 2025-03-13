
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Mail, Bell } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { NotificationSettingsFormValues } from "./types";

interface AlertDeliveryMethodsProps {
  form: UseFormReturn<NotificationSettingsFormValues>;
}

const AlertDeliveryMethods = ({ form }: AlertDeliveryMethodsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Alert Delivery Methods</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="enableEmailAlerts"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Enable Email Alerts
                </FormLabel>
                <FormDescription>
                  Receive system alerts via email
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="enableSmsAlerts"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Enable SMS Alerts
                </FormLabel>
                <FormDescription>
                  Receive critical alerts via SMS
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default AlertDeliveryMethods;
