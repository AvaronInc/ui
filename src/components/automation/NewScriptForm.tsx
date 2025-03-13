
import React, { useState } from 'react';
import { 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { Brain, User, FileCode, Zap } from 'lucide-react';
import { NewScriptFormData, Script, ScriptType } from '@/types/automation';

interface NewScriptFormProps {
  onSubmit: (data: Partial<Script>) => void;
  onCancel: () => void;
  initialData?: Partial<NewScriptFormData>;
}

const NewScriptForm = ({ onSubmit, onCancel, initialData }: NewScriptFormProps) => {
  const [generateWithAI, setGenerateWithAI] = useState(initialData?.generateWithAI || false);
  
  const form = useForm<NewScriptFormData>({
    defaultValues: {
      name: initialData?.name || '',
      createdBy: initialData?.createdBy || 'Current User',
      description: initialData?.description || '',
      generateWithAI: initialData?.generateWithAI || false,
      type: initialData?.type || 'PowerShell',
    }
  });
  
  const handleSubmit = (data: NewScriptFormData) => {
    const scriptData: Partial<Script> = {
      name: data.name,
      createdBy: data.createdBy,
      description: data.description,
      type: data.type,
      status: 'Active',
      executionFrequency: 'One-Time',
      lastExecutionDate: 'Never',
      content: data.generateWithAI ? '# AI generated content will appear here' : '# Add your code here'
    };
    
    onSubmit(scriptData);
  };
  
  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center">
          <FileCode className="mr-2 h-5 w-5 text-primary" />
          Create New Script
        </DialogTitle>
        <DialogDescription>
          Fill in the details below to create a new automation script.
        </DialogDescription>
      </DialogHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Script Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter script name" 
                    {...field} 
                    required
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="createdBy"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <User className="h-4 w-4 mr-1 text-muted-foreground" />
                  Created By
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    disabled 
                    className="bg-muted"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe what this script does..." 
                    {...field} 
                    rows={3}
                    required
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="generateWithAI"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel className="flex items-center">
                    <Brain className="h-4 w-4 mr-1 text-muted-foreground" />
                    Generate Script with AI
                  </FormLabel>
                  <FormDescription>
                    Let AI create a script based on your description
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      setGenerateWithAI(checked);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          {generateWithAI && (
            <div className="rounded-md bg-muted p-3">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Brain className="h-4 w-4" />
                <span className="text-sm font-medium">AI will generate a script based on your description</span>
              </div>
            </div>
          )}
          
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" className="gap-1">
              <Zap className="h-4 w-4" />
              {generateWithAI ? 'Generate Script with AI' : 'Create Script'}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};

export default NewScriptForm;
