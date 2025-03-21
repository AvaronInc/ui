
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Download, RefreshCw, Flag, FileText, RotateCw } from 'lucide-react';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';

const LicenseComplianceActions: React.FC = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateProgress, setUpdateProgress] = useState(0);

  const handleExportPDF = () => {
    toast.success('Exporting license report as PDF');
    // In a real implementation, this would trigger a PDF download
  };
  
  const handleExportCSV = () => {
    toast.success('Exporting license data as CSV');
    // In a real implementation, this would trigger a CSV download
  };
  
  const handleRescan = () => {
    toast.success('License dependency scan started');
    // In a real implementation, this would trigger a new scan
  };
  
  const handleFlagForReview = () => {
    toast('Select licenses to flag for legal review', {
      description: 'This feature is not implemented in the demo',
    });
    // In a real implementation, this would open a dialog to select licenses for review
  };

  const handleCheckForUpdates = () => {
    toast('Checking for license updates...', {
      description: 'This may take a few moments'
    });
    
    setIsUpdating(true);
    setUpdateProgress(0);
    
    // Simulate an update process
    const interval = setInterval(() => {
      setUpdateProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsUpdating(false);
          toast.success('License information updated', {
            description: '2 licenses have newer versions available'
          });
          return 100;
        }
        return newProgress;
      });
    }, 500);
  };
  
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">License Actions</h3>
      
      <div className="grid grid-cols-2 gap-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                onClick={handleExportPDF}
                variant="outline" 
                className="w-full flex items-center justify-center gap-2"
              >
                <FileText className="h-4 w-4" />
                <span>PDF</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Export as PDF report</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                onClick={handleExportCSV}
                variant="outline" 
                className="w-full flex items-center justify-center gap-2"
              >
                <Download className="h-4 w-4" />
                <span>CSV</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Export data as CSV</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                onClick={handleRescan}
                variant="secondary" 
                className="w-full flex items-center justify-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Rescan</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Scan dependencies for new licenses</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                onClick={handleFlagForReview}
                variant="secondary" 
                className="w-full flex items-center justify-center gap-2"
              >
                <Flag className="h-4 w-4" />
                <span>Review</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Flag licenses for legal review</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              onClick={handleCheckForUpdates}
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
              disabled={isUpdating}
            >
              <RotateCw className={`h-4 w-4 ${isUpdating ? 'animate-spin' : ''}`} />
              <span>Check for Updates</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Check for license updates</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      {isUpdating && (
        <div className="space-y-1">
          <Progress value={updateProgress} className="h-2" />
          <p className="text-xs text-muted-foreground text-center">
            Updating license information...
          </p>
        </div>
      )}
      
      <p className="text-xs text-muted-foreground mt-2">
        Last scan: 2 days ago
      </p>
    </div>
  );
};

export default LicenseComplianceActions;

