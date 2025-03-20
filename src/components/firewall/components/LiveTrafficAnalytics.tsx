import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';

// Sample data generator
const generateTrafficData = () => {
  const now = new Date();
  const data = [];
  
  for (let i = 10; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000);
    const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Randomize values but keep them consistent with the previous point to create smoother graphs
    const incomingBase = i === 10 ? Math.floor(Math.random() * 100) + 50 : data[data.length - 1]?.incoming || 75;
    const outgoingBase = i === 10 ? Math.floor(Math.random() * 80) + 40 : data[data.length - 1]?.outgoing || 60;
    const blockedBase = i === 10 ? Math.floor(Math.random() * 20) + 5 : data[data.length - 1]?.blocked || 15;

    // Add some randomness but keep close to previous value
    const fluctuation = 15;
    data.push({
      time: timeString,
      incoming: Math.max(0, incomingBase + (Math.random() * fluctuation * 2 - fluctuation)),
      outgoing: Math.max(0, outgoingBase + (Math.random() * fluctuation * 2 - fluctuation)),
      blocked: Math.max(0, blockedBase + (Math.random() * 5 * 2 - 5)),
    });
  }
  
  return data;
};

const LiveTrafficAnalytics: React.FC = () => {
  const [data, setData] = useState(generateTrafficData());
  
  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newData = [...data.slice(1)];
      
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      const lastPoint = data[data.length - 1];
      
      newData.push({
        time: timeString,
        incoming: Math.max(0, lastPoint.incoming + (Math.random() * 30 - 15)),
        outgoing: Math.max(0, lastPoint.outgoing + (Math.random() * 25 - 12)),
        blocked: Math.max(0, lastPoint.blocked + (Math.random() * 10 - 5)),
      });
      
      setData(newData);
    }, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, [data]);
  
  // Summary metrics
  const currentIncoming = Math.round(data[data.length - 1].incoming);
  const currentOutgoing = Math.round(data[data.length - 1].outgoing);
  const currentBlocked = Math.round(data[data.length - 1].blocked);
  const totalConnections = Math.round(data.reduce((acc, point) => acc + point.incoming + point.outgoing, 0) / data.length);
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">Incoming</div>
            <div className="text-2xl font-bold text-blue-600">{currentIncoming} Mbps</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">Outgoing</div>
            <div className="text-2xl font-bold text-green-600">{currentOutgoing} Mbps</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">Blocked</div>
            <div className="text-2xl font-bold text-red-600">{currentBlocked} Mbps</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">Connections</div>
            <div className="text-2xl font-bold">{totalConnections}/min</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorIncoming" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorOutgoing" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="incoming" 
              stroke="#3B82F6" 
              fillOpacity={1} 
              fill="url(#colorIncoming)" 
              name="Incoming Traffic"
            />
            <Area 
              type="monotone" 
              dataKey="outgoing" 
              stroke="#10B981" 
              fillOpacity={1} 
              fill="url(#colorOutgoing)" 
              name="Outgoing Traffic"
            />
            <Area 
              type="monotone" 
              dataKey="blocked" 
              stroke="#EF4444" 
              fillOpacity={1} 
              fill="url(#colorBlocked)" 
              name="Blocked Traffic"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LiveTrafficAnalytics;
