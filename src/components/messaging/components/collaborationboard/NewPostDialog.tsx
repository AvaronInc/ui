
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Upload } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface NewPostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    title: string;
    content: string;
    tags: string[];
    visibility: 'admin' | 'network' | 'everyone';
    attachments?: File[];
  }) => void;
  availableTags: string[];
}

const NewPostDialog = ({ open, onOpenChange, onSubmit, availableTags }: NewPostDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
          <DialogDescription>
            Share updates, insights, or start a discussion thread with the IT team.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Enter a descriptive title..." />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="tags">Tags</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select tags" />
              </SelectTrigger>
              <SelectContent>
                {availableTags.map(tag => (
                  <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="content">Content</Label>
            <Textarea 
              id="content" 
              placeholder="Write your post content. Markdown is supported." 
              className="min-h-[200px]" 
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="visibility">Visibility</Label>
            <Select defaultValue="everyone">
              <SelectTrigger>
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admins Only</SelectItem>
                <SelectItem value="network">Network Team</SelectItem>
                <SelectItem value="everyone">Everyone</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="attachments">Attachments</Label>
            <div className="border-2 border-dashed rounded-md p-4 text-center">
              <Button variant="outline" type="button">
                <Upload className="h-4 w-4 mr-2" />
                Upload Files
              </Button>
              <p className="text-sm text-muted-foreground mt-2">
                Drag and drop files here, or click to browse
              </p>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} variant="outline">Cancel</Button>
          <Button>Post</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewPostDialog;
