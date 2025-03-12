
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const WorkforceSettings = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Workforce EMS settings have been updated successfully.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground">
        Configure VPN settings, endpoint management policies, and device monitoring parameters.
      </div>
      
      <div className="flex justify-end pt-4 border-t">
        <Button onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default WorkforceSettings;
