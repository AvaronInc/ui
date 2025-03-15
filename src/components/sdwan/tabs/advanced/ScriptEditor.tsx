
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface ScriptEditorProps {
  handleGenerateScript: (scriptType: string) => void;
  isGenerating: boolean;
  scriptDescription: string;
}

const ScriptEditor: React.FC<ScriptEditorProps> = ({
  handleGenerateScript,
  isGenerating,
  scriptDescription
}) => {
  return (
    <Tabs defaultValue="powershell" className="w-full">
      <TabsList className="grid grid-cols-4 mb-4">
        <TabsTrigger value="powershell">PowerShell</TabsTrigger>
        <TabsTrigger value="python">Python</TabsTrigger>
        <TabsTrigger value="golang">GoLang</TabsTrigger>
        <TabsTrigger value="ansible">Ansible</TabsTrigger>
      </TabsList>
      
      <TabsContent value="powershell" className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="powershell-script">PowerShell Script</Label>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2 text-xs"
              onClick={() => handleGenerateScript("powershell")}
              disabled={!scriptDescription.trim() || isGenerating}
            >
              <Sparkles className="mr-1 h-3 w-3" />
              Generate
            </Button>
          </div>
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
          <div className="flex justify-between items-center">
            <Label htmlFor="python-script">Python Script</Label>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2 text-xs"
              onClick={() => handleGenerateScript("python")}
              disabled={!scriptDescription.trim() || isGenerating}
            >
              <Sparkles className="mr-1 h-3 w-3" />
              Generate
            </Button>
          </div>
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
          <div className="flex justify-between items-center">
            <Label htmlFor="golang-script">GoLang Script</Label>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2 text-xs"
              onClick={() => handleGenerateScript("golang")}
              disabled={!scriptDescription.trim() || isGenerating}
            >
              <Sparkles className="mr-1 h-3 w-3" />
              Generate
            </Button>
          </div>
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
          <div className="flex justify-between items-center">
            <Label htmlFor="ansible-script">Ansible Playbook</Label>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2 text-xs"
              onClick={() => handleGenerateScript("ansible")}
              disabled={!scriptDescription.trim() || isGenerating}
            >
              <Sparkles className="mr-1 h-3 w-3" />
              Generate
            </Button>
          </div>
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
  );
};

export default ScriptEditor;
