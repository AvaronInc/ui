
import { User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AuditEvent {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  category: string;
}

// Sample audit events
const auditEvents: AuditEvent[] = [
  {
    id: '1',
    user: 'admin',
    action: 'Updated SMTP settings',
    timestamp: '2023-08-25 14:32',
    category: 'notification'
  },
  {
    id: '2',
    user: 'system',
    action: 'Enabled MFA for all users',
    timestamp: '2023-08-25 12:18',
    category: 'security'
  },
  {
    id: '3',
    user: 'admin',
    action: 'Changed backup schedule',
    timestamp: '2023-08-24 16:45',
    category: 'backup'
  },
  {
    id: '4',
    user: 'admin',
    action: 'Updated VPN settings',
    timestamp: '2023-08-24 11:30',
    category: 'workforce'
  },
  {
    id: '5',
    user: 'system',
    action: 'API rate limit increased',
    timestamp: '2023-08-23 09:15',
    category: 'api'
  }
];

const AuditTrail = () => {
  return (
    <div className="space-y-4">
      <ul className="space-y-3">
        {auditEvents.map((event) => (
          <li key={event.id} className="flex items-start space-x-3 text-sm">
            <div className="bg-primary/10 text-primary rounded-full p-1.5 mt-0.5">
              <User className="h-3.5 w-3.5" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex justify-between">
                <p className="font-medium">{event.user}</p>
                <span className="text-xs text-muted-foreground">{event.timestamp}</span>
              </div>
              <p>{event.action}</p>
              <Badge variant="outline" className="text-xs">
                {event.category}
              </Badge>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuditTrail;
