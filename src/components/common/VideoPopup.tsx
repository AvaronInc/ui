
import React from 'react';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';

interface VideoPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoUrl: string;
  title?: string;
}

const VideoPopup: React.FC<VideoPopupProps> = ({
  open,
  onOpenChange,
  videoUrl,
  title = "Welcome Video"
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>{title}</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>
        <div className="mt-2 flex-1 overflow-hidden bg-black rounded-md">
          <video 
            src={videoUrl}
            className="w-full h-full"
            controls
            autoPlay
            style={{ display: 'block' }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoPopup;
