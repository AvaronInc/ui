
import React from 'react';
import { SecurityEvent } from '@/types/security';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { FileText, AlertTriangle, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SecurityEventDetailProps {
  event: SecurityEvent | null;
}

const SecurityEventDetail = ({ event }: SecurityEventDetailProps) => {
  const { toast } = useToast();
  
  if (!event) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        Select an event to view details
      </div>
    );
  }

  const handleAcknowledge = () => {
    toast({
      title: "Event Acknowledged",
      description: `Event ${event.id} has been acknowledged.`
    });
  };

  const handleGenerateReport = () => {
    toast({
      title: "Generating Report",
      description: "The report is being generated and will be available shortly."
    });
  };

  const handleEscalate = () => {
    toast({
      title: "Event Escalated",
      description: "A new support ticket has been created for the IT team."
    });
  };

  return (
    <div className="flex h-full flex-col">
      <div className="p-6">
        <h3 className="text-lg font-semibold">Event Details</h3>
        <p className="text-sm text-muted-foreground">
          {new Date(event.timestamp).toLocaleString()}
        </p>
      </div>
      <Separator />
      <ScrollArea className="flex-1 p-6">
        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-2">Description</h4>
            <p className="text-sm text-muted-foreground">{event.description}</p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Affected Systems</h4>
            <p className="text-sm text-muted-foreground">
              Device: {event.affectedDevice}
              {event.userAffected && <><br />User: {event.userAffected}</>}
            </p>
          </div>

          {event.remediationSteps && (
            <div>
              <h4 className="font-medium mb-2">Remediation Steps</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                {event.remediationSteps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </div>
          )}

          {event.logs && event.logs.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Related Logs</h4>
              <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
                {event.logs.join('\n')}
              </pre>
            </div>
          )}
        </div>
      </ScrollArea>
      <Separator />
      <div className="p-6 space-x-2">
        <Button onClick={handleAcknowledge} variant="outline">
          <AlertTriangle className="mr-2 h-4 w-4" />
          Acknowledge
        </Button>
        <Button onClick={handleGenerateReport} variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
        <Button onClick={handleEscalate}>
          <Send className="mr-2 h-4 w-4" />
          Escalate
        </Button>
      </div>
    </div>
  );
};

export default SecurityEventDetail;
