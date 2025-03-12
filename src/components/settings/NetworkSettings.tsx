
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const NetworkSettings = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Network & Infrastructure settings have been updated successfully.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground">
        Configure network topology visualization, diagnostics thresholds, and infrastructure monitoring.
      </div>
      
      <div className="flex justify-end pt-4 border-t">
        <Button onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default NetworkSettings;
