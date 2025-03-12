
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Paperclip, X } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { TicketPriority } from '@/types/tickets';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface NewTicketFormProps {
  onSubmit: (ticketData: {
    title: string;
    description: string;
    priority: TicketPriority;
    attachments: File[];
  }) => void;
}

export const NewTicketForm = ({ onSubmit }: NewTicketFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TicketPriority>('medium');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) return;
    
    onSubmit({
      title,
      description,
      priority,
      attachments
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
    setAttachments([]);
    setIsOpen(false);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setAttachments(prev => [...prev, ...fileArray]);
    }
  };
  
  const handleRemoveFile = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Ticket
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Create New Ticket</SheetTitle>
        </SheetHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              placeholder="Brief summary of the issue"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Detailed description of the issue"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="priority" className="text-sm font-medium">
              Priority
            </label>
            <Select 
              value={priority} 
              onValueChange={(value) => setPriority(value as TicketPriority)}
            >
              <SelectTrigger id="priority">
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
          
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Attachments
            </label>
            <div className="grid gap-2">
              {attachments.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center gap-1 px-2 py-1 bg-muted rounded-md text-sm">
                      <span className="truncate max-w-[120px]">{file.name}</span>
                      <button 
                        type="button" 
                        onClick={() => handleRemoveFile(index)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              <label 
                htmlFor="file-upload" 
                className="cursor-pointer flex items-center gap-2 text-sm text-muted-foreground"
              >
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="w-full flex items-center justify-center"
                >
                  <Paperclip className="h-4 w-4 mr-2" />
                  Attach Files
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="sr-only"
                />
              </label>
            </div>
          </div>
          
          <div className="pt-4 flex justify-end gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Submit Ticket</Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default NewTicketForm;
