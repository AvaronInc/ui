
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

interface RiskAssessmentSectionProps {
  form: UseFormReturn<EmailSecuritySettings>;
}

const RiskAssessmentSection = ({ form }: RiskAssessmentSectionProps) => {
  const watchRiskConfidence = form.watch("riskConfidenceThreshold");
  const watchQueueReview = form.watch("queueForReviewThreshold");
  const watchRejectEmail = form.watch("rejectEmailThreshold");

  return (
    <Form {...form}>
      <div className="space-y-6">
        <h3 className="text-lg font-medium">AI-Generated Risk Assessments & Confidence Levels</h3>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="riskConfidenceThreshold"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Risk Confidence Threshold for Action: {field.value}%</FormLabel>
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
                  Set the confidence threshold for AI to take action on emails
                </FormDescription>
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Define Actions Based on Confidence Score:</h4>
            
            <FormField
              control={form.control}
              name="queueForReviewThreshold"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Queue for Review Threshold: {field.value}%</FormLabel>
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
                    Emails above this confidence threshold require manual approval
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="rejectEmailThreshold"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reject Email Threshold: {field.value}%</FormLabel>
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
                    If confidence exceeds this threshold, block the email
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="alertOnFlag"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Alert Sender & Admins</FormLabel>
                    <FormDescription>
                      Notify users when AI flags an issue with their email
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
          
          <div className="mt-4 rounded-md bg-muted p-4">
            <h4 className="mb-2 text-sm font-medium">Current Configuration Summary</h4>
            <ul className="list-disc pl-5 text-sm">
              <li>Emails with {watchQueueReview}%+ confidence will be queued for review</li>
              <li>Emails with {watchRejectEmail}%+ confidence will be rejected</li>
              <li>General risk threshold is set at {watchRiskConfidence}%</li>
              <li>{form.watch("alertOnFlag") ? "Alerts are enabled" : "Alerts are disabled"} for flagged emails</li>
            </ul>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default RiskAssessmentSection;
