
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import AlertDeliveryMethods from './notification/AlertDeliveryMethods';
import EscalationPolicies from './notification/EscalationPolicies';
import { useNotificationSettings } from './notification/useNotificationSettings';

const NotificationSettings = () => {
  const { form, handleSave } = useNotificationSettings();
  
  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground mb-6">
        Configure notification channels, alert thresholds, and delivery preferences.
      </div>
      
      <Form {...form}>
        <form className="space-y-8">
          {/* Alert Delivery Methods */}
          <AlertDeliveryMethods form={form} />
          
          {/* Escalation Policies */}
          <EscalationPolicies form={form} />
        </form>
      </Form>
      
      <div className="flex justify-end pt-4 border-t">
        <Button onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default NotificationSettings;
