
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { EmailSecuritySettings } from "@/types/emailSecurity";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, FileText } from "lucide-react";

interface LoggingComplianceSectionProps {
  form: UseFormReturn<EmailSecuritySettings>;
}

const LoggingComplianceSection = ({ form }: LoggingComplianceSectionProps) => {
  return (
    <Form {...form}>
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Logging & Compliance Audits</h3>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="quarantineEnabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <FormLabel>Store AI-Flagged Emails in Quarantine for Review</FormLabel>
                  <FormDescription>
                    Save flagged emails in a quarantine area for manual review
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
            name="quarantineRetentionPeriod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Retention Policy for Quarantined Emails</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select retention period" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="7">7 Days</SelectItem>
                    <SelectItem value="30">30 Days</SelectItem>
                    <SelectItem value="90">90 Days</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  How long to keep quarantined emails before automatic deletion
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="aiHistoricalReviewEnabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <FormLabel>Enable AI Review of Historical Emails for Compliance Audits</FormLabel>
                  <FormDescription>
                    Use AI to analyze past emails for compliance issues
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

          <div className="space-y-3">
            <h4 className="text-sm font-medium">Compliance Report Options:</h4>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="report-pdf" defaultChecked />
                <label
                  htmlFor="report-pdf"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Generate PDF Reports
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="report-json" defaultChecked />
                <label
                  htmlFor="report-json"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Generate JSON Reports
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="report-csv" />
                <label
                  htmlFor="report-csv"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Generate CSV Reports
                </label>
              </div>
            </div>
          </div>

          <FormField
            control={form.control}
            name="complianceMonitoringEnabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <FormLabel>Integrate with Compliance Monitoring</FormLabel>
                  <FormDescription>
                    Connect with GDPR, HIPAA, and SOC2 compliance monitoring
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
            name="scheduleAutomaticReports"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <FormLabel>Schedule Automatic Compliance Reports</FormLabel>
                  <FormDescription>
                    Generate and distribute compliance reports on a schedule
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex items-start gap-2 p-3 border rounded-lg">
              <div className="rounded-full p-1 bg-green-100 dark:bg-green-900 text-green-500">
                <Check className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-medium">GDPR Compliance</h4>
                <p className="text-sm text-muted-foreground">Ensures data handling complies with European regulations</p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 border rounded-lg">
              <div className="rounded-full p-1 bg-green-100 dark:bg-green-900 text-green-500">
                <Check className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-medium">HIPAA Compliance</h4>
                <p className="text-sm text-muted-foreground">Protects sensitive healthcare information</p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 border rounded-lg">
              <div className="rounded-full p-1 bg-green-100 dark:bg-green-900 text-green-500">
                <Check className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-medium">SOC2 Compliance</h4>
                <p className="text-sm text-muted-foreground">Ensures security, availability, and confidentiality</p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 border rounded-lg">
              <div className="rounded-full p-1 bg-green-100 dark:bg-green-900 text-green-500">
                <FileText className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-medium">Automated Reporting</h4>
                <p className="text-sm text-muted-foreground">Schedule and generate reports automatically</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default LoggingComplianceSection;
