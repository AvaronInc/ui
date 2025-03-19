
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
const customFetch = (url: string, options: RequestInit) => {
  console.log('🔄 Making Supabase request:', url);
  console.log('🔄 Request options:', JSON.stringify({
    method: options.method,
    headers: options.headers ? 'Headers present' : 'No headers',
    bodyLength: options.body ? (options.body as string).length : 0,
  }));
  
  const startTime = Date.now();
  
  return fetch(url, options)
    .then(response => {
      const endTime = Date.now();
      console.log(`🔄 Supabase response received in ${endTime - startTime}ms:`, {
        status: response.status,
        ok: response.ok,
        statusText: response.statusText,
      });
      return response;
    })
    .catch(error => {
      console.error('🔄 Supabase request error:', error);
      throw error;
    });
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
      .select('*, assigned_to')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching tickets:', error);
      console.error('Error details:', error.message, error.details, error.hint);
      throw new Error(`Could not fetch tickets: ${error.message}`);
    }
    
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
