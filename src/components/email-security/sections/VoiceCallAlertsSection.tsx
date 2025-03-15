
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
import { Phone, Clock, Volume2, MessageSquare, Bot } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface VoiceCallAlertsSectionProps {
  form: UseFormReturn<EmailSecuritySettings>;
}

const VoiceCallAlertsSection = ({ form }: VoiceCallAlertsSectionProps) => {
  const voiceThreshold = form.watch("voiceAlertThreshold");
  const responseMode = form.watch("aiResponseMode");

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
          
          <div className="border rounded-lg p-4 space-y-4">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Bot className="h-4 w-4 text-primary" />
              AI Response Configuration
            </h4>
            
            <FormField
              control={form.control}
              name="aiResponseMode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>AI Response Mode</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <RadioGroupItem value="explain" />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="font-medium">Explanation Mode</FormLabel>
                          <FormDescription>
                            AI explains the security threat in detail without prompting for questions
                          </FormDescription>
                        </div>
                      </FormItem>
                      
                      <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <RadioGroupItem value="interactive" />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="font-medium">Interactive Mode</FormLabel>
                          <FormDescription>
                            AI explains the threat and can answer questions about it
                          </FormDescription>
                        </div>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="aiVoiceModel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>AI Voice Model</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select voice model" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="gpt-4">GPT-4 (Most Comprehensive)</SelectItem>
                      <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo (Fast Response)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select AI model for voice interactions
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="aiDetailLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Response Detail Level</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select detail level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="concise">Concise (Brief overview)</SelectItem>
                      <SelectItem value="standard">Standard (Balanced details)</SelectItem>
                      <SelectItem value="detailed">Detailed (Extensive information)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Control how detailed the AI's explanations should be
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="includeTechnicalDetails"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Include Technical Details</FormLabel>
                    <FormDescription>
                      Include technical specifics about the threat in AI explanations
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
              <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="text-sm font-medium">AI Response Style</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {responseMode === 'interactive' 
                    ? 'The AI will engage in a conversation, explaining the threat and answering questions.'
                    : 'The AI will provide a detailed explanation of the threat without waiting for questions.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default VoiceCallAlertsSection;

