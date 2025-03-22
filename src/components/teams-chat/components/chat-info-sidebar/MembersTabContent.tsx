
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ActiveConversation } from '../../types';
import UserStatusIndicator from '../UserStatusIndicator';

interface MembersTabContentProps {
  activeConversation: ActiveConversation;
}

const MembersTabContent = ({ activeConversation }: MembersTabContentProps) => {
  const { type, data } = activeConversation;
  const isChannel = type === 'channel';
  
  // Get members
  const members = isChannel ? (data as any).members : [(data as any).recipient];
  
  return (
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
  );
};

export default MembersTabContent;
