
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Laptop, Server, Router, MapPin, Database, Activity, AlertTriangle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const AssetOverviewSection = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">Across all locations and categories</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Assets</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,142</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 font-medium">91.5%</span> of total assets
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Warranties</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Expiring in the next 90 days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">License Renewals</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">Requiring renewal this quarter</p>
          </CardContent>
        </Card>
      </div>
      
      <h3 className="text-lg font-medium mt-8 mb-4">Device Categories</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <Laptop className="h-10 w-10 text-blue-500 bg-blue-50 p-2 rounded-md" />
              <div>
                <h4 className="text-sm font-medium">Workstations</h4>
                <p className="text-2xl font-bold">487</p>
                <div className="flex mt-1 space-x-2">
                  <Badge variant="outline">Windows: 342</Badge>
                  <Badge variant="outline">macOS: 128</Badge>
                  <Badge variant="outline">Linux: 17</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <Server className="h-10 w-10 text-purple-500 bg-purple-50 p-2 rounded-md" />
              <div>
                <h4 className="text-sm font-medium">Servers</h4>
                <p className="text-2xl font-bold">158</p>
                <div className="flex mt-1 space-x-2">
                  <Badge variant="outline">On-Prem: 96</Badge>
                  <Badge variant="outline">Cloud: 62</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <Router className="h-10 w-10 text-green-500 bg-green-50 p-2 rounded-md" />
              <div>
                <h4 className="text-sm font-medium">Networking</h4>
                <p className="text-2xl font-bold">246</p>
                <div className="flex mt-1 space-x-2">
                  <Badge variant="outline">Switches: 124</Badge>
                  <Badge variant="outline">Routers: 86</Badge>
                  <Badge variant="outline">Firewalls: 36</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <MapPin className="h-10 w-10 text-red-500 bg-red-50 p-2 rounded-md" />
              <div>
                <h4 className="text-sm font-medium">CyberNests</h4>
                <p className="text-2xl font-bold">48</p>
                <div className="flex mt-1 space-x-2">
                  <Badge variant="outline">Enterprise: 12</Badge>
                  <Badge variant="outline">Standard: 36</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <Database className="h-10 w-10 text-amber-500 bg-amber-50 p-2 rounded-md" />
              <div>
                <h4 className="text-sm font-medium">Storage</h4>
                <p className="text-2xl font-bold">96</p>
                <div className="flex mt-1 space-x-2">
                  <Badge variant="outline">NAS: 42</Badge>
                  <Badge variant="outline">SAN: 24</Badge>
                  <Badge variant="outline">DAS: 30</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <Activity className="h-10 w-10 text-indigo-500 bg-indigo-50 p-2 rounded-md" />
              <div>
                <h4 className="text-sm font-medium">IoT & Other</h4>
                <p className="text-2xl font-bold">213</p>
                <div className="flex mt-1 space-x-2">
                  <Badge variant="outline">IoT: 152</Badge>
                  <Badge variant="outline">Other: 61</Badge>
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
