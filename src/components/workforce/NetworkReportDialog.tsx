
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { FileText, Download, Calendar, ChevronRight } from 'lucide-react';

interface NetworkReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NetworkReportDialog = ({ open, onOpenChange }: NetworkReportDialogProps) => {
  const { toast } = useToast();
  const [reportFormat, setReportFormat] = useState('pdf');
  const [selectedSections, setSelectedSections] = useState({
    deviceInventory: true,
    securityCompliance: true,
    softwareUpdates: true,
    vpnConnections: true,
    userActivity: false,
  });
  
  const toggleSection = (section: keyof typeof selectedSections) => {
    setSelectedSections({
      ...selectedSections,
      [section]: !selectedSections[section],
    });
  };
  
  const handleGenerateReport = () => {
    toast({
      title: 'Report Generation Started',
      description: 'Your workforce report is being prepared and will be available shortly.',
    });
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Generate Workforce Report
          </DialogTitle>
          <DialogDescription>
            Create a customized report with your selected parameters
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-6">
          <div>
            <h4 className="text-sm font-medium mb-3">Report Type</h4>
            <RadioGroup value={reportFormat} onValueChange={setReportFormat} className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pdf" id="pdf" />
                <Label htmlFor="pdf" className="flex items-center cursor-pointer">
                  <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>PDF Report</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="csv" id="csv" />
                <Label htmlFor="csv" className="flex items-center cursor-pointer">
                  <Download className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>CSV Export</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-3">Time Range</h4>
            <RadioGroup defaultValue="30days" className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="7days" id="7days" />
                <Label htmlFor="7days" className="cursor-pointer">Last 7 days</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="30days" id="30days" />
                <Label htmlFor="30days" className="cursor-pointer">Last 30 days</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="90days" id="90days" />
                <Label htmlFor="90days" className="cursor-pointer">Last 90 days</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-3">Include Sections</h4>
            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="deviceInventory" 
                  checked={selectedSections.deviceInventory}
                  onCheckedChange={() => toggleSection('deviceInventory')}
                />
                <Label htmlFor="deviceInventory" className="cursor-pointer">Device Inventory & Status</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="securityCompliance" 
                  checked={selectedSections.securityCompliance}
                  onCheckedChange={() => toggleSection('securityCompliance')}
                />
                <Label htmlFor="securityCompliance" className="cursor-pointer">Security & Compliance Status</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="softwareUpdates" 
                  checked={selectedSections.softwareUpdates}
                  onCheckedChange={() => toggleSection('softwareUpdates')}
                />
                <Label htmlFor="softwareUpdates" className="cursor-pointer">Software Updates & Patching</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="vpnConnections" 
                  checked={selectedSections.vpnConnections}
                  onCheckedChange={() => toggleSection('vpnConnections')}
                />
                <Label htmlFor="vpnConnections" className="cursor-pointer">VPN Connections History</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="userActivity" 
                  checked={selectedSections.userActivity}
                  onCheckedChange={() => toggleSection('userActivity')}
                />
                <Label htmlFor="userActivity" className="cursor-pointer">User Activity & Login Patterns</Label>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleGenerateReport}
            className="flex items-center"
          >
            Generate Report <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NetworkReportDialog;
