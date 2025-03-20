
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Settings, Trash2, LinkIcon, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SwitchActionButtonsProps {
  selectedSwitch: string | null;
  onCreateSwitch: () => void;
  onModifySwitch: () => void;
  onDeleteSwitch: () => void;
  onAttachVLAN: () => void;
  onSecuritySettings: () => void;
}

const SwitchActionButtons: React.FC<SwitchActionButtonsProps> = ({
  selectedSwitch,
  onCreateSwitch,
  onModifySwitch,
  onDeleteSwitch,
  onAttachVLAN,
  onSecuritySettings
}) => {
  const { toast } = useToast();

  const handleModifySwitch = () => {
    if (!selectedSwitch) {
      toast({
        title: "No Switch Selected",
        description: "Please select a virtual switch to modify",
        variant: "destructive"
      });
      return;
    }
    onModifySwitch();
  };

  const handleDeleteSwitch = () => {
    if (!selectedSwitch) {
      toast({
        title: "No Switch Selected",
        description: "Please select a virtual switch to delete",
        variant: "destructive"
      });
      return;
    }
    onDeleteSwitch();
  };

  const handleAttachVLAN = () => {
    if (!selectedSwitch) {
      toast({
        title: "No Switch Selected",
        description: "Please select a virtual switch to attach VLANs",
        variant: "destructive"
      });
      return;
    }
    onAttachVLAN();
  };

  const handleSecuritySettings = () => {
    if (!selectedSwitch) {
      toast({
        title: "No Switch Selected",
        description: "Please select a virtual switch to configure security",
        variant: "destructive"
      });
      return;
    }
    onSecuritySettings();
  };

  return (
    <div className="flex space-x-2">
      <Button onClick={onCreateSwitch} className="flex items-center">
        <Plus className="mr-2 h-4 w-4" />
        Create Switch
      </Button>
      <Button 
        variant="outline" 
        onClick={handleModifySwitch} 
        disabled={!selectedSwitch}
        className="flex items-center"
      >
        <Settings className="mr-2 h-4 w-4" />
        Modify
      </Button>
      <Button 
        variant="outline" 
        onClick={handleDeleteSwitch} 
        disabled={!selectedSwitch}
        className="flex items-center"
      >
        <Trash2 className="mr-2 h-4 w-4" />
        Delete
      </Button>
      <Button 
        variant="outline" 
        onClick={handleAttachVLAN} 
        disabled={!selectedSwitch}
        className="flex items-center"
      >
        <LinkIcon className="mr-2 h-4 w-4" />
        Attach VLANs
      </Button>
      <Button 
        variant="outline" 
        onClick={handleSecuritySettings} 
        disabled={!selectedSwitch}
        className="flex items-center"
      >
        <Shield className="mr-2 h-4 w-4" />
        Security
      </Button>
    </div>
  );
};

export default SwitchActionButtons;
