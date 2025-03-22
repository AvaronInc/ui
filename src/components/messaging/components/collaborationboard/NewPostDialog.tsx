
import { useState } from 'react';
import { FileUpload, Hash, Upload, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockTags } from '../../mockData';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface NewPostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreatePost: (post: any) => void;
}

const NewPostDialog = ({ open, onOpenChange, onCreatePost }: NewPostDialogProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [visibility, setVisibility] = useState('everyone');
  const [files, setFiles] = useState<File[]>([]);
  
  const resetForm = () => {
    setTitle('');
    setContent('');
    setSelectedTags([]);
    setVisibility('everyone');
    setFiles([]);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    
    if (!content.trim()) {
      toast.error("Content is required");
      return; 
    }
    
    if (selectedTags.length === 0) {
      toast.error("Please select at least one tag");
      return;
    }
    
    onCreatePost({
      title,
      content,
      tags: selectedTags,
      visibility,
      files
    });
    
    resetForm();
    onOpenChange(false);
    toast.success("Post created successfully");
  };
  
  const handleAddTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setFiles([...files, ...fileArray]);
    }
  };
  
  const handleRemoveFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input 
              id="title" 
              placeholder="Enter a descriptive title" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
            />
          </div>
          
          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <Select onValueChange={handleAddTag}>
              <SelectTrigger>
                <SelectValue placeholder="Select tags" />
              </SelectTrigger>
              <SelectContent>
                {mockTags.map(tag => (
                  <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {selectedTags.map(tag => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    <Hash size={12} />
                    {tag}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 ml-1"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <X size={10} />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea 
              id="content" 
              placeholder="Write your post here... (Markdown supported)" 
              className="min-h-[150px]"
              value={content} 
              onChange={e => setContent(e.target.value)} 
            />
            <p className="text-xs text-muted-foreground">
              Supports Markdown: **bold**, *italic*, `code`, ```codeblock```, etc.
            </p>
          </div>
          
          {/* File Upload */}
          <div className="space-y-2">
            <Label>Attachments</Label>
            <div className="border border-dashed rounded-md p-4 text-center">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                multiple
                onChange={handleFileChange}
              />
              <label 
                htmlFor="file-upload" 
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Upload size={24} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Click to upload files or drag & drop
                </span>
              </label>
            </div>
            
            {files.length > 0 && (
              <div className="space-y-2 mt-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                    <div className="flex items-center gap-2">
                      <FileUpload size={16} />
                      <span className="text-sm truncate max-w-[300px]">{file.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => handleRemoveFile(index)}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Visibility */}
          <div className="space-y-2">
            <Label htmlFor="visibility">Visibility</Label>
            <Select value={visibility} onValueChange={setVisibility}>
              <SelectTrigger id="visibility">
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admins Only</SelectItem>
                <SelectItem value="network">Network Team</SelectItem>
                <SelectItem value="everyone">Everyone</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Post</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewPostDialog;
