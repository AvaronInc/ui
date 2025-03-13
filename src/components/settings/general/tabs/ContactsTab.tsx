
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../schema';

interface ContactsTabProps {
  form: UseFormReturn<FormValues>;
}

const ContactsTab = ({ form }: ContactsTabProps) => {
  return (
    <div className="grid gap-4">
      <FormField
        control={form.control}
        name="supportEmail"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Support Email</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                type="email" 
                placeholder="support@example.com" 
              />
            </FormControl>
            <FormDescription>
              Primary contact for user support inquiries.
            </FormDescription>
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="helpdeskPhone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>IT Helpdesk Phone Number</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                placeholder="+1 (555) 123-4567" 
              />
            </FormControl>
            <FormDescription>
              Phone number for urgent IT support requests.
            </FormDescription>
          </FormItem>
        )}
      />
    </div>
  );
};

export default ContactsTab;
