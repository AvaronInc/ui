
import React from 'react';
import { Button } from '@/components/ui/button';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Download, RefreshCw, Flag, FileText } from 'lucide-react';
import { toast } from 'sonner';

const LicenseComplianceActions: React.FC = () => {
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
      
      <p className="text-xs text-muted-foreground mt-2">
        Last scan: 2 days ago
      </p>
    </div>
  );
};

export default LicenseComplianceActions;
