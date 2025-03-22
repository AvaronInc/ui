
import { useState } from 'react';
import { BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

interface AIAssistantTabProps {
  openSummaryDialog: () => void;
}

const AIAssistantTab = ({ openSummaryDialog }: AIAssistantTabProps) => {
  const [aimChatbotEnabled, setAimChatbotEnabled] = useState(false);
  const { toast } = useToast();
  
  const handleToggleChatbot = (checked: boolean) => {
    setAimChatbotEnabled(checked);
    toast({
      title: checked ? "AI Assistant enabled" : "AI Assistant disabled",
      description: checked 
        ? "AIM Chatbot will now respond to questions in this conversation."
        : "AIM Chatbot has been disabled for this conversation.",
    });
  };
  
  return (
    <div className="p-3 space-y-4">
      <div className="flex items-center space-x-2">
        <BrainCircuit className="h-5 w-5 text-blue-500" />
        <h3 className="font-semibold">AI Assistant</h3>
      </div>
      
      <div className="rounded-lg border bg-muted/20 p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="/placeholder.svg" alt="AIM" />
              <AvatarFallback>AIM</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">AIM Chatbot</span>
          </div>
          <Switch
            checked={aimChatbotEnabled}
            onCheckedChange={handleToggleChatbot}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {aimChatbotEnabled 
            ? "AIM Chatbot is active and can answer questions about the platform." 
            : "Enable AIM Chatbot to get answers to your questions within this chat."}
        </p>
      </div>
      
      <div className="rounded-lg border bg-muted/20 p-3">
        <p className="text-sm mb-3">Use AI to summarize discussions and highlight key points.</p>
        <Button className="w-full" variant="outline" onClick={openSummaryDialog}>
          Summarize Conversation
        </Button>
      </div>
      
      <div className="rounded-lg border bg-muted/20 p-3">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm font-medium">Action Items</h4>
          <Button variant="ghost" size="sm" className="h-7 text-xs">
            Extract All
          </Button>
        </div>
        <div className="space-y-2">
          <div className="text-xs p-2 bg-background rounded border">
            <p className="font-medium">Review firewall configs</p>
            <p className="text-muted-foreground mt-0.5">Assigned to: Alex</p>
          </div>
          <div className="text-xs p-2 bg-background rounded border">
            <p className="font-medium">Update security protocols</p>
            <p className="text-muted-foreground mt-0.5">Due: Tomorrow</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantTab;
