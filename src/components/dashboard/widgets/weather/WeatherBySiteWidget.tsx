
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { CloudRain, Cloud, Sun, Wind, MapPin, RefreshCw, CloudLightning, CloudSnow } from 'lucide-react';
import { toast } from 'sonner';

// Types
interface WeatherSite {
  id: string;
  name: string;
  city: string;
  state: string;
  temperature: number; // in Fahrenheit
  condition: 'sunny' | 'cloudy' | 'rain' | 'storm' | 'snow';
  windSpeed: number; // in mph
  severity: 'normal' | 'advisory' | 'severe';
  lastUpdated: string;
}

// Mock data for sites with weather information
// This will be replaced with API data in production
const MOCK_SITES: WeatherSite[] = [
  {
    id: '1',
    name: 'Headquarters',
    city: 'Boston',
    state: 'MA',
    temperature: 68,
    condition: 'cloudy',
    windSpeed: 8,
    severity: 'normal',
    lastUpdated: '10 min ago'
  },
  {
    id: '2',
    name: 'East Data Center',
    city: 'New York',
    state: 'NY',
    temperature: 72,
    condition: 'sunny',
    windSpeed: 5,
    severity: 'normal',
    lastUpdated: '15 min ago'
  },
  {
    id: '3',
    name: 'West Coast Office',
    city: 'San Francisco',
    state: 'CA',
    temperature: 77,
    condition: 'sunny',
    windSpeed: 12,
    severity: 'advisory',
    lastUpdated: '5 min ago'
  },
  {
    id: '4',
    name: 'Southern Branch',
    city: 'Austin',
    state: 'TX',
    temperature: 92,
    condition: 'storm',
    windSpeed: 25,
    severity: 'severe',
    lastUpdated: '3 min ago'
  },
  {
    id: '5',
    name: 'Midwest Office',
    city: 'Chicago',
    state: 'IL',
    temperature: 63,
    condition: 'rain',
    windSpeed: 18,
    severity: 'advisory',
    lastUpdated: '8 min ago'
  },
  {
    id: '6',
    name: 'Northwest Data Center',
    city: 'Seattle',
    state: 'WA',
    temperature: 57,
    condition: 'rain',
    windSpeed: 6,
    severity: 'normal',
    lastUpdated: '12 min ago'
  },
  {
    id: '7',
    name: 'Mountain Office',
    city: 'Denver',
    state: 'CO',
    temperature: 48,
    condition: 'snow',
    windSpeed: 15,
    severity: 'advisory',
    lastUpdated: '7 min ago'
  }
];

// Weather condition icon component
const WeatherIcon: React.FC<{ condition: WeatherSite['condition'] }> = ({ condition }) => {
  switch (condition) {
    case 'sunny':
      return <Sun className="h-5 w-5 text-amber-400" />;
    case 'cloudy':
      return <Cloud className="h-5 w-5 text-gray-400" />;
    case 'rain':
      return <CloudRain className="h-5 w-5 text-blue-400" />;
    case 'storm':
      return <CloudLightning className="h-5 w-5 text-purple-400" />;
    case 'snow':
      return <CloudSnow className="h-5 w-5 text-sky-300" />;
    default:
      return <Cloud className="h-5 w-5 text-gray-400" />;
  }
};

// Severity badge component
const SeverityBadge: React.FC<{ severity: WeatherSite['severity'] }> = ({ severity }) => {
  switch (severity) {
    case 'severe':
      return <Badge variant="destructive">Severe</Badge>;
    case 'advisory':
      return <Badge variant="warning">Advisory</Badge>;
    case 'normal':
      return <Badge variant="secondary">Normal</Badge>;
    default:
      return <Badge variant="secondary">Normal</Badge>;
  }
};

const WeatherBySiteWidget: React.FC = () => {
  const [sites, setSites] = useState<WeatherSite[]>([]);
  const [loading, setLoading] = useState(true);

  // Load sites data (simulated with mock data)
  useEffect(() => {
    const loadSites = () => {
      setLoading(true);
      
      // Simulate API delay
      setTimeout(() => {
        setSites(MOCK_SITES);
        setLoading(false);
      }, 1200);
    };
    
    loadSites();
    
    // In a real implementation, this would be replaced with an API call:
    // 
    // async function fetchWeatherData() {
    //   try {
    //     // Fetch site locations from your backend
    //     const sitesResponse = await fetch('/api/sites');
    //     const sites = await sitesResponse.json();
    //     
    //     // For each site, fetch weather using a weather API
    //     const sitesWithWeather = await Promise.all(sites.map(async (site) => {
    //       // Example with OpenWeatherMap API
    //       const weatherResponse = await fetch(
    //         `https://api.openweathermap.org/data/2.5/weather?q=${site.city},${site.state}&units=imperial&appid=${API_KEY}`
    //       );
    //       const weatherData = await weatherResponse.json();
    //       
    //       // Map API data to our format
    //       return {
    //         ...site,
    //         temperature: Math.round(weatherData.main.temp),
    //         condition: mapWeatherCondition(weatherData.weather[0].main),
    //         windSpeed: Math.round(weatherData.wind.speed),
    //         severity: determineSeverity(weatherData),
    //         lastUpdated: 'Just now'
    //       };
    //     }));
    //     
    //     setSites(sitesWithWeather);
    //   } catch (error) {
    //     console.error('Error fetching weather data:', error);
    //     toast.error('Failed to load weather data');
    //   } finally {
    //     setLoading(false);
    //   }
    // }
    // 
    // fetchWeatherData();
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    
    toast.info("Refreshing weather data...");
    
    // Simulate API delay
    setTimeout(() => {
      // In a real implementation, this would call the API again
      // For now, just shuffle the temperatures a bit to simulate changes
      const updatedSites = MOCK_SITES.map(site => ({
        ...site,
        temperature: site.temperature + Math.floor(Math.random() * 5) - 2,
        lastUpdated: 'Just now'
      }));
      
      setSites(updatedSites);
      setLoading(false);
      toast.success("Weather data updated");
    }, 1500);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <MapPin className="mr-2 h-5 w-5 text-primary" />
          Weather by Site
        </CardTitle>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          onClick={handleRefresh}
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          <span className="sr-only">Refresh weather data</span>
        </Button>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-auto p-0">
        {loading ? (
          <div className="p-4 space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-2">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-1">
            {sites.map((site) => (
              <div 
                key={site.id}
                className={`flex items-center justify-between p-3 border-b last:border-b-0 hover:bg-accent/50 transition-colors ${
                  site.severity === 'severe' ? 'border-l-4 border-l-red-500' : 
                  site.severity === 'advisory' ? 'border-l-4 border-l-amber-500' : ''
                }`}
              >
                <div>
                  <div className="font-medium">{site.name}</div>
                  <div className="text-sm text-muted-foreground flex items-center">
                    <MapPin className="mr-1 h-3 w-3" />
                    {site.city}, {site.state}
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center">
                    <WeatherIcon condition={site.condition} />
                    <span className="ml-1 text-lg font-semibold">{site.temperature}°F</span>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <SeverityBadge severity={site.severity} />
                    <div className="text-xs text-muted-foreground flex items-center mt-1">
                      <Wind className="mr-1 h-3 w-3" /> {site.windSpeed} mph
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherBySiteWidget;
