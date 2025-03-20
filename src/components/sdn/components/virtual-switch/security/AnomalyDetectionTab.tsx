
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { ShieldAlert, AlertTriangle } from 'lucide-react';
import { Control } from 'react-hook-form';
import { SwitchSecurityValues } from './types';

interface AnomalyDetectionTabProps {
  control: Control<SwitchSecurityValues>;
}

const AnomalyDetectionTab: React.FC<AnomalyDetectionTabProps> = ({ control }) => {
  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="anomalyDetection"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                AI-Powered Anomaly Detection
              </FormLabel>
              <FormDescription>
                Detect unauthorized switch modifications or rogue virtual switches
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
            Alert Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={control}
            name="alertThreshold"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alert Sensitivity Threshold</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select alert threshold" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="low">Low (Alert on severe anomalies only)</SelectItem>
                    <SelectItem value="medium">Medium (Balanced approach)</SelectItem>
                    <SelectItem value="high">High (Detect even minor anomalies)</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Controls the sensitivity of the anomaly detection system
                </FormDescription>
              </FormItem>
            )}
          />
          
          <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-md border border-amber-200 dark:border-amber-900/50">
            <h4 className="font-medium flex items-center text-amber-800 dark:text-amber-300">
              <ShieldAlert className="h-4 w-4 mr-2" />
              Anomaly Detection Features
            </h4>
            <ul className="text-sm mt-2 space-y-1 text-amber-700 dark:text-amber-400">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Unauthorized switch modifications</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Rogue virtual switch detection</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Unusual traffic patterns identification</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Potential lateral movement attacks</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnomalyDetectionTab;
