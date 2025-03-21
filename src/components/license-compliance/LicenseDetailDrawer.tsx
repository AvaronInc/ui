
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ExternalLink, FileText, Package, Shield, Code, Flag } from 'lucide-react';
import { LicenseData } from './types';
import { toast } from 'sonner';

interface LicenseDetailDrawerProps {
  license: LicenseData;
  onClose: () => void;
}

const LicenseDetailDrawer: React.FC<LicenseDetailDrawerProps> = ({ license, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const getRiskBadgeClass = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'Medium':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'High':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const handleFlagForReview = () => {
    toast.success(`${license.componentName} has been flagged for legal review`);
  };
  
  return (
    <Sheet open={!!license} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex justify-between items-center">
            <span>{license.componentName}</span>
            <Badge variant="outline" className={getRiskBadgeClass(license.riskLevel)}>
              {license.riskLevel} Risk
            </Badge>
          </SheetTitle>
          <SheetDescription>
            Version: {license.version} • License: {license.licenseType}
          </SheetDescription>
        </SheetHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="license">License Text</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">License Information</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <span>Type: {license.licenseType}</span>
                    <a 
                      href={license.licenseUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center ml-2 text-primary hover:underline"
                    >
                      View Source <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Package className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Used In Components</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {license.usedIn.map((location, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {location}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Risk Assessment</p>
                  <p className="text-xs text-muted-foreground">
                    {license.riskLevel === 'Low' && 'Permissive license with minimal restrictions'}
                    {license.riskLevel === 'Medium' && 'Copyleft license with some restrictions'}
                    {license.riskLevel === 'High' && 'Strict copyleft with significant restrictions'}
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start gap-3">
                <Code className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Usage Details</p>
                  {license.usageDetails && (
                    <div className="space-y-2 mt-2">
                      {license.usageDetails.containerName && (
                        <div>
                          <p className="text-xs font-medium">Container</p>
                          <p className="text-xs text-muted-foreground">{license.usageDetails.containerName}</p>
                        </div>
                      )}
                      
                      {license.usageDetails.dependencies && license.usageDetails.dependencies.length > 0 && (
                        <div>
                          <p className="text-xs font-medium">Dependencies</p>
                          <p className="text-xs text-muted-foreground">
                            {license.usageDetails.dependencies.join(', ')}
                          </p>
                        </div>
                      )}
                      
                      {license.usageDetails.apiCalls && license.usageDetails.apiCalls.length > 0 && (
                        <div>
                          <p className="text-xs font-medium">API Usage</p>
                          <p className="text-xs text-muted-foreground">
                            {license.usageDetails.apiCalls.join(', ')}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="license" className="mt-4">
            <div className="border rounded-md p-4 bg-muted/50">
              <pre className="text-xs whitespace-pre-wrap font-mono">
                {license.fullLicenseText || 'Full license text not available'}
              </pre>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-between mt-8">
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
          
          <Button 
            variant="secondary" 
            className="flex items-center gap-2"
            onClick={handleFlagForReview}
          >
            <Flag className="h-4 w-4" />
            Flag for Review
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default LicenseDetailDrawer;
