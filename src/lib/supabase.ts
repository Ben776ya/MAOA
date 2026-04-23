// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import type { LeadData } from '../types';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || '';
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;

export async function submitLead(data: LeadData): Promise<boolean> {
  if (!supabase) {
    console.warn('[MAOA] Supabase not configured — lead logged to console');
    console.log('[MAOA] Lead data:', data);
    return true;
  }

  const { error } = await supabase.from('leads').insert(data);
  if (error) {
    console.error('[MAOA] Failed to submit lead:', error);
    return false;
  }
  return true;
}

/*
-- Supabase table migration (run in Supabase dashboard when ready):

CREATE TABLE leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  whatsapp text NOT NULL,
  preferred_contact text DEFAULT 'whatsapp',
  gender text,
  path text,
  zone text,
  age text,
  concern text,
  recommendations text[],
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON leads
  FOR INSERT TO anon
  WITH CHECK (true);
*/
