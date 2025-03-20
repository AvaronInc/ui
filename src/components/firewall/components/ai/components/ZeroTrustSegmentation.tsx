
import React from 'react';
import { Lock, MapPin } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

interface ZeroTrustSegmentationProps {
  zeroTrust: boolean;
  toggleZeroTrust: () => void;
  aiEnabled: boolean;
}

const ZeroTrustSegmentation = ({ zeroTrust, toggleZeroTrust, aiEnabled }: ZeroTrustSegmentationProps) => {
  return (
    <Card className={`${zeroTrust ? 'border-primary/50' : ''}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="h-5 w-5 text-primary" />
          <span>Autonomous Zero Trust Segmentation</span>
          {zeroTrust && (
            <Badge className="ml-2 bg-primary text-primary-foreground">Active</Badge>
          )}
        </CardTitle>
        <CardDescription>
          Automatically isolate high-risk endpoints from sensitive network areas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="font-medium">Zero Trust Segmentation</div>
          <Switch 
            checked={zeroTrust} 
            onCheckedChange={toggleZeroTrust}
            disabled={!aiEnabled}
          />
        </div>
        
        {zeroTrust ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-3">
                <div className="text-sm font-medium mb-1">Isolated Endpoints</div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-xs text-muted-foreground mt-1">Currently segmented</div>
              </div>
              
              <div className="border rounded-lg p-3">
                <div className="text-sm font-medium mb-1">Protected Assets</div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-xs text-muted-foreground mt-1">Behind zero trust</div>
              </div>
              
              <div className="border rounded-lg p-3">
                <div className="text-sm font-medium mb-1">Segmentation Rules</div>
                <div className="text-2xl font-bold">8</div>
                <div className="text-xs text-muted-foreground mt-1">Auto-generated</div>
              </div>
            </div>
            
            <div className="rounded-md border">
              <div className="p-3 border-b bg-muted/50">
                <h4 className="font-medium">Isolated Endpoints</h4>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/20">
                    <th className="py-2 px-4 text-sm font-medium text-left">Host</th>
                    <th className="py-2 px-4 text-sm font-medium text-left">Risk Reason</th>
                    <th className="py-2 px-4 text-sm font-medium text-left">Isolation Level</th>
                    <th className="py-2 px-4 text-sm font-medium text-left">Since</th>
                    <th className="py-2 px-4 text-sm font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <div className="font-medium">10.0.3.45</div>
                      <div className="text-xs text-muted-foreground">Sales Laptop</div>
                    </td>
                    <td className="py-2 px-4">
                      <div className="text-sm text-red-600">Data Exfiltration</div>
                    </td>
                    <td className="py-2 px-4">
                      <Badge className="bg-red-100 text-red-800">Full Isolation</Badge>
                    </td>
                    <td className="py-2 px-4">3h 42m ago</td>
                    <td className="py-2 px-4 text-right">
                      <Button variant="outline" size="sm">Release</Button>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <div className="font-medium">10.0.4.102</div>
                      <div className="text-xs text-muted-foreground">IoT Camera</div>
                    </td>
                    <td className="py-2 px-4">
                      <div className="text-sm text-amber-600">Anomalous Behavior</div>
                    </td>
                    <td className="py-2 px-4">
                      <Badge className="bg-amber-100 text-amber-800">Limited Access</Badge>
                    </td>
                    <td className="py-2 px-4">1d 7h ago</td>
                    <td className="py-2 px-4 text-right">
                      <Button variant="outline" size="sm">Release</Button>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <div className="font-medium">172.16.83.12</div>
                      <div className="text-xs text-muted-foreground">Dev Workstation</div>
                    </td>
                    <td className="py-2 px-4">
                      <div className="text-sm text-amber-600">Port Scanning</div>
                    </td>
                    <td className="py-2 px-4">
                      <Badge className="bg-amber-100 text-amber-800">Limited Access</Badge>
                    </td>
                    <td className="py-2 px-4">5h 18m ago</td>
                    <td className="py-2 px-4 text-right">
                      <Button variant="outline" size="sm">Release</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="rounded-md border p-6 text-center">
            <MapPin className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-lg font-medium mb-1">Zero Trust Segmentation is Disabled</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Enable to automatically isolate high-risk endpoints and protect your network.
            </p>
            <Button
              onClick={toggleZeroTrust}
              disabled={!aiEnabled}
            >
              Enable Zero Trust
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ZeroTrustSegmentation;
