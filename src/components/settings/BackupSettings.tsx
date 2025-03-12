
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const BackupSettings = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Backup & Disaster Recovery settings have been updated successfully.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground">
        Configure backup schedules, storage locations, retention policies, and disaster recovery procedures.
      </div>
      
      <div className="flex justify-end pt-4 border-t">
        <Button onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default BackupSettings;
