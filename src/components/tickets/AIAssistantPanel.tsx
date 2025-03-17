
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { AITicketSuggestion } from '@/types/tickets';
import { 
  Bot, 
  Zap, 
  ArrowUpRight, 
  MessageSquare, 
  Users, 
  AlertTriangle,
  Check 
} from 'lucide-react';

interface AIAssistantPanelProps {
  suggestions: AITicketSuggestion[];
  onApplySuggestion: (suggestionId: string) => void;
}

const AIAssistantPanel = ({ suggestions, onApplySuggestion }: AIAssistantPanelProps) => {
  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'apply-fix':
        return <Zap className="h-5 w-5 text-yellow-500" />;
      case 'escalate':
        return <ArrowUpRight className="h-5 w-5 text-red-500" />;
      case 'follow-up':
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case 'bulk-resolution':
        return <Users className="h-5 w-5 text-green-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
    }
  };

  return (
    <Card className="bg-accent/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          AI Assistant
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-4">
          Based on ticket trends and system analysis, here are some suggested actions:
        </p>
        
        {suggestions.length === 0 ? (
          <div className="text-center p-4 border border-dashed rounded-md">
            <p className="text-sm text-muted-foreground">No suggestions available</p>
          </div>
        ) : (
          <div className="space-y-4">
            {suggestions.map((suggestion) => (
              <div key={suggestion.id} className="p-3 border rounded-md bg-background">
                <div className="flex items-start gap-3 mb-2">
                  {getSuggestionIcon(suggestion.type)}
                  <div>
                    <p className="text-sm font-medium">{suggestion.description}</p>
                    {suggestion.relatedTickets && suggestion.relatedTickets.length > 0 && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Related tickets: {suggestion.relatedTickets.join(', ')}
                      </p>
                    )}
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-2"
                  onClick={() => onApplySuggestion(suggestion.id)}
                >
                  <Check className="h-4 w-4 mr-1" />
                  {suggestion.suggestedAction}
                </Button>
              </div>
            ))}
          </div>
        )}

        <Separator className="my-4" />
        
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Quick AI Actions</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Button size="sm" variant="secondary" className="text-xs justify-start">
              <Bot className="h-4 w-4 mr-2" />
              Analyze Ticket Trends
            </Button>
            <Button size="sm" variant="secondary" className="text-xs justify-start">
              <Zap className="h-4 w-4 mr-2" />
              Generate Knowledge Base
            </Button>
            <Button size="sm" variant="secondary" className="text-xs justify-start">
              <Users className="h-4 w-4 mr-2" />
              Detect Related Issues
            </Button>
            <Button size="sm" variant="secondary" className="text-xs justify-start">
              <MessageSquare className="h-4 w-4 mr-2" />
              Draft Response Templates
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAssistantPanel;
