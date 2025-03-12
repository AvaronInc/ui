
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const StorageSettings = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "File Storage settings have been updated successfully.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground">
        Configure MinIO integration, storage quotas, retention policies, and access controls.
      </div>
      
      <div className="flex justify-end pt-4 border-t">
        <Button onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default StorageSettings;
