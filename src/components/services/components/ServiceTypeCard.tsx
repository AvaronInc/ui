
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Technology {
  id: string;
  name: string;
  description: string;
}

interface ServiceTypeCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  technologies: Technology[];
  onClick: () => void;
  selected: boolean;
}

const ServiceTypeCard = ({ 
  title, 
  description, 
  icon, 
  technologies, 
  onClick, 
  selected 
}: ServiceTypeCardProps) => {
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all border-2 hover:shadow-md", 
        selected ? "border-primary bg-primary/5" : "hover:border-primary/50"
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="text-sm">{description}</CardDescription>
          </div>
          <div>{icon}</div>
        </div>
      </CardHeader>
      <CardContent>
        <h4 className="text-sm font-medium mb-2">Available Technologies:</h4>
        <div className="flex flex-wrap gap-1">
          {technologies.map(tech => (
            <Badge key={tech.id} variant="outline" className="mb-1">
              {tech.name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceTypeCard;
