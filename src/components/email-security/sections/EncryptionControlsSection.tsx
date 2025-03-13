
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { UseFormReturn } from "react-hook-form";
import { EmailSecuritySettings } from "@/types/emailSecurity";
import { Lock, Shield } from "lucide-react";

interface EncryptionControlsSectionProps {
  form: UseFormReturn<EmailSecuritySettings>;
}

const EncryptionControlsSection = ({ form }: EncryptionControlsSectionProps) => {
  return (
    <Form {...form}>
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Email Transmission & Encryption Controls</h3>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="mandatoryEncryptionEnabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <FormLabel>Enable Mandatory End-to-End Encryption for External Emails</FormLabel>
                  <FormDescription>
                    Require encryption for all emails sent to external recipients
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
            name="forceTlsInternal"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <FormLabel>Force TLS for Internal Communications</FormLabel>
                  <FormDescription>
                    Ensure all internal emails use Transport Layer Security
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
            name="rejectUnencryptedEmails"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <FormLabel>Reject Emails Sent Without Encryption</FormLabel>
                  <FormDescription>
                    Block incoming emails that don't use encryption
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
            name="secureAttachmentsOnly"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <FormLabel>Allow Secure Attachments Only</FormLabel>
                  <FormDescription>
                    Restrict file types to PDFs, DOCs, and other approved formats
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

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg border p-4 bg-green-50 dark:bg-green-950">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="h-5 w-5 text-green-600" />
                <h4 className="font-medium">Encryption Benefits</h4>
              </div>
              <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                <li>Protects sensitive information in transit</li>
                <li>Prevents unauthorized access to email content</li>
                <li>Helps maintain regulatory compliance</li>
                <li>Ensures data integrity during transmission</li>
              </ul>
            </div>
            
            <div className="rounded-lg border p-4 bg-amber-50 dark:bg-amber-950">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-amber-600" />
                <h4 className="font-medium">Security Recommendations</h4>
              </div>
              <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                <li>Enable all encryption options for maximum security</li>
                <li>Verify compatibility with existing email systems</li>
                <li>Consider enabling certificate verification</li>
                <li>Regularly review encryption key management</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default EncryptionControlsSection;
