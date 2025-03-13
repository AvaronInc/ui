
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { NotificationSettingsFormValues } from "./types";

interface EscalationPoliciesProps {
  form: UseFormReturn<NotificationSettingsFormValues>;
}

const EscalationPolicies = ({ form }: EscalationPoliciesProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Escalation Policies</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="autoEscalateCriticalAlerts"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Auto-Escalate Critical Alerts After
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select escalation time" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="10">10 Minutes</SelectItem>
                  <SelectItem value="30">30 Minutes</SelectItem>
                  <SelectItem value="60">1 Hour</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Time before escalating unacknowledged critical alerts
              </FormDescription>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default EscalationPolicies;
