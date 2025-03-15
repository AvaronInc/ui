
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Code, Settings2, Zap, Share } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdvancedConfigTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Code className="mr-2 h-5 w-5" />
            API Access & External Automation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="api-access">Enable API Access</Label>
            <Switch id="api-access" defaultChecked />
          </div>
          
          <div className="space-y-2">
            <Label>API Authentication Method</Label>
            <Select defaultValue="oauth2">
              <SelectTrigger>
                <SelectValue placeholder="Select authentication method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="oauth2">OAuth 2.0</SelectItem>
                <SelectItem value="api-key">API Key</SelectItem>
                <SelectItem value="jwt">JWT</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>API Keys</Label>
              <Button variant="outline" size="sm">Generate New</Button>
            </div>
            
            <div className="bg-muted rounded-md p-3 space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium">Monitoring Key</div>
                  <div className="text-xs text-muted-foreground">Created: 2023-05-15</div>
                </div>
                <Badge>Active</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium">Configuration Key</div>
                  <div className="text-xs text-muted-foreground">Created: 2023-07-22</div>
                </div>
                <Badge>Active</Badge>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <Label htmlFor="webhook-support">Webhook Support for Alerts</Label>
            <Switch id="webhook-support" defaultChecked />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <Input id="webhook-url" placeholder="https://example.com/webhook" />
          </div>
          
          <div className="space-y-2">
            <Label>Webhook Events</Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="failover-events" className="h-4 w-4" defaultChecked />
                <Label htmlFor="failover-events" className="text-sm">Failover Events</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="security-alerts" className="h-4 w-4" defaultChecked />
                <Label htmlFor="security-alerts" className="text-sm">Security Alerts</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="performance-issues" className="h-4 w-4" defaultChecked />
                <Label htmlFor="performance-issues" className="text-sm">Performance Issues</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="config-changes" className="h-4 w-4" />
                <Label htmlFor="config-changes" className="text-sm">Config Changes</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="mr-2 h-5 w-5" />
            Custom Scripting
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="powershell" className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="powershell">PowerShell</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
              <TabsTrigger value="golang">GoLang</TabsTrigger>
              <TabsTrigger value="ansible">Ansible</TabsTrigger>
            </TabsList>
            
            <TabsContent value="powershell" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="powershell-script">PowerShell Script</Label>
                <Textarea
                  id="powershell-script"
                  placeholder="# Enter PowerShell script for advanced routing logic"
                  className="font-mono text-xs h-48"
                  defaultValue={`# Example PowerShell script for SD-WAN routing logic
$primary = Test-NetConnection -ComputerName 8.8.8.8 -WarningAction SilentlyContinue
if ($primary.PingSucceeded -eq $false) {
    # Failover to secondary link
    Write-Output "Primary link down, failing over..."
    # Apply routing changes
}`}
                />
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline">Test Script</Button>
                <Button>Save & Apply</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="python" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="python-script">Python Script</Label>
                <Textarea
                  id="python-script"
                  placeholder="# Enter Python script"
                  className="font-mono text-xs h-48"
                  defaultValue={`# Example Python script for SD-WAN monitoring
import subprocess
import json

def check_connection(host="8.8.8.8"):
    try:
        subprocess.check_output(["ping", "-c", "1", host])
        return True
    except:
        return False

# Monitor primary connection
if not check_connection():
    print("Primary connection down, triggering failover")
    # Implement failover logic`}
                />
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline">Test Script</Button>
                <Button>Save & Apply</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="golang" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="golang-script">GoLang Script</Label>
                <Textarea
                  id="golang-script"
                  placeholder="// Enter GoLang script"
                  className="font-mono text-xs h-48"
                  defaultValue={`// Example Go code for SD-WAN management
package main

import (
	"fmt"
	"net"
	"time"
)

func checkConnection(host string) bool {
	conn, err := net.DialTimeout("tcp", host, 5*time.Second)
	if err != nil {
		return false
	}
	defer conn.Close()
	return true
}

func main() {
	// Monitor and manage SD-WAN connections
	if !checkConnection("8.8.8.8:53") {
		fmt.Println("Connection down, initiating failover")
		// Implement failover logic
	}
}`}
                />
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline">Test Script</Button>
                <Button>Save & Apply</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="ansible" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ansible-script">Ansible Playbook</Label>
                <Textarea
                  id="ansible-script"
                  placeholder="# Enter Ansible playbook YAML"
                  className="font-mono text-xs h-48"
                  defaultValue={`---
- name: SD-WAN Configuration
  hosts: all
  become: yes
  tasks:
    - name: Check WAN connectivity
      command: ping -c 1 8.8.8.8
      register: ping_result
      ignore_errors: yes
      
    - name: Apply failover configuration
      when: ping_result.rc != 0
      block:
        - name: Update routing table
          command: ip route add default via 192.168.2.1
          
        - name: Notify admin
          debug:
            msg: "Primary link down, failover activated"`}
                />
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline">Test Playbook</Button>
                <Button>Save & Apply</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings2 className="mr-2 h-5 w-5" />
            Configuration Backup & Restore
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Scheduled Backups</Label>
                <Select defaultValue="daily">
                  <SelectTrigger>
                    <SelectValue placeholder="Select backup frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="manual">Manual Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Backup Retention</Label>
                <Select defaultValue="30">
                  <SelectTrigger>
                    <SelectValue placeholder="Select retention period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 Days</SelectItem>
                    <SelectItem value="30">30 Days</SelectItem>
                    <SelectItem value="90">90 Days</SelectItem>
                    <SelectItem value="365">1 Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Backup Location</Label>
                <Select defaultValue="local">
                  <SelectTrigger>
                    <SelectValue placeholder="Select backup location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">Local Storage</SelectItem>
                    <SelectItem value="s3">AWS S3</SelectItem>
                    <SelectItem value="azure">Azure Blob Storage</SelectItem>
                    <SelectItem value="gcp">Google Cloud Storage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="w-full">
                Create Manual Backup Now
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Available Backups</Label>
                <div className="bg-muted rounded-md p-3 h-[207px] overflow-y-auto">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm font-medium">Backup_20230828_0600</div>
                        <div className="text-xs text-muted-foreground">2023-08-28 06:00:00</div>
                      </div>
                      <Button variant="outline" size="sm">Restore</Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm font-medium">Backup_20230827_0600</div>
                        <div className="text-xs text-muted-foreground">2023-08-27 06:00:00</div>
                      </div>
                      <Button variant="outline" size="sm">Restore</Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm font-medium">Backup_20230826_0600</div>
                        <div className="text-xs text-muted-foreground">2023-08-26 06:00:00</div>
                      </div>
                      <Button variant="outline" size="sm">Restore</Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm font-medium">Backup_20230825_0600</div>
                        <div className="text-xs text-muted-foreground">2023-08-25 06:00:00</div>
                      </div>
                      <Button variant="outline" size="sm">Restore</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-3">
                <Button variant="outline" className="w-full">
                  Import Configuration File
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedConfigTab;
