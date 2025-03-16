
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Mail, 
  ShieldAlert, 
  Flag, 
  UserCheck, 
  AlertTriangle, 
  ExternalLink, 
  CheckCircle2, 
  Server, 
  Clock, 
  FileText,
  Download,
  Search,
  Settings,
  Zap,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { PieChart, Pie, BarChart, Bar, Cell, XAxis, YAxis, Tooltip, LineChart, Line, CartesianGrid, ResponsiveContainer, Area, AreaChart } from 'recharts';

// Sample data for demonstration
const emailSummaryData = [
  { name: 'Processed', value: 24875, color: '#4ade80' },
  { name: 'Blocked', value: 1243, color: '#f87171' },
  { name: 'Flagged', value: 456, color: '#facc15' },
];

const threatTrendData = [
  { name: 'Mon', phishing: 12, malware: 8, spam: 45 },
  { name: 'Tue', phishing: 19, malware: 5, spam: 38 },
  { name: 'Wed', phishing: 8, malware: 13, spam: 42 },
  { name: 'Thu', phishing: 15, malware: 7, spam: 40 },
  { name: 'Fri', phishing: 23, malware: 11, spam: 48 },
  { name: 'Sat', phishing: 10, malware: 4, spam: 25 },
  { name: 'Sun', phishing: 14, malware: 6, spam: 32 },
];

const deliveryPerformanceData = [
  { name: 'Success', value: 23458, color: '#4ade80' },
  { name: 'Delayed', value: 1245, color: '#facc15' },
  { name: 'Failed', value: 172, color: '#f87171' },
];

const threatAlerts = [
  { id: 1, severity: 'Critical', title: 'Phishing Campaign Detected', description: 'Multiple users received similar phishing emails claiming to be from IT support', time: '15 min ago' },
  { id: 2, severity: 'High', title: 'Malware Attachment Blocked', description: 'Suspicious executable detected in email attachment from external sender', time: '1 hour ago' },
  { id: 3, severity: 'Medium', title: 'Unusual Email Volume', description: 'Significant increase in outbound emails from marketing department', time: '3 hours ago' },
  { id: 4, severity: 'Low', title: 'SPF Alignment Warning', description: 'Email from partner domain with misconfigured SPF record', time: '5 hours ago' },
  { id: 5, severity: 'High', title: 'Data Exfiltration Attempt', description: 'Large volume of customer data detected in outbound email', time: '6 hours ago' },
];

const serviceStatus = [
  { service: 'SMTP', status: 'operational', latency: '18ms' },
  { service: 'IMAP', status: 'operational', latency: '24ms' },
  { service: 'POP3', status: 'degraded', latency: '125ms' },
  { service: 'DKIM', status: 'operational', latency: '15ms' },
  { service: 'SPF', status: 'operational', latency: '12ms' },
  { service: 'DMARC', status: 'operational', latency: '14ms' },
];

const complianceViolations = [
  { type: 'PII', count: 28, icon: <AlertCircle className="h-4 w-4" /> },
  { type: 'Financial Data', count: 12, icon: <AlertCircle className="h-4 w-4" /> },
  { type: 'Intellectual Property', count: 6, icon: <AlertCircle className="h-4 w-4" /> },
  { type: 'Unencrypted', count: 34, icon: <AlertCircle className="h-4 w-4" /> },
];

const COLORS = ['#4ade80', '#f87171', '#facc15', '#60a5fa'];

type SeverityType = 'Critical' | 'High' | 'Medium' | 'Low';

