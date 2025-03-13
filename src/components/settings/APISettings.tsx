
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import ApiAccessControl from './api/ApiAccessControl';
import AllowedIps from './api/AllowedIps';
import { useApiSettings } from './api/useApiSettings';

const APISettings = () => {
  const { form, handleSave, handleGenerateApiKey, handleRemoveApiKey } = useApiSettings();
  
  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground mb-6">
        Configure API access, rate limits, keys, and third-party integrations.
      </div>
      
      <Form {...form}>
        <form className="space-y-8">
          {/* API Access Control */}
          <ApiAccessControl 
            form={form} 
            onGenerateApiKey={handleGenerateApiKey} 
            onRemoveApiKey={handleRemoveApiKey}
          />
          
          {/* Allowed IPs for API Access */}
          <AllowedIps form={form} />
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

export default APISettings;
