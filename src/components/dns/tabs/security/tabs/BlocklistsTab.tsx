
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const BlocklistsTab: React.FC = () => {
  // Sample blocklisted TLDs
  const blockedTlds = ['.xyz', '.ru', '.pw', '.cn', '.su'];
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">TLD Blocklist</h3>
              <div className="rounded-md border p-4">
                <div className="space-y-3">
                  {blockedTlds.map((tld, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{tld}</span>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        Remove
                      </Button>
                    </div>
                  ))}
                  <div className="pt-3 border-t">
                    <Input placeholder="Add new TLD (e.g., .xyz)" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Domain Allowlist</h3>
              <div className="rounded-md border p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">*.office365.com</span>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      Remove
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">*.google.com</span>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      Remove
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">*.salesforce.com</span>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      Remove
                    </Button>
                  </div>
                  <div className="pt-3 border-t">
                    <Input placeholder="Add domain to allowlist" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlocklistsTab;
