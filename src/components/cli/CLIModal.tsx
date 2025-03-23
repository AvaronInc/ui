
import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useCliModal } from '@/hooks/use-cli-modal';
import { X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Command {
  name: string;
  description: string;
  action: (args?: string[]) => string;
}

export const CLIModal = () => {
  const { isOpen, closeCliModal } = useCliModal();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    "Welcome to Avaron System CLI (Preview Mode)",
    "Type 'help' to see available commands.",
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  
  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Auto scroll to bottom when history changes
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  // Define CLI commands
  const commands: Command[] = [
    {
      name: 'help',
      description: 'Show available commands',
      action: () => {
        return `
Available Commands:
- help         Show this menu
- about        Info about this system
- clear        Clear terminal output
- status       Show system status
- version      Show CLI version
- exit         Close the CLI
`;
      },
    },
    {
      name: 'about',
      description: 'Show info about this system',
      action: () => {
        return `
Avaron.AI CLI (Preview Mode)
Version: v0.1-prealpha
This is a simulated command-line interface for system control.
Real CLI coming soon.
`;
      },
    },
    {
      name: 'clear',
      description: 'Clear terminal output',
      action: () => {
        setHistory([]);
        return '';
      },
    },
    {
      name: 'status',
      description: 'Show system status',
      action: () => {
        return `
System Status: OPERATIONAL
Services: 143 running, 2 degraded, 0 down
CPU Load: 23%
Memory: 42% used
Network: 267 Mbps inbound, 118 Mbps outbound
`;
      },
    },
    {
      name: 'version',
      description: 'Show CLI version',
      action: () => 'Avaron System CLI v0.1-prealpha',
    },
    {
      name: 'exit',
      description: 'Close the CLI',
      action: () => {
        closeCliModal();
        return 'Closing CLI...';
      },
    },
  ];

  const executeCommand = (cmd: string) => {
    const parts = cmd.trim().split(' ');
    const commandName = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    const command = commands.find(c => c.name === commandName);
    
    if (command) {
      return command.action(args);
    } else if (cmd.trim() !== '') {
      return `Unknown command: ${commandName}. Type 'help' for a list of commands.`;
    }
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (input.trim()) {
      // Add user input to history
      setHistory(prev => [...prev, `avaron > ${input}`]);
      
      // Execute command and add result to history
      const result = executeCommand(input);
      if (result) {
        setHistory(prev => [...prev, result]);
      }
      
      // Clear input
      setInput('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && closeCliModal()}>
      <DialogContent className="p-0 gap-0 max-w-4xl w-full overflow-hidden bg-black border-gray-700">
        {/* Terminal title bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
          <h2 className="text-sm font-medium text-gray-300">Avaron System CLI</h2>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 rounded-sm"
            onClick={closeCliModal}
          >
            <X className="h-4 w-4 text-gray-400" />
          </Button>
        </div>
        
        {/* Terminal output area */}
        <div 
          ref={outputRef}
          className="p-4 font-mono text-sm text-green-500 overflow-y-auto h-[60vh] whitespace-pre-wrap"
        >
          {history.map((line, i) => (
            <div key={i} className={line.startsWith('avaron >') ? 'text-white' : ''}>
              {line}
            </div>
          ))}
        </div>
        
        {/* Terminal input area */}
        <form onSubmit={handleSubmit} className="border-t border-gray-700 p-2">
          <div className="flex items-center bg-gray-900 rounded px-3 py-2">
            <span className="text-green-500 font-mono mr-2">avaron &gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-transparent text-white font-mono flex-1 outline-none"
              placeholder="Type a command..."
            />
            <Button 
              type="submit" 
              size="icon" 
              variant="ghost" 
              className="h-6 w-6 text-green-500 hover:text-green-400"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
