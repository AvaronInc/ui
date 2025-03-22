
import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

interface SummaryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInsertSummary: (summary: string) => void;
}

// Demo discussion points - in a real app, these would be generated based on conversation content
const initialDiscussionPoints = [
  { id: '1', content: 'Firewall configuration needs to be updated before next week.', selected: false },
  { id: '2', content: 'Alex will handle the security audit scheduled for Friday.', selected: false },
  { id: '3', content: 'Network monitoring tools should be upgraded to version 3.5.', selected: false },
  { id: '4', content: 'New API credentials will be distributed by the end of day.', selected: false },
  { id: '5', content: 'Team agreed to implement zero trust model in Q3 roadmap.', selected: false },
];

const SummaryDialog = ({ open, onOpenChange, onInsertSummary }: SummaryDialogProps) => {
  const [discussionPoints, setDiscussionPoints] = useState(initialDiscussionPoints);
  const { toast } = useToast();
  
  const togglePointSelection = (id: string) => {
    setDiscussionPoints(points => 
      points.map(point => 
        point.id === id 
          ? { ...point, selected: !point.selected } 
          : point
      )
    );
  };
  
  const handleInsertSelectedPoints = () => {
    const selectedPoints = discussionPoints.filter(point => point.selected);
    
    if (selectedPoints.length === 0) {
      toast({
        title: "No points selected",
        description: "Please select at least one discussion point to include."
      });
      return;
    }
    
    const summary = "**Discussion Summary:**\n" + 
      selectedPoints.map(point => `• ${point.content}`).join('\n');
    
    onInsertSummary(summary);
    
    toast({
      title: "Summary added to chat",
      description: `Added ${selectedPoints.length} discussion points to the conversation.`
    });
    
    // Reset selections
    setDiscussionPoints(points => points.map(point => ({ ...point, selected: false })));
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <Button type="button" onClick={handleInsertSelectedPoints} className="gap-2">
            <Check className="h-4 w-4" />
            Add to Chat
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SummaryDialog;
