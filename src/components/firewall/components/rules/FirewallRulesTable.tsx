
import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit2, Trash2, AlertTriangle } from 'lucide-react';
import NewRuleDialog from './NewRuleDialog';

interface FirewallRule {
  id: string;
  name: string;
  source: string;
  destination: string;
  port: string;
  protocol: string;
  action: 'allow' | 'deny';
  hits: number;
  lastHit?: string;
}

const FirewallRulesTable = () => {
  const { toast } = useToast();
  const [rules, setRules] = useState<FirewallRule[]>([
    {
      id: '1',
      name: 'Allow HTTPS',
      source: 'Any',
      destination: 'Any',
      port: '443',
      protocol: 'TCP',
      action: 'allow',
      hits: 1250
    },
    {
      id: '2',
      name: 'Block Telnet',
      source: 'Any',
      destination: 'Any',
      port: '23',
      protocol: 'TCP',
      action: 'deny',
      hits: 45
    }
  ]);
  const [showNewRule, setShowNewRule] = useState(false);

  const handleRuleDelete = (id: string) => {
    setRules(prev => prev.filter(rule => rule.id !== id));
    toast({
      title: "Rule Deleted",
      description: "The firewall rule has been removed successfully."
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Firewall Rules</h3>
        <Button onClick={() => setShowNewRule(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Rule
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Port/Protocol</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Hit Count</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rules.map((rule) => (
            <TableRow key={rule.id}>
              <TableCell>{rule.name}</TableCell>
              <TableCell>{rule.source}</TableCell>
              <TableCell>{rule.destination}</TableCell>
              <TableCell>{rule.port}/{rule.protocol}</TableCell>
              <TableCell>
                <Badge variant={rule.action === 'allow' ? 'default' : 'destructive'}>
                  {rule.action.toUpperCase()}
                </Badge>
              </TableCell>
              <TableCell>{rule.hits.toLocaleString()}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="icon">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleRuleDelete(rule.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  {rule.hits > 1000 && (
                    <Button variant="outline" size="icon">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <NewRuleDialog open={showNewRule} onOpenChange={setShowNewRule} />
    </div>
  );
};

export default FirewallRulesTable;
