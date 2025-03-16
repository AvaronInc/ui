
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileText, File, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { EmailSecuritySettings } from '@/types/emailSecurity';

interface EmailSecurityHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleExport: (format: 'pdf' | 'json') => void;
  isSaving: boolean;
  onSave: (values: EmailSecuritySettings) => void;
  formValues: EmailSecuritySettings;
}

const EmailSecurityHeader = ({
  searchQuery,
  setSearchQuery,
  handleExport,
  isSaving,
  onSave,
  formValues
}: EmailSecurityHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="relative w-72">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search settings..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          onClick={() => handleExport('pdf')}
          className="flex items-center gap-2"
        >
          <FileText className="h-4 w-4" />
          Export PDF
        </Button>
        <Button 
          variant="outline" 
          onClick={() => handleExport('json')}
          className="flex items-center gap-2"
        >
          <File className="h-4 w-4" />
          Export JSON
        </Button>
        <Button 
          type="submit" 
          onClick={() => onSave(formValues)} 
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
};

export default EmailSecurityHeader;
