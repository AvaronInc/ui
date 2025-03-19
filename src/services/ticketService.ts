import { Ticket, TicketNote, TicketPriority, TicketStatus, TicketStatistics } from '@/types/tickets';

// Function to fetch tickets (now accepts forceMock parameter)
export const fetchTickets = async (forceMock = false): Promise<Ticket[]> => {
  console.log('🎫 Fetching tickets, forceMock:', forceMock);
  
  // In development mode or when forceMock is true, return mock data
  if (import.meta.env.DEV || forceMock) {
    console.log('🎫 Using mock ticket data for development');
    // Add a small artificial delay to simulate network request
    await new Promise(resolve => setTimeout(resolve, 800));
    return generateTickets();
  }
  
  try {
    // Attempt to fetch from actual API/database
    console.log('🎫 Attempting to fetch real ticket data');
    // In a real app, you'd fetch from an API here
    const response = await fetch('/api/tickets');
    if (!response.ok) {
      throw new Error(`Failed to fetch tickets: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('🎫 Error fetching tickets, falling back to mock data:', error);
    return generateTickets();
  }
};

// Function to calculate ticket statistics
export const calculateTicketStatistics = async (): Promise<TicketStatistics> => {
  // In a real app, this would be calculated from actual ticket data
  // For now, we'll return mock statistics
  return {
    openTickets: 12,
    resolvedToday: 5,
    aiResolved: 3,
    awaitingAction: 4,
    avgResolutionTime: '3.5h',
    escalationRate: 15,
    escalationTrend: 'decreasing'
  };
};

// Function to update ticket status
export const updateTicketStatus = async (ticketId: string, status: TicketStatus): Promise<boolean> => {
  console.log(`🎫 Updating ticket ${ticketId} status to ${status}`);
  // In a real app, you'd make an API call here
  // For now, we'll just return success
  return true;
};

// Function to update ticket priority
export const updateTicketPriority = async (ticketId: string, priority: TicketPriority): Promise<boolean> => {
  console.log(`🎫 Updating ticket ${ticketId} priority to ${priority}`);
  // In a real app, you'd make an API call here
  // For now, we'll just return success
  return true;
};

// Function to assign a ticket to a technician
export const assignTicket = async (ticketId: string, technicianName: string): Promise<boolean> => {
  console.log(`🎫 Assigning ticket ${ticketId} to ${technicianName}`);
  // In a real app, you'd make an API call here
  // For now, we'll just return success
  return true;
};

// Function to add a note to a ticket
export const addTicketNote = async (noteData: {
  ticketId: string;
  content: string;
  author: string;
  isInternal: boolean;
}): Promise<TicketNote> => {
  console.log(`🎫 Adding note to ticket ${noteData.ticketId}`);
  // In a real app, you'd make an API call here
  // For now, we'll just return a mock note
  return {
    id: `note-${Date.now()}`,
    content: noteData.content,
    author: noteData.author,
    timestamp: new Date().toISOString(),
    isInternal: noteData.isInternal
  };
};

// Function to create a new ticket
export const createTicket = async (
  ticketData: {
    title: string;
    description: string;
    priority: TicketPriority;
    department?: string;
    location?: string;
    attachments?: string[];
  },
  createdBy: string
): Promise<Ticket> => {
  console.log(`🎫 Creating new ticket: ${ticketData.title}`);
  // In a real app, you'd make an API call here
  // For now, we'll just return a mock ticket
  return {
    id: `TK-${Math.floor(1000 + Math.random() * 9000)}`,
    title: ticketData.title,
    description: ticketData.description,
    status: 'open',
    priority: ticketData.priority,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy,
    assignedTo: null,
    department: ticketData.department || 'IT',
    location: ticketData.location || 'Headquarters',
    attachments: ticketData.attachments || [],
    notes: [],
    isAIGenerated: false,
    resolutionMethod: null,
    resolutionTime: null
  };
};

// Helper function to generate mock tickets
const generateTickets = (): Ticket[] => {
  const statuses: TicketStatus[] = ['open', 'in-progress', 'pending-customer', 'resolved', 'escalated', 'ai-resolved'];
  const priorities: TicketPriority[] = ['low', 'medium', 'high', 'critical'];
  const departments = ['IT', 'Marketing', 'Sales', 'Design', 'Administration', 'Finance', 'HR'];
  const locations = ['Headquarters', 'East Branch', 'West Branch', 'Remote', 'Data Center'];
  const technicians = ['Alex Johnson', 'James Wilson', 'Robert Davis', 'Maria Garcia', 'Sophia Lee', null];
  
  const mockTickets: Ticket[] = [];
  
  // Generate 20 mock tickets
  for (let i = 0; i < 20; i++) {
    const id = `TK-${1000 + i}`;
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 14)); // Random date within last 2 weeks
    
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const isResolved = status === 'resolved' || status === 'ai-resolved';
    
    let resolvedAt = null;
    let resolutionTime = null;
    let resolutionMethod = null;
    
    if (isResolved) {
      resolvedAt = new Date(createdAt);
      resolvedAt.setHours(resolvedAt.getHours() + Math.floor(Math.random() * 48)); // Resolved within 48 hours
      
      const diffHours = Math.abs(resolvedAt.getTime() - createdAt.getTime()) / 36e5;
      resolutionTime = `${diffHours.toFixed(1)}h`;
      
      resolutionMethod = status === 'ai-resolved' ? 'ai-resolved' : 'manual';
    }
    
    const ticket: Ticket = {
      id,
      title: getRandomTicketTitle(i),
      description: getRandomTicketDescription(i),
      status,
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      createdAt: createdAt.toISOString(),
      updatedAt: (resolvedAt || new Date()).toISOString(),
      createdBy: 'Customer ' + Math.floor(Math.random() * 100),
      assignedTo: technicians[Math.floor(Math.random() * technicians.length)],
      department: departments[Math.floor(Math.random() * departments.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      attachments: Math.random() > 0.7 ? ['screenshot.png', 'error_log.txt'] : [],
      notes: generateRandomNotes(id, createdAt, 0, 3),
      isAIGenerated: Math.random() > 0.8,
      resolutionMethod,
      resolutionTime
    };
    
    mockTickets.push(ticket);
  }
  
  return mockTickets;
};

// Helper function to generate random ticket titles
const getRandomTicketTitle = (index: number): string => {
  const titles = [
    'Cannot access email after password reset',
    'Printer not responding on 3rd floor',
    'VPN connection drops intermittently',
    'Need software installation approval',
    'Monitor displaying strange colors',
    'Request for additional monitor',
    'Laptop battery not charging',
    'Cannot access shared drive',
    'Email sending delay issue',
    'Request for data recovery',
    'New employee setup needed',
    'Wireless keyboard not working',
    'Mobile app crashes on startup',
    'Need access to marketing drive',
    'Conference room projector issue',
    'Outlook calendar not syncing',
    'Website loading slowly',
    'Need help with Excel formula',
    'Phone system transferring issues',
    'Request for software training'
  ];
  
  return titles[index % titles.length];
};

// Helper function to generate random ticket descriptions
const getRandomTicketDescription = (index: number): string => {
  const descriptions = [
    'After resetting my password this morning, I can no longer access my email. I get an "authentication failed" error message.',
    'The HP LaserJet printer on the 3rd floor is not responding to print jobs. I\'ve tried restarting it but it\'s still not working.',
    'My VPN connection keeps dropping every 15-20 minutes. This started happening after the latest update.',
    'I need approval for installing Adobe Creative Suite on my workstation for the new marketing project.',
    'My monitor started displaying strange colors today. Text is hard to read and images look distorted.',
    'I would like to request an additional monitor for my workstation to improve productivity with multiple applications.',
    'My Dell laptop battery is not charging even when plugged in. The power indicator doesn\'t light up.',
    'I cannot access the shared department drive. It was working yesterday but today it shows "access denied".',
    'There\'s a 10-15 minute delay when sending emails from my Outlook. Recipients are not getting them promptly.',
    'I accidentally deleted some important files from my local drive. Need help recovering them if possible.',
    'We have a new employee starting next Monday. Need complete workstation setup including email and system access.',
    'My wireless keyboard has stopped working. I\'ve replaced the batteries but it\'s still not responding.',
    'Our company mobile app crashes immediately after opening on my iPhone. I\'ve tried reinstalling it.',
    'I need access to the marketing department shared drive for the upcoming campaign project.',
    'The projector in Conference Room B is displaying a blue tint on all presentations. Need it fixed for tomorrow\'s meeting.',
    'My Outlook calendar is not syncing properly with my phone. Some meetings are missing or showing at wrong times.',
    'Our company website is loading very slowly for me and some pages time out completely.',
    'I need help creating a complex Excel formula for calculating quarterly sales projections with multiple variables.',
    'When transferring calls using the new phone system, calls are being dropped or sent to the wrong extension.',
    'I would like to request training for the new project management software our department is implementing.'
  ];
  
  return descriptions[index % descriptions.length];
};

// Helper function to generate random notes for a ticket
const generateRandomNotes = (
  ticketId: string, 
  createdAt: Date, 
  minNotes: number, 
  maxNotes: number
): TicketNote[] => {
  const notes: TicketNote[] = [];
  const noteCount = minNotes + Math.floor(Math.random() * (maxNotes - minNotes + 1));
  
  if (noteCount === 0) return notes;
  
  const technicians = ['Alex Johnson', 'James Wilson', 'Robert Davis', 'Maria Garcia', 'Sophia Lee'];
  const internalNoteContents = [
    'Checking system logs for more information.',
    'Escalated to network team for further investigation.',
    'Waiting on parts delivery before proceeding with repair.',
    'Customer has been notified of the delay.',
    'Similar issues reported from other users in the same department.',
    'Applied temporary workaround while waiting for permanent solution.',
    'Scheduled on-site visit for tomorrow morning.',
    'Requested additional information from the user.'
  ];
  
  const customerNoteContents = [
    'Thank you for looking into this issue.',
    'The problem is still occurring after trying the suggested solution.',
    'I\'ve attached additional screenshots of the error message.',
    'This is becoming urgent as it\'s affecting my work.',
    'The issue seems to be intermittent, happening mostly in the afternoons.',
    'I\'ll be out of office tomorrow, please contact my supervisor if you need access.',
    'The suggested workaround is helping for now.',
    'I\'ve found that restarting temporarily fixes the issue but it comes back.'
  ];
  
  let noteDate = new Date(createdAt);
  noteDate.setHours(noteDate.getHours() + 1); // First note 1 hour after ticket creation
  
  for (let i = 0; i < noteCount; i++) {
    const isInternal = Math.random() > 0.4; // 60% chance of internal note
    const author = isInternal 
      ? technicians[Math.floor(Math.random() * technicians.length)]
      : 'Customer';
    
    const content = isInternal
      ? internalNoteContents[Math.floor(Math.random() * internalNoteContents.length)]
      : customerNoteContents[Math.floor(Math.random() * customerNoteContents.length)];
    
    notes.push({
      id: `note-${ticketId}-${i}`,
      content,
      author,
      timestamp: noteDate.toISOString(),
      isInternal
    });
    
    // Add 1-4 hours between notes
    noteDate = new Date(noteDate);
    noteDate.setHours(noteDate.getHours() + 1 + Math.floor(Math.random() * 3));
  }
  
  return notes;
};
