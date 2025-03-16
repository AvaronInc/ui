
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
import { Calendar } from '@/components/ui/calendar';
import { 
  CalendarClock,
  CalendarCheck,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';
import { 
  ScheduleEvent, 
  ScheduleEventType, 
  ScheduleEventPriority, 
  ScheduleEventCategory 
} from '@/types/scheduling';
import { format, addMinutes } from 'date-fns';
import { toast } from 'sonner';
import { 
  Alert, 
  AlertDescription, 
  AlertTitle 
} from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

interface NewEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (event: Omit<ScheduleEvent, 'id' | 'createdAt' | 'updatedAt'>) => void;
  checkConflicts: (startTime: Date, endTime: Date) => ScheduleEvent[];
  aiSuggestions: (duration: number, numberOfOptions?: number) => Date[];
}

const defaultDurations = [15, 30, 60, 90, 120, 180];

const NewEventModal: React.FC<NewEventModalProps> = ({
  isOpen,
  onClose,
  onCreate,
  checkConflicts,
  aiSuggestions
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [duration, setDuration] = useState(60);
  const [allDay, setAllDay] = useState(false);
  const [location, setLocation] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [attendees, setAttendees] = useState('');
  const [eventType, setEventType] = useState<ScheduleEventType>('meeting');
  const [eventCategory, setEventCategory] = useState<ScheduleEventCategory>('meeting');
  const [priority, setPriority] = useState<ScheduleEventPriority>('medium');
  const [notes, setNotes] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestedTimes, setSuggestedTimes] = useState<Date[]>([]);
  
  const [conflicts, setConflicts] = useState<ScheduleEvent[]>([]);
  const hasConflicts = conflicts.length > 0;
  
  // Reset form when modal opens/closes
  React.useEffect(() => {
    if (isOpen) {
      const now = new Date();
      // Round to nearest 30 minute interval
      const minutes = Math.ceil(now.getMinutes() / 30) * 30;
      now.setMinutes(minutes, 0, 0);
      
      setTitle('');
      setDescription('');
      setStartTime(now);
      setDuration(60);
      setAllDay(false);
      setLocation('');
      setOrganizer('');
      setAttendees('');
      setEventType('meeting');
      setEventCategory('meeting');
      setPriority('medium');
      setNotes('');
      setConflicts([]);
      setShowSuggestions(false);
      setSuggestedTimes([]);
    }
  }, [isOpen]);
  
  // Calculate end time based on start time and duration
  const endTime = React.useMemo(() => {
    return addMinutes(startTime, duration);
  }, [startTime, duration]);
  
  // Check for conflicts when start time or duration changes
  React.useEffect(() => {
    if (startTime && duration) {
      const end = addMinutes(startTime, duration);
      const eventConflicts = checkConflicts(startTime, end);
      setConflicts(eventConflicts);
    }
  }, [startTime, duration, checkConflicts]);
  
  const handleGetSuggestions = () => {
    const suggestions = aiSuggestions(duration, 3);
    setSuggestedTimes(suggestions);
    setShowSuggestions(true);
    
    if (suggestions.length > 0) {
      toast.success(`Found ${suggestions.length} suggested times`);
    } else {
      toast.warning('No suitable time slots found');
    }
  };
  
  const handleSelectSuggestion = (date: Date) => {
    setStartTime(date);
    setShowSuggestions(false);
    
    // Check for conflicts with the new time
    const end = addMinutes(date, duration);
    const eventConflicts = checkConflicts(date, end);
    setConflicts(eventConflicts);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error('Event title is required');
      return;
    }
    
    if (!startTime) {
      toast.error('Start time is required');
      return;
    }
    
    const newEvent: Omit<ScheduleEvent, 'id' | 'createdAt' | 'updatedAt'> = {
      title,
      description: description || undefined,
      startTime,
      endTime,
      allDay,
      organizer: organizer || 'System Admin',
      attendees: attendees ? attendees.split(',').map(a => a.trim()) : [],
      location: location || undefined,
      category: eventCategory,
      type: eventType,
      priority,
      status: 'scheduled',
      isRecurring: false,
      notes: notes || undefined
    };
    
    onCreate(newEvent);
    onClose();
    toast.success('Event created successfully');
  };
  
  const handleCategoryChange = (category: ScheduleEventCategory) => {
    setEventCategory(category);
    
    // Update event type based on category
    switch (category) {
      case 'it-maintenance':
        setEventType('maintenance');
        break;
      case 'software-update':
        setEventType('update');
        break;
      case 'meeting':
        setEventType('meeting');
        break;
      case 'project':
        setEventType('project');
        break;
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
          <DialogDescription>
            Schedule a new event, meeting or maintenance window
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Event title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Event description"
              className="resize-none"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="all-day" 
              checked={allDay} 
              onCheckedChange={setAllDay}
            />
            <Label htmlFor="all-day">All day event</Label>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarClock className="mr-2 h-4 w-4" />
                    {startTime ? format(startTime, 'PPP') : 'Select date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startTime}
                    onSelect={(date) => date && setStartTime(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            {!allDay && (
              <div className="space-y-2">
                <Label>Time *</Label>
                <div className="flex space-x-2">
                  <Input 
                    type="time" 
                    value={format(startTime, 'HH:mm')}
                    onChange={(e) => {
                      const [hours, minutes] = e.target.value.split(':').map(Number);
                      const newDate = new Date(startTime);
                      newDate.setHours(hours);
                      newDate.setMinutes(minutes);
                      setStartTime(newDate);
                    }}
                    className="flex-1"
                  />
                </div>
              </div>
            )}
          </div>
          
          {!allDay && (
            <div className="space-y-2">
              <Label>Duration</Label>
              <div className="flex flex-wrap gap-2">
                {defaultDurations.map(d => (
                  <Badge 
                    key={d} 
                    variant={duration === d ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setDuration(d)}
                  >
                    {d} min
                  </Badge>
                ))}
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <div className="text-sm text-muted-foreground">
                  End time: {format(endTime, 'h:mm a')}
                </div>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={handleGetSuggestions}
                  className="ml-auto"
                >
                  <Lightbulb className="h-4 w-4 mr-1" />
                  Suggest Times
                </Button>
              </div>
            </div>
          )}
          
          {/* AI Time Suggestions */}
          {showSuggestions && suggestedTimes.length > 0 && (
            <div className="space-y-2">
              <Label>AI Suggested Times</Label>
              <div className="space-y-2">
                {suggestedTimes.map((time, index) => (
                  <Button 
                    key={index}
                    type="button"
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleSelectSuggestion(time)}
                  >
                    <CalendarCheck className="h-4 w-4 mr-2 text-green-500" />
                    {format(time, 'EEEE, MMMM d')} at {format(time, 'h:mm a')}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          {/* Conflicts Warning */}
          {hasConflicts && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Scheduling Conflict</AlertTitle>
              <AlertDescription>
                This event conflicts with {conflicts.length} existing {conflicts.length === 1 ? 'event' : 'events'}:
                <ul className="mt-2 list-disc pl-5 space-y-1">
                  {conflicts.slice(0, 3).map(event => (
                    <li key={event.id} className="text-sm">
                      {event.title} ({format(event.startTime, 'h:mm a')} - {format(event.endTime, 'h:mm a')})
                    </li>
                  ))}
                  {conflicts.length > 3 && (
                    <li className="text-sm">
                      And {conflicts.length - 3} more...
                    </li>
                  )}
                </ul>
              </AlertDescription>
            </Alert>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="organizer">Organizer</Label>
              <Input 
                id="organizer" 
                value={organizer} 
                onChange={(e) => setOrganizer(e.target.value)} 
                placeholder="Event organizer"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)} 
                placeholder="Event location"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="attendees">Attendees</Label>
            <Textarea 
              id="attendees" 
              value={attendees} 
              onChange={(e) => setAttendees(e.target.value)} 
              placeholder="Enter attendees (comma separated)"
              className="resize-none"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select 
                value={eventCategory} 
                onValueChange={(value) => handleCategoryChange(value as ScheduleEventCategory)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="it-maintenance">IT Maintenance</SelectItem>
                  <SelectItem value="software-update">Software Update</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="project">Project</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select 
                value={priority} 
                onValueChange={(value) => setPriority(value as ScheduleEventPriority)}
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
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea 
              id="notes" 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)} 
              placeholder="Additional notes"
              className="resize-none"
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Create Event
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewEventModal;
