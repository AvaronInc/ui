
import React from 'react';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { useForm } from 'react-hook-form';

const RecoveryStrategy = () => {
  const recoveryStrategyForm = useForm({
    defaultValues: {
      recoveryStrategy: "restart"
    }
  });
  
  const aiLearningForm = useForm({
    defaultValues: {
      aiLearning: "active"
    }
  });
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Recovery Strategy</h3>
        <Form {...recoveryStrategyForm}>
          <FormField
            control={recoveryStrategyForm.control}
            name="recoveryStrategy"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup 
                    onValueChange={field.onChange} 
                    defaultValue={field.value || "restart"} 
                    className="space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="restart" id="r1" />
                      <FormLabel htmlFor="r1">Restart Container</FormLabel>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="redeploy" id="r2" />
                      <FormLabel htmlFor="r2">Redeploy Container</FormLabel>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="escalate" id="r3" />
                      <FormLabel htmlFor="r3">Restart, then Redeploy</FormLabel>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ai" id="r4" />
                      <FormLabel htmlFor="r4">AI-Driven Recovery</FormLabel>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormDescription>
                  Select how containers should be recovered upon failure.
                </FormDescription>
              </FormItem>
            )}
          />
        </Form>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Failure Response</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch id="notify-failure" defaultChecked />
            <label htmlFor="notify-failure" className="text-sm">Send Alerts</label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="log-failure" defaultChecked />
            <label htmlFor="log-failure" className="text-sm">Log Events</label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="create-ticket" defaultChecked />
            <label htmlFor="create-ticket" className="text-sm">Create Ticket</label>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Configure actions to take when auto-healing is triggered.
        </p>
      </div>
      
      <div className="space-y-2 mt-8">
        <h3 className="text-sm font-medium">AI Learning Strategy</h3>
        <Form {...aiLearningForm}>
          <FormField
            control={aiLearningForm.control}
            name="aiLearning"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup 
                    onValueChange={field.onChange}
                    defaultValue={field.value || "active"} 
                    className="space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="passive" id="ai1" />
                      <FormLabel htmlFor="ai1">Passive Learning Only</FormLabel>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="suggest" id="ai2" />
                      <FormLabel htmlFor="ai2">Suggest Optimizations</FormLabel>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="active" id="ai3" />
                      <FormLabel htmlFor="ai3">Automatic Optimization</FormLabel>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormDescription>
                  Define how the AI system optimizes containers.
                </FormDescription>
              </FormItem>
            )}
          />
        </Form>
      </div>
    </div>
  );
};

export default RecoveryStrategy;
