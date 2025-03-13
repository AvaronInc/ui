
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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Plus, Mail } from "lucide-react";
import { useState } from "react";

interface IdentityVerificationSectionProps {
  form: UseFormReturn<EmailSecuritySettings>;
}

const IdentityVerificationSection = ({ form }: IdentityVerificationSectionProps) => {
  const [newUser, setNewUser] = useState("");
  const verifiedUsers = form.watch("verifiedUsers");

  const handleAddUser = () => {
    if (newUser && !verifiedUsers.includes(newUser)) {
      form.setValue("verifiedUsers", [...verifiedUsers, newUser]);
      setNewUser("");
    }
  };

  const handleRemoveUser = (user: string) => {
    form.setValue(
      "verifiedUsers",
      verifiedUsers.filter((u) => u !== user)
    );
  };

  return (
    <Form {...form}>
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Identity-Verified Emails (Enterprise Mail Client Integration)</h3>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="identityVerificationEnabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <FormLabel>Enable Identity-Verified Emails</FormLabel>
                  <FormDescription>
                    Verify internal emails to prevent spoofing and ensure authenticity
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
            <FormLabel>Add Enterprise Users to Verified List</FormLabel>
            <div className="flex gap-2">
              <Input
                placeholder="user@company.com"
                value={newUser}
                onChange={(e) => setNewUser(e.target.value)}
              />
              <Button type="button" onClick={handleAddUser}>
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {verifiedUsers.map((user) => (
                <Badge key={user} variant="secondary" className="flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  {user}
                  <button
                    type="button"
                    onClick={() => handleRemoveUser(user)}
                    className="ml-1 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <FormDescription>
              Add company email addresses that should be considered verified
            </FormDescription>
          </div>

          <FormField
            control={form.control}
            name="autoTaggingEnabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <FormLabel>Auto-Tagging for Verified Emails</FormLabel>
                  <FormDescription>
                    Automatically add identity verification tags to emails between verified users
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
            <h4 className="text-sm font-medium">Verification Badge Visibility:</h4>
            
            <FormField
              control={form.control}
              name="internalVerificationBadgeEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Enabled for Internal Emails</FormLabel>
                    <FormDescription>
                      Show verification badges for emails between company employees
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
              name="externalVerificationBadgeEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Enabled for External Emails</FormLabel>
                    <FormDescription>
                      Show verification badges for emails with external partners
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

          <FormField
            control={form.control}
            name="flagNonVerifiedEmails"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <FormLabel>Flag Non-Verified Emails as Potential Spoofing Risks</FormLabel>
                  <FormDescription>
                    Add warning banners to emails that cannot be verified
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
      </div>
    </Form>
  );
};

export default IdentityVerificationSection;
