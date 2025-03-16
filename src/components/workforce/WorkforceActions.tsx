
import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { FileText, RefreshCw, Shield, Settings, ChevronDown, Lock, Download, DownloadCloud, Users } from 'lucide-react';

interface WorkforceActionsProps {
  onGenerateReport: () => void;
  isAdmin: boolean;
}

const WorkforceActions = ({ onGenerateReport, isAdmin }: WorkforceActionsProps) => {
  if (!isAdmin) {
    return (
      <Button 
        variant="outline" 
        onClick={onGenerateReport}
        className="flex items-center gap-2"
      >
        <FileText className="h-4 w-4" />
        Generate Report
      </Button>
    );
  }
  
  return (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        onClick={onGenerateReport}
        className="flex items-center gap-2"
      >
        <FileText className="h-4 w-4" />
        Generate Report
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="flex items-center gap-1">
            Actions <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[220px]">
          <DropdownMenuLabel>Endpoint Management</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
            <RefreshCw className="h-4 w-4" /> Push Security Updates
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
            <Shield className="h-4 w-4" /> Run Security Audit
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
            <Lock className="h-4 w-4" /> Force MFA for All Users
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Reporting</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
            <Download className="h-4 w-4" /> Export Device Inventory
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
            <Users className="h-4 w-4" /> User Access Report
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
            <DownloadCloud className="h-4 w-4" /> Compliance Export
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
            <Settings className="h-4 w-4" /> Configure Policies
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default WorkforceActions;
