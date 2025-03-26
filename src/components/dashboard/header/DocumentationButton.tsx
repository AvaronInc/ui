
import React from 'react';
import { Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const DocumentationButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" title="System Documentation">
          <Book className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>AIM System Documentation</DialogTitle>
        </DialogHeader>
        <div className="mt-2 flex-1 overflow-hidden">
          <iframe 
            src="https://ldhcbonevdxtoycfoeds.supabase.co/storage/v1/object/public/docs//AIM%20System%20Documentation.pdf" 
            className="w-full h-full border-0"
            title="System Documentation"
            style={{ display: 'block' }}
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentationButton;
