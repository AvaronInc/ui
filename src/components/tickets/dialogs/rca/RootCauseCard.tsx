
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface RootCause {
  id: number;
  cause: string;
  probability: string;
  description: string;
  evidence: string;
}

interface RootCauseCardProps {
  cause: RootCause;
}

export const RootCauseCard: React.FC<RootCauseCardProps> = ({ cause }) => {
  return (
    <div className="border rounded-md p-4 space-y-2">
      <div className="flex justify-between items-center">
        <h5 className="font-medium">{cause.cause}</h5>
        <Badge variant="outline" className="bg-primary/10">Probability: {cause.probability}</Badge>
      </div>
      <p className="text-sm">{cause.description}</p>
      <div className="text-sm text-muted-foreground">
        <strong>Evidence:</strong> {cause.evidence}
      </div>
    </div>
  );
};
