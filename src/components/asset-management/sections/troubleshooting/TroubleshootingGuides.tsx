
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle, BookOpen } from "lucide-react";

const TroubleshootingGuides = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
      <Card>
        <CardHeader className="pb-2 px-3 sm:px-4 pt-3 sm:pt-4">
          <CardTitle className="text-sm sm:text-base flex items-center">
            <HelpCircle className="h-4 w-4 mr-2" />
            Common Hardware Issues
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-4 pb-3 sm:pb-4 space-y-2">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Guides for diagnosing and resolving hardware failures and performance issues.
          </p>
          <div className="flex mt-2">
            <Button variant="outline" size="sm" className="mr-2 text-xs sm:text-sm">
              <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              View Guides
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2 px-3 sm:px-4 pt-3 sm:pt-4">
          <CardTitle className="text-sm sm:text-base flex items-center">
            <HelpCircle className="h-4 w-4 mr-2" />
            Network Connectivity
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-4 pb-3 sm:pb-4 space-y-2">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Solutions for network connection issues, VPN troubles, and bandwidth problems.
          </p>
          <div className="flex mt-2">
            <Button variant="outline" size="sm" className="mr-2 text-xs sm:text-sm">
              <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              View Guides
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2 px-3 sm:px-4 pt-3 sm:pt-4">
          <CardTitle className="text-sm sm:text-base flex items-center">
            <HelpCircle className="h-4 w-4 mr-2" />
            Software Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-4 pb-3 sm:pb-4 space-y-2">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Configuration and troubleshooting for operating systems and enterprise applications.
          </p>
          <div className="flex mt-2">
            <Button variant="outline" size="sm" className="mr-2 text-xs sm:text-sm">
              <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              View Guides
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2 px-3 sm:px-4 pt-3 sm:pt-4">
          <CardTitle className="text-sm sm:text-base flex items-center">
            <HelpCircle className="h-4 w-4 mr-2" />
            Warranty Service
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-4 pb-3 sm:pb-4 space-y-2">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Procedures for engaging manufacturer warranty services and RMA processes.
          </p>
          <div className="flex mt-2">
            <Button variant="outline" size="sm" className="mr-2 text-xs sm:text-sm">
              <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              View Guides
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TroubleshootingGuides;
