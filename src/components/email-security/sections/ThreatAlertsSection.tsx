import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { EmailSecuritySettings } from "@/types/emailSecurity";
import { Badge } from "@/components/ui/badge";
import { X, Plus, UserPlus, Mail, Bell, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface ThreatAlertsSectionProps {
  form: UseFormReturn<EmailSecuritySettings>;
}

const ThreatAlertsSection = ({ form }: ThreatAlertsSectionProps) => {
  const [newRecipient, setNewRecipient] = useState("");
  const alertRecipients = form.watch("alertRecipients");

  const handleAddRecipient = () => {
    if (newRecipient && !alertRecipients.includes(newRecipient)) {
      form.setValue("alertRecipients", [...alertRecipients, newRecipient]);
      setNewRecipient("");
    }
  };

  const handleRemoveRecipient = (recipient: string) => {
    form.setValue(
      "alertRecipients",
      alertRecipients.filter((r) => r !== recipient)
    );
  };

  return (
    <Form {...form}>
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Real-Time AI Threat Alerts & Reporting</h3>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="aiAlertsEnabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <FormLabel>Enable AI Alerts for High-Risk Emails</FormLabel>
                  <FormDescription>
                    Receive real-time alerts when AI detects high-risk emails
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <FormLabel>Define Alert Recipients</FormLabel>
            <div className="flex gap-2">
              <Input
                placeholder="user@company.com"
                value={newRecipient}
                onChange={(e) => setNewRecipient(e.target.value)}
              />
              <Button type="button" onClick={handleAddRecipient}>
                <UserPlus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {alertRecipients.map((recipient) => (
                <Badge key={recipient} variant="secondary" className="flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  {recipient}
                  <button
                    type="button"
                    onClick={() => handleRemoveRecipient(recipient)}
                    className="ml-1 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <FormDescription>
              These users will receive alerts when security issues are detected
            </FormDescription>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Escalation Policies:</h4>
            
            <FormField
              control={form.control}
              name="autoEscalateAfter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Auto-Escalate After X Number of DLP Violations</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      placeholder="3"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                    />
                  </FormControl>
                  <FormDescription>
                    Automatically escalate after this many DLP violations
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="blockSenderAfter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Block Sender After X Number of Violations</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      placeholder="5"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                    />
                  </FormControl>
                  <FormDescription>
                    Automatically block senders after this many violations
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="alertSecurityTeamOnRepeat"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Alert Security Team on Repeat Offenses</FormLabel>
                    <FormDescription>
                      Notify the security team when users repeatedly violate policies
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="mt-6 rounded-lg border p-4 bg-blue-50 dark:bg-blue-950">
            <div className="flex items-center gap-2 mb-3">
              <Bell className="h-5 w-5 text-blue-600" />
              <h4 className="font-medium">Alert Notification Channels</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="channel-email" defaultChecked />
                <label
                  htmlFor="channel-email"
                  className="text-sm font-medium leading-none"
                >
                  Email Notifications
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="channel-sms" />
                <label
                  htmlFor="channel-sms"
                  className="text-sm font-medium leading-none"
                >
                  SMS Notifications
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="channel-app" defaultChecked />
                <label
                  htmlFor="channel-app"
                  className="text-sm font-medium leading-none"
                >
                  In-App Notifications
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="channel-slack" />
                <label
                  htmlFor="channel-slack"
                  className="text-sm font-medium leading-none"
                >
                  Slack Notifications
                </label>
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-4 bg-amber-50 dark:bg-amber-950">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <h4 className="font-medium">Alert Priority Levels</h4>
            </div>
            <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
              <li><span className="font-semibold">Critical:</span> Immediate action required, notification on all channels</li>
              <li><span className="font-semibold">High:</span> Prompt action needed, notification to security team</li>
              <li><span className="font-semibold">Medium:</span> Review within 24 hours, standard notifications</li>
              <li><span className="font-semibold">Low:</span> Review within 72 hours, daily digest only</li>
            </ul>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default ThreatAlertsSection;
