
import { useState } from 'react';
import { Search, Plus, Settings, ChevronDown, ChevronRight, MessageSquare, Users, Lock, Hashtag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dialog';
import { Team, DirectMessage, UserStatus } from '../types';
import UserStatusIndicator from './UserStatusIndicator';
import { mockCurrentUser } from '../mockData';

interface ChatSidebarProps {
  teams: Team[];
  directMessages: DirectMessage[];
  activeChannelId: string | null;
  activeDmId: string | null;
  setActiveConversation: (type: 'channel' | 'dm', id: string) => void;
  userStatus: UserStatus;
  changeUserStatus: (status: UserStatus) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const ChatSidebar = ({
  teams,
  directMessages,
  activeChannelId,
  activeDmId,
  setActiveConversation,
  userStatus,
  changeUserStatus,
  searchQuery,
  setSearchQuery
}: ChatSidebarProps) => {
  const [expandedTeams, setExpandedTeams] = useState<Record<string, boolean>>(
    teams.reduce((acc, team) => ({ ...acc, [team.id]: true }), {})
  );

  // Toggle team expansion
  const toggleTeam = (teamId: string) => {
    setExpandedTeams({
      ...expandedTeams,
      [teamId]: !expandedTeams[teamId]
    });
  };

  // Filter channels and DMs based on search query
  const filteredTeams = teams.map(team => ({
    ...team,
    channels: team.channels.filter(channel => 
      channel.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(team => team.channels.length > 0 || team.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const filteredDMs = directMessages.filter(dm => 
    dm.recipient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-64 min-w-64 border-r bg-background flex flex-col h-full">
      <div className="p-3 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <UserStatusIndicator status={userStatus} className="h-4 w-4" />
          <span className="font-semibold truncate">{mockCurrentUser.name}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => changeUserStatus('online')}>
              <UserStatusIndicator status="online" className="mr-2 h-3 w-3" />
              Available
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeUserStatus('away')}>
              <UserStatusIndicator status="away" className="mr-2 h-3 w-3" />
              Away
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeUserStatus('dnd')}>
              <UserStatusIndicator status="dnd" className="mr-2 h-3 w-3" />
              Do Not Disturb
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeUserStatus('offline')}>
              <UserStatusIndicator status="offline" className="mr-2 h-3 w-3" />
              Offline
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="p-3 border-b">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="text" 
            placeholder="Search conversations..." 
            className="pl-9 h-9"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-2">
          <div className="mb-4">
            <div className="flex items-center justify-between px-2 mb-1">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase">Direct Messages</h3>
              <Button variant="ghost" size="icon" className="h-5 w-5">
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>
            
            {filteredDMs.map(dm => (
              <Button
                key={dm.id}
                variant="ghost"
                className={`w-full justify-start mb-0.5 h-8 ${activeDmId === dm.id ? 'bg-accent' : ''}`}
                onClick={() => setActiveConversation('dm', dm.id)}
              >
                <div className="flex items-center">
                  <UserStatusIndicator status={dm.recipient.status} className="mr-2 h-3 w-3" />
                  <MessageSquare className="mr-2 h-3.5 w-3.5" />
                  <span className="truncate text-sm">{dm.recipient.name}</span>
                </div>
              </Button>
            ))}
          </div>
          
          <div>
            <div className="flex items-center justify-between px-2 mb-1">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase">Teams</h3>
              <Button variant="ghost" size="icon" className="h-5 w-5">
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>
            
            {filteredTeams.map(team => (
              <div key={team.id} className="mb-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start h-7 mb-0.5"
                  onClick={() => toggleTeam(team.id)}
                >
                  {expandedTeams[team.id] ? 
                    <ChevronDown className="mr-1 h-3.5 w-3.5" /> : 
                    <ChevronRight className="mr-1 h-3.5 w-3.5" />
                  }
                  <Users className="mr-2 h-3.5 w-3.5" />
                  <span className="truncate text-sm">{team.name}</span>
                </Button>
                
                {expandedTeams[team.id] && (
                  <div className="ml-4">
                    {team.channels.map(channel => (
                      <Button
                        key={channel.id}
                        variant="ghost"
                        className={`w-full justify-start mb-0.5 h-7 ${activeChannelId === channel.id ? 'bg-accent' : ''}`}
                        onClick={() => setActiveConversation('channel', channel.id)}
                      >
                        <div className="flex items-center">
                          {channel.isPrivate ? 
                            <Lock className="mr-2 h-3 w-3" /> : 
                            <Hashtag className="mr-2 h-3 w-3" />
                          }
                          <span className="truncate text-sm">{channel.name}</span>
                        </div>
                      </Button>
                    ))}
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-muted-foreground h-7"
                    >
                      <Plus className="mr-2 h-3 w-3" />
                      <span className="truncate text-sm">Add Channel</span>
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatSidebar;
