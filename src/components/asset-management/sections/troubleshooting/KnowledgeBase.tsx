
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Link } from "lucide-react";

const KnowledgeBase = () => {
  return (
    <Card>
      <CardHeader className="pb-3 px-3 sm:px-6 pt-3 sm:pt-6">
        <CardTitle className="text-base sm:text-lg">AI-Powered Knowledge Base</CardTitle>
      </CardHeader>
      <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6 space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for solutions..."
            className="w-full py-2 px-4 border rounded-md text-sm"
          />
          <Button className="absolute right-1 top-1 text-xs sm:text-sm py-1 px-2 sm:py-1.5 sm:px-3">
            Search
          </Button>
        </div>
        
        <div className="border rounded-md p-3 sm:p-4 bg-muted/30">
          <h4 className="font-medium mb-2 text-sm sm:text-base">Popular Articles</h4>
          <ul className="space-y-2">
            <li className="flex items-center">
              <FileText className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-primary flex-shrink-0" />
              <a href="#" className="text-xs sm:text-sm hover:underline">
                How to resolve Dell Precision hardware faults
              </a>
            </li>
            <li className="flex items-center">
              <FileText className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-primary flex-shrink-0" />
              <a href="#" className="text-xs sm:text-sm hover:underline">
                Cisco switch configuration best practices
              </a>
            </li>
            <li className="flex items-center">
              <FileText className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-primary flex-shrink-0" />
              <a href="#" className="text-xs sm:text-sm hover:underline">
                HP server warranty claim process
              </a>
            </li>
            <li className="flex items-center">
              <FileText className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-primary flex-shrink-0" />
              <a href="#" className="text-xs sm:text-sm hover:underline">
                Windows Server 2022 common issues and fixes
              </a>
            </li>
          </ul>
        </div>
        
        <div className="border rounded-md p-3 sm:p-4">
          <h4 className="font-medium mb-2 text-sm sm:text-base">Manufacturer Support Resources</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
            <a href="#" className="flex flex-col items-center p-2 sm:p-4 border rounded-md hover:bg-muted/30">
              <Link className="h-5 w-5 sm:h-6 sm:w-6 mb-1 sm:mb-2" />
              <span className="text-xs sm:text-sm">Dell</span>
            </a>
            <a href="#" className="flex flex-col items-center p-2 sm:p-4 border rounded-md hover:bg-muted/30">
              <Link className="h-5 w-5 sm:h-6 sm:w-6 mb-1 sm:mb-2" />
              <span className="text-xs sm:text-sm">HP</span>
            </a>
            <a href="#" className="flex flex-col items-center p-2 sm:p-4 border rounded-md hover:bg-muted/30">
              <Link className="h-5 w-5 sm:h-6 sm:w-6 mb-1 sm:mb-2" />
              <span className="text-xs sm:text-sm">Cisco</span>
            </a>
            <a href="#" className="flex flex-col items-center p-2 sm:p-4 border rounded-md hover:bg-muted/30">
              <Link className="h-5 w-5 sm:h-6 sm:w-6 mb-1 sm:mb-2" />
              <span className="text-xs sm:text-sm">Microsoft</span>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KnowledgeBase;