const getSeverityColor = (severity: SeverityType) => {
  switch (severity) {
    case 'Critical': return 'destructive';
    case 'High': return 'destructive';
    case 'Medium': return 'warning';
    case 'Low': return 'secondary';
    default: return 'secondary';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'operational': return 'bg-green-500';
    case 'degraded': return 'bg-yellow-500';
    case 'down': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

const OverviewSection: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Email Security Summary */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Email Security Summary
              </CardTitle>
              <CardDescription>
                Overview of email processing statistics for the last 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="flex flex-col p-4 bg-muted/30 rounded-lg">
                  <span className="text-sm text-muted-foreground">Total Processed</span>
                  <div className="flex items-center mt-1">
                    <Mail className="h-5 w-5 text-primary mr-2" />
                    <span className="text-2xl font-bold">24,875</span>
                  </div>
                </div>
                <div className="flex flex-col p-4 bg-muted/30 rounded-lg">
                  <span className="text-sm text-muted-foreground">Blocked</span>
                  <div className="flex items-center mt-1">
                    <ShieldAlert className="h-5 w-5 text-destructive mr-2" />
                    <span className="text-2xl font-bold">1,243</span>
                  </div>
                </div>
                <div className="flex flex-col p-4 bg-muted/30 rounded-lg">
                  <span className="text-sm text-muted-foreground">Flagged</span>
                  <div className="flex items-center mt-1">
                    <Flag className="h-5 w-5 text-amber-500 mr-2" />
                    <span className="text-2xl font-bold">456</span>
                  </div>
                </div>
                <div className="flex flex-col p-4 bg-muted/30 rounded-lg">
                  <span className="text-sm text-muted-foreground">User Reports</span>
                  <div className="flex items-center mt-1">
                    <UserCheck className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-2xl font-bold">83</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-[200px] flex justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={emailSummaryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {emailSummaryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={threatTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="phishing" stroke="#ef4444" name="Phishing" />
                      <Line type="monotone" dataKey="malware" stroke="#8b5cf6" name="Malware" />
                      <Line type="monotone" dataKey="spam" stroke="#a3a3a3" name="Spam" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-4">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Threat Alerts
              </CardTitle>
              <CardDescription>
                Recent security incidents requiring attention
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {threatAlerts.map(alert => (
                <div key={alert.id} className="flex flex-col p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center">
                      <Badge variant={getSeverityColor(alert.severity as SeverityType)} className="mr-2">
                        {alert.severity}
                      </Badge>
                      <span className="font-medium">{alert.title}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{alert.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{alert.description}</p>
                </div>
              ))}
              <Button variant="outline" className="w-full" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                View All Alerts
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Service Health & Monitoring */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-4">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <Server className="h-5 w-5 text-primary" />
                Service Health
              </CardTitle>
              <CardDescription>
                Current status of all email services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {serviceStatus.map((service) => (
                  <div key={service.service} className="flex justify-between items-center border-b pb-2">
                    <div className="flex items-center">
                      <div className={`h-3 w-3 rounded-full mr-3 ${getStatusColor(service.status)}`}></div>
                      <span className="font-medium">{service.service}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-sm">{service.latency}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                <Zap className="h-4 w-4 mr-2" />
                Server Status Dashboard
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="md:col-span-4">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                Delivery Performance
              </CardTitle>
              <CardDescription>
                Email delivery metrics and queue status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[180px] mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={deliveryPerformanceData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value">
                      {deliveryPerformanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="bg-muted/30 p-3 rounded-lg text-center">
                  <div className="text-xl font-bold">18</div>
                  <div className="text-xs text-muted-foreground">In Queue</div>
                </div>
                <div className="bg-muted/30 p-3 rounded-lg text-center">
                  <div className="text-xl font-bold">4</div>
                  <div className="text-xs text-muted-foreground">Failed</div>
                </div>
                <div className="bg-muted/30 p-3 rounded-lg text-center">
                  <div className="text-xl font-bold">7</div>
                  <div className="text-xs text-muted-foreground">Retrying</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-4">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  Compliance Status
                </CardTitle>
                <Badge variant="warning">4 Issues</Badge>
              </div>
              <CardDescription>
                Data Loss Prevention violations and policy breaches
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceViolations.map((violation) => (
                  <div key={violation.type} className="flex justify-between items-center border-b pb-2">
                    <div className="flex items-center">
                      {violation.icon}
                      <span className="ml-2">{violation.type}</span>
                    </div>
                    <Badge variant="outline">{violation.count}</Badge>
                  </div>
                ))}
                
                <Alert className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Attention Required</AlertTitle>
                  <AlertDescription>
                    34 emails sent without proper encryption in the last 24 hours
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                View Compliance Report
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <Button variant="outline" className="flex items-center">
          <Download className="h-4 w-4 mr-2" />
          Export PDF Report
        </Button>
        <Button variant="outline" className="flex items-center">
          <Search className="h-4 w-4 mr-2" />
          Investigate Threats
        </Button>
        <Button variant="outline" className="flex items-center">
          <Settings className="h-4 w-4 mr-2" />
          Security Settings
        </Button>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded p-2 shadow-md">
        <p className="font-medium">{payload[0].name}</p>
        <p className="text-sm">{`Value: ${payload[0].value.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

export default OverviewSection;
