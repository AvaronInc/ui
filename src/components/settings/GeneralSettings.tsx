import { useState, useRef, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { saveUserSettings, loadUserSettings, SettingsCategory } from '@/services/settings-service';
import { useAuth } from '@/context/AuthContext';

const formSchema = z.object({
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  systemName: z.string().min(2, { message: "System name must be at least 2 characters." }),
  timeZone: z.string(),
  dateFormat: z.enum(["MM/DD/YYYY", "DD/MM/YYYY"]),
  language: z.string(),
  supportEmail: z.string().email({ message: "Please enter a valid email address." }),
  helpdeskPhone: z.string().min(5, { message: "Please enter a valid phone number." }),
});

const GeneralSettings = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { isDarkMode, toggleDarkMode, primaryColor, setPrimaryColor } = useTheme();
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [companyLogo, setCompanyLogo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: 'CyberNest Corp',
      systemName: 'Network Pulse Management',
      timeZone: 'UTC',
      dateFormat: "MM/DD/YYYY",
      language: 'en-US',
      supportEmail: 'support@cybernest.com',
      helpdeskPhone: '+1 (555) 123-4567',
    },
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setIsLoading(true);
        setLoadError(null);
        
        let generalSettings;
        
        // Development mode workaround - skip DB loading if no user
        if (!user) {
          console.log("Development mode: bypassing authentication checks");
          // Load from localStorage only
          const storedSettings = {
            companyName: localStorage.getItem('companyName') || 'CyberNest Corp',
            systemName: localStorage.getItem('systemName') || 'Network Pulse Management',
            timeZone: localStorage.getItem('timeZone') || 'UTC',
            dateFormat: (localStorage.getItem('dateFormat') as "MM/DD/YYYY" | "DD/MM/YYYY") || "MM/DD/YYYY",
            language: localStorage.getItem('language') || 'en-US',
            supportEmail: localStorage.getItem('supportEmail') || 'support@cybernest.com',
            helpdeskPhone: localStorage.getItem('helpdeskPhone') || '+1 (555) 123-4567',
            maintenanceMode: localStorage.getItem('maintenanceMode') === 'true',
            companyLogo: localStorage.getItem('companyLogo')
          };
          
          generalSettings = storedSettings;
        } else {
          // User is authenticated, try loading from database
          try {
            generalSettings = await loadUserSettings(SettingsCategory.GENERAL);
          } catch (dbError) {
            console.error('Error loading settings from database:', dbError);
            // Fall back to localStorage on DB error
            generalSettings = null;
          }
        }
        
        if (generalSettings) {
          // Update form with loaded values
          form.reset({
            companyName: generalSettings.companyName || 'CyberNest Corp',
            systemName: generalSettings.systemName || 'Network Pulse Management',
            timeZone: generalSettings.timeZone || 'UTC',
            dateFormat: (generalSettings.dateFormat as "MM/DD/YYYY" | "DD/MM/YYYY") || "MM/DD/YYYY",
            language: generalSettings.language || 'en-US',
            supportEmail: generalSettings.supportEmail || 'support@cybernest.com',
            helpdeskPhone: generalSettings.helpdeskPhone || '+1 (555) 123-4567',
          });
          
          // Also update other state values
          setMaintenanceMode(generalSettings.maintenanceMode || false);
          setCompanyLogo(generalSettings.companyLogo || null);
          
          // Update localStorage for header component to use (for real-time updates)
          localStorage.setItem('companyName', generalSettings.companyName || 'CyberNest Corp');
        } else {
          // Fallback to localStorage for backward compatibility
          form.reset({
            companyName: localStorage.getItem('companyName') || 'CyberNest Corp',
            systemName: localStorage.getItem('systemName') || 'Network Pulse Management',
            timeZone: localStorage.getItem('timeZone') || 'UTC',
            dateFormat: (localStorage.getItem('dateFormat') as "MM/DD/YYYY" | "DD/MM/YYYY") || "MM/DD/YYYY",
            language: localStorage.getItem('language') || 'en-US',
            supportEmail: localStorage.getItem('supportEmail') || 'support@cybernest.com',
            helpdeskPhone: localStorage.getItem('helpdeskPhone') || '+1 (555) 123-4567',
          });
          
          setMaintenanceMode(localStorage.getItem('maintenanceMode') === 'true');
          setCompanyLogo(localStorage.getItem('companyLogo'));
        }
      } catch (error) {
        console.error('Error loading settings:', error);
        setLoadError('Failed to load settings. Please try again.');
        toast({
          title: "Error loading settings",
          description: "There was a problem loading your settings.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSettings();
  }, [form, toast, user]);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const logoData = e.target?.result as string;
        setCompanyLogo(logoData);
        
        // Also update localStorage for backward compatibility
        localStorage.setItem('companyLogo', logoData);
        
        toast({
          title: "Logo updated",
          description: "Your company logo has been updated successfully.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      // Combine all settings into one object
      const combinedSettings = {
        ...data,
        maintenanceMode,
        companyLogo
      };
      
      // Save to database if user is authenticated
      if (user) {
        await saveUserSettings(SettingsCategory.GENERAL, combinedSettings);
      }
      
      // Still save to localStorage for backward compatibility
      Object.entries(data).forEach(([key, value]) => {
        localStorage.setItem(key, value);
      });
      localStorage.setItem('maintenanceMode', maintenanceMode.toString());
      if (companyLogo) localStorage.setItem('companyLogo', companyLogo);
      
      toast({
        title: "Settings saved",
        description: "Your general settings have been updated successfully.",
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "Error saving settings",
        description: "There was a problem saving your settings.",
        variant: "destructive"
      });
    }
  };
  
  const handleReset = async () => {
    const defaultSettings = {
      companyName: 'CyberNest Corp',
      systemName: 'Network Pulse Management',
      timeZone: 'UTC',
      dateFormat: "MM/DD/YYYY" as "MM/DD/YYYY" | "DD/MM/YYYY",
      language: 'en-US',
      supportEmail: 'support@cybernest.com',
      helpdeskPhone: '+1 (555) 123-4567',
      maintenanceMode: false,
      companyLogo: null
    };
    
    // Reset form values - ensure correct typing for dateFormat
    form.reset({
      companyName: defaultSettings.companyName,
      systemName: defaultSettings.systemName,
      timeZone: defaultSettings.timeZone,
      dateFormat: defaultSettings.dateFormat,
      language: defaultSettings.language,
      supportEmail: defaultSettings.supportEmail,
      helpdeskPhone: defaultSettings.helpdeskPhone,
    });
    
    // Reset other settings
    setCompanyLogo(null);
    setMaintenanceMode(false);
    setPrimaryColor('blue');
    if (isDarkMode) toggleDarkMode();
    
    // Save reset values to database
    if (user) {
      try {
        await saveUserSettings(SettingsCategory.GENERAL, defaultSettings);
      } catch (error) {
        console.error("Error resetting settings:", error);
      }
    }
    
    // Reset localStorage
    localStorage.removeItem('companyLogo');
    localStorage.setItem('companyName', defaultSettings.companyName);
    localStorage.setItem('systemName', defaultSettings.systemName);
    localStorage.setItem('timeZone', defaultSettings.timeZone);
    localStorage.setItem('dateFormat', defaultSettings.dateFormat);
    localStorage.setItem('language', defaultSettings.language);
    localStorage.setItem('supportEmail', defaultSettings.supportEmail);
    localStorage.setItem('helpdeskPhone', defaultSettings.helpdeskPhone);
    localStorage.setItem('maintenanceMode', 'false');
    
    toast({
      title: "Settings reset",
      description: "Your general settings have been reset to defaults.",
    });
  };

  const colors = [
    { name: 'blue', class: 'bg-blue-500' },
    { name: 'green', class: 'bg-green-500' },
    { name: 'purple', class: 'bg-purple-500' },
    { name: 'red', class: 'bg-red-500' },
    { name: 'orange', class: 'bg-orange-500' },
    { name: 'gray', class: 'bg-gray-500' }
  ];
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-6 min-h-[300px]">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading settings...</p>
        </div>
      </div>
    );
  }
  
  if (loadError) {
    return (
      <div className="flex justify-center p-6">
        <div className="text-center">
          <p className="text-destructive mb-2">{loadError}</p>
          <Button 
            onClick={() => window.location.reload()} 
            variant="outline"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Tabs defaultValue="company">
            <TabsList className="mb-4">
              <TabsTrigger value="company">Company</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="datetime">Date & Time</TabsTrigger>
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="company" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Company Branding</h3>
                  <div className="flex items-start gap-4">
                    <div>
                      <div 
                        className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-primary transition-colors mb-2"
                        onClick={triggerFileInput}
                      >
                        {companyLogo ? (
                          <img 
                            src={companyLogo} 
                            alt="Company Logo" 
                            className="max-w-full max-h-full object-contain"
                          />
                        ) : (
                          <div className="text-center text-muted-foreground">
                            <p className="text-sm">Click to upload logo</p>
                          </div>
                        )}
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleLogoUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        onClick={triggerFileInput}
                      >
                        Upload Logo
                      </Button>
                    </div>
                    <div className="flex-1">
                      <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormDescription>
                              This is your company's official name displayed in the application header.
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="system" className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenance-mode" className="font-medium">Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      When enabled, the system will be inaccessible to regular users.
                    </p>
                  </div>
                  <Switch 
                    id="maintenance-mode" 
                    checked={maintenanceMode} 
                    onCheckedChange={setMaintenanceMode}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="systemName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>System Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        This name appears throughout the application interface.
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="appearance" className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="dark-mode" className="font-medium">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable dark mode across the application.
                    </p>
                  </div>
                  <Switch 
                    id="dark-mode"
                    checked={isDarkMode}
                    onCheckedChange={toggleDarkMode}
                  />
                </div>
                
                <div>
                  <Label htmlFor="primary-color">Theme Color</Label>
                  <div className="grid grid-cols-6 gap-2 mt-1.5">
                    {colors.map((color) => (
                      <div
                        key={color.name}
                        className={cn(
                          "h-10 rounded-md cursor-pointer border-2",
                          color.class,
                          primaryColor === color.name ? "border-primary" : "border-transparent"
                        )}
                        onClick={() => setPrimaryColor(color.name)}
                      />
                    ))}
                  </div>
                </div>
                
                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Language</FormLabel>
                      <Select 
                        value={field.value} 
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="en-US">English (US)</SelectItem>
                          <SelectItem value="en-GB">English (UK)</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="it">Italian</SelectItem>
                          <SelectItem value="pt">Portuguese</SelectItem>
                          <SelectItem value="ja">Japanese</SelectItem>
                          <SelectItem value="zh">Chinese (Simplified)</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="datetime" className="space-y-4">
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="timeZone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Default Time Zone</FormLabel>
                      <Select 
                        value={field.value} 
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time zone" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="UTC">UTC (Coordinated Universal Time)</SelectItem>
                          <SelectItem value="EST">EST (Eastern Standard Time)</SelectItem>
                          <SelectItem value="CST">CST (Central Standard Time)</SelectItem>
                          <SelectItem value="MST">MST (Mountain Standard Time)</SelectItem>
                          <SelectItem value="PST">PST (Pacific Standard Time)</SelectItem>
                          <SelectItem value="GMT">GMT (Greenwich Mean Time)</SelectItem>
                          <SelectItem value="CET">CET (Central European Time)</SelectItem>
                          <SelectItem value="IST">IST (Indian Standard Time)</SelectItem>
                          <SelectItem value="JST">JST (Japan Standard Time)</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="dateFormat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date Format</FormLabel>
                      <div className="flex space-x-4 mt-1.5">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="mm-dd-yyyy"
                            checked={field.value === "MM/DD/YYYY"}
                            onChange={() => field.onChange("MM/DD/YYYY")}
                            className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                          />
                          <Label htmlFor="mm-dd-yyyy" className="text-sm font-normal">
                            MM/DD/YYYY
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="dd-mm-yyyy"
                            checked={field.value === "DD/MM/YYYY"}
                            onChange={() => field.onChange("DD/MM/YYYY")}
                            className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                          />
                          <Label htmlFor="dd-mm-yyyy" className="text-sm font-normal">
                            DD/MM/YYYY
                          </Label>
                        </div>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="contacts" className="space-y-4">
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
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-between pt-4 border-t">
            <Button type="button" variant="outline" onClick={handleReset}>
              Reset to Defaults
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default GeneralSettings;
