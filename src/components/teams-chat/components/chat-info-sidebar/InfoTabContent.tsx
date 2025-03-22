
import { Hash, Lock, Pin, Users, Star, Shield } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ActiveConversation } from '../../types';
import ChatMessage from '../ChatMessage';

interface InfoTabContentProps {
  activeConversation: ActiveConversation;
}

const InfoTabContent = ({ activeConversation }: InfoTabContentProps) => {
  const { type, data, team } = activeConversation;
  const isChannel = type === 'channel';
  
  // Get pinned messages
  const messages = isChannel ? (data as any).messages : (data as any).messages;
  const pinnedMessages = messages.filter((msg: any) => msg.isPinned);
  
  // Get members
  const members = isChannel ? (data as any).members : [(data as any).recipient];
  
  return (
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
              {/* For DM conversations, display the user avatar in the header */}
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
  );
};

export default InfoTabContent;
