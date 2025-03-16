
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const SupportTickets = () => {
  return (
    <Card>
      <CardHeader className="pb-3 px-3 sm:px-6 pt-3 sm:pt-6">
        <CardTitle className="text-base sm:text-lg">Support Ticket Integration</CardTitle>
      </CardHeader>
      <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6 space-y-4">
        <p className="text-xs sm:text-sm text-muted-foreground">
          Create or link support tickets to specific assets for better tracking and faster resolution.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-6">
          <Button className="sm:w-auto text-xs sm:text-sm">
            <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            Create New Ticket
          </Button>
          <Button variant="outline" className="sm:w-auto text-xs sm:text-sm">
            View Asset Tickets
          </Button>
        </div>
        
        <div className="border rounded-md p-3 sm:p-4">
          <h4 className="font-medium mb-3 sm:mb-4 text-sm sm:text-base">Recent Asset-Related Tickets</h4>
          <div className="space-y-3 sm:space-y-4">
            <div className="p-2 sm:p-3 border rounded-md">
              <div className="flex justify-between items-center">
                <div className="font-medium text-xs sm:text-sm">T-2023-0154</div>
                <div className="text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 bg-yellow-100 text-yellow-800 rounded-full">In Progress</div>
              </div>
              <div className="text-xs sm:text-sm mt-1">Display issues with WS-DEV-01 workstation</div>
              <div className="text-xs text-muted-foreground mt-1">Opened: Oct 12, 2023</div>
            </div>
            <div className="p-2 sm:p-3 border rounded-md">
              <div className="flex justify-between items-center">
                <div className="font-medium text-xs sm:text-sm">T-2023-0142</div>
                <div className="text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 bg-green-100 text-green-800 rounded-full">Resolved</div>
              </div>
              <div className="text-xs sm:text-sm mt-1">Network connectivity issues on SW-CORE-01</div>
              <div className="text-xs text-muted-foreground mt-1">Opened: Oct 8, 2023</div>
            </div>
            <div className="p-2 sm:p-3 border rounded-md">
              <div className="flex justify-between items-center">
                <div className="font-medium text-xs sm:text-sm">T-2023-0138</div>
                <div className="text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 bg-red-100 text-red-800 rounded-full">Critical</div>
              </div>
              <div className="text-xs sm:text-sm mt-1">SRV-DB-01 storage array failure</div>
              <div className="text-xs text-muted-foreground mt-1">Opened: Oct 5, 2023</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupportTickets;
