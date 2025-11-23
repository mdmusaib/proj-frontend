import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ddpsdvajvwtiqkcqbqyh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkcHNkdmFqdnd0aXFrY3FicXloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NDA2MTEsImV4cCI6MjA3NzAxNjYxMX0.h-6PjlYvu_1ehUx59gRKeHeOnEs2GQ2Sh3wJ2wNmCwQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);