
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Terminal } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export const CLIButton = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setDialogOpen(true)}
        className="relative"
        aria-label="Command Line Interface"
      >
        <Terminal className="h-5 w-5" />
      </Button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Command Line Interface</DialogTitle>
            <DialogDescription>
              The Command Line Interface is currently under development. When completed, 
              it will provide full CLI control of every feature integrated into the system.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setDialogOpen(false)}>
              Got it, thanks!
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
