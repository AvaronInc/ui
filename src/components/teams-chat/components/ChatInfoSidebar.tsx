
import { useState } from 'react';
import { Hash, Lock, Pin, Users, Star, Shield, BrainCircuit, Check, X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { ActiveConversation } from '../types';
import UserStatusIndicator from './UserStatusIndicator';
import ChatMessage from './ChatMessage';

interface ChatInfoSidebarProps {
  activeConversation: ActiveConversation;
  sendMessage?: (content: string) => void;
}

const ChatInfoSidebar = ({ activeConversation, sendMessage }: ChatInfoSidebarProps) => {
  const [activeTab, setActiveTab] = useState('info');
  const [aimChatbotEnabled, setAimChatbotEnabled] = useState(false);
  const [summaryDialogOpen, setSummaryDialogOpen] = useState(false);
  const [discussionPoints, setDiscussionPoints] = useState<{ id: string; content: string; selected: boolean }[]>([
    { id: '1', content: 'Firewall configuration needs to be updated before next week.', selected: false },
    { id: '2', content: 'Alex will handle the security audit scheduled for Friday.', selected: false },
    { id: '3', content: 'Network monitoring tools should be upgraded to version 3.5.', selected: false },
    { id: '4', content: 'New API credentials will be distributed by the end of day.', selected: false },
    { id: '5', content: 'Team agreed to implement zero trust model in Q3 roadmap.', selected: false },
  ]);
  const { toast } = useToast();
  
  const { type, data, team } = activeConversation;
  const isChannel = type === 'channel';
  
  // Get pinned messages (for demonstration, just get the first message if it exists)
  const messages = isChannel ? (data as any).messages : (data as any).messages;
  const pinnedMessages = messages.filter((msg: any) => msg.isPinned);
  
  // Get members
  const members = isChannel ? (data as any).members : [(data as any).recipient];
  
  const togglePointSelection = (id: string) => {
    setDiscussionPoints(points => 
      points.map(point => 
        point.id === id 
          ? { ...point, selected: !point.selected } 
          : point
      )
    );
  };
  
  const insertSelectedPoints = () => {
    const selectedPoints = discussionPoints.filter(point => point.selected);
    
    if (selectedPoints.length === 0) {
      toast({
        title: "No points selected",
        description: "Please select at least one discussion point to include.",
      });
      return;
    }
    
    if (sendMessage) {
      const summary = "**Discussion Summary:**\n" + 
        selectedPoints.map(point => `• ${point.content}`).join('\n');
      
      sendMessage(summary);
      
      toast({
        title: "Summary added to chat",
        description: `Added ${selectedPoints.length} discussion points to the conversation.`,
      });
      
      // Reset selections
      setDiscussionPoints(points => points.map(point => ({ ...point, selected: false })));
      setSummaryDialogOpen(false);
    } else {
      toast({
        title: "Cannot send message",
        description: "Message sending functionality is not available.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="w-64 min-w-64 border-l flex flex-col h-full bg-background">
      <div className="p-3 border-b flex items-center">
        <div className="flex-1">
          <h3 className="font-medium">Channel Info</h3>
        </div>
      </div>
      
      <Tabs defaultValue="info" className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-3 mx-3 mt-3">
          <TabsTrigger value="info">Info</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="ai">AI</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info" className="flex-1 flex flex-col">
          <div className="p-3 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                {isChannel ? (
                  (data as any).isPrivate ? (
                    <Lock className="h-5 w-5" />
                  ) : (
                    <Hash className="h-5 w-5" />
                  )
                ) : (
                  <div className="relative">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={(data as any).recipient.avatar} />
                      <AvatarFallback>
                        {(data as any).recipient.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <UserStatusIndicator 
                      status={(data as any).recipient.status} 
                      className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 ring-2 ring-background" 
                    />
                  </div>
                )}
                <h3 className="font-semibold">
                  {isChannel ? (data as any).name : (data as any).recipient.name}
                </h3>
              </div>
              
              {isChannel && (
                <div className="text-sm text-muted-foreground">
                  <p>{(data as any).topic || 'No topic set'}</p>
                </div>
              )}
              
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Users className="h-3.5 w-3.5" />
                <span>{members.length} members</span>
              </div>
              
              {isChannel && team && (
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Star className="h-3.5 w-3.5" />
                  <span>Part of {team.name}</span>
                </div>
              )}
              
              {isChannel && (
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Shield className="h-3.5 w-3.5" />
                  <span>
                    {(data as any).isPrivate ? 'Private channel' : 'Public channel'}
                  </span>
                </div>
              )}
            </div>
            
            {pinnedMessages.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Pin className="h-4 w-4" />
                  <h4 className="font-medium text-sm">Pinned Messages</h4>
                </div>
                
                <ScrollArea className="h-48 rounded border p-2">
                  {pinnedMessages.map((msg: any) => (
                    <div key={msg.id} className="mb-3">
                      <ChatMessage message={msg} />
                    </div>
                  ))}
                </ScrollArea>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="members" className="flex-1 flex flex-col pt-3">
          <ScrollArea className="flex-1">
            <div className="px-3 space-y-1">
              {members.map((member: any) => (
                <div key={member.id} className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent">
                  <div className="relative">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <UserStatusIndicator 
                      status={member.status} 
                      className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 ring-2 ring-background" 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{member.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="ai" className="flex-1 flex flex-col">
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
                  onCheckedChange={setAimChatbotEnabled}
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
              <Button className="w-full" variant="outline" onClick={() => setSummaryDialogOpen(true)}>
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
        </TabsContent>
      </Tabs>
      
      {/* Summary Dialog */}
      <Dialog open={summaryDialogOpen} onOpenChange={setSummaryDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Discussion Summary</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-4">
              AI has identified the following key points from your conversation. 
              Select which points you would like to share in the chat.
            </p>
            
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
              {discussionPoints.map((point) => (
                <div 
                  key={point.id}
                  className="flex items-start space-x-3 p-2 rounded border"
                >
                  <Checkbox 
                    id={`point-${point.id}`}
                    checked={point.selected}
                    onCheckedChange={() => togglePointSelection(point.id)}
                    className="mt-0.5"
                  />
                  <label 
                    htmlFor={`point-${point.id}`}
                    className="text-sm cursor-pointer flex-1"
                  >
                    {point.content}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <DialogFooter className="flex items-center justify-between sm:justify-between">
            <DialogClose asChild>
              <Button type="button" variant="ghost" className="gap-2">
                <X className="h-4 w-4" />
                Cancel
              </Button>
            </DialogClose>
            <Button type="button" onClick={insertSelectedPoints} className="gap-2">
              <Check className="h-4 w-4" />
              Add to Chat
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatInfoSidebar;
