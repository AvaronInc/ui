
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Laptop, Server, Router, MapPin, Database, Activity, AlertTriangle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const AssetOverviewSection = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 px-3 sm:px-4 pt-3 sm:pt-4">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Assets</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="px-3 sm:px-4 pb-3 sm:pb-4 pt-0">
            <div className="text-xl sm:text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">Across all locations</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 px-3 sm:px-4 pt-3 sm:pt-4">
            <CardTitle className="text-xs sm:text-sm font-medium">Active Assets</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="px-3 sm:px-4 pb-3 sm:pb-4 pt-0">
            <div className="text-xl sm:text-2xl font-bold">1,142</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 font-medium">91.5%</span> active
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 px-3 sm:px-4 pt-3 sm:pt-4">
            <CardTitle className="text-xs sm:text-sm font-medium">Expiring</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent className="px-3 sm:px-4 pb-3 sm:pb-4 pt-0">
            <div className="text-xl sm:text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Next 90 days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 px-3 sm:px-4 pt-3 sm:pt-4">
            <CardTitle className="text-xs sm:text-sm font-medium">Renewals</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent className="px-3 sm:px-4 pb-3 sm:pb-4 pt-0">
            <div className="text-xl sm:text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">This quarter</p>
          </CardContent>
        </Card>
      </div>
      
      <h3 className="text-base sm:text-lg font-medium mt-6 sm:mt-8 mb-3 sm:mb-4">Device Categories</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <Card>
          <CardContent className="pt-4 sm:pt-6 px-3 sm:px-4 pb-3 sm:pb-4">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Laptop className="h-8 w-8 sm:h-10 sm:w-10 text-blue-500 bg-blue-50 p-1 sm:p-2 rounded-md" />
              <div className="min-w-0">
                <h4 className="text-sm font-medium">Workstations</h4>
                <p className="text-xl sm:text-2xl font-bold">487</p>
                <div className="flex flex-wrap mt-1 gap-1 sm:gap-2">
                  <Badge variant="outline" className="text-xs">Windows: 342</Badge>
                  <Badge variant="outline" className="text-xs">macOS: 128</Badge>
                  <Badge variant="outline" className="text-xs">Linux: 17</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4 sm:pt-6 px-3 sm:px-4 pb-3 sm:pb-4">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Server className="h-8 w-8 sm:h-10 sm:w-10 text-purple-500 bg-purple-50 p-1 sm:p-2 rounded-md" />
              <div className="min-w-0">
                <h4 className="text-sm font-medium">Servers</h4>
                <p className="text-xl sm:text-2xl font-bold">158</p>
                <div className="flex flex-wrap mt-1 gap-1 sm:gap-2">
                  <Badge variant="outline" className="text-xs">On-Prem: 96</Badge>
                  <Badge variant="outline" className="text-xs">Cloud: 62</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4 sm:pt-6 px-3 sm:px-4 pb-3 sm:pb-4">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Router className="h-8 w-8 sm:h-10 sm:w-10 text-green-500 bg-green-50 p-1 sm:p-2 rounded-md" />
              <div className="min-w-0">
                <h4 className="text-sm font-medium">Networking</h4>
                <p className="text-xl sm:text-2xl font-bold">246</p>
                <div className="flex flex-wrap mt-1 gap-1 sm:gap-2">
                  <Badge variant="outline" className="text-xs">Switches: 124</Badge>
                  <Badge variant="outline" className="text-xs">Routers: 86</Badge>
                  <Badge variant="outline" className="text-xs">Firewalls: 36</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4 sm:pt-6 px-3 sm:px-4 pb-3 sm:pb-4">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <MapPin className="h-8 w-8 sm:h-10 sm:w-10 text-red-500 bg-red-50 p-1 sm:p-2 rounded-md" />
              <div className="min-w-0">
                <h4 className="text-sm font-medium">Avaron Vertices</h4>
                <p className="text-xl sm:text-2xl font-bold">48</p>
                <div className="flex flex-wrap mt-1 gap-1 sm:gap-2">
                  <Badge variant="outline" className="text-xs">Enterprise: 12</Badge>
                  <Badge variant="outline" className="text-xs">Standard: 36</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4 sm:pt-6 px-3 sm:px-4 pb-3 sm:pb-4">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Database className="h-8 w-8 sm:h-10 sm:w-10 text-amber-500 bg-amber-50 p-1 sm:p-2 rounded-md" />
              <div className="min-w-0">
                <h4 className="text-sm font-medium">Storage</h4>
                <p className="text-xl sm:text-2xl font-bold">96</p>
                <div className="flex flex-wrap mt-1 gap-1 sm:gap-2">
                  <Badge variant="outline" className="text-xs">NAS: 42</Badge>
                  <Badge variant="outline" className="text-xs">SAN: 24</Badge>
                  <Badge variant="outline" className="text-xs">DAS: 30</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4 sm:pt-6 px-3 sm:px-4 pb-3 sm:pb-4">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Activity className="h-8 w-8 sm:h-10 sm:w-10 text-indigo-500 bg-indigo-50 p-1 sm:p-2 rounded-md" />
              <div className="min-w-0">
                <h4 className="text-sm font-medium">IoT & Other</h4>
                <p className="text-xl sm:text-2xl font-bold">213</p>
                <div className="flex flex-wrap mt-1 gap-1 sm:gap-2">
                  <Badge variant="outline" className="text-xs">IoT: 152</Badge>
                  <Badge variant="outline" className="text-xs">Other: 61</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AssetOverviewSection;
