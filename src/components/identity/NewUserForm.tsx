
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { User, UserRole } from '@/types/identity';
import { toast } from 'sonner';

interface NewUserFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUserCreated: (user: User) => void;
}

// Define valid roles to ensure we never have empty values
const USER_ROLES = ['User', 'Engineer', 'Admin'] as const;

const formSchema = z.object({
  username: z.string().min(3, {
    message: 'Username must be at least 3 characters.',
  }),
  fullName: z.string().min(2, {
    message: 'Full name is required',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  role: z.enum(['Admin', 'Engineer', 'User']),
  enableMfa: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const NewUserForm: React.FC<NewUserFormProps> = ({ 
  open, 
  onOpenChange,
  onUserCreated
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      fullName: '',
      email: '',
      role: 'User',
      enableMfa: false,
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newUser: User = {
        id: `user-${Math.random().toString(36).substr(2, 9)}`,
        username: data.username,
        fullName: data.fullName,
        email: data.email,
        role: data.role as UserRole,
        status: 'Active',
        lastLogin: new Date().toISOString(),
        mfaEnabled: data.enableMfa,
        biometricsEnrolled: false,
        activities: [
          {
            action: 'User account created',
            timestamp: new Date().toISOString(),
          }
        ],
        createdAt: new Date().toISOString(),
        kyberCertHash: data.role === 'Admin' ? '4a51cde8f3ce7c' : undefined,
      };
      
      onUserCreated(newUser);
      form.reset();
      setIsSubmitting(false);
      onOpenChange(false);
      toast.success("New user created successfully!");
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
          <DialogDescription>
            Add a new user to the system. Fill in the required information.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., jsmith" {...field} />
                  </FormControl>
                  <FormDescription>
                    This will be used to log in to the system.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Smith" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.smith@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {USER_ROLES.map(role => (
                        <SelectItem key={role} value={role}>{role}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    This determines the user's permissions in the system.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="enableMfa"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Enable Multi-Factor Authentication</FormLabel>
                    <FormDescription>
                      The user will be prompted to set up MFA on first login.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create User'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewUserForm;
