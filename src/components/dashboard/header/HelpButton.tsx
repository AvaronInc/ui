
import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const HelpButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" title="Help & Information">
          <HelpCircle className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>What Is AIM System?</DialogTitle>
        </DialogHeader>
        <div className="mt-2 flex-1 overflow-hidden">
          <iframe 
            src="https://ldhcbonevdxtoycfoeds.supabase.co/storage/v1/object/public/docs//WhatIs.pdf" 
            className="w-full h-full border-0"
            title="Help & Information"
            style={{ display: 'block' }}
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HelpButton;
