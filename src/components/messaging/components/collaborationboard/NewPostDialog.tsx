
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Upload } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

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
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [visibility, setVisibility] = useState<'admin' | 'network' | 'everyone'>('everyone');
  const [attachments, setAttachments] = useState<File[]>([]);

  const handleSubmit = () => {
    onSubmit({
      title,
      content,
      tags: selectedTags,
      visibility,
      attachments
    });
    
    // Reset form
    setTitle("");
    setContent("");
    setSelectedTags([]);
    setVisibility('everyone');
    setAttachments([]);
    
    // Close dialog
    onOpenChange(false);
  };

  const handleTagChange = (value: string) => {
    if (!selectedTags.includes(value)) {
      setSelectedTags([...selectedTags, value]);
    }
  };

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
            <Input 
              id="title" 
              placeholder="Enter a descriptive title..." 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="tags">Tags</Label>
            <Select onValueChange={handleTagChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select tags" />
              </SelectTrigger>
              <SelectContent>
                {availableTags.map(tag => (
                  <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedTags.map(tag => (
                  <div key={tag} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm">
                    {tag}
                    <button 
                      className="ml-2 text-secondary-foreground/70 hover:text-secondary-foreground"
                      onClick={() => setSelectedTags(selectedTags.filter(t => t !== tag))}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="content">Content</Label>
            <Textarea 
              id="content" 
              placeholder="Write your post content. Markdown is supported." 
              className="min-h-[200px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="visibility">Visibility</Label>
            <Select 
              defaultValue="everyone"
              value={visibility}
              onValueChange={(value: 'admin' | 'network' | 'everyone') => setVisibility(value)}
            >
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
          <Button onClick={handleSubmit}>Post</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewPostDialog;
