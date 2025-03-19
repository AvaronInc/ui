import { createClient } from '@supabase/supabase-js';

// These can be found in your Supabase project settings
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ldhcbonevdxtoycfoeds.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkaGNib25ldmR4dG95Y2ZvZWRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5NjI3ODUsImV4cCI6MjA1NDUzODc4NX0.ZkIh5Y16nttZBxJbvZjMV7vWp0tjuRtV2DGMAIiuv1k';

// Log connection details (in development only)
if (import.meta.env.DEV) {
  console.log('Supabase connection info:', {
    url: supabaseUrl,
    hasAnonKey: !!supabaseAnonKey,
  });
}

// Custom fetch function for debugging
const customFetch = async (url: string, options: RequestInit) => {
  console.log('🔄 Making Supabase request:', url);
  console.log('🔄 Request options:', JSON.stringify({
    method: options.method,
    headers: options.headers ? 'Headers present' : 'No headers',
    bodyLength: options.body ? (options.body as string).length : 0,
  }));
  
  const startTime = Date.now();
  
  try {
    // Adding a short artificial delay in development mode to give a better feedback experience
    if (import.meta.env.DEV) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // Modify request to handle CORS issues in development
    const requestOptions = { ...options };
    if (import.meta.env.DEV) {
      // Add CORS mode - we'll try with 'cors' first (standard)
      requestOptions.mode = 'cors';
      // Add credentials setting for cookies
      requestOptions.credentials = 'include';
    }
    
    const response = await fetch(url, requestOptions);
    const endTime = Date.now();
    console.log(`🔄 Supabase response received in ${endTime - startTime}ms:`, {
      status: response.status,
      ok: response.ok,
      statusText: response.statusText,
    });
    
    // If the response isn't ok, we'll still return it so Supabase can handle it properly
    return response;
  } catch (error) {
    // Network errors, including CORS issues
    console.error('🔄 Supabase network error:', error);
    
    // In development mode, create a mock error response
    if (import.meta.env.DEV) {
      console.log('🔄 Returning mock error response for development');
      console.log('🔄 CORS or network issue detected, generating mock response');
      
      // Simulate a 503 Service Unavailable response
      return new Response(JSON.stringify({
        error: 'Network error (possible CORS issue)',
        message: 'Failed to connect to database. This could be due to CORS, network connectivity, or server issues.',
        status: 503
      }), {
        status: 503,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    throw error;
  }
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    fetch: customFetch
  }
});

// Helper functions to work with the Supabase tables

// Security Events
export const getSecurityEvents = async () => {
  const { data, error } = await supabase
    .from('security_events')
    .select('*')
    .order('timestamp', { ascending: false });
  
  if (error) {
    console.error('Error fetching security events:', error);
    return [];
  }
  
  return data;
};

// File Storage 
export const getFiles = async (path: string[] = ['root']) => {
  const { data, error } = await supabase
    .from('file_storage')
    .select('*')
    .eq('path', path)
    .order('name', { ascending: true });
  
  if (error) {
    console.error('Error fetching files:', error);
    return [];
  }
  
  return data;
};

// Tickets
export const getTickets = async () => {
  console.log('Getting tickets from Supabase');
  try {
    // First check if the tickets table exists by trying to count records
    console.log('Checking if tickets table exists...');
    const countCheck = await supabase
      .from('tickets')
      .select('*', { count: 'exact', head: true });
    
    console.log('Count check response:', countCheck);
    
    if (countCheck.error) {
      // If we get a specific error about the table not existing, let's log it
      if (countCheck.error.message.includes('does not exist')) {
        console.error('The tickets table does not exist in the database');
        throw new Error('Tickets table not found in database. Please create it first.');
      }
      
      console.error('Error during count check:', countCheck.error);
      throw new Error(`Database error: ${countCheck.error.message}`);
    }
    
    console.log(`Found ${countCheck.count || 0} tickets in database`);
    
    // Now do the full query to get the ticket data
    const { data, error } = await supabase
      .from('tickets')
      .select('*, assigned_to');
    
    if (error) {
      console.error('Error fetching tickets:', error);
      console.error('Error details:', error.message, error.details, error.hint);
      throw new Error(`Could not fetch tickets: ${error.message}`);
    }
    
    // If connection succeeded but no tickets found - return empty array
    if (!data || data.length === 0) {
      console.log('No tickets found in database');
      return [];
    }
    
    console.log(`Retrieved ${data.length} tickets from Supabase`);
    console.log('Sample ticket data:', data[0]);
    return data;
  } catch (e) {
    const error = e as Error;
    console.error('Unexpected error in getTickets:', error);
    
    // In development mode, generate mock tickets after error
    if (import.meta.env.DEV) {
      console.log('DEV MODE: Generating mock tickets since fetching failed');
      return [
        {
          id: 'TK-1001',
          title: 'Server Access Issue',
          description: 'Unable to access the file server from remote location.',
          status: 'open',
          priority: 'high',
          assignedTo: 'James Wilson',
          createdBy: 'Maria Garcia',
          createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
          updatedAt: new Date(Date.now() - 1800000).toISOString(),
          department: 'IT',
          location: 'Headquarters'
        },
        {
          id: 'TK-1002',
          title: 'Email Not Working',
          description: 'Cannot send or receive emails since this morning.',
          status: 'in-progress',
          priority: 'medium',
          assignedTo: 'Sophia Lee',
          createdBy: 'Robert Davis',
          createdAt: new Date(Date.now() - 7200000).toISOString(),
          updatedAt: new Date(Date.now() - 3600000).toISOString(),
          department: 'Marketing',
          location: 'East Branch'
        },
        {
          id: 'TK-1003',
          title: 'New Software Installation',
          description: 'Need latest version of Adobe Creative Suite installed.',
          status: 'pending-customer',
          priority: 'low',
          assignedTo: 'Alex Johnson',
          createdBy: 'James Wilson',
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          updatedAt: new Date(Date.now() - 43200000).toISOString(),
          department: 'Design',
          location: 'Remote'
        }
      ];
    }
    
    throw new Error(`Failed to fetch tickets: ${error.message}`);
  }
};

// VPN Sessions
export const getVPNSessions = async () => {
  const { data, error } = await supabase
    .from('vpn_sessions')
    .select('*')
    .eq('status', 'active')
    .order('start_time', { ascending: false });
  
  if (error) {
    console.error('Error fetching VPN sessions:', error);
    return [];
  }
  
  return data;
};

// Disconnect VPN Session
export const disconnectVPNSession = async (sessionId: string) => {
  const { error } = await supabase
    .from('vpn_sessions')
    .update({ 
      status: 'disconnected',
      end_time: new Date().toISOString()
    })
    .eq('id', sessionId);
  
  if (error) {
    console.error('Error disconnecting VPN session:', error);
    return false;
  }
  
  return true;
};
