
import React, { useState } from 'react';
import { useScheduling } from '@/hooks/use-scheduling';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { 
  Link,
  Copy, 
  MoreHorizontal, 
  Plus, 
  Search, 
  Calendar, 
  User, 
  Clock, 
  Edit, 
  Trash, 
  LinkIcon
} from 'lucide-react';
import NewSchedulingLinkModal from '../components/NewSchedulingLinkModal';
import { SchedulingLink, MeetingType } from '@/types/scheduling';
import { format } from 'date-fns';

interface LinkManagementProps {
  schedulingData: ReturnType<typeof useScheduling>;
}

const LinkManagement: React.FC<LinkManagementProps> = ({ schedulingData }) => {
  const { links, createSchedulingLink } = schedulingData;
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewLinkModalOpen, setIsNewLinkModalOpen] = useState(false);
  
  // Filter links based on search query
  const filteredLinks = links.filter(link => 
    link.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    link.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
    link.url.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getMeetingTypeLabel = (type: MeetingType) => {
    switch (type) {
      case 'one-on-one': return 'One-on-One';
      case 'group': return 'Group';
      case 'webinar': return 'Webinar';
      default: return type;
    }
  };
  
  const getMeetingTypeColor = (type: MeetingType) => {
    switch (type) {
      case 'one-on-one': return 'bg-blue-500';
      case 'group': return 'bg-purple-500';
      case 'webinar': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };
  
  return (
    <div className="p-6 overflow-auto h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Scheduling Links</h2>
          <p className="text-muted-foreground">
            Manage and create scheduling links for your team
          </p>
        </div>
        <Button onClick={() => setIsNewLinkModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Scheduling Link
        </Button>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <Link className="mr-2 h-5 w-5 text-blue-500" />
            Active Scheduling Links
          </CardTitle>
          <CardDescription>
            Create and manage scheduling links for your team
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search links..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Import from Calendar
            </Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead className="hidden md:table-cell">Link</TableHead>
                  <TableHead className="hidden lg:table-cell">Type</TableHead>
                  <TableHead className="hidden lg:table-cell">Duration</TableHead>
                  <TableHead className="hidden md:table-cell">Created</TableHead>
                  <TableHead className="hidden md:table-cell">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLinks.map((link) => (
                  <TableRow key={link.id}>
                    <TableCell className="font-medium">{link.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-muted-foreground" />
                        {link.owner}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center">
                        <LinkIcon className="h-4 w-4 mr-2 text-blue-500" />
                        <span className="text-sm truncate max-w-[180px]">
                          {link.url}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${getMeetingTypeColor(link.meetingType)}`} />
                        {getMeetingTypeLabel(link.meetingType)}
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        {link.durationOptions.map(duration => `${duration}m`).join(', ')}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {format(link.createdAt, 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant={link.isActive ? "default" : "secondary"}>
                        {link.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem className="cursor-pointer">
                            <Copy className="mr-2 h-4 w-4" />
                            Copy Link
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Link
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="cursor-pointer">
                            <Calendar className="mr-2 h-4 w-4" />
                            View Bookings
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="cursor-pointer text-destructive">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete Link
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredLinks.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No scheduling links found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Link Usage Statistics
            </CardTitle>
            <CardDescription>
              Overview of your scheduling link usage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 border rounded-md">
              <div>
                <h4 className="font-medium">Total Bookings</h4>
                <p className="text-sm text-muted-foreground">
                  Across all scheduling links
                </p>
              </div>
              <span className="text-2xl font-bold">127</span>
            </div>
            
            <div className="flex justify-between items-center p-3 border rounded-md">
              <div>
                <h4 className="font-medium">Most Active Link</h4>
                <p className="text-sm text-muted-foreground">
                  IT Support Meetings
                </p>
              </div>
              <span className="text-2xl font-bold">48</span>
            </div>
            
            <div className="flex justify-between items-center p-3 border rounded-md">
              <div>
                <h4 className="font-medium">Booking Conversion Rate</h4>
                <p className="text-sm text-muted-foreground">
                  Link views to bookings
                </p>
              </div>
              <span className="text-2xl font-bold">64%</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Generate Scheduling Link
            </CardTitle>
            <CardDescription>
              Quickly create a new scheduling link
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900 rounded-md space-y-2">
              <h4 className="font-medium text-blue-800 dark:text-blue-300">Quick Link Generation</h4>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                Generate shareable scheduling links in seconds for:
              </p>
              <ul className="text-sm text-blue-700 dark:text-blue-400 pl-5 space-y-1 list-disc">
                <li>One-on-one IT support sessions</li>
                <li>Team project planning meetings</li>
                <li>System maintenance coordination</li>
                <li>Security consultation calls</li>
              </ul>
            </div>
            
            <Button className="w-full" onClick={() => setIsNewLinkModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Quick Link
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <NewSchedulingLinkModal 
        isOpen={isNewLinkModalOpen}
        onClose={() => setIsNewLinkModalOpen(false)}
        onCreate={createSchedulingLink}
      />
    </div>
  );
};

export default LinkManagement;
