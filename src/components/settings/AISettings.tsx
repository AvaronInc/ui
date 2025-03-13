import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import SettingsCard from '@/components/settings/SettingsCard';

const adminUsers = [
  { id: '1', name: 'John Smith' },
  { id: '2', name: 'Jane Doe' },
  { id: '3', name: 'Mark Johnson' },
  { id: '4', name: 'Sarah Williams' },
  { id: '5', name: 'David Brown' },
];

const aiSettingsSchema = z.object({
  enableAIVoiceCalls: z.boolean().default(false),
  adminCallRoster: z.array(z.string()).default([]),
  networkOutage: z.boolean().default(true),
  securityIntrusion: z.boolean().default(true),
  hardwareFailure: z.boolean().default(false),
  highLatency: z.boolean().default(false),
  customEvents: z.string().optional(),
  retryCallsOnNoAnswer: z.boolean().default(true),
  callEscalationPolicy: z.enum(['1', '2', '3']).default('2'),
  voiceConversationMode: z.enum(['brief', 'interactive']).default('brief'),
  openSupportTicket: z.boolean().default(true),
  generateTranscript: z.boolean().default(true),
  enableAIRecommendations: z.boolean().default(false),
  autoFixConfidenceThreshold: z.number().min(0).max(100).default(85),
  aiLearningDuration: z.enum(['7', '14', '30']).default('14'),
});

type AISettingsValues = z.infer<typeof aiSettingsSchema>;

