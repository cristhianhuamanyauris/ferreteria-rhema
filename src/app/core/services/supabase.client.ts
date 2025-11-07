// src/app/core/services/supabase.client.ts
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

export const supabase = createClient(
  environment.SUPABASE_URL,
  environment.SUPABASE_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);
