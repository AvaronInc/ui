
import React from 'react';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const CyberNestInfoButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 transition-all animate-pulse hover:animate-none group"
        >
          <Info className="h-4 w-4 mr-2 text-purple-500 group-hover:text-purple-600" />
          <span className="font-medium text-purple-800">What is CyberNest?</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-purple-800">Avaron CyberNest - Technical Overview</DialogTitle>
        </DialogHeader>
        <div className="mt-2 flex-1 overflow-hidden">
          <iframe 
            src="https://ldhcbonevdxtoycfoeds.supabase.co/storage/v1/object/public/docs//Avaron-CyberNest.pdf" 
            className="w-full h-full border-0"
            title="Avaron CyberNest Technical Overview"
            style={{ display: 'block' }}
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CyberNestInfoButton;
