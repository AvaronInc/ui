
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

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    fetch: (url, options) => {
      console.log('🔄 Making Supabase request:', url);
      return fetch(url, options);
    }
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
    const { data, error } = await supabase
      .from('tickets')
      .select('*, assigned_to')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching tickets:', error);
      return [];
    }
    
    console.log(`Retrieved ${data?.length || 0} tickets from Supabase`);
    return data;
  } catch (e) {
    console.error('Unexpected error in getTickets:', e);
    return [];
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
