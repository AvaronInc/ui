
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  Bot
} from "lucide-react";
import { useNavigate } from 'react-router-dom';

const SupportTickets = () => {
  const navigate = useNavigate();

  const goToTickets = () => {
    navigate('/tickets');
  };

  return (
    <Card>
      <CardHeader className="pb-3 px-3 sm:px-6 pt-3 sm:pt-6">
        <CardTitle className="text-base sm:text-lg flex items-center justify-between">
          <span>Support Ticket Integration</span>
          <Badge variant="secondary" className="text-xs sm:text-sm">
            <Bot className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            AI Powered
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
          <div className="border rounded-md p-2 flex flex-col items-center justify-center bg-accent/30">
            <span className="text-xs text-muted-foreground mb-1">Open Tickets</span>
            <span className="text-xl font-bold">12</span>
          </div>
          <div className="border rounded-md p-2 flex flex-col items-center justify-center bg-accent/30">
            <span className="text-xs text-muted-foreground mb-1">Asset-Related</span>
            <span className="text-xl font-bold">8</span>
          </div>
          <div className="border rounded-md p-2 flex flex-col items-center justify-center bg-accent/30">
            <span className="text-xs text-muted-foreground mb-1">Resolved Today</span>
            <span className="text-xl font-bold">5</span>
          </div>
        </div>
        
        <p className="text-xs sm:text-sm text-muted-foreground">
          Create or link support tickets to specific assets for better tracking and faster resolution.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-6">
          <Button className="sm:w-auto text-xs sm:text-sm" onClick={goToTickets}>
            <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            Create New Ticket
          </Button>
          <Button variant="outline" className="sm:w-auto text-xs sm:text-sm" onClick={goToTickets}>
            <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            View All Tickets
          </Button>
        </div>
        
        <div className="border rounded-md p-3 sm:p-4">
          <h4 className="font-medium mb-3 sm:mb-4 text-sm sm:text-base">Recent Asset-Related Tickets</h4>
          <div className="space-y-3 sm:space-y-4">
            <div className="p-2 sm:p-3 border rounded-md bg-background hover:bg-accent/20 cursor-pointer transition-colors" onClick={goToTickets}>
              <div className="flex justify-between items-center">
                <div className="font-medium text-xs sm:text-sm">T-2023-0154</div>
                <div className="flex items-center gap-1 text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 bg-yellow-100 text-yellow-800 rounded-full">
                  <Clock className="h-3 w-3" />
                  <span>In Progress</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm mt-1">Display issues with WS-DEV-01 workstation</div>
              <div className="flex justify-between items-center mt-1">
                <div className="text-xs text-muted-foreground">Opened: Oct 12, 2023</div>
                <Badge variant="outline" className="text-xs">Hardware</Badge>
              </div>
            </div>
            
            <div className="p-2 sm:p-3 border rounded-md bg-background hover:bg-accent/20 cursor-pointer transition-colors" onClick={goToTickets}>
              <div className="flex justify-between items-center">
                <div className="font-medium text-xs sm:text-sm">T-2023-0142</div>
                <div className="flex items-center gap-1 text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 bg-green-100 text-green-800 rounded-full">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>Resolved</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm mt-1">Network connectivity issues on SW-CORE-01</div>
              <div className="flex justify-between items-center mt-1">
                <div className="text-xs text-muted-foreground">Opened: Oct 8, 2023</div>
                <Badge variant="outline" className="text-xs">Network</Badge>
              </div>
            </div>
            
            <div className="p-2 sm:p-3 border rounded-md bg-background hover:bg-accent/20 cursor-pointer transition-colors" onClick={goToTickets}>
              <div className="flex justify-between items-center">
                <div className="font-medium text-xs sm:text-sm">T-2023-0138</div>
                <div className="flex items-center gap-1 text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 bg-red-100 text-red-800 rounded-full">
                  <AlertTriangle className="h-3 w-3" />
                  <span>Critical</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm mt-1">SRV-DB-01 storage array failure</div>
              <div className="flex justify-between items-center mt-1">
                <div className="text-xs text-muted-foreground">Opened: Oct 5, 2023</div>
                <Badge variant="outline" className="text-xs">Storage</Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupportTickets;
