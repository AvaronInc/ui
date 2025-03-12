
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const SecuritySettings = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Security & Compliance settings have been updated successfully.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground">
        Configure Wazuh integration, security policies, and compliance monitoring.
      </div>
      
      <div className="flex justify-end pt-4 border-t">
        <Button onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default SecuritySettings;
