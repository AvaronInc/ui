
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useStorageSettings } from './storage/useStorageSettings';
import MinioCredentials from './storage/MinioCredentials';
import StorageAccessControl from './storage/StorageAccessControl';
import ProtectionFeatures from './storage/ProtectionFeatures';
import S3BucketConnection from './storage/S3BucketConnection';
import RetentionPolicy from './storage/RetentionPolicy';

const StorageSettings = () => {
  const { form, handleSave } = useStorageSettings();
  
  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground mb-6">
        Configure MinIO integration, storage quotas, retention policies, and access controls.
      </div>
      
      <Form {...form}>
        <form className="space-y-8">
          {/* MinIO Credentials Section */}
          <MinioCredentials form={form} />
          
          {/* Storage & Access Control Section */}
          <StorageAccessControl form={form} />
          
          {/* Protection Features Section */}
          <ProtectionFeatures form={form} />
          
          {/* S3 Bucket Connection (conditional display) */}
          <S3BucketConnection 
            form={form} 
            visible={form.watch('enableRansomwareProtection')} 
          />
          
          {/* Retention Policy Section */}
          <RetentionPolicy form={form} />
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

export default StorageSettings;
