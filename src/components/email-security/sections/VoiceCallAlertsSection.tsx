
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { UseFormReturn } from "react-hook-form";
import { EmailSecuritySettings } from "@/types/emailSecurity";
import { Phone, Clock, Volume2 } from "lucide-react";

interface VoiceCallAlertsSectionProps {
  form: UseFormReturn<EmailSecuritySettings>;
}

const VoiceCallAlertsSection = ({ form }: VoiceCallAlertsSectionProps) => {
  const voiceThreshold = form.watch("voiceAlertThreshold");

  return (
    <Form {...form}>
      <div className="space-y-6">
        <h3 className="text-lg font-medium">AI Voice Call Alerts for High-Risk Emails</h3>
        
        <div className="rounded-lg border p-4 bg-blue-50 dark:bg-blue-950 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Volume2 className="h-5 w-5 text-blue-600" />
            <h4 className="font-medium">About Voice Call Alerts</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            This feature uses AI to place automated phone calls to security personnel when high-risk emails are detected. 
            Voice calls ensure critical security threats are addressed promptly, even when email or app notifications might be missed.
          </p>
        </div>
        
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="aiVoiceCallEnabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <FormLabel>Enable AI Call for High-Risk Emails</FormLabel>
                  <FormDescription>
                    Use AI to place voice calls to security team for critical alerts
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

          <FormField
            control={form.control}
            name="voiceAlertThreshold"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Define Confidence Threshold for Voice Alerts: {field.value}%</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    <Slider
                      value={[field.value]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                    <Progress value={field.value} className="h-2" />
                  </div>
                </FormControl>
                <FormDescription>
                  Only trigger voice calls when AI confidence exceeds this threshold
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="callEscalationMinutes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Call Escalation Policy (Minutes)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    placeholder="15"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                  />
                </FormControl>
                <FormDescription>
                  Notify admins if no action is taken within this time frame
                </FormDescription>
              </FormItem>
            )}
          />
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <Phone className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="text-sm font-medium">Voice Call Configuration</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  The system will use AI to place calls to the designated security team when emails with a risk confidence above {voiceThreshold}% are detected.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <Clock className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="text-sm font-medium">Escalation Timeline</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  If no action is taken within {form.watch("callEscalationMinutes")} minutes, the system will escalate the alert to additional team members.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 rounded-md bg-muted p-4">
            <h4 className="mb-2 text-sm font-medium">Voice Call Message Template</h4>
            <div className="text-sm text-muted-foreground">
              <p className="mb-2">
                "This is an automated security alert from your Email Security system. 
                A high-risk email with a confidence score of [SCORE]% has been detected.
                The sender is [SENDER] and the subject is [SUBJECT].
                This appears to be a [THREAT_TYPE] attempt."
              </p>
              <p>
                "Please log in to the security portal to review this threat immediately. 
                If no action is taken within {form.watch("callEscalationMinutes")} minutes, this alert will be escalated."
              </p>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default VoiceCallAlertsSection;
