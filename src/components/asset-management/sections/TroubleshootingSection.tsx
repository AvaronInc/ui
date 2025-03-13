
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { HelpCircle, BookOpen, FileText, MessageCircle, Link } from "lucide-react";

const TroubleshootingSection = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
        <h3 className="text-lg font-medium">Troubleshooting & Support</h3>
      </div>
      
      <Tabs defaultValue="guides">
        <TabsList className="mb-4">
          <TabsTrigger value="guides">Troubleshooting Guides</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
          <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
        </TabsList>
        
        <TabsContent value="guides" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Common Hardware Issues
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Guides for diagnosing and resolving hardware failures and performance issues.
                </p>
                <div className="flex mt-2">
                  <Button variant="outline" size="sm" className="mr-2">
                    <BookOpen className="h-4 w-4 mr-2" />
                    View Guides
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Network Connectivity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Solutions for network connection issues, VPN troubles, and bandwidth problems.
                </p>
                <div className="flex mt-2">
                  <Button variant="outline" size="sm" className="mr-2">
                    <BookOpen className="h-4 w-4 mr-2" />
                    View Guides
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Software Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Configuration and troubleshooting for operating systems and enterprise applications.
                </p>
                <div className="flex mt-2">
                  <Button variant="outline" size="sm" className="mr-2">
                    <BookOpen className="h-4 w-4 mr-2" />
                    View Guides
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Warranty Service
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Procedures for engaging manufacturer warranty services and RMA processes.
                </p>
                <div className="flex mt-2">
                  <Button variant="outline" size="sm" className="mr-2">
                    <BookOpen className="h-4 w-4 mr-2" />
                    View Guides
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="knowledge" className="mt-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">AI-Powered Knowledge Base</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for solutions..."
                  className="w-full py-2 px-4 border rounded-md"
                />
                <Button className="absolute right-1 top-1">
                  Search
                </Button>
              </div>
              
              <div className="border rounded-md p-4 bg-muted/30">
                <h4 className="font-medium mb-2">Popular Articles</h4>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-primary" />
                    <a href="#" className="text-sm hover:underline">
                      How to resolve Dell Precision hardware faults
                    </a>
                  </li>
                  <li className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-primary" />
                    <a href="#" className="text-sm hover:underline">
                      Cisco switch configuration best practices
                    </a>
                  </li>
                  <li className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-primary" />
                    <a href="#" className="text-sm hover:underline">
                      HP server warranty claim process
                    </a>
                  </li>
                  <li className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-primary" />
                    <a href="#" className="text-sm hover:underline">
                      Windows Server 2022 common issues and fixes
                    </a>
                  </li>
                </ul>
              </div>
              
              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-2">Manufacturer Support Resources</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <a href="#" className="flex flex-col items-center p-4 border rounded-md hover:bg-muted/30">
                    <Link className="h-6 w-6 mb-2" />
                    <span className="text-sm">Dell</span>
                  </a>
                  <a href="#" className="flex flex-col items-center p-4 border rounded-md hover:bg-muted/30">
                    <Link className="h-6 w-6 mb-2" />
                    <span className="text-sm">HP</span>
                  </a>
                  <a href="#" className="flex flex-col items-center p-4 border rounded-md hover:bg-muted/30">
                    <Link className="h-6 w-6 mb-2" />
                    <span className="text-sm">Cisco</span>
                  </a>
                  <a href="#" className="flex flex-col items-center p-4 border rounded-md hover:bg-muted/30">
                    <Link className="h-6 w-6 mb-2" />
                    <span className="text-sm">Microsoft</span>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tickets" className="mt-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Support Ticket Integration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Create or link support tickets to specific assets for better tracking and faster resolution.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Button className="sm:w-auto">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Create New Ticket
                </Button>
                <Button variant="outline" className="sm:w-auto">
                  View Asset Tickets
                </Button>
              </div>
              
              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-4">Recent Asset-Related Tickets</h4>
                <div className="space-y-4">
                  <div className="p-3 border rounded-md">
                    <div className="flex justify-between items-center">
                      <div className="font-medium">T-2023-0154</div>
                      <div className="text-sm px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">In Progress</div>
                    </div>
                    <div className="text-sm mt-1">Display issues with WS-DEV-01 workstation</div>
                    <div className="text-sm text-muted-foreground mt-1">Opened: Oct 12, 2023</div>
                  </div>
                  <div className="p-3 border rounded-md">
                    <div className="flex justify-between items-center">
                      <div className="font-medium">T-2023-0142</div>
                      <div className="text-sm px-2 py-1 bg-green-100 text-green-800 rounded-full">Resolved</div>
                    </div>
                    <div className="text-sm mt-1">Network connectivity issues on SW-CORE-01</div>
                    <div className="text-sm text-muted-foreground mt-1">Opened: Oct 8, 2023</div>
                  </div>
                  <div className="p-3 border rounded-md">
                    <div className="flex justify-between items-center">
                      <div className="font-medium">T-2023-0138</div>
                      <div className="text-sm px-2 py-1 bg-red-100 text-red-800 rounded-full">Critical</div>
                    </div>
                    <div className="text-sm mt-1">SRV-DB-01 storage array failure</div>
                    <div className="text-sm text-muted-foreground mt-1">Opened: Oct 5, 2023</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TroubleshootingSection;