const AISettings = () => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [adminOrder, setAdminOrder] = useState<string[]>([]);
  
  const savedSettings = localStorage.getItem('aiVoiceCallSettings');
  const parsedSettings = savedSettings ? JSON.parse(savedSettings) : {};
  
  const defaultValues: AISettingsValues = {
    enableAIVoiceCalls: parsedSettings.enableAIVoiceCalls || false,
    adminCallRoster: parsedSettings.adminCallRoster || [],
    networkOutage: parsedSettings.networkOutage !== undefined ? parsedSettings.networkOutage : true,
    securityIntrusion: parsedSettings.securityIntrusion !== undefined ? parsedSettings.securityIntrusion : true,
    hardwareFailure: parsedSettings.hardwareFailure || false,
    highLatency: parsedSettings.highLatency || false,
    customEvents: parsedSettings.customEvents || '',
    retryCallsOnNoAnswer: parsedSettings.retryCallsOnNoAnswer !== undefined ? parsedSettings.retryCallsOnNoAnswer : true,
    callEscalationPolicy: parsedSettings.callEscalationPolicy || '2',
    voiceConversationMode: parsedSettings.voiceConversationMode || 'brief',
    openSupportTicket: parsedSettings.openSupportTicket !== undefined ? parsedSettings.openSupportTicket : true,
    generateTranscript: parsedSettings.generateTranscript !== undefined ? parsedSettings.generateTranscript : true,
    enableAIRecommendations: parsedSettings.enableAIRecommendations || false,
    autoFixConfidenceThreshold: parsedSettings.autoFixConfidenceThreshold || 85,
    aiLearningDuration: parsedSettings.aiLearningDuration || '14',
  };

  useState(() => {
    if (parsedSettings.adminOrder) {
      setAdminOrder(parsedSettings.adminOrder);
    }
  });
  
  const form = useForm<AISettingsValues>({
    resolver: zodResolver(aiSettingsSchema),
    defaultValues,
  });
  
  const handleSave = (values: AISettingsValues) => {
    setIsSaving(true);
    
    setTimeout(() => {
      const settingsToSave = {
        ...values,
        adminOrder: adminOrder
      };
      localStorage.setItem('aiVoiceCallSettings', JSON.stringify(settingsToSave));
      
      setIsSaving(false);
      toast({
        title: "Settings saved",
        description: "AI & Automation settings have been updated successfully.",
      });
    }, 500);
  };

  const moveAdminUp = (id: string) => {
    const currentIndex = adminOrder.indexOf(id);
    if (currentIndex > 0) {
      const newOrder = [...adminOrder];
      [newOrder[currentIndex - 1], newOrder[currentIndex]] = [newOrder[currentIndex], newOrder[currentIndex - 1]];
      setAdminOrder(newOrder);
    }
  };

  const moveAdminDown = (id: string) => {
    const currentIndex = adminOrder.indexOf(id);
    if (currentIndex < adminOrder.length - 1 && currentIndex !== -1) {
      const newOrder = [...adminOrder];
      [newOrder[currentIndex], newOrder[currentIndex + 1]] = [newOrder[currentIndex + 1], newOrder[currentIndex]];
      setAdminOrder(newOrder);
    }
  };

  const handleAdminSelect = (selectedAdmins: string[]) => {
    form.setValue('adminCallRoster', selectedAdmins);
    
    const newOrder = adminOrder.filter(id => selectedAdmins.includes(id));
    const newAdmins = selectedAdmins.filter(id => !adminOrder.includes(id));
    setAdminOrder([...newOrder, ...newAdmins]);
  };

  const selectedAdmins = form.watch('adminCallRoster');
  const confidenceThreshold = form.watch('autoFixConfidenceThreshold');
  
  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground mb-6">
        Configure AI-powered analytics, automation rules, and machine learning parameters.
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
          <SettingsCard title="AI Voice Call Alerts">
            <FormField
              control={form.control}
              name="enableAIVoiceCalls"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Enable AI Voice Calls for Critical Events</FormLabel>
                    <FormDescription>
                      Allow system to make phone calls to administrators when critical events occur
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
          </SettingsCard>
          
          <SettingsCard title="Admin Call Roster">
            <div className="space-y-4">
              <FormItem>
                <FormLabel>Add Admins to Call List</FormLabel>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      {selectedAdmins.length > 0 
                        ? `${selectedAdmins.length} admin${selectedAdmins.length > 1 ? 's' : ''} selected` 
                        : 'Select administrators'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    {adminUsers.map(admin => (
                      <DropdownMenuCheckboxItem
                        key={admin.id}
                        checked={selectedAdmins.includes(admin.id)}
                        onCheckedChange={(checked) => {
                          const updated = checked 
                            ? [...selectedAdmins, admin.id]
                            : selectedAdmins.filter(id => id !== admin.id);
                          handleAdminSelect(updated);
                        }}
                      >
                        {admin.name}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <FormDescription>
                  Select administrators who should receive AI voice calls
                </FormDescription>
              </FormItem>
              
              {adminOrder.length > 0 && (
                <div>
                  <FormLabel>Set Call Priority Order</FormLabel>
                  <div className="mt-2 border rounded-md">
                    <ul className="divide-y">
                      {adminOrder.map((adminId, index) => {
                        const admin = adminUsers.find(a => a.id === adminId);
                        return admin ? (
                          <li key={admin.id} className="p-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">{index + 1}.</span>
                              <span>{admin.name}</span>
                            </div>
                            <div className="flex gap-1">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => moveAdminUp(admin.id)}
                                disabled={index === 0}
                              >
                                ↑
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => moveAdminDown(admin.id)}
                                disabled={index === adminOrder.length - 1}
                              >
                                ↓
                              </Button>
                            </div>
                          </li>
                        ) : null;
                      })}
                    </ul>
                  </div>
                  <FormDescription className="mt-2">
                    Drag and drop to change call priority order
                  </FormDescription>
                </div>
              )}
            </div>
          </SettingsCard>
          
          <SettingsCard title="Event Triggers for AI Calls">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="networkOutage"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Network Outage</FormLabel>
                      <FormDescription>
                        Trigger AI calls when network outages are detected
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="securityIntrusion"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Security Intrusion Alert</FormLabel>
                      <FormDescription>
                        Trigger AI calls when security intrusions are detected
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="hardwareFailure"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>CyberNest Hardware Failure</FormLabel>
                      <FormDescription>
                        Trigger AI calls when CyberNest hardware failures occur
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="highLatency"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>High Latency/Poor Performance</FormLabel>
                      <FormDescription>
                        Trigger AI calls when system performance degrades significantly
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="customEvents"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Custom Events</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter custom events, one per line"
                        className="resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Define custom events that should trigger AI calls
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
          </SettingsCard>
          
          <SettingsCard title="AI Call Behavior Settings">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="retryCallsOnNoAnswer"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Retry Calls if No Answer</FormLabel>
                      <FormDescription>
                        Automatically retry calling administrators if no one answers
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
                name="callEscalationPolicy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Call Escalation Policy</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select escalation policy" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Escalate After 1 Missed Call</SelectItem>
                        <SelectItem value="2">Escalate After 2 Missed Calls</SelectItem>
                        <SelectItem value="3">Escalate After 3 Missed Calls</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Determine when to escalate to the next admin in the call list
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
          </SettingsCard>
          
          <SettingsCard title="AI Voice Conversation Mode">
            <FormField
              control={form.control}
              name="voiceConversationMode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Voice Conversation Mode</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select voice mode" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="brief">Brief Summary Mode</SelectItem>
                      <SelectItem value="interactive">Interactive Q&A Mode</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Brief mode provides a quick summary while interactive mode allows for questions
                  </FormDescription>
                </FormItem>
              )}
            />
          </SettingsCard>
          
          <SettingsCard title="AI-Generated Fixes">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="enableAIRecommendations"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Enable AI Recommendations</FormLabel>
                      <FormDescription>
                        Allow AI to analyze system issues and suggest or automatically implement fixes
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
                name="autoFixConfidenceThreshold"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confidence Threshold for Auto-Fixes</FormLabel>
                    <div className="space-y-2">
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <div className="flex flex-col space-y-1">
                        <div className="text-sm text-muted-foreground">
                          Current: {confidenceThreshold}%
                        </div>
                        <Progress value={confidenceThreshold} className="h-2" />
                      </div>
                    </div>
                    <FormDescription>
                      AI will only auto-implement fixes when confidence level meets or exceeds this threshold (%)
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
          </SettingsCard>
          
          <SettingsCard title="AI Self-Learning Period">
            <FormField
              control={form.control}
              name="aiLearningDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Learning Duration Before Auto-Fixing New Issues</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select learning period" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="7">7 Days</SelectItem>
                      <SelectItem value="14">14 Days</SelectItem>
                      <SelectItem value="30">30 Days</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Period the AI will observe and learn about new issues before attempting to auto-fix them
                  </FormDescription>
                </FormItem>
              )}
            />
          </SettingsCard>
          
          <SettingsCard title="Integration with Incident Response">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="openSupportTicket"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Allow AI to Open a Support Ticket After Call</FormLabel>
                      <FormDescription>
                        Automatically create a support ticket after AI voice calls
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
                name="generateTranscript"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Generate Call Transcript & Send to Admins</FormLabel>
                      <FormDescription>
                        Create a written record of AI voice calls and email to all administrators
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
          </SettingsCard>
          
          <div className="flex justify-end pt-4 border-t">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AISettings;
