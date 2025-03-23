
import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCliModal } from '@/hooks/use-cli-modal';
import { X } from 'lucide-react';

type Command = {
  input: string;
  output: React.ReactNode;
  timestamp: number;
};

export const CLIModal = () => {
  const { isOpen, closeCliModal } = useCliModal();
  const [commands, setCommands] = useState<Command[]>([]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // Auto focus the input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Auto scroll to bottom when commands are added
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [commands]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      executeCommand(input.trim());
      setInput('');
    }
  };

  const executeCommand = (cmd: string) => {
    let output: React.ReactNode;

    switch (cmd.toLowerCase()) {
      case 'help':
        output = (
          <div className="text-green-400">
            <div>Available Commands:</div>
            <div>- help        Show this menu</div>
            <div>- about       Info about this system</div>
            <div>- exit        Close the CLI</div>
          </div>
        );
        break;
      case 'about':
        output = (
          <div className="text-green-400">
            <div>Avaron.AI CLI (Preview Mode)</div>
            <div>Version: v0.1-prealpha</div>
            <div>This is a simulated command-line interface for system control.</div>
            <div>Real CLI coming soon.</div>
          </div>
        );
        break;
      case 'exit':
        output = <div className="text-green-400">Closing CLI...</div>;
        setCommands((prev) => [
          ...prev,
          { input: cmd, output, timestamp: Date.now() }
        ]);
        setTimeout(() => {
          closeCliModal();
        }, 500);
        return;
      default:
        output = (
          <div className="text-yellow-400">
            Unknown command. Type 'help' for a list of commands.
          </div>
        );
    }

    setCommands((prev) => [
      ...prev,
      { input: cmd, output, timestamp: Date.now() }
    ]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeCliModal}>
      <DialogContent className="max-w-3xl p-0 border-2 border-gray-700 overflow-hidden bg-black text-white font-mono">
        <DialogHeader className="p-2 bg-gray-800 border-b border-gray-700 flex flex-row items-center justify-between">
          <DialogTitle className="text-sm font-mono text-white">Avaron System CLI</DialogTitle>
          <button 
            onClick={closeCliModal}
            className="h-5 w-5 rounded-sm border border-gray-600 flex items-center justify-center hover:bg-gray-700"
          >
            <X className="h-3 w-3 text-gray-400" />
          </button>
        </DialogHeader>
        
        <div className="flex flex-col h-[60vh]">
          <div 
            ref={outputRef}
            className="flex-1 overflow-y-auto p-4 space-y-2 bg-black"
          >
            <div className="text-green-400 mb-4">
              Welcome to Avaron System CLI
              <br />
              Type 'help' to see available commands
            </div>
            
            {commands.map((cmd, index) => (
              <div key={cmd.timestamp + index} className="space-y-1">
                <div className="flex">
                  <span className="text-blue-400 mr-2">avaron &gt;</span>
                  <span className="text-white">{cmd.input}</span>
                </div>
                <div className="pl-2">{cmd.output}</div>
              </div>
            ))}
          </div>
          
          <div className="p-2 border-t border-gray-700 bg-black flex items-center">
            <span className="text-blue-400 mr-2">avaron &gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              className="flex-1 bg-transparent outline-none border-none text-white"
              autoComplete="off"
              spellCheck="false"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
