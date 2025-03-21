
import React from 'react';
import { SystemService } from '@/types/services';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent, ChartTooltip } from "@/components/ui/chart";

interface ResourceUsageChartsProps {
  service: SystemService;
}

const ResourceUsageCharts: React.FC<ResourceUsageChartsProps> = ({ service }) => {
  // Generate mock historical data for the service
  // In a real application, this would come from an API or time-series database
  const generateHistoricalData = (baseline: number, hours: number = 60) => {
    const now = new Date();
    const data = [];
    
    for (let i = hours; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60000); // One data point per minute
      const value = Math.max(1, Math.min(100, 
        baseline + (Math.random() * 20 - 10) + Math.sin(i / 5) * 10
      ));
      
      data.push({
        time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        value: Math.floor(value),
      });
    }
    
    return data;
  };

  // Generate separate data sets for CPU, memory, and other metrics
  const cpuData = generateHistoricalData(service.cpuUsage);
  const memoryData = generateHistoricalData(service.memoryUsage);
  const diskReadData = service.diskIO ? generateHistoricalData(service.diskIO.read / 100) : [];
  const diskWriteData = service.diskIO ? generateHistoricalData(service.diskIO.write / 100) : [];
  const networkRxData = generateHistoricalData(service.networkIO.received / 100);
  const networkTxData = generateHistoricalData(service.networkIO.transmitted / 100);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Resource Usage (Last 60 minutes)</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* CPU Usage Chart */}
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base">CPU Usage</CardTitle>
            <CardDescription>Percentage of assigned CPU cores</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="h-72">
              <ChartContainer 
                config={{
                  cpu: { theme: { light: '#0ea5e9', dark: '#38bdf8' } }
                }}
                className="h-full w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={cpuData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-cpu)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="var(--color-cpu)" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="time" />
                    <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area type="monotone" dataKey="value" stroke="var(--color-cpu)" fillOpacity={1} fill="url(#colorCpu)" name="cpu" />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Memory Usage Chart */}
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base">Memory Usage</CardTitle>
            <CardDescription>Percentage of assigned memory</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="h-72">
              <ChartContainer 
                config={{
                  memory: { theme: { light: '#8b5cf6', dark: '#a78bfa' } }
                }}
                className="h-full w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={memoryData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorMemory" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-memory)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="var(--color-memory)" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="time" />
                    <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area type="monotone" dataKey="value" stroke="var(--color-memory)" fillOpacity={1} fill="url(#colorMemory)" name="memory" />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Network I/O Chart */}
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base">Network I/O</CardTitle>
            <CardDescription>Received and transmitted data rates</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="h-72">
              <ChartContainer 
                config={{
                  received: { theme: { light: '#10b981', dark: '#34d399' } },
                  transmitted: { theme: { light: '#f59e0b', dark: '#fbbf24' } }
                }}
                className="h-full w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={networkRxData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRx" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-received)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="var(--color-received)" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorTx" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-transmitted)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="var(--color-transmitted)" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      data={networkRxData}
                      stroke="var(--color-received)" 
                      fillOpacity={0.5} 
                      fill="url(#colorRx)" 
                      name="received" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      data={networkTxData}
                      stroke="var(--color-transmitted)" 
                      fillOpacity={0.5} 
                      fill="url(#colorTx)" 
                      name="transmitted" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Disk I/O Chart - Only shown if disk I/O data is available */}
        {service.diskIO && (
          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-base">Disk I/O</CardTitle>
              <CardDescription>Read and write data rates</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="h-72">
                <ChartContainer 
                  config={{
                    read: { theme: { light: '#0ea5e9', dark: '#38bdf8' } },
                    write: { theme: { light: '#ef4444', dark: '#f87171' } }
                  }}
                  className="h-full w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={diskReadData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRead" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-read)" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="var(--color-read)" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorWrite" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-write)" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="var(--color-write)" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        data={diskReadData}
                        stroke="var(--color-read)" 
                        fillOpacity={0.5} 
                        fill="url(#colorRead)" 
                        name="read" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        data={diskWriteData}
                        stroke="var(--color-write)" 
                        fillOpacity={0.5} 
                        fill="url(#colorWrite)" 
                        name="write" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ResourceUsageCharts;
