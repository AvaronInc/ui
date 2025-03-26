
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockPartnerInfo } from '../mockData';
import { Building, Briefcase, UserCheck, DollarSign, TrendingUp } from 'lucide-react';

const PartnerOverview: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard 
          title="Total Clients"
          value={mockPartnerInfo.metrics.totalClients.toString()}
          description="Active managed clients"
          icon={<Building className="h-5 w-5 text-gray-400" />}
        />
        
        <StatsCard 
          title="Monthly Recurring Revenue"
          value={`$${mockPartnerInfo.metrics.monthlyRecurringRevenue.toLocaleString()}`}
          description="Current MRR across all clients"
          icon={<TrendingUp className="h-5 w-5 text-gray-400" />}
        />
        
        <StatsCard 
          title="YTD Commission"
          value={`$${mockPartnerInfo.metrics.commissionPaidYTD.toLocaleString()}`}
          description="Commissions paid this year"
          icon={<DollarSign className="h-5 w-5 text-gray-400" />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PartnerDetails />
        <TierBenefits />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivities />
        <UpcomingEvents />
      </div>
    </div>
  );
};

const StatsCard: React.FC<{ title: string; value: string; description: string; icon: React.ReactNode }> = ({ 
  title, 
  value, 
  description,
  icon
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </div>
          <div className="bg-secondary/50 p-3 rounded-full">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const PartnerDetails: React.FC = () => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-xl">Partner Details</CardTitle>
        <CardDescription>Information about your partnership</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Channel Manager</h3>
          <div className="flex items-center mt-1">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
              <UserCheck size={20} className="text-primary" />
            </div>
            <div>
              <p className="font-medium">{mockPartnerInfo.channelManager.name}</p>
              <p className="text-sm text-muted-foreground">{mockPartnerInfo.channelManager.email}</p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Partner Since</h3>
          <p className="mt-1">January 15, 2023</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Partner ID</h3>
          <p className="mt-1">{mockPartnerInfo.id}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Support SLA</h3>
          <p className="mt-1">Priority Partner Support (24/7)</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Commission Structure</h3>
          <p className="mt-1">Base: 10% | Certified: 15% | Premier: 20%</p>
        </div>
      </CardContent>
    </Card>
  );
};

const TierBenefits: React.FC = () => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-xl">Partner Tier Benefits</CardTitle>
        <CardDescription>Current tier: {mockPartnerInfo.tier}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Current Benefits</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
              <span>Dedicated channel manager</span>
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
              <span>Deal registration protection (90 days)</span>
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
              <span>Co-branded marketing materials</span>
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
              <span>Sales certification training</span>
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
              <span>15% commission rate</span>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">Next Tier Benefits (Premier)</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-amber-500 mr-2"></div>
              <span>Increased commission to 20%</span>
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-amber-500 mr-2"></div>
              <span>Quarterly business review with leadership</span>
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-amber-500 mr-2"></div>
              <span>Enhanced NFR product access</span>
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-amber-500 mr-2"></div>
              <span>Partner advisory council membership</span>
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-amber-500 mr-2"></div>
              <span>White-label option eligibility</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

const RecentActivities: React.FC = () => {
  const activities = [
    { 
      id: 1, 
      type: 'Deal Registered', 
      description: 'New deal registered for TechNova Inc.', 
      date: '2 days ago' 
    },
    { 
      id: 2, 
      type: 'Quote Generated', 
      description: 'Quote #QT-2023-089 created for Acme Healthcare.', 
      date: '4 days ago' 
    },
    { 
      id: 3, 
      type: 'Client Added', 
      description: 'New client SmartTech Solutions added to your portfolio.', 
      date: '1 week ago' 
    },
    { 
      id: 4, 
      type: 'Commission Paid', 
      description: 'July 2023 commission of $13,875 paid.', 
      date: '2 weeks ago' 
    },
    { 
      id: 5, 
      type: 'Certification Progress', 
      description: 'Deployment Specialist certification 65% complete.', 
      date: '3 weeks ago' 
    }
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Recent Activities</CardTitle>
        <CardDescription>Your latest partnership activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map(activity => (
            <div key={activity.id} className="flex items-start pb-3 border-b border-border last:border-0 last:pb-0">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-0.5">
                <Briefcase size={14} className="text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">{activity.type}</p>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const UpcomingEvents: React.FC = () => {
  const events = [
    { 
      id: 1, 
      title: 'Partner Webinar: Introducing VaultID', 
      date: 'Sep 15, 2023', 
      time: '10:00 AM PST',
      type: 'Webinar'
    },
    { 
      id: 2, 
      title: 'Quarterly Business Review', 
      date: 'Sep 22, 2023', 
      time: '1:00 PM PST',
      type: 'Meeting'
    },
    { 
      id: 3, 
      title: 'AI Security Certification Course', 
      date: 'Oct 5-7, 2023', 
      time: 'All Day',
      type: 'Training'
    },
    { 
      id: 4, 
      title: 'Partner Summit 2023', 
      date: 'Nov 10-12, 2023', 
      time: 'All Day',
      type: 'Conference'
    }
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Upcoming Events</CardTitle>
        <CardDescription>Training, webinars, and partner events</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map(event => (
            <div key={event.id} className="p-3 border border-border rounded-lg hover:bg-secondary/30 transition-colors cursor-pointer">
              <div className="flex justify-between mb-1">
                <h4 className="font-medium text-sm">{event.title}</h4>
                <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">{event.type}</span>
              </div>
              <p className="text-sm text-muted-foreground">{event.date} • {event.time}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PartnerOverview;
