
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockCertifications } from '../mockData';
import { Play, Award, ExternalLink, Calendar, CheckCircle } from 'lucide-react';

const PartnerCertifications: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Certifications & Training</h2>
        <p className="text-muted-foreground">Track your team's certification progress</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <CertificationStatusCard
          title="Total Certifications"
          completed={1}
          inProgress={2}
          notStarted={1}
        />
        <UpcomingEventCard 
          title="Next Webinar"
          eventName="Advanced AI Security"
          date="September 18, 2023"
          time="10:00 AM PST"
        />
        <UpcomingEventCard 
          title="Live Training"
          eventName="VaultID Deployment"
          date="October 5-7, 2023"
          time="9:00 AM - 4:00 PM PST"
        />
        <TeamProgressCard 
          completedCourses={12}
          totalTeamMembers={5}
          badgesEarned={7}
        />
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Your Certification Path</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockCertifications.map(cert => (
            <CertificationCard key={cert.id} certification={cert} />
          ))}
        </div>
      </div>
      
      <RecommendedTraining />
    </div>
  );
};

const CertificationStatusCard: React.FC<{ 
  title: string; 
  completed: number;
  inProgress: number;
  notStarted: number;
}> = ({ 
  title, 
  completed,
  inProgress,
  notStarted
}) => {
  const total = completed + inProgress + notStarted;
  
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="flex items-center gap-1 mt-2">
          <div className="bg-green-500 w-3 h-3 rounded-full"></div>
          <span className="text-sm">Completed: {completed}</span>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <div className="bg-amber-500 w-3 h-3 rounded-full"></div>
          <span className="text-sm">In Progress: {inProgress}</span>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <div className="bg-gray-400 w-3 h-3 rounded-full"></div>
          <span className="text-sm">Not Started: {notStarted}</span>
        </div>
        <div className="mt-2">
          <Progress value={(completed / total) * 100} />
          <p className="text-xs text-muted-foreground text-right mt-1">
            {Math.round((completed / total) * 100)}% Complete
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const UpcomingEventCard: React.FC<{ 
  title: string; 
  eventName: string;
  date: string;
  time: string;
}> = ({ 
  title, 
  eventName,
  date,
  time
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <p className="text-base font-medium mt-1">{eventName}</p>
        <div className="flex items-center text-sm text-muted-foreground mt-2">
          <Calendar className="h-3.5 w-3.5 mr-1.5" />
          <span>{date} • {time}</span>
        </div>
        <Button variant="outline" size="sm" className="w-full mt-2">Register</Button>
      </CardContent>
    </Card>
  );
};

const TeamProgressCard: React.FC<{ 
  completedCourses: number;
  totalTeamMembers: number;
  badgesEarned: number;
}> = ({ 
  completedCourses,
  totalTeamMembers,
  badgesEarned
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-sm font-medium text-muted-foreground">Team Progress</h3>
        <div className="space-y-2 mt-2">
          <div className="flex justify-between text-sm">
            <span>Completed Courses:</span>
            <span className="font-medium">{completedCourses}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Team Members:</span>
            <span className="font-medium">{totalTeamMembers}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Badges Earned:</span>
            <span className="font-medium">{badgesEarned}</span>
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full mt-2">Team Dashboard</Button>
      </CardContent>
    </Card>
  );
};

const CertificationCard: React.FC<{ certification: typeof mockCertifications[0] }> = ({ certification }) => {
  const getStatusBadgeColor = (status: string) => {
    switch(status) {
      case 'Completed':
        return 'bg-green-600/20 text-green-500 hover:bg-green-600/30';
      case 'In Progress':
        return 'bg-amber-600/20 text-amber-500 hover:bg-amber-600/30';
      case 'Not Started':
        return 'bg-gray-600/20 text-gray-500 hover:bg-gray-600/30';
      default:
        return 'bg-gray-600/20 text-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg">{certification.name}</CardTitle>
            <CardDescription>{certification.description}</CardDescription>
          </div>
          {certification.badgeUrl && (
            <div className="bg-primary/20 p-2 rounded-full">
              <Award className="h-6 w-6 text-primary" />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Status:</span>
            <Badge className={`${getStatusBadgeColor(certification.status)}`}>
              {certification.status}
            </Badge>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Progress:</span>
              <span>{certification.progress}%</span>
            </div>
            <Progress value={certification.progress} />
          </div>
          
          {certification.expirationDate && (
            <div className="flex justify-between text-sm">
              <span>Expires:</span>
              <span>{new Date(certification.expirationDate).toLocaleDateString()}</span>
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          {certification.status !== 'Completed' && (
            <Button className="flex-1 flex items-center gap-1">
              <Play className="h-4 w-4" />
              <span>{certification.status === 'Not Started' ? 'Start' : 'Continue'}</span>
            </Button>
          )}
          
          {certification.status === 'Completed' && certification.linkedInUrl && (
            <Button className="flex-1 flex items-center gap-1">
              <CheckCircle className="h-4 w-4" />
              <span>Verify</span>
            </Button>
          )}
          
          {certification.linkedInUrl && (
            <Button variant="outline" className="flex items-center gap-1">
              <ExternalLink className="h-4 w-4" />
              <span>Share</span>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const RecommendedTraining: React.FC = () => {
  const recommendedCourses = [
    {
      id: 1,
      title: "AI Security Fundamentals",
      duration: "2 hours",
      level: "Beginner"
    },
    {
      id: 2,
      title: "Selling Avaron to Healthcare",
      duration: "45 minutes",
      level: "Intermediate"
    },
    {
      id: 3,
      title: "VaultID Configuration Deep Dive",
      duration: "3 hours",
      level: "Advanced"
    }
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recommended Training</CardTitle>
        <CardDescription>Based on your certification path and partner tier</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recommendedCourses.map(course => (
            <div 
              key={course.id} 
              className="p-3 border border-border rounded-lg flex justify-between items-center hover:bg-secondary/30 transition-colors cursor-pointer"
            >
              <div>
                <h4 className="font-medium">{course.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {course.duration} • {course.level}
                </p>
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Play className="h-3.5 w-3.5" />
                <span>Start</span>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PartnerCertifications;
