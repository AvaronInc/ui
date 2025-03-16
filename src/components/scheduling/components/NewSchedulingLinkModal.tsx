
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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  MeetingType, 
  SchedulingLink, 
  SchedulingVisibility 
} from '@/types/scheduling';
import { toast } from 'sonner';

interface NewSchedulingLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (link: Omit<SchedulingLink, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

const daysOfWeek = [
  { id: 0, name: 'Sunday' },
  { id: 1, name: 'Monday' },
  { id: 2, name: 'Tuesday' },
  { id: 3, name: 'Wednesday' },
  { id: 4, name: 'Thursday' },
  { id: 5, name: 'Friday' },
  { id: 6, name: 'Saturday' },
];

const timeOptions = [15, 30, 45, 60, 90, 120];

const NewSchedulingLinkModal: React.FC<NewSchedulingLinkModalProps> = ({
  isOpen,
  onClose,
  onCreate
}) => {
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [urlSlug, setUrlSlug] = useState('');
  const [meetingType, setMeetingType] = useState<MeetingType>('one-on-one');
  const [selectedDurations, setSelectedDurations] = useState<number[]>([30]);
  const [visibility, setVisibility] = useState<SchedulingVisibility>('team');
  const [availableDays, setAvailableDays] = useState<number[]>([1, 2, 3, 4, 5]);
  const [availableTimeStart, setAvailableTimeStart] = useState('09:00');
  const [availableTimeEnd, setAvailableTimeEnd] = useState('17:00');
  const [bufferTime, setBufferTime] = useState(10);
  const [description, setDescription] = useState('');
  const [customDomain, setCustomDomain] = useState('');
  
  // Reset form when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setName('');
      setOwner('');
      setOwnerEmail('');
      setUrlSlug('');
      setMeetingType('one-on-one');
      setSelectedDurations([30]);
      setVisibility('team');
      setAvailableDays([1, 2, 3, 4, 5]); // Monday to Friday
      setAvailableTimeStart('09:00');
      setAvailableTimeEnd('17:00');
      setBufferTime(10);
      setDescription('');
      setCustomDomain('');
    }
  }, [isOpen]);
  
  const handleDayToggle = (dayId: number) => {
    setAvailableDays(prev => 
      prev.includes(dayId) 
        ? prev.filter(d => d !== dayId) 
        : [...prev, dayId]
    );
  };
  
  const handleDurationToggle = (duration: number) => {
    setSelectedDurations(prev => 
      prev.includes(duration) 
        ? prev.filter(d => d !== duration) 
        : [...prev, duration]
    );
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error('Link name is required');
      return;
    }
    
    if (!owner.trim()) {
      toast.error('Owner name is required');
      return;
    }
    
    if (!ownerEmail.trim()) {
      toast.error('Owner email is required');
      return;
    }
    
    if (!urlSlug.trim()) {
      toast.error('URL slug is required');
      return;
    }
    
    if (selectedDurations.length === 0) {
      toast.error('At least one duration option is required');
      return;
    }
    
    if (availableDays.length === 0) {
      toast.error('At least one available day is required');
      return;
    }
    
    // Create URL from slug
    const url = customDomain 
      ? `${customDomain}/${urlSlug}` 
      : `schedule.company.com/${urlSlug}`;
    
    const newLink: Omit<SchedulingLink, 'id' | 'createdAt' | 'updatedAt'> = {
      name,
      owner,
      ownerEmail,
      url,
      meetingType,
      durationOptions: selectedDurations.sort((a, b) => a - b),
      visibility,
      availableDays: availableDays.sort((a, b) => a - b),
      availableTimeStart,
      availableTimeEnd,
      bufferTime,
      isActive: true,
      description: description || undefined,
      customDomain: customDomain || undefined
    };
    
    onCreate(newLink);
    onClose();
    toast.success('Scheduling link created successfully');
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Scheduling Link</DialogTitle>
          <DialogDescription>
            Create a scheduling link that allows others to book time with you or your team
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Link Name *</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="e.g., IT Support Sessions"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="owner">Owner Name *</Label>
              <Input 
                id="owner" 
                value={owner} 
                onChange={(e) => setOwner(e.target.value)} 
                placeholder="e.g., John Smith"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ownerEmail">Owner Email *</Label>
              <Input 
                id="ownerEmail" 
                type="email"
                value={ownerEmail} 
                onChange={(e) => setOwnerEmail(e.target.value)} 
                placeholder="e.g., john.smith@company.com"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="urlSlug">URL Slug *</Label>
              <Input 
                id="urlSlug" 
                value={urlSlug} 
                onChange={(e) => setUrlSlug(e.target.value.replace(/\s+/g, '-').toLowerCase())} 
                placeholder="e.g., it-support"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="customDomain">Custom Domain (Optional)</Label>
              <Input 
                id="customDomain" 
                value={customDomain} 
                onChange={(e) => setCustomDomain(e.target.value)} 
                placeholder="e.g., meet.company.com"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Meeting Type</Label>
            <Select 
              value={meetingType} 
              onValueChange={(value) => setMeetingType(value as MeetingType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select meeting type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="one-on-one">One-on-One</SelectItem>
                <SelectItem value="group">Group Meeting</SelectItem>
                <SelectItem value="webinar">Webinar</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Duration Options</Label>
            <div className="flex flex-wrap gap-2 pt-1">
              {timeOptions.map(duration => (
                <div key={duration} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`duration-${duration}`} 
                    checked={selectedDurations.includes(duration)}
                    onCheckedChange={() => handleDurationToggle(duration)}
                  />
                  <label 
                    htmlFor={`duration-${duration}`}
                    className="text-sm cursor-pointer"
                  >
                    {duration} min
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Visibility</Label>
            <Select 
              value={visibility} 
              onValueChange={(value) => setVisibility(value as SchedulingVisibility)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public (Anyone)</SelectItem>
                <SelectItem value="team">Team Only</SelectItem>
                <SelectItem value="private">Private (Invite Only)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Available Days</Label>
            <div className="flex flex-wrap gap-2 pt-1">
              {daysOfWeek.map(day => (
                <div key={day.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`day-${day.id}`} 
                    checked={availableDays.includes(day.id)}
                    onCheckedChange={() => handleDayToggle(day.id)}
                  />
                  <label 
                    htmlFor={`day-${day.id}`}
                    className="text-sm cursor-pointer"
                  >
                    {day.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="availableTimeStart">Available From</Label>
              <Input 
                id="availableTimeStart" 
                type="time"
                value={availableTimeStart} 
                onChange={(e) => setAvailableTimeStart(e.target.value)} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="availableTimeEnd">Available To</Label>
              <Input 
                id="availableTimeEnd" 
                type="time"
                value={availableTimeEnd} 
                onChange={(e) => setAvailableTimeEnd(e.target.value)} 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bufferTime">Buffer Time (minutes)</Label>
            <Input 
              id="bufferTime" 
              type="number"
              min="0"
              max="60"
              value={bufferTime} 
              onChange={(e) => setBufferTime(parseInt(e.target.value) || 0)} 
            />
            <p className="text-xs text-muted-foreground">
              Time between meetings to prepare or travel
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Describe what this scheduling link is for..."
              className="resize-none"
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Create Scheduling Link
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewSchedulingLinkModal;
