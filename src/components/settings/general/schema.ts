
import { z } from 'zod';

export const formSchema = z.object({
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  systemName: z.string().min(2, { message: "System name must be at least 2 characters." }),
  timeZone: z.string(),
  dateFormat: z.enum(["MM/DD/YYYY", "DD/MM/YYYY"]),
  language: z.string(),
  supportEmail: z.string().email({ message: "Please enter a valid email address." }),
  helpdeskPhone: z.string().min(5, { message: "Please enter a valid phone number." }),
});

export type FormValues = z.infer<typeof formSchema>;

export const defaultSettings: FormValues = {
  companyName: 'CyberNest Corp',
  systemName: 'Network Pulse Management',
  timeZone: 'UTC',
  dateFormat: "MM/DD/YYYY",
  language: 'en-US',
  supportEmail: 'support@cybernest.com',
  helpdeskPhone: '+1 (555) 123-4567',
};
