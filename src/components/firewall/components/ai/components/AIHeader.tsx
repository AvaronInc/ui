
import React from 'react';
import { Bot } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface AIHeaderProps {
  aiEnabled: boolean;
  toggleAI: () => void;
}

const AIHeader = ({ aiEnabled, toggleAI }: AIHeaderProps) => {
  return (
    <div className="flex items-center justify-between bg-card p-4 rounded-lg border shadow-sm">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-full">
          <Bot className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-medium">AI-Powered Firewall Intelligence</h3>
          <p className="text-sm text-muted-foreground">Autonomous threat detection and response</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">
          {aiEnabled ? 'AI Security Active' : 'AI Security Inactive'}
        </span>
        <Switch 
          checked={aiEnabled} 
          onCheckedChange={toggleAI} 
        />
      </div>
    </div>
  );
};

export default AIHeader;
