
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useStorageSettings } from './storage/useStorageSettings';
import MinioCredentials from './storage/MinioCredentials';
import StorageAccessControl from './storage/StorageAccessControl';
import ProtectionFeatures from './storage/ProtectionFeatures';
import S3BucketConnection from './storage/S3BucketConnection';
import RetentionPolicy from './storage/RetentionPolicy';
import { useIsMobile } from '@/hooks/use-mobile';

const StorageSettings = () => {
  const { form, handleSave } = useStorageSettings();
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Storage Configuration</CardTitle>
          <CardDescription>
            Configure MinIO integration, storage quotas, retention policies, and access controls.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="credentials" className="space-y-4">
            <div className="overflow-x-auto pb-2">
              <TabsList className="inline-flex min-w-full sm:grid sm:grid-cols-4">
                <TabsTrigger value="credentials">{isMobile ? "Creds" : "Credentials"}</TabsTrigger>
                <TabsTrigger value="quotas">{isMobile ? "Quotas" : "Quotas & Retention"}</TabsTrigger>
                <TabsTrigger value="protection">{isMobile ? "Protect" : "Protection"}</TabsTrigger>
                <TabsTrigger value="external">{isMobile ? "External" : "External Storage"}</TabsTrigger>
              </TabsList>
            </div>
            
            <Form {...form}>
              <form className="space-y-6 sm:space-y-8">
                <TabsContent value="credentials">
                  <MinioCredentials form={form} />
                </TabsContent>
                
                <TabsContent value="quotas">
                  <div className="space-y-6">
                    <StorageAccessControl form={form} />
                    <RetentionPolicy form={form} />
                  </div>
                </TabsContent>
                
                <TabsContent value="protection">
                  <ProtectionFeatures form={form} />
                </TabsContent>
                
                <TabsContent value="external">
                  <S3BucketConnection 
                    form={form} 
                    visible={true}
                  />
                </TabsContent>
              </form>
            </Form>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="flex justify-end pt-4 border-t">
        <Button onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default StorageSettings;
