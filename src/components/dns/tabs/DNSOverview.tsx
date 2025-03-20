
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Edit, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip, BarChart, Bar } from 'recharts';
import { useToast } from '@/hooks/use-toast';
import DnsZoneList from '../components/DnsZoneList';
import DnsHealthStatus from '../components/DnsHealthStatus';
import TopRequestedDomains from '../components/TopRequestedDomains';

const DNSOverview: React.FC = () => {
  const { toast } = useToast();
  const [isAddingZone, setIsAddingZone] = useState(false);
  const [isEditingRecord, setIsEditingRecord] = useState(false);
  
  // Mock data for DNS analytics
  const queryData = [
    { time: '00:00', queries: 320, cached: 240, uncached: 80 },
    { time: '01:00', queries: 280, cached: 210, uncached: 70 },
    { time: '02:00', queries: 250, cached: 190, uncached: 60 },
    { time: '03:00', queries: 230, cached: 170, uncached: 60 },
    { time: '04:00', queries: 210, cached: 160, uncached: 50 },
    { time: '05:00', queries: 280, cached: 210, uncached: 70 },
    { time: '06:00', queries: 350, cached: 270, uncached: 80 },
    { time: '07:00', queries: 480, cached: 370, uncached: 110 },
    { time: '08:00', queries: 580, cached: 450, uncached: 130 },
    { time: '09:00', queries: 680, cached: 530, uncached: 150 },
    { time: '10:00', queries: 780, cached: 620, uncached: 160 },
    { time: '11:00', queries: 820, cached: 650, uncached: 170 },
    { time: '12:00', queries: 780, cached: 620, uncached: 160 },
  ];

  const resolutionData = [
    { time: '00:00', internal: 45, external: 65 },
    { time: '01:00', internal: 40, external: 60 },
    { time: '02:00', internal: 38, external: 55 },
    { time: '03:00', internal: 35, external: 50 },
    { time: '04:00', internal: 36, external: 52 },
    { time: '05:00', internal: 42, external: 59 },
    { time: '06:00', internal: 48, external: 70 },
    { time: '07:00', internal: 55, external: 80 },
    { time: '08:00', internal: 68, external: 95 },
    { time: '09:00', internal: 75, external: 110 },
    { time: '10:00', internal: 80, external: 120 },
    { time: '11:00', internal: 85, external: 125 },
    { time: '12:00', internal: 82, external: 115 },
  ];

  const handleAddZone = () => {
    setIsAddingZone(true);
    // This will be implemented in a future prompt
  };

  const handleEditRecord = () => {
    setIsEditingRecord(true);
    // This will be implemented in a future prompt
  };

  const handleFlushCache = () => {
    toast({
      title: "DNS Cache Flushed",
      description: "The DNS cache has been successfully cleared.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold mb-1">DNS Dashboard</h2>
          <p className="text-muted-foreground">Manage and monitor DNS configurations across your infrastructure</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleAddZone} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span>Add DNS Zone</span>
          </Button>
          <Button variant="outline" onClick={handleEditRecord} className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            <span>Edit Record</span>
          </Button>
          <Button variant="outline" onClick={handleFlushCache} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            <span>Flush Cache</span>
          </Button>
        </div>
      </div>

      <DnsHealthStatus />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Live DNS Query Volume</h3>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={queryData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--background)', 
                      borderColor: 'var(--border)',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="queries" 
                    stroke="#3b82f6" 
                    name="Total Queries"
                    activeDot={{ r: 8 }} 
                    strokeWidth={2} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="cached" 
                    stroke="#10b981" 
                    name="Cached Responses"
                    activeDot={{ r: 8 }} 
                    strokeWidth={2} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="uncached" 
                    stroke="#f59e0b" 
                    name="Uncached Responses"
                    activeDot={{ r: 8 }} 
                    strokeWidth={2} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Resolution Speed (ms)</h3>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={resolutionData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--background)', 
                      borderColor: 'var(--border)',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="internal" 
                    stroke="#10b981" 
                    name="Internal Domains"
                    activeDot={{ r: 8 }} 
                    strokeWidth={2} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="external" 
                    stroke="#3b82f6" 
                    name="External Domains"
                    activeDot={{ r: 8 }} 
                    strokeWidth={2} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Active DNS Zones</h3>
            <DnsZoneList />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Top Requested Domains</h3>
            <TopRequestedDomains />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DNSOverview;
