
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AIProjectSuggestion, Project } from '@/types/projects';
import { AlertTriangle, ArrowRight, Calendar, Users, FileText, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface AIProjectPanelProps {
  suggestions: AIProjectSuggestion[];
  onAction: (suggestion: AIProjectSuggestion) => void;
  selectedProject?: Project | null;
}

const AIProjectPanel = ({ suggestions, onAction, selectedProject }: AIProjectPanelProps) => {
  // Filter suggestions for the selected project if one is selected
  const filteredSuggestions = selectedProject 
    ? suggestions.filter(s => s.projectId === selectedProject.id)
    : suggestions;

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'deadline':
        return <Calendar className="h-4 w-4" />;
      case 'resource':
        return <Users className="h-4 w-4" />;
      case 'dependency':
        return <AlertTriangle className="h-4 w-4" />;
      case 'report':
        return <FileText className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case 'high':
        return "bg-red-50 text-red-700 border-red-200";
      case 'medium':
        return "bg-amber-50 text-amber-700 border-amber-200";
      case 'low':
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getActionText = (action: string) => {
    switch (action) {
      case 'adjust-timeline':
        return "Adjust Timeline";
      case 'reassign-tasks':
        return "Reassign Tasks";
      case 'generate-report':
        return "Generate Report";
      case 'send-reminder':
        return "Send Reminder";
      default:
        return "Take Action";
    }
  };

  return (
    <Card className="border-l-4 border-l-primary">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <span className="bg-primary/10 p-1 rounded">
            <Clock className="h-4 w-4 text-primary" />
          </span>
          AI Project Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {filteredSuggestions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No AI suggestions available</p>
            <p className="text-xs mt-1">
              {selectedProject ? 
                "This project is progressing well!" : 
                "All projects are currently on track"}
            </p>
          </div>
        ) : (
          filteredSuggestions.map((suggestion) => (
            <div 
              key={suggestion.id}
              className={cn(
                "p-3 rounded-lg border",
                getSeverityClass(suggestion.severity)
              )}
            >
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-white">
                  {getSuggestionIcon(suggestion.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium text-sm">{suggestion.title}</h4>
                    <Badge variant="outline" className="ml-2 shrink-0">
                      {suggestion.type}
                    </Badge>
                  </div>
                  <p className="text-xs mb-2">{suggestion.description}</p>
                  <Button 
                    size="sm" 
                    className="text-xs h-7"
                    onClick={() => onAction(suggestion)}
                  >
                    {getActionText(suggestion.actionType)}
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default AIProjectPanel;
