
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Shield, Users, Fingerprint, Lock, ShieldAlert } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { switchSecuritySchema, SwitchSecurityValues } from './security/types';
import RBACTab from './security/RBACTab';
import MicrosegmentationTab from './security/MicrosegmentationTab';
import AnomalyDetectionTab from './security/AnomalyDetectionTab';
import EncryptionTab from './security/EncryptionTab';

interface VirtualSwitchSecurityDialogProps {
  open: boolean;
  onClose: () => void;
  selectedSwitch: string | null;
  onApply: (values: SwitchSecurityValues) => void;
}

const VirtualSwitchSecurityDialog: React.FC<VirtualSwitchSecurityDialogProps> = ({
  open,
  onClose,
  selectedSwitch,
  onApply
}) => {
  const { toast } = useToast();
  const form = useForm<SwitchSecurityValues>({
    resolver: zodResolver(switchSecuritySchema),
    defaultValues: {
      rbacEnabled: true,
      allowedRoles: ['Admin', 'Engineer'],
      microsegmentationEnabled: false,
      securityZones: [],
      autoQuarantine: true,
      anomalyDetection: true,
      alertThreshold: 'medium',
      encryptionEnabled: true,
      encryptionType: 'wireguard',
      kyberEncryption: true,
    }
  });
  
  const onSubmit = (values: SwitchSecurityValues) => {
    onApply(values);
    toast({
      title: "Security Settings Applied",
      description: `Security configuration for "${selectedSwitch}" has been updated.`
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Shield className="mr-2 h-5 w-5 text-primary" />
            Virtual Switch Security & Access Control
            {selectedSwitch && (
              <Badge variant="outline" className="ml-2">
                {selectedSwitch}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[60vh] pr-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <Tabs defaultValue="rbac">
                <TabsList className="mb-4">
                  <TabsTrigger value="rbac" className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    RBAC
                  </TabsTrigger>
                  <TabsTrigger value="segmentation" className="flex items-center">
                    <Lock className="mr-2 h-4 w-4" />
                    Microsegmentation
                  </TabsTrigger>
                  <TabsTrigger value="anomaly" className="flex items-center">
                    <ShieldAlert className="mr-2 h-4 w-4" />
                    Anomaly Detection
                  </TabsTrigger>
                  <TabsTrigger value="encryption" className="flex items-center">
                    <Fingerprint className="mr-2 h-4 w-4" />
                    Encryption
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="rbac">
                  <RBACTab control={form.control} />
                </TabsContent>
                
                <TabsContent value="segmentation">
                  <MicrosegmentationTab control={form.control} />
                </TabsContent>
                
                <TabsContent value="anomaly">
                  <AnomalyDetectionTab control={form.control} />
                </TabsContent>
                
                <TabsContent value="encryption">
                  <EncryptionTab control={form.control} watch={form.watch} />
                </TabsContent>
              </Tabs>
              
              <DialogFooter className="mt-6">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">
                  Apply Security Settings
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default VirtualSwitchSecurityDialog;
