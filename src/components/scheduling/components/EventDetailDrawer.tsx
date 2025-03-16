
import React, { useState } from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription,
  SheetFooter,
  SheetClose
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from '@/components/ui/alert-dialog';
import { 
  CalendarClock, 
  Clock, 
  MapPin, 
  Users, 
  AlertTriangle, 
  Trash, 
  CalendarX
} from 'lucide-react';
import { ScheduleEvent } from '@/types/scheduling';
import { format, addMinutes } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';

interface EventDetailDrawerProps {
  event: ScheduleEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<ScheduleEvent>) => void;
  onDelete: (id: string) => void;
  checkConflicts: (startTime: Date, endTime: Date, excludeEventId?: string) => ScheduleEvent[];
}

const EventDetailDrawer: React.FC<EventDetailDrawerProps> = ({
  event,
  isOpen,
  onClose,
  onUpdate,
  onDelete,
  checkConflicts
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState<Partial<ScheduleEvent>>({});
  const [showConflictWarning, setShowConflictWarning] = useState(false);
  const [conflictingEvents, setConflictingEvents] = useState<ScheduleEvent[]>([]);
  
  // Reset state when the drawer opens/closes or event changes
  React.useEffect(() => {
    if (event) {
      setEditedEvent({});
      setIsEditing(false);
      setShowConflictWarning(false);
    }
  }, [event, isOpen]);
  
  if (!event) return null;
  
  const handleEditToggle = () => {
    if (isEditing) {
      // Apply changes
      const updatedEvent = { ...event, ...editedEvent };
      const conflicts = checkConflicts(
        editedEvent.startTime || event.startTime,
        editedEvent.endTime || event.endTime,
        event.id
      );
      
      if (conflicts.length > 0) {
        setConflictingEvents(conflicts);
        setShowConflictWarning(true);
      } else {
        onUpdate(event.id, editedEvent);
        setIsEditing(false);
        toast.success('Event updated successfully');
      }
    } else {
      // Enter edit mode
      setIsEditing(true);
    }
  };
  
  const handleForceUpdate = () => {
    onUpdate(event.id, editedEvent);
    setIsEditing(false);
    setShowConflictWarning(false);
    toast.success('Event updated with conflicts');
  };
  
  const handleDelete = () => {
    onDelete(event.id);
    onClose();
    toast.success('Event deleted successfully');
  };
  
  const handleFieldChange = (field: keyof ScheduleEvent, value: any) => {
    setEditedEvent(prev => ({ ...prev, [field]: value }));
  };
  
  const getCategoryLabel = (category: string) => {
    switch(category) {
      case 'it-maintenance': return 'IT Maintenance';
      case 'software-update': return 'Software Update';
      case 'meeting': return 'Meeting';
      case 'project': return 'Project';
      default: return category;
    }
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-xl">
            {isEditing ? (
              <Input 
                value={editedEvent.title ?? event.title} 
                onChange={(e) => handleFieldChange('title', e.target.value)}
                className="text-lg font-bold"
              />
            ) : (
              event.title
            )}
          </SheetTitle>
          
          <SheetDescription>
            {isEditing ? (
              <Textarea 
                value={editedEvent.description ?? event.description || ''} 
                onChange={(e) => handleFieldChange('description', e.target.value)}
                placeholder="Add a description..."
                className="mt-2"
              />
            ) : (
              event.description ? event.description : "No description provided"
            )}
          </SheetDescription>
        </SheetHeader>
        
        <div className="space-y-6 py-4">
          {/* Status & Priority */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge variant={
                event.status === 'scheduled' ? "outline" :
                event.status === 'in-progress' ? "default" :
                event.status === 'completed' ? "success" : "secondary"
              }>
                {event.status}
              </Badge>
              
              <Badge variant={
                event.priority === 'low' ? "outline" :
                event.priority === 'medium' ? "secondary" :
                event.priority === 'high' ? "warning" : "destructive"
              }>
                {event.priority}
              </Badge>
            </div>
            
            <Badge variant="outline" className="capitalize">
              {getCategoryLabel(event.category)}
            </Badge>
          </div>
          
          {/* Time Information */}
          <div className="space-y-4">
            <div className="flex items-center">
              <CalendarClock className="h-5 w-5 mr-2 text-muted-foreground" />
              {isEditing ? (
                <div className="grid gap-2 w-full">
                  <Label>Start Time</Label>
                  <div className="flex items-center gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline">
                          {editedEvent.startTime 
                            ? format(editedEvent.startTime, 'PPP') 
                            : format(event.startTime, 'PPP')}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={editedEvent.startTime || event.startTime}
                          onSelect={(date) => handleFieldChange('startTime', date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    
                    <Input 
                      type="time" 
                      value={format(editedEvent.startTime || event.startTime, 'HH:mm')}
                      onChange={(e) => {
                        const [hours, minutes] = e.target.value.split(':').map(Number);
                        const date = new Date(editedEvent.startTime || event.startTime);
                        date.setHours(hours);
                        date.setMinutes(minutes);
                        handleFieldChange('startTime', date);
                      }}
                      className="w-24"
                    />
                  </div>
                  
                  <Label>End Time</Label>
                  <div className="flex items-center gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline">
                          {editedEvent.endTime 
                            ? format(editedEvent.endTime, 'PPP') 
                            : format(event.endTime, 'PPP')}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={editedEvent.endTime || event.endTime}
                          onSelect={(date) => handleFieldChange('endTime', date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    
                    <Input 
                      type="time" 
                      value={format(editedEvent.endTime || event.endTime, 'HH:mm')}
                      onChange={(e) => {
                        const [hours, minutes] = e.target.value.split(':').map(Number);
                        const date = new Date(editedEvent.endTime || event.endTime);
                        date.setHours(hours);
                        date.setMinutes(minutes);
                        handleFieldChange('endTime', date);
                      }}
                      className="w-24"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm font-medium">
                    {format(event.startTime, 'EEEE, MMMM d, yyyy')}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {format(event.startTime, 'h:mm a')} - {format(event.endTime, 'h:mm a')}
                  </p>
                </div>
              )}
            </div>
            
            {isEditing && (
              <div className="flex items-center space-x-2">
                <Switch 
                  checked={editedEvent.allDay ?? event.allDay}
                  onCheckedChange={(checked) => handleFieldChange('allDay', checked)}
                  id="all-day"
                />
                <Label htmlFor="all-day">All day event</Label>
              </div>
            )}
          </div>
          
          {/* Location */}
          {(event.location || isEditing) && (
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
              {isEditing ? (
                <Input 
                  value={editedEvent.location ?? event.location || ''} 
                  onChange={(e) => handleFieldChange('location', e.target.value)}
                  placeholder="Add location"
                  className="flex-1"
                />
              ) : (
                <span>{event.location}</span>
              )}
            </div>
          )}
          
          {/* Attendees */}
          <div className="flex items-start">
            <Users className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium">Attendees</p>
              {isEditing ? (
                <Textarea 
                  value={editedEvent.attendees ? editedEvent.attendees.join(', ') : event.attendees.join(', ')} 
                  onChange={(e) => handleFieldChange('attendees', e.target.value.split(',').map(a => a.trim()))}
                  placeholder="Add attendees (comma separated)"
                  className="mt-1"
                />
              ) : (
                <ul className="text-sm text-muted-foreground mt-1">
                  {event.attendees.map((attendee, idx) => (
                    <li key={idx}>{attendee}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          
          {/* Status and Priority */}
          {isEditing && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={editedEvent.status ?? event.status}
                  onValueChange={(value) => handleFieldChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Priority</Label>
                <Select
                  value={editedEvent.priority ?? event.priority}
                  onValueChange={(value) => handleFieldChange('priority', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          {/* Notes */}
          {(event.notes || isEditing) && (
            <div className="space-y-2">
              <Label>Notes</Label>
              {isEditing ? (
                <Textarea 
                  value={editedEvent.notes ?? event.notes || ''} 
                  onChange={(e) => handleFieldChange('notes', e.target.value)}
                  placeholder="Add notes..."
                  className="w-full"
                />
              ) : (
                <div className="text-sm text-muted-foreground border rounded-md p-3">
                  {event.notes || "No notes added"}
                </div>
              )}
            </div>
          )}
          
          {/* Additional details */}
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Created {format(event.createdAt, 'MMM d, yyyy')}
              {event.updatedAt > event.createdAt && 
                ` • Updated ${format(event.updatedAt, 'MMM d, yyyy')}`}
            </p>
          </div>
        </div>
        
        {/* Conflict Warning */}
        <AlertDialog open={showConflictWarning} onOpenChange={setShowConflictWarning}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                Scheduling Conflict Detected
              </AlertDialogTitle>
              <AlertDialogDescription>
                This event conflicts with {conflictingEvents.length} existing {
                  conflictingEvents.length === 1 ? 'event' : 'events'
                }:
                <ul className="mt-2 list-disc pl-5 space-y-1">
                  {conflictingEvents.map(e => (
                    <li key={e.id}>
                      <span className="font-medium">{e.title}</span>
                      <span className="text-muted-foreground"> ({format(e.startTime, 'h:mm a')} - {format(e.endTime, 'h:mm a')})</span>
                    </li>
                  ))}
                </ul>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Go Back</AlertDialogCancel>
              <AlertDialogAction onClick={handleForceUpdate}>Schedule Anyway</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        
        <SheetFooter className="flex-col sm:flex-col gap-2 mt-4">
          <div className="flex space-x-2 w-full">
            <Button 
              onClick={handleEditToggle} 
              className="flex-1"
              variant={isEditing ? "default" : "outline"}
            >
              {isEditing ? 'Save Changes' : 'Edit Event'}
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" disabled={isEditing}>
                  <Trash className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete the event "{event.title}".
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          
          {isEditing && (
            <Button 
              variant="ghost" 
              onClick={() => setIsEditing(false)}
              className="w-full"
            >
              Cancel
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default EventDetailDrawer;
