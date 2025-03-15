
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ContactCategory } from '@/types/contacts';

// Base schema for all contact types
const baseContactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  notes: z.string().optional().or(z.literal('')),
  isFavorite: z.boolean().default(false),
});

interface NewContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewContactDialog = ({ open, onOpenChange }: NewContactDialogProps) => {
  const [contactType, setContactType] = useState<ContactCategory>('isp');
  
  const form = useForm({
    resolver: zodResolver(baseContactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      notes: '',
      isFavorite: false,
    },
  });

  const onSubmit = (data: any) => {
    console.log('Form data:', data);
    toast.success('Contact added successfully!');
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Add New Contact</DialogTitle>
          <DialogDescription>
            Add a new contact to your IT contact management system.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4 flex-1 overflow-hidden">
          <Tabs 
            value={contactType} 
            onValueChange={(value) => setContactType(value as ContactCategory)}
            className="w-full h-full flex flex-col"
          >
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="isp">ISP</TabsTrigger>
              <TabsTrigger value="tech-support">Tech Support</TabsTrigger>
              <TabsTrigger value="sales">Sales</TabsTrigger>
              <TabsTrigger value="emergency">Emergency</TabsTrigger>
              <TabsTrigger value="internal">Internal</TabsTrigger>
            </TabsList>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex-1 overflow-hidden">
                <ScrollArea className="flex-1 h-[400px] pr-4 -mr-4">
                  <div className="space-y-4 pr-4">
                    {/* Common fields for all contact types */}
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Contact name" {...field} />
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
                              <Input placeholder="Email address" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="Phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="isFavorite"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-end space-x-3 space-y-0 rounded-md">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                Mark as favorite
                              </FormLabel>
                              <FormDescription>
                                Favorites appear at the top of your contact list
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    {/* Contact Type specific fields */}
                    <TabsContent value="isp" className="space-y-4 mt-0">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="form-item">
                          <FormLabel>Primary Contact Person</FormLabel>
                          <Input placeholder="Primary contact person" />
                        </div>
                        
                        <div className="form-item">
                          <FormLabel>Support Phone</FormLabel>
                          <Input placeholder="Support phone number" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="form-item">
                          <FormLabel>Emergency Phone</FormLabel>
                          <Input placeholder="Emergency phone number" />
                        </div>
                        
                        <div className="form-item">
                          <FormLabel>Service Type</FormLabel>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select service type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Fiber">Fiber</SelectItem>
                              <SelectItem value="Copper">Copper</SelectItem>
                              <SelectItem value="Wireless">Wireless</SelectItem>
                              <SelectItem value="Starlink">Starlink</SelectItem>
                              <SelectItem value="Cable">Cable</SelectItem>
                              <SelectItem value="Satellite">Satellite</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="form-item">
                          <FormLabel>Circuit ID</FormLabel>
                          <Input placeholder="Circuit ID" />
                        </div>
                        
                        <div className="form-item">
                          <FormLabel>Business Hours</FormLabel>
                          <Input placeholder="Business hours" />
                        </div>
                      </div>
                      
                      <div className="form-item">
                        <FormLabel>SLA Agreement Link</FormLabel>
                        <Input placeholder="Link to SLA agreement" />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="tech-support" className="space-y-4 mt-0">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="form-item">
                          <FormLabel>Vendor Name *</FormLabel>
                          <Input placeholder="Vendor name" required />
                        </div>
                        
                        <div className="form-item">
                          <FormLabel>Support Email</FormLabel>
                          <Input placeholder="Support email" type="email" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="form-item">
                          <FormLabel>Ticket Portal Link</FormLabel>
                          <Input placeholder="Link to ticket portal" />
                        </div>
                        
                        <div className="form-item">
                          <FormLabel>Warranty Status</FormLabel>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select warranty status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Active">Active</SelectItem>
                              <SelectItem value="Expired">Expired</SelectItem>
                              <SelectItem value="Expiring Soon">Expiring Soon</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="form-item">
                        <FormLabel>Model Details</FormLabel>
                        <Input placeholder="Device model details" />
                      </div>
                      
                      <div className="form-item">
                        <FormLabel>Serial Numbers (comma separated)</FormLabel>
                        <Input placeholder="Serial numbers" />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="sales" className="space-y-4 mt-0">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="form-item">
                          <FormLabel>Company Name *</FormLabel>
                          <Input placeholder="Company name" required />
                        </div>
                        
                        <div className="form-item">
                          <FormLabel>Representative Name</FormLabel>
                          <Input placeholder="Sales representative" />
                        </div>
                      </div>
                      
                      <div className="form-item">
                        <FormLabel>Preferred Order Channels</FormLabel>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="order-email" />
                            <label htmlFor="order-email">Email</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="order-phone" />
                            <label htmlFor="order-phone">Phone</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="order-portal" />
                            <label htmlFor="order-portal">Portal</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="order-rep" />
                            <label htmlFor="order-rep">Sales Rep</label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="form-item">
                        <FormLabel>Current Contracts (comma separated)</FormLabel>
                        <Input placeholder="List of current contracts" />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="emergency" className="space-y-4 mt-0">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="form-item">
                          <FormLabel>Responsible Area *</FormLabel>
                          <Select required>
                            <SelectTrigger>
                              <SelectValue placeholder="Select area" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Network">Network</SelectItem>
                              <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                              <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                              <SelectItem value="Cloud">Cloud Services</SelectItem>
                              <SelectItem value="Data Center">Data Center</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="form-item">
                          <FormLabel>Escalation Level *</FormLabel>
                          <Select required>
                            <SelectTrigger>
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">Level 1</SelectItem>
                              <SelectItem value="2">Level 2</SelectItem>
                              <SelectItem value="3">Level 3</SelectItem>
                              <SelectItem value="4">Level 4</SelectItem>
                              <SelectItem value="5">Level 5</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="form-item">
                        <FormLabel>Department</FormLabel>
                        <Input placeholder="Department" />
                      </div>
                      
                      <div className="form-item">
                        <FormLabel>Available Hours</FormLabel>
                        <Input placeholder="Available hours" />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="internal" className="space-y-4 mt-0">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="form-item">
                          <FormLabel>Role *</FormLabel>
                          <Input placeholder="Job role" required />
                        </div>
                        
                        <div className="form-item">
                          <FormLabel>Department *</FormLabel>
                          <Input placeholder="Department" required />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="form-item">
                          <FormLabel>Preferred Communication</FormLabel>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select preference" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Email">Email</SelectItem>
                              <SelectItem value="Phone">Phone</SelectItem>
                              <SelectItem value="Slack">Slack</SelectItem>
                              <SelectItem value="Teams">Teams</SelectItem>
                              <SelectItem value="SMS">SMS</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="form-item">
                          <FormLabel>Direct Report To</FormLabel>
                          <Input placeholder="Direct manager" />
                        </div>
                      </div>
                    </TabsContent>
                    
                    {/* Common notes field */}
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notes</FormLabel>
                          <FormControl>
                            <Input placeholder="Additional notes" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </ScrollArea>
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Contact</Button>
                </DialogFooter>
              </form>
            </Form>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewContactDialog;
