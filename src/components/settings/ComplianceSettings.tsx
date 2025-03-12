
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const ComplianceSettings = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Compliance & Legal settings have been updated successfully.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground">
        Configure compliance frameworks, legal requirements, policy enforcement, and audit settings.
      </div>
      
      <div className="flex justify-end pt-4 border-t">
        <Button onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default ComplianceSettings;
