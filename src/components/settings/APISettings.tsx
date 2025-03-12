
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const APISettings = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "API & Integration settings have been updated successfully.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground">
        Configure API access, rate limits, keys, and third-party integrations.
      </div>
      
      <div className="flex justify-end pt-4 border-t">
        <Button onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default APISettings;
