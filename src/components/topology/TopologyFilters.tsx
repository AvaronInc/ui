
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { 
  Search, 
  Router, 
  Shield, 
  Network, 
  Monitor, 
  Server, 
  Printer, 
  Radio, 
  Camera, 
  User, 
  FilterX
} from 'lucide-react';

interface TopologyFiltersProps {
  filters: {
    search: string;
    deviceTypes: string[];
    showOffline: boolean;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    search: string;
    deviceTypes: string[];
    showOffline: boolean;
  }>>;
}

const deviceTypeOptions = [
  { value: 'router', label: 'Router', icon: Router },
  { value: 'firewall', label: 'Firewall', icon: Shield },
  { value: 'switch', label: 'Switch', icon: Network },
  { value: 'server', label: 'Server', icon: Server },
  { value: 'workstation', label: 'Workstation', icon: Monitor },
  { value: 'printer', label: 'Printer', icon: Printer },
  { value: 'camera', label: 'Camera', icon: Camera },
  { value: 'iot', label: 'IoT Device', icon: Radio },
  { value: 'vpn', label: 'VPN User', icon: User },
];

const TopologyFilters = ({ filters, setFilters }: TopologyFiltersProps) => {
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };
  
  // Handle device type filter change
  const handleDeviceTypeChange = (type: string) => {
    setFilters(prev => {
      if (prev.deviceTypes.includes(type)) {
        return { 
          ...prev, 
          deviceTypes: prev.deviceTypes.filter(t => t !== type) 
        };
      } else {
        return { 
          ...prev, 
          deviceTypes: [...prev.deviceTypes, type] 
        };
      }
    });
  };
  
  // Handle show offline toggle
  const handleShowOfflineChange = () => {
    setFilters(prev => ({ ...prev, showOffline: !prev.showOffline }));
  };
  
  // Reset all filters
  const handleResetFilters = () => {
    setFilters({
      search: '',
      deviceTypes: [],
      showOffline: true,
    });
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name, IP or MAC..."
              className="pl-8"
              value={filters.search}
              onChange={handleSearchChange}
            />
          </div>
          
          {/* Device Types */}
          <div className="flex flex-wrap items-center gap-2 col-span-2">
            <span className="text-sm font-medium mr-2">Device Types:</span>
            {deviceTypeOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = filters.deviceTypes.includes(option.value);
              
              return (
                <Button
                  key={option.value}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  className="gap-1.5"
                  onClick={() => handleDeviceTypeChange(option.value)}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span className="text-xs">{option.label}</span>
                </Button>
              );
            })}
            
            <div className="flex items-center space-x-2 ml-auto">
              <Checkbox 
                id="showOffline" 
                checked={filters.showOffline}
                onCheckedChange={handleShowOfflineChange}
              />
              <Label htmlFor="showOffline" className="text-sm cursor-pointer">
                Show offline devices
              </Label>
            </div>
            
            {(filters.search || filters.deviceTypes.length > 0 || !filters.showOffline) && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleResetFilters}
                className="gap-1"
              >
                <FilterX className="h-3.5 w-3.5" />
                <span className="text-xs">Reset</span>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopologyFilters;
