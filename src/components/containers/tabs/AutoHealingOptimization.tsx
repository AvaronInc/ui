import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Zap, Brain, CheckCircle, AlertCircle, LineChart, History, Cpu, HardDrive } from 'lucide-react';
import { useContainersData } from '@/components/containers/hooks/useContainersData';
import { AIRecommendationChart } from '../charts/AIRecommendationChart';
import { useForm } from 'react-hook-form';

const AutoHealingOptimization = () => {
  const { aiOptimizations, autoHealingEvents } = useContainersData();
  const recoveryStrategyForm = useForm();
  const aiLearningForm = useForm();
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Auto-Healing</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{autoHealingEvents?.recoveredIncidents || '0'}</div>
            <p className="text-xs text-muted-foreground">
              Incidents auto-recovered
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex items-center space-x-2">
              <Switch id="auto-healing-toggle" defaultChecked />
              <label htmlFor="auto-healing-toggle" className="text-sm">Enabled</label>
            </div>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Optimization</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{aiOptimizations?.resourcesSaved || '0'}%</div>
            <p className="text-xs text-muted-foreground">
              Resources optimized
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex items-center space-x-2">
              <Switch id="ai-optimization-toggle" defaultChecked />
              <label htmlFor="ai-optimization-toggle" className="text-sm">Enabled</label>
            </div>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{aiOptimizations?.uptimePercentage || '0'}%</div>
            <Progress value={aiOptimizations?.uptimePercentage || 0} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Last 30 days
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mean Time to Recovery</CardTitle>
            <History className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{aiOptimizations?.meanTimeToRecovery || '0'} sec</div>
            <p className="text-xs text-muted-foreground">
              Average recovery time
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>AI Recommendations</CardTitle>
            <CardDescription>
              Resource optimization suggestions from our AI engine
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <AIRecommendationChart />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Auto-Healing Events</CardTitle>
            <CardDescription>
              Recent automated recovery actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[250px] overflow-auto">
              {autoHealingEvents?.events?.map((event, i) => (
                <div key={i} className="flex items-start space-x-3 border-b pb-3">
                  <div className={`p-2 rounded-full ${
                    event.status === 'success' ? 'bg-green-100 dark:bg-green-900/30' : 
                    event.status === 'in-progress' ? 'bg-blue-100 dark:bg-blue-900/30' : 
                    'bg-red-100 dark:bg-red-900/30'
                  }`}>
                    {event.status === 'success' ? (
                      <CheckCircle className={`h-4 w-4 ${
                        event.status === 'success' ? 'text-green-600 dark:text-green-400' : 
                        event.status === 'in-progress' ? 'text-blue-600 dark:text-blue-400' : 
                        'text-red-600 dark:text-red-400'
                      }`} />
                    ) : event.status === 'in-progress' ? (
                      <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{event.description}</p>
                    <div className="flex justify-between mt-1">
                      <p className="text-xs text-muted-foreground">{event.containerName}</p>
                      <p className="text-xs text-muted-foreground">{event.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Auto-Healing Configuration</CardTitle>
          <CardDescription>
            Configure when and how containers are automatically recovered
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Resource Thresholds</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm">CPU Threshold</label>
                      <span className="text-sm">{90}%</span>
                    </div>
                    <Slider defaultValue={[90]} max={100} step={1} />
                    <p className="text-xs text-muted-foreground">Trigger auto-healing when CPU usage exceeds this threshold.</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Memory Threshold</label>
                      <span className="text-sm">{85}%</span>
                    </div>
                    <Slider defaultValue={[85]} max={100} step={1} />
                    <p className="text-xs text-muted-foreground">Trigger auto-healing when memory usage exceeds this threshold.</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Health Check Configuration</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Health Check Interval</label>
                      <span className="text-sm">{30} seconds</span>
                    </div>
                    <Slider defaultValue={[30]} min={5} max={120} step={5} />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Failure Threshold</label>
                      <span className="text-sm">{3} failures</span>
                    </div>
                    <Slider defaultValue={[3]} min={1} max={10} step={1} />
                    <p className="text-xs text-muted-foreground">Number of consecutive failures before auto-healing triggers.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Recovery Strategy</h3>
                <Form {...recoveryStrategyForm}>
                  <FormField
                    control={recoveryStrategyForm.control}
                    name="recoveryStrategy"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormControl>
                          <RadioGroup 
                            onValueChange={field.onChange} 
                            defaultValue={field.value || "restart"} 
                            className="space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="restart" id="r1" />
                              <FormLabel htmlFor="r1">Restart Container</FormLabel>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="redeploy" id="r2" />
                              <FormLabel htmlFor="r2">Redeploy Container</FormLabel>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="escalate" id="r3" />
                              <FormLabel htmlFor="r3">Restart, then Redeploy</FormLabel>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="ai" id="r4" />
                              <FormLabel htmlFor="r4">AI-Driven Recovery</FormLabel>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormDescription>
                          Select how containers should be recovered upon failure.
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </Form>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Failure Response</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="notify-failure" defaultChecked />
                    <label htmlFor="notify-failure" className="text-sm">Send Alerts</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="log-failure" defaultChecked />
                    <label htmlFor="log-failure" className="text-sm">Log Events</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="create-ticket" defaultChecked />
                    <label htmlFor="create-ticket" className="text-sm">Create Ticket</label>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Configure actions to take when auto-healing is triggered.
                </p>
              </div>
              
              <div className="space-y-2 mt-8">
                <h3 className="text-sm font-medium">AI Learning Strategy</h3>
                <Form {...aiLearningForm}>
                  <FormField
                    control={aiLearningForm.control}
                    name="aiLearning"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormControl>
                          <RadioGroup 
                            onValueChange={field.onChange}
                            defaultValue={field.value || "active"} 
                            className="space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="passive" id="ai1" />
                              <FormLabel htmlFor="ai1">Passive Learning Only</FormLabel>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="suggest" id="ai2" />
                              <FormLabel htmlFor="ai2">Suggest Optimizations</FormLabel>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="active" id="ai3" />
                              <FormLabel htmlFor="ai3">Automatic Optimization</FormLabel>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormDescription>
                          Define how the AI system optimizes containers.
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </Form>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutoHealingOptimization;
